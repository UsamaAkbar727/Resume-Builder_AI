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
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-zinc-900 text-left">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <span className="font-black text-xl text-white">
                ResumeFlow<span className="text-amber-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-medium">
              We leverage machine learning scanner heuristics to craft high-conversion resume templates, cover letters, and live developer portfolios.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Subscribe to our newsletter</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#67B0A7] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#67B0A7]" /> You&apos;re subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all font-medium"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {cols.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-zinc-400 hover:text-white transition-colors duration-150 font-medium">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
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
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
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
