"use client";

import React, { useState } from "react";

export default function PortfolioBuilder() {
  const [theme, setTheme] = useState("dark");
  const [domain, setDomain] = useState("sjenkins.dev");
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(true);

  const handleDeploy = () => {
    setDeploying(true);
    setDeployed(false);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
      alert(`Portfolio website successfully deployed to https://${domain}!`);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Portfolio Website Builder</h1>
          <p className="text-sm text-[#6B7280]">Generate and deploy a personal developer website from your resume data.</p>
        </div>
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="clay-btn-primary px-4 py-2.5 text-xs text-white"
        >
          {deploying ? "Deploying Site..." : "🚀 Publish Website"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4 text-left">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider">Site Settings</h3>
            
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Custom Domain mapping</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="clay-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Primary Color Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    theme === "light" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB]"
                  }`}
                >
                  Pure Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    theme === "dark" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB]"
                  }`}
                >
                  Sleek Dark
                </button>
                <button
                  onClick={() => setTheme("clay")}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    theme === "clay" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB]"
                  }`}
                >
                  Claymorphic
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB]/50 space-y-2">
              <span className="text-xs font-semibold text-[#6B7280] block">DNS Setup Guide</span>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                Point your domain's CNAME record to: <code className="bg-[#EEF2F7] px-1 py-0.5 rounded text-[#2563EB] font-mono font-bold">domains.resumeflow-ai.com</code>. DNS changes resolve within 1-2 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Live Mockup Website Preview */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Live Portfolio Preview</span>
          
          <div className="clay-card overflow-hidden bg-gray-100 border border-[#E5E7EB]">
            {/* Browser top-bar */}
            <div className="bg-[#EEF2F7] border-b border-[#E5E7EB] px-4 py-2 flex items-center justify-between text-xs text-[#6B7280]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <span className="font-mono text-[10px] bg-white border px-4 py-0.5 rounded-md text-[#111827]">
                https://{domain}
              </span>
              <div className="w-8"></div>
            </div>

            {/* Simulated website body based on theme selection */}
            <div
              className={`p-8 min-h-[380px] text-left transition-all ${
                theme === "dark" ? "bg-[#111827] text-white" :
                theme === "clay" ? "bg-[#F5F7FB] text-[#111827]" : "bg-white text-[#111827]"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-500/20">
                <span className="font-bold text-sm tracking-wider">SJ.DEV</span>
                <div className="flex gap-4 text-xs font-medium text-gray-400">
                  <span>About</span>
                  <span>Experience</span>
                  <span>Projects</span>
                </div>
              </div>

              {/* Hero */}
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Hi, I'm <span className="text-[#2563EB]">Sarah Jenkins</span>
                </h2>
                <p className={`text-sm leading-relaxed max-w-lg font-light ${
                  theme === "dark" ? "text-gray-300" : "text-[#6B7280]"
                }`}>
                  Senior Full Stack Developer specializing in building high-performance web systems. Designing microservices checkout flows and server rendering setups at Stripe.
                </p>

                {/* Sub projects lists */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1F2937] border-gray-700/50" :
                    theme === "clay" ? "clay-card bg-white" : "bg-[#EEF2F7]/50 border-gray-200"
                  }`}>
                    <h4 className="font-bold text-xs mb-1">Stripe Checkout Optimizations</h4>
                    <p className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-[#6B7280]"}`}>
                      React checkouts migration handling transaction capacity.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1F2937] border-gray-700/50" :
                    theme === "clay" ? "clay-card bg-white" : "bg-[#EEF2F7]/50 border-gray-200"
                  }`}>
                    <h4 className="font-bold text-xs mb-1">EKS Services migration</h4>
                    <p className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-[#6B7280]"}`}>
                      Orchestration pipelines migration using Terraform configs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
