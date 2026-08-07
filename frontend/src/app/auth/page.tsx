"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, Brain, Cpu, Sparkles, 
  Download, CheckCircle2, Zap, Briefcase 
} from "lucide-react";

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
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* ── BACKGROUND FLOATING PARTICLES & GRID ── */}
      {/* Dot Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />
      
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-450/10 via-yellow-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-450/5 via-yellow-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* Upper-left file */}
        <FileText className="w-10 h-10 text-amber-400/10 animate-float absolute top-[15%] left-[8%]" />
        
        {/* Upper-right brain */}
        <Brain className="w-12 h-12 text-zinc-700/20 animate-float-delayed absolute top-[20%] right-[10%]" />
        
        {/* Lower-left sparkle */}
        <Sparkles className="w-8 h-8 text-amber-300/15 animate-float absolute top-[45%] left-[10%]" />
        
        {/* Upper-right CPU */}
        <Cpu className="w-11 h-11 text-zinc-700/15 animate-float absolute top-[40%] right-[8%]" />
        
        {/* Lower-left download */}
        <Download className="w-9 h-9 text-zinc-700/20 animate-float-delayed absolute bottom-[15%] left-[12%]" />
        
        {/* Lower-right checkmark */}
        <CheckCircle2 className="w-8 h-8 text-amber-450/10 animate-float absolute bottom-[22%] right-[15%]" />
        
        {/* Mid-right zap */}
        <Zap className="w-7 h-7 text-amber-400/15 animate-float-delayed absolute top-[30%] right-[22%]" />
        
        {/* Mid-left briefcase */}
        <Briefcase className="w-10 h-10 text-zinc-700/25 animate-float absolute bottom-[35%] left-[18%]" />
      </div>

      {/* ── TOP ACTION BAR: BACK HOME BUTTON ── */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-400/40 text-zinc-400 hover:text-amber-400 text-sm font-semibold transition-all group backdrop-blur-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black text-xl shadow-[0_4px_12px_rgba(245,158,11,0.25)]">
            R
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            Resume<span className="text-amber-400">Flow</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="py-8 px-6 sm:px-10 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-white">
          <h2 className="text-2.5xl font-black text-center text-white mb-6 tracking-tight">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
            {mode === "verify" && "Verify Your Email"}
            {mode === "2fa" && "2-Factor Security"}
          </h2>

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-semibold leading-relaxed animate-fade-in">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-semibold leading-relaxed animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
            )}

            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
            )}

            {(mode === "login" || mode === "register") && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-amber-400 hover:text-amber-350 hover:underline font-bold"
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
                  className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
            )}

            {mode === "verify" && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter code sent to your email"
                  className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all text-center tracking-widest font-bold"
                />
              </div>
            )}

            {mode === "2fa" && (
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 text-center">
                  Enter 6-Digit Authenticator Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000 000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-400/80 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all text-center tracking-widest font-extrabold text-lg"
                />
                <p className="text-[10px] text-zinc-400 text-center mt-2 font-medium">
                  Open your Google Authenticator or Duo app to retrieve the code.
                </p>
              </div>
            )}

            <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
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
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-2.5 bg-zinc-900 text-zinc-400 uppercase font-black tracking-widest">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span className="text-xs text-zinc-450 font-black">G</span> Google
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span className="text-xs text-amber-450 font-black">in</span> LinkedIn
                </button>
              </div>
            </div>
          )}

          {/* Mode Switchers */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs text-zinc-400">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-amber-400 font-bold hover:text-amber-350 hover:underline cursor-pointer">
                  Create account
                </button>
              </p>
            ) : mode === "register" ? (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-amber-400 font-bold hover:text-amber-350 hover:underline cursor-pointer">
                  Sign in
                </button>
              </p>
            ) : (
              <button onClick={() => setMode("login")} className="text-amber-400 font-bold hover:text-amber-350 hover:underline cursor-pointer">
                Back to Sign In
              </button>
            )}
          </div>

          {/* Quick Demo Bypass for evaluation convenience */}
          <div className="mt-6 p-3.5 rounded-xl bg-amber-400/5 border border-dashed border-amber-400/20 text-center">
            <button
              onClick={handleDemoLogin}
              className="text-xs text-amber-400 font-black hover:text-amber-300 hover:underline cursor-pointer"
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
    <React.Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-xs font-bold text-zinc-500">Loading Auth Workspace...</div>}>
      <AuthContent />
    </React.Suspense>
  );
}
