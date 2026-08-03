"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, TrendingUp, Zap, ShieldCheck, 
  Terminal, Play, Eye, FileText, SearchCode, Trello, Mic, Award
} from "lucide-react";
import { ScrollReveal } from "./Animations";

const roleDemos = {
  software: {
    role: "Staff Software Engineer",
    company: "Stripe",
    atsScore: 98,
    keywords: ["React 19", "Distributed Systems", "PostgreSQL", "Go / Rust"],
    original: "Worked on database performance and updated APIs for team.",
    optimized: "Architected distributed PostgreSQL caching layer, reducing global API p99 latency by 48% across 12M daily requests.",
  },
  design: {
    role: "Lead Product Designer",
    company: "Linear",
    atsScore: 96,
    keywords: ["Design Systems", "Figma Variables", "Prototyping", "User Research"],
    original: "Designed components and worked with engineering team.",
    optimized: "Led unified design system migration adopted by 40+ engineers, cutting feature shipping cycles from 3 weeks to 4 days.",
  },
  pm: {
    role: "Principal Product Manager",
    company: "Vercel",
    atsScore: 95,
    keywords: ["PLG Growth", "Roadmap Strategy", "SQL Analytics", "A/B Testing"],
    original: "Managed feature launch and checked analytics metrics.",
    optimized: "Spearheaded self-serve team onboard funnel, driving +34% MoM conversion and $2.4M ARR expansion in Q3.",
  }
};

export default function Hero() {
  const [activeRole, setActiveRole] = useState<"software" | "design" | "pm">("software");
  const [atsScoreDisplay, setAtsScoreDisplay] = useState(0);

  const current = roleDemos[activeRole];

  useEffect(() => {
    let currentVal = 0;
    const target = current.atsScore;
    const timer = setInterval(() => {
      currentVal += 2;
      if (currentVal >= target) {
        setAtsScoreDisplay(target);
        clearInterval(timer);
      } else {
        setAtsScoreDisplay(currentVal);
      }
    }, 15);
    return () => clearInterval(timer);
  }, [activeRole, current.atsScore]);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 border-b border-gray-100">
      
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Centered Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          
          {/* Release Badge */}
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ResumeFlow 2.0</span>
              <span className="text-gray-400 font-normal">|</span>
              <span className="text-gray-300 font-normal">Engineered for candidates who refuse to be ignored</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </ScrollReveal>

          {/* Main Giant Editorial Headline */}
          <ScrollReveal variant="fade-up" delay={60}>
            <h1 className="display-hero text-gray-900 mb-6 text-balance">
              Stop applying into the void.<br />
              <span className="text-gradient-primary">Engineered to get hired.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto mb-10 text-balance">
              The AI Career Operating System. Build ATS-beating resumes, track application pipelines in real-time, and practice voice interviews with AI.
            </p>
          </ScrollReveal>

          {/* Call to Actions */}
          <ScrollReveal variant="fade-up" delay={180}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/auth?mode=register" className="btn-primary w-full sm:w-auto px-8 py-4 text-base justify-center shadow-lg shadow-blue-500/20">
                Build my resume free <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#interactive-tools" className="btn-outline w-full sm:w-auto px-7 py-4 text-base justify-center">
                Explore interactive tools
              </a>
            </div>
          </ScrollReveal>

          {/* Social Proof Line */}
          <ScrollReveal variant="fade-up" delay={240}>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> No credit card required
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> 95% ATS Pass Rate
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Free plan available
              </span>
            </div>
          </ScrollReveal>

        </div>

        {/* ── High-End Interactive App Sandbox Display ── */}
        <ScrollReveal variant="fade-up" delay={300}>
          <div className="relative max-w-5xl mx-auto">
            
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-80 pointer-events-none" />

            {/* Main Interactive App Container */}
            <div className="relative bg-gray-950 rounded-2xl border border-gray-800 text-white shadow-2xl overflow-hidden">
              
              {/* Top Chrome Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 bg-gray-900/90 border-b border-gray-800 gap-3">
                
                {/* Dots + Window Title */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    resumeflow-ai // live-optimizer-sandbox
                  </span>
                </div>

                {/* Role Switcher Pills inside Hero Chrome */}
                <div className="flex items-center bg-gray-950 p-1 rounded-lg border border-gray-800 text-xs">
                  <span className="text-[10px] text-gray-500 uppercase px-2 font-bold tracking-wider">Target Role:</span>
                  {(["software", "design", "pm"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRole(r)}
                      className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeRole === r 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {r === "software" ? "Engineering" : r === "design" ? "Product Design" : "Product Mgmt"}
                    </button>
                  ))}
                </div>

              </div>

              {/* Sandbox Body Content */}
              <div className="p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center">
                
                {/* Left Col: Role Details & Score Dial */}
                <div className="md:col-span-5 space-y-6">
                  
                  {/* Candidate Header */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5" /> Target Resume Profile
                    </div>
                    <h3 className="text-xl font-bold text-white">{current.role}</h3>
                    <p className="text-xs text-gray-400">Optimized for {current.company} & FAANG shortlists</p>
                  </div>

                  {/* Dynamic Score Ring Meter */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center gap-5">
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400 transition-all duration-500"
                          strokeDasharray={`${atsScoreDisplay}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-base font-black text-white">{atsScoreDisplay}%</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> ATS Tier: Exceptional
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">Passed Greenhouse & Workday keyword filters</p>
                    </div>
                  </div>

                  {/* Extracted Key Skills */}
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-2">
                      Matched Critical Keywords:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.keywords.map((kw) => (
                        <span key={kw} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Col: Live AI Transformation Preview */}
                <div className="md:col-span-7 space-y-4">
                  
                  {/* Title Bar */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-800">
                    <span className="font-bold text-gray-300">Live AI Bullet Point Transformation</span>
                    <span className="text-blue-400 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> Auto-Rewritten in 0.4s
                    </span>
                  </div>

                  {/* Before Box */}
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 text-xs">
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>✕ Weak Original Bullet (Low Impact)</span>
                    </div>
                    <p className="text-red-200/70 font-mono text-[11px]">"{current.original}"</p>
                  </div>

                  {/* After Box */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-xs relative overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-gray-950 text-[10px] font-black uppercase rounded-bl-lg">
                      +44% Impact Boost
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>✓ Optimized Executive Result</span>
                    </div>
                    <p className="text-emerald-100 font-medium leading-relaxed text-[13px]">
                      "{current.optimized}"
                    </p>
                  </div>

                  {/* Live Activity Ticker */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live Recruiter View: <strong>Stripe Recruiter</strong> opened profile 2m ago</span>
                    </span>
                    <Link href="/auth?mode=register" className="text-blue-400 font-bold hover:underline">
                      Try on your resume →
                    </Link>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>

    </section>
  );
}

