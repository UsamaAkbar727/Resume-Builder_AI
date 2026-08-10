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
    <section id="features" className="relative py-20 lg:py-28 bg-[#F5F8FF] text-zinc-900 overflow-hidden">

      {/* Faint dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid-faint opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP BAR: QR CODE & HEADLINE ANNUAL REPORT ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16 border-b border-zinc-200/80 pb-6">

          <div className="flex items-center gap-3">
            <div className="bg-zinc-100 border border-zinc-200 p-2 rounded-xl text-zinc-800 shadow-md">
              <QrCode className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-tight leading-none font-display">
                headline <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-bold block text-sm mt-0.5">annual report</span>
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right max-w-sm">
            <p className="text-xs text-zinc-550 text-zinc-550 text-zinc-500 font-medium leading-relaxed font-display">
              Consolidated 2026 SaaS recruitment benchmark & ATS performance architecture report.
            </p>
          </div>

        </div>

        {/* ── 6-STEP RADIAL CENTRAL HUB INFOGRAPHIC GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative my-12">

          {/* Orbital Thin SVG Ring Connection Background */}
          <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
            <svg className="w-[500px] h-[500px] text-indigo-600/10 animate-spin-slow" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            </svg>
          </div>

          {/* LEFT SIDE: 3 MODERN GLASS PILLS (01, 02, 03) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left z-10">
            {HUB_FEATURES.filter(f => f.side === "left").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-right" delay={idx * 100}>
                  <div className="relative group bg-white border border-zinc-200/80 hover:border-indigo-500/40 rounded-3xl p-5 sm:p-6 shadow-lg shadow-zinc-200/20 text-zinc-900 flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1">

                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight font-display">{feat.num}</span>
                        <h3 className="text-sm sm:text-base font-black text-zinc-900 uppercase tracking-tight font-display">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">{feat.desc}</p>
                    </div>

                    {/* Overlapping 3D Black Circle Node on Right Edge */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-zinc-100 shadow-xl flex items-center justify-center text-indigo-650 text-indigo-600 group-hover:text-violet-600 group-hover:border-indigo-100 transition-all duration-300">
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
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white border-[10px] border-indigo-100 shadow-[0_12px_40px_rgba(99,102,241,0.08)] flex flex-col items-center justify-center p-6 text-center">

                {/* Inner Dashed Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-indigo-200/30 pointer-events-none" />

                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest font-display">Business</p>
                <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 uppercase tracking-tighter my-0.5 leading-none font-display">
                  Steps
                </h3>
                <p className="text-xs font-extrabold text-violet-650 text-violet-650 text-violet-600 uppercase tracking-widest font-display">INFOGRAPHIC</p>

              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT SIDE: 3 MODERN GLASS PILLS (04, 05, 06) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left z-10">
            {HUB_FEATURES.filter(f => f.side === "right").map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.num} variant="fade-left" delay={idx * 100}>
                  <div className="relative group bg-white border border-zinc-200/80 hover:border-violet-500/40 rounded-3xl p-5 sm:p-6 shadow-lg shadow-zinc-200/20 text-zinc-900 flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1">

                    {/* Overlapping 3D Black Circle Node on Left Edge */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-zinc-100 shadow-xl flex items-center justify-center text-indigo-650 text-indigo-600 group-hover:text-violet-600 group-hover:border-indigo-100 transition-all duration-300">
                        <Icon className="w-7 h-7 stroke-[2]" />
                      </div>
                    </div>

                    <div className="flex-1 pl-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight font-display">{feat.num}</span>
                        <h3 className="text-sm sm:text-base font-black text-zinc-900 uppercase tracking-tight font-display">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">{feat.desc}</p>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM RIGHT EXPLANATORY PARAGRAPH ── */}
        <div className="mt-16 pt-6 border-t border-zinc-200/80 flex flex-col md:flex-row justify-end items-center text-right">
          <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-md font-display">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

      </div>
    </section>
  );
}
