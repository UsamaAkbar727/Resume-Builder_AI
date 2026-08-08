"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Resume Builder", href: "#resume-builder-demo" },
      { label: "ATS Analyzer", href: "#ats-resume-checker" },
      { label: "Kanban Tracker", href: "#job-tracker-kanban" },
      { label: "Interview Coach", href: "#ai-interview-coach" },
      { label: "Portfolio Builder", href: "#portfolio-builder" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "ATS Guidelines", href: "#" },
      { label: "Resume Templates", href: "#" },
      { label: "Developer API", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Contact", href: "mailto:hello@resumeflow.ai" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#fbfbfc] text-zinc-900 pt-20 pb-10 border-t border-zinc-100 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-zinc-100 text-left">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <span className="font-black text-xl text-zinc-900 font-display">
                ResumeFlow<span className="text-indigo-600">AI</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-550 text-zinc-500 leading-relaxed max-w-xs font-semibold font-display">
              We leverage machine learning scanner heuristics to craft high-conversion resume templates, cover letters, and live developer portfolios.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 font-display">Subscribe to our newsletter</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold font-display">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" /> You&apos;re subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs font-display">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-indigo-500 transition-all font-medium font-sans"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {cols.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-display">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-150 font-semibold font-display">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-semibold font-display">
          <p>© {new Date().getFullYear()} ResumeFlow AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {[
              { icon: Twitter, href: "#" },
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" }
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="w-8 h-8 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all"
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
