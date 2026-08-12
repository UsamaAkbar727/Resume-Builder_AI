<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user and send verification code.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate and send verification code
        $code = $this->generateCode($user->email, 'email_verification', 15);
        
        try {
            Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code, 'Email Verification'));
        } catch (\Exception $e) {
            Log::error("Failed sending register verification code to {$user->email}: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Registration successful! Verification code sent to your email.',
            'email' => $user->email,
            'email_verified' => false
        ], 201);
    }

    /**
     * Verify email using verification code.
     */
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'code' => 'required|string|size:6',
        ]);

        $email = $request->email;
        $code = $request->code;

        $throttleKey = 'verify-email:' . $email . '|' . $request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Too many validation attempts. Please retry in {$seconds} seconds."
            ], 429);
        }

        $user = User::where('email', $email)->first();
        if (!$user) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json([
                'message' => 'Invalid email or verification code.'
            ], 422);
        }

        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Email is already verified. You can sign in.'
            ]);
        }

        if ($this->verifyCode($email, $code, 'email_verification')) {
            RateLimiter::clear($throttleKey);
            $user->email_verified_at = now();
            $user->save();

            return response()->json([
                'message' => 'Email verified successfully! You can now log in.'
            ]);
        }

        RateLimiter::hit($throttleKey, 60);
        return response()->json([
            'message' => 'Invalid, expired, or locked verification code.'
        ], 422);
    }

    /**
     * Resend email verification code.
     */
    public function resendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Verification code sent if the email exists.'
            ]);
        }

        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Email is already verified.'
            ], 400);
        }

        $throttleKey = 'resend-code:' . $user->email . '|' . $request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 3)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Please wait {$seconds} seconds before requesting a new code."
            ], 429);
        }

        RateLimiter::hit($throttleKey, 120);

        $code = $this->generateCode($user->email, 'email_verification', 15);
        try {
            Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code, 'Email Verification'));
        } catch (\Exception $e) {
            Log::error("Failed resending verification code: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'A new verification code has been sent to your email.'
        ]);
    }

    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json([
                'message' => 'Please verify your email address before logging in.',
                'email_verified' => false
            ], 403);
        }

        // Check if 2FA is active
        if ($user->two_factor_enabled) {
            $code = $this->generateCode($user->email, '2fa', 5); // 5 min expiry for 2FA
            
            try {
                Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code, 'Two-Factor Login Security'));
            } catch (\Exception $e) {
                Log::error("Failed sending 2FA code to {$user->email}: " . $e->getMessage());
            }

            $tempToken = bin2hex(random_bytes(32));
            Cache::put('2fa_token:' . $tempToken, $user->email, 300); // 5 mins

            return response()->json([
                'requires_2fa' => true,
                'two_factor_token' => $tempToken,
                'email' => $user->email,
                'message' => 'Please enter the 2-Factor code sent to your email.'
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'two_factor_enabled' => (bool)$user->two_factor_enabled,
            ]
        ]);
    }

    /**
     * Verify 2FA OTP and issue auth token.
     */
    public function verify2fa(Request $request)
    {
        $request->validate([
            'two_factor_token' => 'required|string',
            'code' => 'required|string|size:6',
        ]);

        $tempToken = $request->two_factor_token;
        $code = $request->code;

        $email = Cache::get('2fa_token:' . $tempToken);
        if (!$email) {
            return response()->json([
                'message' => 'Authentication session expired or invalid. Please login again.'
            ], 422);
        }

        $throttleKey = 'verify-2fa:' . $email . '|' . $request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Too many failed OTP attempts. Please wait {$seconds} seconds."
            ], 429);
        }

        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 422);
        }

        if ($this->verifyCode($email, $code, '2fa')) {
            RateLimiter::clear($throttleKey);
            Cache::forget('2fa_token:' . $tempToken);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'two_factor_enabled' => (bool)$user->two_factor_enabled,
                ]
            ]);
        }

        RateLimiter::hit($throttleKey, 60);
        return response()->json([
            'message' => 'Invalid or expired 2FA code.'
        ], 422);
    }

    /**
     * Send password reset code.
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Password reset code has been sent if the email exists.'
            ]);
        }

        $throttleKey = 'forgot-password:' . $user->email . '|' . $request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 3)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Please wait {$seconds} seconds before requesting another reset code."
            ], 429);
        }

        RateLimiter::hit($throttleKey, 300);

        $code = $this->generateCode($user->email, 'password_reset', 15);

        try {
            Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code, 'Password Reset'));
        } catch (\Exception $e) {
            Log::error("Failed sending forgot password mail: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Password reset code has been sent to your email.'
        ]);
    }

    /**
     * Reset password using verification code.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'code' => 'required|string|size:6',
            'password' => 'required|string|min:8',
        ]);

        $email = $request->email;
        $code = $request->code;

        $throttleKey = 'reset-password:' . $email . '|' . $request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Too many validation attempts. Please wait {$seconds} seconds."
            ], 429);
        }

        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Invalid email or reset code.'
            ], 422);
        }

        if ($this->verifyCode($email, $code, 'password_reset')) {
            RateLimiter::clear($throttleKey);
            $user->password = Hash::make($request->password);
            $user->save();

            // Revoke all tokens upon password reset
            $user->tokens()->delete();

            return response()->json([
                'message' => 'Password has been reset successfully! You can now log in.'
            ]);
        }

        RateLimiter::hit($throttleKey, 60);
        return response()->json([
            'message' => 'Invalid, expired, or locked reset code.'
        ], 422);
    }

    /**
     * Generate 2FA Secret Setup information.
     */
    public function setup2fa(Request $request)
    {
        $user = $request->user();
        
        if ($user->two_factor_enabled) {
            return response()->json([
                'message' => 'Two-factor authentication is already enabled.'
            ], 400);
        }

        $secret = implode(' ', str_split(strtoupper(bin2hex(random_bytes(8))), 4)); // RF2A 7S3K T8N4 QW2X style
        Cache::put('2fa_setup_secret:' . $user->id, $secret, 600); // 10 mins

        $code = $this->generateCode($user->email, '2fa_setup', 10);
        try {
            Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code, 'Two-Factor Setup Code'));
        } catch (\Exception $e) {
            Log::error("Failed sending 2FA setup verification code: " . $e->getMessage());
        }

        return response()->json([
            'secret' => $secret,
            'qr_code_url' => 'otpauth://totp/ResumeFlow:' . $user->email . '?secret=' . str_replace(' ', '', $secret) . '&issuer=ResumeFlow%20AI',
            'message' => 'Setup code has been sent to your email to verify configuration.'
        ]);
    }

    /**
     * Verify code and enable 2FA on account.
     */
    public function enable2fa(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = $request->user();
        $secret = Cache::get('2fa_setup_secret:' . $user->id);

        if (!$secret) {
            return response()->json([
                'message' => 'Setup session expired. Please request 2FA Setup credentials again.'
            ], 422);
        }

        if ($this->verifyCode($user->email, $request->code, '2fa_setup')) {
            $user->two_factor_enabled = true;
            $user->two_factor_secret = bcrypt($secret);
            $user->save();

            Cache::forget('2fa_setup_secret:' . $user->id);

            return response()->json([
                'message' => 'Two-factor authentication has been enabled successfully!'
            ]);
        }

        return response()->json([
            'message' => 'Invalid or expired setup verification code.'
        ], 422);
    }

    /**
     * Disable 2FA on account.
     */
    public function disable2fa(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid password.'
            ], 422);
        }

        $user->two_factor_enabled = false;
        $user->two_factor_secret = null;
        $user->save();

        return response()->json([
            'message' => 'Two-factor authentication has been disabled.'
        ]);
    }

    /**
     * Logout user.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Token revoked and user logged out successfully'
        ]);
    }

    /**
     * Get authenticated user profile.
     */
    public function user(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'two_factor_enabled' => (bool)$user->two_factor_enabled,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ]);
    }

    /**
     * Helper to generate a new verification code.
     */
    private function generateCode($email, $type, $expiresInMinutes = 15)
    {
        $code = sprintf("%06d", random_int(100000, 999999));
        
        // Invalidate old active codes
        VerificationCode::where('email', $email)
            ->where('type', $type)
            ->whereNull('used_at')
            ->update(['used_at' => now()]);

        VerificationCode::create([
            'email' => $email,
            'code' => Hash::make($code),
            'type' => $type,
            'expires_at' => now()->addMinutes($expiresInMinutes),
        ]);

        return $code;
    }

    /**
     * Helper to verify a code.
     */
    private function verifyCode($email, $code, $type)
    {
        $record = VerificationCode::where('email', $email)
            ->where('type', $type)
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$record) {
            return false;
        }

        if ($record->attempts >= 3) {
            $record->update(['used_at' => now()]);
            return false;
        }

        if (!Hash::check($code, $record->code)) {
            $record->increment('attempts');
            if ($record->attempts >= 3) {
                $record->update(['used_at' => now()]);
            }
            return false;
        }

        $record->update(['used_at' => now()]);
        return true;
    }
}
