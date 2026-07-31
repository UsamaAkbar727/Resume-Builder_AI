"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";

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
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative z-10 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Sitemap and Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                R
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                ResumeFlow <span className="text-blue-500">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-medium">
              Create premium, ATS-compliant resumes, monitor job pipelines, and practice voice mock screenings using recruiter-tested algorithms.
            </p>

            {/* Newsletter input */}
            <div className="pt-4 max-w-sm">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2.5">
                Join our newsletter
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Check your inbox for regular tips!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 bg-slate-900 border border-slate-800 focus:border-blue-600 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-600 font-semibold"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Directory 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Product</h4>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
              <li><a href="#features" className="hover:text-white transition-colors">Features Grid</a></li>
              <li><a href="#resume-builder-demo" className="hover:text-white transition-colors">Resume Creator</a></li>
              <li><a href="#ats-resume-checker" className="hover:text-white transition-colors">ATS Scan tool</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Premium Pricing</a></li>
            </ul>
          </div>

          {/* Directory 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Resources</h4>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">ATS Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer port</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mock grading</a></li>
            </ul>
          </div>

          {/* Directory 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Legal</h4>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom footer bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-[11px] font-bold text-slate-600">
          <span>© 2026 ResumeFlow AI. All rights reserved. pair programming with Antigravity.</span>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
