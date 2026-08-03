"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Twitter, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";

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
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-white/[0.06]">

          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-900 font-black text-sm">R</div>
              <span className="font-bold text-base text-white">ResumeFlow AI</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs font-normal">
              Build ATS-compliant resumes, track applications, and ace interviews with our AI-powered career platform.
            </p>

            {/* Newsletter */}
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Weekly career tips</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/[0.06] border border-white/[0.08] focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 font-medium focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-150 font-normal">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-gray-600 font-normal">
            © 2026 ResumeFlow AI · All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {[{ icon: Twitter, href: "#" }, { icon: Github, href: "#" }, { icon: Linkedin, href: "#" }].map(({ icon: Icon, href }) => (
              <a
                key={href + Icon.name}
                href={href}
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.06] flex items-center justify-center text-gray-600 hover:text-white transition-all"
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
