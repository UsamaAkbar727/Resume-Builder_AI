"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type AuthMode = "login" | "register" | "forgot" | "reset" | "verify" | "2fa";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const urlMode = searchParams.get("mode") as AuthMode;
    if (urlMode && ["login", "register", "forgot", "reset", "verify", "2fa"].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (mode === "login") {
      if (!email || !password) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      // Switch to 2FA for security demo
      setSuccessMsg("Credentials valid. Please verify 2FA.");
      setMode("2fa");
    } else if (mode === "register") {
      if (!name || !email || !password) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      setSuccessMsg("Account created! Please verify your email.");
      setMode("verify");
    } else if (mode === "verify") {
      setSuccessMsg("Email verified successfully! You can now log in.");
      setMode("login");
    } else if (mode === "2fa") {
      if (otp.length !== 6) {
        setErrorMsg("Verification code must be 6 digits.");
        return;
      }
      setSuccessMsg("Verification successful! Logging in...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } else if (mode === "forgot") {
      if (!email) {
        setErrorMsg("Please enter your email.");
        return;
      }
      setSuccessMsg("Password reset link sent to your email!");
    }
  };

  // Automatic developer fast login bypass
  const handleDemoLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.25)]">
            R
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#111827]">
            ResumeFlow <span className="text-[#2563EB]">AI</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="clay-card py-8 px-6 sm:px-10 bg-white">
          <h2 className="text-2xl font-bold text-center text-[#111827] mb-6">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
            {mode === "verify" && "Verify Your Email"}
            {mode === "2fa" && "2-Factor Security"}
          </h2>

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-[#16A34A] text-xs font-semibold">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="clay-input w-full"
                />
              </div>
            )}

            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="clay-input w-full"
                />
              </div>
            )}

            {(mode === "login" || mode === "register") && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-[#2563EB] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="clay-input w-full"
                />
              </div>
            )}

            {mode === "verify" && (
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter code sent to your email"
                  className="clay-input w-full text-center tracking-widest font-bold"
                />
              </div>
            )}

            {mode === "2fa" && (
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit Authenticator Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000 000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="clay-input w-full text-center tracking-widest font-extrabold text-lg"
                />
                <p className="text-[10px] text-[#6B7280] text-center mt-2">
                  Open your Google Authenticator or Duo app to retrieve the code.
                </p>
              </div>
            )}

            <button type="submit" className="clay-btn-primary w-full py-3 text-sm text-white">
              {mode === "login" && "Verify & Continue"}
              {mode === "register" && "Register Account"}
              {mode === "forgot" && "Send Reset Link"}
              {mode === "verify" && "Verify Code"}
              {mode === "2fa" && "Complete Sign In"}
            </button>
          </form>

          {/* Social Logins */}
          {(mode === "login" || mode === "register") && (
            <div className="mt-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-[#6B7280] uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="clay-btn-secondary py-2.5 text-xs flex justify-center items-center gap-2"
                >
                  <span className="text-base">G</span> Google
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="clay-btn-secondary py-2.5 text-xs flex justify-center items-center gap-2"
                >
                  <span className="text-base font-bold text-blue-700">in</span> LinkedIn
                </button>
              </div>
            </div>
          )}

          {/* Mode Switchers */}
          <div className="mt-8 pt-6 border-t border-[#E5E7EB]/60 text-center text-xs text-[#6B7280]">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-[#2563EB] font-semibold hover:underline">
                  Create account
                </button>
              </p>
            ) : mode === "register" ? (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-[#2563EB] font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            ) : (
              <button onClick={() => setMode("login")} className="text-[#2563EB] font-semibold hover:underline">
                Back to Sign In
              </button>
            )}
          </div>

          {/* Quick Demo Bypass for evaluation convenience */}
          <div className="mt-6 p-3 rounded-lg bg-blue-50/50 border border-dashed border-[#2563EB]/20 text-center">
            <button
              onClick={handleDemoLogin}
              className="text-xs text-[#2563EB] font-bold hover:underline"
            >
              ⚡ Instant Demo Login (Skip Auth)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center text-xs font-bold text-slate-400">Loading Auth Workspace...</div>}>
      <AuthContent />
    </React.Suspense>
  );
}
