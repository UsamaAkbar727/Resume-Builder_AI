"use client";

import React from "react";
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

      {/* Glossy Top-Right & Bottom-Left Diagonal Corner Strips (Matching Image) */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rotate-45 border-b-4 border-amber-400 shadow-2xl pointer-events-none opacity-80" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-tr from-zinc-800 to-zinc-900 rotate-45 border-t-4 border-amber-400 shadow-2xl pointer-events-none opacity-80" />

      {/* Carbon Texture Dot Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP BAR: QR CODE & HEADLINE ANNUAL REPORT (Matching Image Top Bar) ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16 border-b border-zinc-800/80 pb-6">

          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl text-black shadow-lg">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-none">
                headline <span className="text-amber-400 font-bold block text-sm mt-0.5">annual report</span>
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right max-w-sm">
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              Consolidated 2026 SaaS recruitment benchmark & ATS performance architecture report.
            </p>
          </div>

        </div>

        {/* ── 6-STEP RADIAL CENTRAL HUB INFOGRAPHIC GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative my-12">

          {/* Orbital Thin SVG Ring Connection Background */}
          <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
            <svg className="w-[500px] h-[500px] text-amber-400/30 animate-spin-slow" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            </svg>
          </div>

          {/* LEFT SIDE: 3 SOLID AMBER-YELLOW PILLS (01, 02, 03) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left z-10">
            {HUB_FEATURES.filter(f => f.side === "left").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-right" delay={idx * 100}>
                  <div className="relative bg-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl text-black flex items-center justify-between gap-4 transition-transform hover:-translate-y-1">

                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">{feat.num}</span>
                        <h3 className="text-sm sm:text-base font-black text-black uppercase tracking-tight">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-900 font-semibold leading-relaxed">{feat.desc}</p>
                    </div>

                    {/* Overlapping 3D Black Circle Node on Right Edge */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950 border-4 border-amber-300 shadow-2xl flex items-center justify-center text-amber-400">
                        <Icon className="w-7 h-7 stroke-[2]" />
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* CENTER BIG 3D BLACK HUB CIRCLE */}
          <div className="lg:col-span-2 flex justify-center items-center my-10 lg:my-0 z-10">
            <ScrollReveal variant="scale-in" delay={150}>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-zinc-950 border-[10px] border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.35)] flex flex-col items-center justify-center p-6 text-center">

                {/* Inner Dashed Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/40 pointer-events-none" />

                <p className="text-[11px] font-black text-amber-400 uppercase tracking-widest">Business</p>
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter my-0.5 leading-none">
                  Steps
                </h3>
                <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">INFOGRAPHIC</p>

              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT SIDE: 3 SOLID AMBER-YELLOW PILLS (04, 05, 06) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left z-10">
            {HUB_FEATURES.filter(f => f.side === "right").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-left" delay={idx * 100}>
                  <div className="relative bg-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl text-black flex items-center justify-between gap-4 transition-transform hover:-translate-y-1">

                    {/* Overlapping 3D Black Circle Node on Left Edge */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950 border-4 border-amber-300 shadow-2xl flex items-center justify-center text-amber-400">
                        <Icon className="w-7 h-7 stroke-[2]" />
                      </div>
                    </div>

                    <div className="flex-1 pl-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">{feat.num}</span>
                        <h3 className="text-sm sm:text-base font-black text-black uppercase tracking-tight">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-900 font-semibold leading-relaxed">{feat.desc}</p>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM RIGHT EXPLANATORY PARAGRAPH (Matching Image Bottom Right Text) ── */}
        <div className="mt-16 pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row justify-end items-center text-right">
          <p className="text-xs text-zinc-400 max-w-md font-medium leading-relaxed">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

      </div>

    </section>
  );
}
