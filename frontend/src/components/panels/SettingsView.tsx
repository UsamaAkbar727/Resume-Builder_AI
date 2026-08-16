"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Shield, ShieldCheck, ShieldAlert, QrCode, 
  Copy, Check, Loader2, KeyRound 
} from "lucide-react";
import { api } from "@/utils/api";

export default function SettingsView({ 
  themeMode,
  setThemeMode,
  language, 
  setLanguage, 
  onNavigate, 
  showToast 
}: { 
  themeMode: string;
  setThemeMode: (theme: string) => void;
  language: string; 
  setLanguage: (lang: string) => void; 
  onNavigate?: (tab: string) => void; 
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void 
}) {
  const [apiKey, setApiKey] = useState("rf_live_829a47d2f9b1c0e3d8");
  const [billingPlan, setBillingPlan] = useState("Pro");

  const [user, setUser] = useState<any>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSettingUp2fa, setIsSettingUp2fa] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [twoFactorQrUrl, setTwoFactorQrUrl] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [isSetupVerifying, setIsSetupVerifying] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [isDisabling, setIsDisabling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg2fa, setErrorMsg2fa] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await api.auth.user();
        setUser(u);
        setTwoFactorEnabled(u.two_factor_enabled);
      } catch (e) {
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem("resumeflow_user");
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              setUser(parsed);
              setTwoFactorEnabled(parsed.two_factor_enabled);
            } catch (err) {}
          }
        }
      }
    };
    fetchUser();
  }, []);

  const handleStart2faSetup = async () => {
    setErrorMsg2fa("");
    try {
      const res = await api.auth.setup2fa();
      setTwoFactorSecret(res.secret);
      setTwoFactorQrUrl(res.qr_code_url);
      setIsSettingUp2fa(true);
      showToast?.(res.message || "2FA Setup initiated!", "success");
    } catch (e: any) {
      setErrorMsg2fa(e.data?.message || e.message || "Failed to start 2FA setup.");
    }
  };

  const handleVerifyAndEnable2fa = async () => {
    if (setupCode.length !== 6) {
      setErrorMsg2fa("Confirmation code must be 6 digits.");
      return;
    }
    setErrorMsg2fa("");
    setIsSetupVerifying(true);
    try {
      await api.auth.enable2fa(setupCode);
      setTwoFactorEnabled(true);
      setIsSettingUp2fa(false);
      setSetupCode("");
      showToast?.("Two-factor authentication enabled successfully!", "success");
      const u = await api.auth.user();
      setUser(u);
    } catch (e: any) {
      setErrorMsg2fa(e.data?.message || e.message || "Failed to enable 2FA.");
    } finally {
      setIsSetupVerifying(false);
    }
  };

  const handleDisable2fa = async () => {
    if (!disablePassword) {
      setErrorMsg2fa("Please enter your password to confirm.");
      return;
    }
    setErrorMsg2fa("");
    setIsDisabling(true);
    try {
      await api.auth.disable2fa(disablePassword);
      setTwoFactorEnabled(false);
      setDisablePassword("");
      showToast?.("Two-factor authentication has been disabled.", "success");
      const u = await api.auth.user();
      setUser(u);
    } catch (e: any) {
      setErrorMsg2fa(e.data?.message || e.message || "Failed to disable 2FA.");
    } finally {
      setIsDisabling(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(twoFactorSecret.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast?.("Secret key copied to clipboard!", "success");
  };

  const generateApiKey = () => {
    const chars = "abcdef0123456789";
    let key = "rf_live_";
    for (let i = 0; i < 18; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    setApiKey(key);
    showToast?.("New production API Key generated!", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827] dark:text-white font-display">Account Settings</h1>
        <p className="text-sm text-[#6B7280] dark:text-slate-400">Manage theme colors, subscription billing, integrations, and secure API keys.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Column 1: Config panels */}
        <div className="lg:col-span-7 space-y-6">
          {/* General Preferences */}
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-[#111827] dark:text-white uppercase tracking-wider border-b border-[#E5E7EB]/50 dark:border-slate-800 pb-2">General Preferences</h3>
            
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-2">Workspace Theme Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeMode(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border capitalize cursor-pointer transition-all ${
                      themeMode === t 
                        ? "bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 border-[#2563EB] shadow-xs" 
                        : "bg-transparent border-[#E5E7EB] dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-2">Default Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="clay-input w-full text-xs cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="es">Español (Spanish)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="fr">Français (French)</option>
                <option value="de">Deutsch (German)</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          {/* Developer API Keys */}
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-[#111827] dark:text-white uppercase tracking-wider border-b border-[#E5E7EB]/50 dark:border-slate-800 pb-2">Developer Integration API Keys</h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400">Use this key to fetch your parsed resume data or application tracker stats into external applications.</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="clay-input w-full text-xs font-mono select-all bg-[#F5F7FB] dark:bg-slate-950"
              />
              <button onClick={generateApiKey} className="clay-btn-secondary px-4 py-2 text-xs font-semibold shrink-0 cursor-pointer">
                🔄 Rotate Key
              </button>
            </div>
            <p className="text-[10px] text-[#6B7280] dark:text-slate-400">
              Keep this key confidential. Access to this key grants write permissions on your job tracking board.
            </p>
          </div>

          {/* Two-Factor Authentication (2FA) Security */}
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E5E7EB]/50 dark:border-slate-800 pb-3">
              <Shield className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
              <h3 className="font-bold text-sm text-[#111827] dark:text-white uppercase tracking-wider">
                Two-Step Verification (2FA)
              </h3>
            </div>

            <p className="text-xs text-[#6B7280] dark:text-slate-400">
              Add an extra layer of security to your account. When enabled, signing in will require both your password and a secure 6-digit verification code sent to your email.
            </p>

            {errorMsg2fa && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold leading-relaxed">
                {errorMsg2fa}
              </div>
            )}

            {twoFactorEnabled ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 rounded-xl">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">Status: Secured & Active</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Your account requires OTP authentication on login.</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 shrink-0">
                    Protected
                  </span>
                </div>

                <div className="bg-[#F5F7FB] dark:bg-slate-950 p-4 rounded-xl border border-[#E5E7EB]/70 dark:border-slate-800 text-left space-y-3">
                  <label className="block text-[10px] font-extrabold text-zinc-500 dark:text-slate-400 uppercase tracking-widest">
                    Deactivate 2FA Verification
                  </label>
                  <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                    To disable, confirm your secure account password below:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter account password"
                      value={disablePassword}
                      onChange={(e) => setDisablePassword(e.target.value)}
                      className="clay-input w-full text-xs"
                    />
                    <button
                      disabled={isDisabling}
                      onClick={handleDisable2fa}
                      className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                    >
                      {isDisabling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Disable 2FA"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-amber-50/50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800 rounded-xl">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">Status: Deactivated</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Your account uses single-factor password login.</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 shrink-0">
                    Vulnerable
                  </span>
                </div>

                {!isSettingUp2fa ? (
                  <button
                    onClick={handleStart2faSetup}
                    className="clay-btn-primary py-2.5 text-xs text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Setup 2-Step Verification</span>
                  </button>
                ) : (
                  <div className="p-4 border border-indigo-100 dark:border-indigo-900 bg-indigo-50/10 dark:bg-indigo-950/30 rounded-2xl space-y-4 text-left animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="border-b border-indigo-100/50 dark:border-indigo-900/50 pb-2">
                      <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Configure Authenticator</span>
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
                        1. A 6-digit setup code has been sent to your email <strong>{user?.email}</strong>.
                      </p>
                      
                      <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
                        2. Or register this unique secret key manually in your authenticator app:
                      </p>

                      <div className="flex gap-2 items-center bg-white dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 px-3.5 py-2.5 rounded-xl">
                        <span className="text-xs font-mono font-bold tracking-wider text-[#111827] dark:text-white select-all flex-1">
                          {twoFactorSecret}
                        </span>
                        <button
                          type="button"
                          onClick={copyToClipboard}
                          className="p-1.5 hover:bg-[#EEF2F7] dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white cursor-pointer shrink-0"
                          title="Copy Secret"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="pt-2">
                        <label className="block text-[10px] font-extrabold text-[#6B7280] dark:text-slate-400 uppercase tracking-widest mb-1.5">
                          3. Confirm 6-Digit Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="000000"
                            value={setupCode}
                            onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, ""))}
                            className="clay-input text-center tracking-widest text-xs font-bold max-w-[120px]"
                          />
                          <button
                            disabled={isSetupVerifying}
                            onClick={handleVerifyAndEnable2fa}
                            className="clay-btn-primary flex-1 py-2 text-xs text-white font-bold cursor-pointer"
                          >
                            {isSetupVerifying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Verify & Enable"}
                          </button>
                          <button
                            onClick={() => setIsSettingUp2fa(false)}
                            className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold cursor-pointer shrink-0"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Billing & Plans */}
        <div className="lg:col-span-5 space-y-6">
          {/* Billing subscription card */}
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-5 border-2 border-[#2563EB]/20 dark:border-blue-500/20 shadow-lg">
            <h3 className="font-bold text-xs text-[#6B7280] dark:text-slate-400 uppercase tracking-wider">Plan & Subscription</h3>
            
            <div className="flex justify-between items-center bg-[#F5F7FB] dark:bg-slate-950 p-4 rounded-xl border border-[#E5E7EB]/85 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-[#6B7280] dark:text-slate-400 block font-semibold">Active Plan</span>
                <span className="font-bold text-sm text-[#2563EB] dark:text-blue-400">{billingPlan} Premium</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-emerald-950/60 text-[#16A34A] dark:text-emerald-400 border border-green-200 dark:border-emerald-800">
                Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-[#6B7280] dark:text-slate-400">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40 dark:border-slate-800">
                <span>Renews on</span>
                <span className="font-semibold text-[#111827] dark:text-white">August 28, 2026</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40 dark:border-slate-800">
                <span>Amount / Cycle</span>
                <span className="font-semibold text-[#111827] dark:text-white">$19.00 / month (Annual)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Method</span>
                <span className="font-semibold text-[#111827] dark:text-white">Visa ending in •••• 4242</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                className="clay-btn-primary flex-1 py-2.5 text-xs text-white font-semibold cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Change Plan
              </button>
              <button
                className="clay-btn-secondary flex-1 py-2.5 text-xs font-semibold cursor-pointer"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
