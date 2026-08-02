"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer animate-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">Account Settings</h1>
        <p className="text-sm text-[#6B7280]">Manage theme colors, subscription billing, integrations, and secure API keys.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Column 1: Config panels */}
        <div className="lg:col-span-7 space-y-6">
          {/* General Preferences */}
          <div className="clay-card p-6 bg-white space-y-4">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider border-b border-[#E5E7EB]/50 pb-2">General Preferences</h3>
            
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Workspace Theme Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeMode(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border capitalize cursor-pointer transition-all ${
                      themeMode === t 
                        ? "bg-[#2563EB]/15 text-[#2563EB] border-[#2563EB] shadow-xs" 
                        : "bg-transparent border-[#E5E7EB] dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Default Language</label>
              <select 
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  showToast?.(`Language changed to ${e.target.value.toUpperCase()}!`, "success");
                }}
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
          <div className="clay-card p-6 bg-white space-y-4">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider border-b border-[#E5E7EB]/50 pb-2">Developer Integration API Keys</h3>
            <p className="text-xs text-[#6B7280]">Use this key to fetch your parsed resume data or application tracker stats into external applications.</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="clay-input w-full text-xs font-mono select-all bg-[#F5F7FB]"
              />
              <button onClick={generateApiKey} className="clay-btn-secondary px-4 py-2 text-xs font-semibold shrink-0">
                🔄 Rotate Key
              </button>
            </div>
            <p className="text-[10px] text-[#6B7280]">
              Keep this key confidential. Access to this key grants write permissions on your job tracking board.
            </p>
          </div>
        </div>

        {/* Column 2: Billing & Plans */}
        <div className="lg:col-span-5 space-y-6">
          {/* Billing subscription card */}
          <div className="clay-card p-6 bg-white space-y-5 border-2 border-[#2563EB]/20">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider">Plan & Subscription</h3>
            
            <div className="flex justify-between items-center bg-[#F5F7FB] p-4 rounded-xl border border-[#E5E7EB]/85">
              <div>
                <span className="text-[10px] text-[#6B7280] block font-semibold">Active Plan</span>
                <span className="font-bold text-sm text-[#2563EB]">{billingPlan} Premium</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-green-50 text-[#16A34A] border border-green-200">
                Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-[#6B7280]">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                <span>Renews on</span>
                <span className="font-semibold text-[#111827]">August 28, 2026</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                <span>Amount / Cycle</span>
                <span className="font-semibold text-[#111827]">$19.00 / month (Annual)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Method</span>
                <span className="font-semibold text-[#111827]">Visa ending in •••• 4242</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => showToast?.("Subscription upgrade portal loaded!", "info")}
                className="clay-btn-primary flex-1 py-2.5 text-xs text-white font-semibold"
              >
                Change Plan
              </button>
              <button
                onClick={() => showToast?.("Payment history log retrieved!", "info")}
                className="clay-btn-secondary flex-1 py-2.5 text-xs font-semibold"
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
