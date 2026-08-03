"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Twitter, Github, Linkedin, Zap } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#030711] text-[#7A8BA8] border-t border-white/[0.04] relative z-10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] orb orb-blue opacity-8 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/[0.04]">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md group-hover:bg-blue-400/35 transition-all duration-500" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F6EF7] to-[#6B4FD9] flex items-center justify-center text-white font-black text-base shadow-[0_4px_15px_rgba(79,110,247,0.3)]">
                  R
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                ResumeFlow <span className="text-gradient-blue">AI</span>
              </span>
            </Link>

            <p className="text-xs text-[#4A5E78] leading-relaxed max-w-xs font-normal">
              Create premium ATS-compliant resumes, monitor job pipelines, and practice voice mock screenings using recruiter-tested algorithms.
            </p>

            {/* Newsletter */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-[11px] font-bold text-[#C4D4F0] uppercase tracking-widest mb-3">
                Join our newsletter
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/[0.08] border border-emerald-500/15 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  You&apos;re in! Check your inbox for tips.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/[0.04] border border-white/[0.08] focus:border-blue-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none placeholder-[#3A4F6A] font-medium transition-all duration-200 focus:bg-white/[0.06]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-gradient-to-br from-[#4F6EF7] to-[#6B4FD9] text-white hover:shadow-[0_0_20px_rgba(79,110,247,0.4)] rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-[0_4px_12px_rgba(79,110,247,0.2)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-5">Product</h4>
            <ul className="space-y-3.5 text-xs font-medium text-[#4A5E78]">
              {[
                { label: "Features Grid", href: "#features" },
                { label: "Resume Creator", href: "#resume-builder-demo" },
                { label: "ATS Scan Tool", href: "#ats-resume-checker" },
                { label: "Premium Pricing", href: "#pricing" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#1E2E45] group-hover:bg-blue-400 transition-colors duration-200" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-5">Resources</h4>
            <ul className="space-y-3.5 text-xs font-medium text-[#4A5E78]">
              {["ATS Guidelines", "Resume Templates", "Developer Port", "Mock Grading"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#1E2E45] group-hover:bg-violet-400 transition-colors duration-200" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-5">Legal</h4>
            <ul className="space-y-3.5 text-xs font-medium text-[#4A5E78]">
              {["Privacy Policy", "Terms of Service", "Data Security", "GDPR Compliance"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#1E2E45] group-hover:bg-emerald-400 transition-colors duration-200" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 pt-8">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#2A3A54]">
            <Zap className="w-3 h-3 text-blue-500/50" />
            <span>© 2026 ResumeFlow AI. All rights reserved. Built with Antigravity.</span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#2A3A54] hover:text-white hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
