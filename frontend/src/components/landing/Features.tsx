"use client";

import React, { useState } from "react";
import { 
  Brain, Search, Cpu, BarChart3, DollarSign, Target, 
  Sparkles, QrCode, ArrowRight, CheckCircle2, ShieldCheck, Zap
} from "lucide-react";
import { ScrollReveal } from "./Animations";

const HUB_FEATURES = [
  {
    num: "01",
    title: "AI RESUME BUILDER",
    desc: "Notion-speed editing with real-time AI bullet scoring & 1-click recruiter layout switching.",
    icon: Brain,
    side: "left"
  },
  {
    num: "02",
    title: "ATS SCANNER AUDIT",
    desc: "Deep-scan against target job descriptions to ensure 100% keyword match & zero rejection.",
    icon: Search,
    side: "left"
  },
  {
    num: "03",
    title: "METRIC BULLET ENGINE",
    desc: "Transforms weak descriptions into quantified metric achievements (+45% throughput, $3.2M saved).",
    icon: Cpu,
    side: "left"
  },
  {
    num: "04",
    title: "AI COVER LETTER STUDIO",
    desc: "Generates tailored, high-converting pitch letters aligned with candidate background.",
    icon: BarChart3,
    side: "right"
  },
  {
    num: "05",
    title: "SALARY & JOB TRACKER",
    desc: "Interactive Kanban board managing job applications, interview stages, and salary offers.",
    icon: DollarSign,
    side: "right"
  },
  {
    num: "06",
    title: "AI INTERVIEW COACH",
    desc: "STAR-method mock interview simulator with real-time feedback & compensation guidance.",
    icon: Target,
    side: "right"
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      
      {/* ── Ambient Radial Yellow Glow & Carbon Texture ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & QR Code Bar (Matching Image Header) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16 border-b border-zinc-800/80 pb-6">
          
          <div className="space-y-2 text-left">
            <ScrollReveal variant="fade-up" delay={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                COMPLETE AI SUITE INFOGRAPHIC
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={60}>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                6-Core AI Engine Architecture
              </h2>
            </ScrollReveal>
          </div>

          {/* Top Left/Right QR Code Badge (Matching Image Top Bar) */}
          <ScrollReveal variant="fade-up" delay={120}>
            <div className="bg-black/90 p-3 rounded-2xl border border-amber-400/50 shadow-xl flex items-center gap-3">
              <div className="bg-amber-400 p-1.5 rounded-xl text-black">
                <QrCode className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white uppercase tracking-wider">headline annual report</p>
                <p className="text-[11px] text-amber-400 font-semibold">Scan for 2026 SaaS Report</p>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ── 6-STEP RADIAL CENTRAL HUB INFOGRAPHIC GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative my-12">
          
          {/* LEFT 3 NODES (01, 02, 03) */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 text-left">
            {HUB_FEATURES.filter(f => f.side === "left").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-right" delay={idx * 100}>
                  <div className="group relative bg-black/90 p-4 sm:p-5 rounded-2xl border-2 border-amber-400/70 shadow-xl hover:border-amber-400 transition-all flex items-center justify-between gap-4">
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-black text-amber-400 tracking-tight">{feat.num}</span>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">{feat.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">{feat.desc}</p>
                    </div>

                    {/* 3D Black Circle Node Icon */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-amber-400 shadow-xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* CENTER BIG 3D HUB CIRCLE */}
          <div className="lg:col-span-4 flex justify-center items-center my-8 lg:my-0">
            <ScrollReveal variant="scale-in" delay={150}>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-zinc-950 border-8 border-amber-400 shadow-2xl flex flex-col items-center justify-center p-6 text-center shadow-amber-400/20 animate-pulse-slow">
                
                {/* Inner Glowing Yellow Arc Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/50 pointer-events-none" />

                <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center mb-2 shadow-lg">
                  <Zap className="w-6 h-6 fill-current" />
                </div>

                <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Business Steps</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-tight my-1">
                  INFOGRAPHIC
                </h3>
                <p className="text-[11px] font-bold text-zinc-400">ResumeFlow AI Suite</p>

              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT 3 NODES (04, 05, 06) */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 text-left">
            {HUB_FEATURES.filter(f => f.side === "right").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-left" delay={idx * 100}>
                  <div className="group relative bg-black/90 p-4 sm:p-5 rounded-2xl border-2 border-amber-400/70 shadow-xl hover:border-amber-400 transition-all flex items-center justify-between gap-4">
                    
                    {/* 3D Black Circle Node Icon */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-amber-400 shadow-xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-black text-amber-400 tracking-tight">{feat.num}</span>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">{feat.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">{feat.desc}</p>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* Bottom Description Footer */}
        <div className="mt-12 text-center border-t border-zinc-800/80 pt-6">
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-medium">
            Every component in our 6-step architecture is engineered to pass ATS algorithms, impress recruiters, and accelerate your job search.
          </p>
        </div>

      </div>

    </section>
  );
}
