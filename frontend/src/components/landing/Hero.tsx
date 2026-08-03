"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, TrendingUp, Zap, ShieldCheck, 
  Terminal, Play, Eye, FileText, SearchCode, Trello, Mic, Award, CheckCircle2
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
      
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Centered Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          
          {/* Release Badge */}
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>ResumeFlow 2.0</span>
              <span className="text-blue-300 font-normal">•</span>
              <span className="text-blue-900 font-medium">Engineered to get you shortlisted</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
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
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-normal max-w-2xl mx-auto mb-10 text-balance">
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

        {/* ── High-End Crisp Light Mode Workspace Mockup ── */}
        <ScrollReveal variant="fade-up" delay={300}>
          <div className="relative max-w-5xl mx-auto">
            
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-100/60 via-indigo-100/40 to-slate-100/60 blur-xl opacity-80 pointer-events-none" />

            {/* Main Interactive App Container — Crisp Light Card */}
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
              
              {/* Top Window Header Chrome */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 bg-gray-50/90 border-b border-gray-200/80 gap-3">
                
                {/* Dots + Window Title */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-1 bg-white rounded-md border border-gray-200 text-[11px] font-mono text-gray-500 flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    resumeflow.ai/editor
                  </div>
                </div>

                {/* Role Switcher Pills inside Hero Chrome */}
                <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
                  <span className="text-[10px] text-gray-400 uppercase px-2 font-bold tracking-wider">Role Preview:</span>
                  {(["software", "design", "pm"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRole(r)}
                      className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeRole === r 
                          ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {r === "software" ? "Engineering" : r === "design" ? "Product Design" : "Product Mgmt"}
                    </button>
                  ))}
                </div>

              </div>

              {/* Workspace Body */}
              <div className="p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center bg-warm">
                
                {/* Left Col: Paper Resume Preview Card */}
                <div className="md:col-span-5 bg-white p-6 rounded-xl border border-gray-200/90 shadow-sm space-y-5">
                  
                  {/* Candidate Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">Target Title</span>
                      <h3 className="text-base font-bold text-gray-900">{current.role}</h3>
                      <p className="text-xs text-gray-400">Targeting {current.company}</p>
                    </div>
                    
                    {/* Live ATS Pill */}
                    <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                      <div className="text-xs font-black text-emerald-700">{atsScoreDisplay}%</div>
                      <div className="text-[9px] font-bold text-emerald-600 uppercase">ATS Score</div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Matched Keywords Grid */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 mb-2 flex items-center justify-between">
                      <span>Matched ATS Keywords:</span>
                      <span className="text-emerald-600 text-[10px] font-bold">4/4 Matched</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.keywords.map((kw) => (
                        <span key={kw} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Candidate Status Indicator */}
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs flex items-center gap-2.5 text-gray-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-medium">ATS Formatting: 100% Clean Vector PDF</span>
                  </div>

                </div>

                {/* Right Col: AI Rewriting Panel */}
                <div className="md:col-span-7 space-y-4">
                  
                  {/* Title Bar */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                    <span className="font-bold text-gray-800">AI Metric-First Bullet Rewriter</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> Instant Optimization
                    </span>
                  </div>

                  {/* Original Bullet */}
                  <div className="p-4 rounded-xl bg-white border border-red-200/80 shadow-2xs">
                    <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">
                      Original Draft (Unquantified)
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed font-normal">
                      "{current.original}"
                    </p>
                  </div>

                  {/* Optimized Bullet */}
                  <div className="p-4 rounded-xl bg-white border-2 border-emerald-500/80 shadow-sm relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        AI Executive Bullet
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        +44% ATS Boost
                      </span>
                    </div>
                    <p className="text-gray-900 text-xs font-semibold leading-relaxed">
                      "{current.optimized}"
                    </p>
                  </div>

                  {/* Bottom Footer Ticker */}
                  <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" /> Tested on Greenhouse, Workday & Lever
                    </span>
                    <Link href="/auth?mode=register" className="text-blue-600 font-bold hover:text-blue-800 transition-colors">
                      Start building for free →
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


