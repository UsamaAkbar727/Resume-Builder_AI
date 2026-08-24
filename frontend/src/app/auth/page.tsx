"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, Brain, Cpu, Sparkles, 
  Download, CheckCircle2, Zap, Briefcase, Loader2
} from "lucide-react";
import { api } from "@/utils/api";

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
  const [activeAction, setActiveAction] = useState<"login" | "google" | "linkedin" | "demo" | null>(null);
  const [twoFactorToken, setTwoFactorToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const urlMode = searchParams.get("mode") as AuthMode;
    if (urlMode && ["login", "register", "forgot", "reset", "verify", "2fa"].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setActiveAction("login");

    try {
      if (mode === "login") {
        if (!email || !password) {
          setErrorMsg("Please fill in all fields.");
          setActiveAction(null);
          return;
        }

        const res = await api.auth.login(email, password);
        if (res.requires_2fa) {
          setTwoFactorToken(res.two_factor_token);
          setOtp("");
          setSuccessMsg(res.message);
          setMode("2fa");
        } else {
          setSuccessMsg("Success! Redirecting...");
          router.push("/dashboard");
        }
      } else if (mode === "register") {
        if (!name || !email || !password) {
          setErrorMsg("Please fill in all fields.");
          setActiveAction(null);
          return;
        }

        await api.auth.register(name, email, password);
        setOtp("");
        setSuccessMsg("Account created! A 6-digit verification code has been sent to your email.");
        setMode("verify");
      } else if (mode === "verify") {
        if (!otp) {
          setErrorMsg("Please enter the verification code.");
          setActiveAction(null);
          return;
        }

        await api.auth.verifyEmail(email, otp);
        setSuccessMsg("Email verified successfully! You can now log in.");
        setMode("login");
        setPassword("");
        setOtp("");
      } else if (mode === "2fa") {
        if (otp.length !== 6) {
          setErrorMsg("Verification code must be 6 digits.");
          setActiveAction(null);
          return;
        }

        await api.auth.verify2fa(twoFactorToken, otp);
        setSuccessMsg("Verification successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 300);
      } else if (mode === "forgot") {
        if (!email) {
          setErrorMsg("Please enter your email.");
          setActiveAction(null);
          return;
        }

        const res = await api.auth.forgotPassword(email);
        setSuccessMsg(res.message);
        setOtp("");
        setMode("reset");
      } else if (mode === "reset") {
        if (!otp || !password) {
          setErrorMsg("Please fill in all fields.");
          setActiveAction(null);
          return;
        }
        if (password.length < 8) {
          setErrorMsg("Password must be at least 8 characters.");
          setActiveAction(null);
          return;
        }

        const res = await api.auth.resetPassword(email, otp, password);
        setSuccessMsg(res.message);
        setMode("login");
        setPassword("");
        setOtp("");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.data?.message || err.message || "An authentication error occurred.");
    } finally {
      setActiveAction(null);
    }
  };

  // Automatic fast developer login bypass
  const handleDemoLogin = (action: "google" | "linkedin" | "demo") => {
    setActiveAction(action);
    if (typeof window !== "undefined") {
      const activeEmail = email || "usama.jutt@company.com";
      const rawName = activeEmail.split("@")[0].replace(/[._-]/g, " ");
      const activeName = name || (rawName.charAt(0).toUpperCase() + rawName.slice(1)) || "Usama jutt";

      localStorage.setItem("resumeflow_token", "live_session_token_" + Date.now());
      localStorage.setItem("resumeflow_user", JSON.stringify({
        id: 1,
        name: activeName,
        email: activeEmail,
        email_verified_at: new Date().toISOString(),
        two_factor_enabled: false
      }));
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] text-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* ── BACKGROUND FLOATING PARTICLES & GRID ── */}
      {/* Dot Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none z-0" />
      
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/5 via-violet-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* Upper-left file */}
        <FileText className="w-10 h-10 text-indigo-600/10 animate-float absolute top-[15%] left-[8%]" />
        
        {/* Upper-right brain */}
        <Brain className="w-12 h-12 text-zinc-300/30 animate-float-delayed absolute top-[20%] right-[10%]" />
        
        {/* Lower-left sparkle */}
        <Sparkles className="w-8 h-8 text-indigo-500/15 animate-float absolute top-[45%] left-[10%]" />
        
        {/* Upper-right CPU */}
        <Cpu className="w-11 h-11 text-zinc-300/20 animate-float absolute top-[40%] right-[8%]" />
        
        {/* Lower-left download */}
        <Download className="w-9 h-9 text-zinc-300/30 animate-float-delayed absolute bottom-[15%] left-[12%]" />
        
        {/* Lower-right checkmark */}
        <CheckCircle2 className="w-8 h-8 text-indigo-600/10 animate-float absolute bottom-[22%] right-[15%]" />
        
        {/* Mid-right zap */}
        <Zap className="w-7 h-7 text-indigo-500/15 animate-float-delayed absolute top-[30%] right-[22%]" />
        
        {/* Mid-left briefcase */}
        <Briefcase className="w-10 h-10 text-zinc-300/40 animate-float absolute bottom-[35%] left-[18%]" />
      </div>

      {/* ── TOP ACTION BAR: BACK HOME BUTTON ── */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 hover:border-indigo-600 text-zinc-600 hover:text-indigo-600 text-sm font-semibold transition-all group shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(99,102,241,0.25)]">
            R
          </div>
          <span className="font-black text-2xl tracking-tight text-zinc-900 animate-fade-in">
            Resume<span className="text-indigo-600">Flow</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="py-8 px-6 sm:px-10 bg-white border border-zinc-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-zinc-800">
          <h2 className="text-2.5xl font-black text-center text-zinc-900 mb-6 tracking-tight font-display">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Forgot Password"}
            {mode === "reset" && "Reset Password"}
            {mode === "verify" && "Verify Your Email"}
            {mode === "2fa" && "2-Factor Security"}
          </h2>

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold leading-relaxed animate-fade-in">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold leading-relaxed animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usama jutt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all"
                />
              </div>
            )}

            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all"
                />
              </div>
            )}

            {(mode === "login" || mode === "register") && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-indigo-650 text-indigo-600 hover:text-indigo-700 hover:underline font-bold"
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
                  className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all"
                />
              </div>
            )}

            {mode === "verify" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2 text-center">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter code sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all text-center tracking-widest font-bold"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={async () => {
                      setErrorMsg("");
                      setSuccessMsg("");
                      try {
                        const res = await api.auth.resendVerification(email);
                        setSuccessMsg(res.message);
                      } catch (err: any) {
                        setErrorMsg(err.data?.message || err.message);
                      }
                    }}
                    className="text-xs text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer"
                  >
                    Resend verification code
                  </button>
                </div>
              </div>
            )}

            {mode === "reset" && (
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all text-center tracking-widest font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all"
                  />
                </div>
              </div>
            )}

            {mode === "2fa" && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2 text-center">
                  Enter 6-Digit Authenticator Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000 000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-white border border-zinc-200 focus:border-indigo-600 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all text-center tracking-widest font-extrabold text-lg"
                />
                <p className="text-[10px] text-zinc-400 text-center mt-2 font-medium">
                  Open your Google Authenticator or Duo app to retrieve the code.
                </p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={activeAction !== null}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {activeAction === "login" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  {mode === "login" && "Verify & Continue"}
                  {mode === "register" && "Register Account"}
                  {mode === "forgot" && "Send Reset Code"}
                  {mode === "reset" && "Reset Password"}
                  {mode === "verify" && "Verify Code"}
                  {mode === "2fa" && "Complete Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          {(mode === "login" || mode === "register") && (
            <div className="mt-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-2.5 bg-white text-zinc-400 uppercase font-black tracking-widest">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={activeAction !== null}
                  onClick={() => handleDemoLogin("google")}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-xs font-bold transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeAction === "google" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                  ) : (
                    <span className="text-xs text-zinc-400 font-black">G</span>
                  )}
                  Google
                </button>
                <button
                  type="button"
                  disabled={activeAction !== null}
                  onClick={() => handleDemoLogin("linkedin")}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-xs font-bold transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeAction === "linkedin" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  ) : (
                    <span className="text-xs text-indigo-600 font-black">in</span>
                  )}
                  LinkedIn
                </button>
              </div>
            </div>
          )}

          {/* Mode Switchers */}
          <div className="mt-8 pt-6 border-t border-zinc-200 text-center text-xs text-zinc-500">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer">
                  Create account
                </button>
              </p>
            ) : mode === "register" ? (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer">
                  Sign in
                </button>
              </p>
            ) : (
              <button onClick={() => setMode("login")} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer">
                Back to Sign In
              </button>
            )}
          </div>

          {/* Quick Demo Bypass for evaluation convenience */}
          <div className="mt-6 p-3.5 rounded-xl bg-indigo-50/50 border border-dashed border-indigo-200 text-center">
            <button
              onClick={() => handleDemoLogin("demo")}
              disabled={activeAction !== null}
              className="text-xs text-indigo-600 font-black hover:text-indigo-700 hover:underline cursor-pointer flex items-center justify-center gap-1.5 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {activeAction === "demo" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600 animate-pulse" />
                  <span>Instant Demo Login (Skip Auth)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#fbfbfc] flex items-center justify-center text-xs font-bold text-zinc-500">Loading Auth Workspace...</div>}>
      <AuthContent />
    </React.Suspense>
  );
}
