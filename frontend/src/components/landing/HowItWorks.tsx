"use client";

import React from "react";
import { 
  Brain, Search, Cpu, TrendingUp, Target, 
  Sparkles, QrCode, ArrowRight, CheckCircle2 
} from "lucide-react";
import { ScrollReveal } from "./Animations";

const STEPS = [
  {
    num: "01",
    title: "AI PROFILE BRAIN",
    desc: "Upload your existing CV or enter your background. Our Gemini AI analyzes your career history in seconds.",
    icon: Brain,
    align: "right"
  },
  {
    num: "02",
    title: "ATS KEYWORD AUDIT",
    desc: "Instant deep-scan against target job descriptions to identify missing technical keywords & skills.",
    icon: Search,
    align: "left"
  },
  {
    num: "03",
    title: "AI METRIC BULLET ENGINE",
    desc: "Transform weak bullet points into high-impact quantified achievements (+42% throughput, $3.2M revenue).",
    icon: Cpu,
    align: "right"
  },
  {
    num: "04",
    title: "REAL-TIME 100+ CV STUDIO",
    desc: "Customize colors, fonts & spacing across 100+ recruiter-approved ATS template designs.",
    icon: TrendingUp,
    align: "left"
  },
  {
    num: "05",
    title: "TARGET OFFER GUARANTEE",
    desc: "Export 100% parseable PDF/DOCX files and track your application pipeline for 3x interview callbacks.",
    icon: Target,
    align: "right"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      
      {/* ── Background S-Curve Yellow Accent Wave ── */}
      <div className="absolute top-0 left-0 bottom-0 w-full sm:w-1/2 bg-amber-400 pointer-events-none z-0 opacity-95 rounded-r-[100px] hidden md:block" />
      <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-400 pointer-events-none z-0 opacity-90 md:hidden" />

      {/* Carbon Fiber Dot Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/90 text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-400/40 shadow-xl">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              5-Step Success Roadmap
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={60}>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 md:text-white tracking-tight leading-tight">
              How ResumeFlow AI Gets You Hired
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-sm sm:text-base text-gray-900 md:text-zinc-300 font-medium">
              Follow our 5-step intelligent workflow to turn your experience into a recruiter-favorite resume.
            </p>
          </ScrollReveal>
        </div>

        {/* ── S-CURVE INFOGRAPHIC ROADMAP CONTAINER ── */}
        <div className="relative my-8 space-y-12 md:space-y-16">
          
          {/* Vertical Wave Center Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-2.5 bg-amber-400/30 -translate-x-1/2 hidden md:block rounded-full" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isRight = step.align === "right";

            return (
              <ScrollReveal key={step.num} variant="fade-up" delay={idx * 100}>
                <div className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  
                  {/* Step Card Details (Left or Right) */}
                  <div className={`w-full md:w-1/2 ${
                    isRight ? "text-left md:text-right" : "text-left"
                  }`}>
                    <div className="bg-black/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border-2 border-amber-400/80 shadow-2xl space-y-2 relative overflow-hidden group hover:border-amber-400 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl group-hover:bg-amber-400/20 transition-all" />
                      
                      <div className="flex items-center gap-3 justify-start md:justify-end">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wider">
                          {step.num}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Numbered Circular 3D Embossed Node Badge (Center) */}
                  <div className="relative shrink-0 z-20">
                    {/* Outer Glowing Yellow Pulse Arc */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 blur-sm animate-pulse-slow opacity-80" />
                    
                    {/* Dark Embossed Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-950 border-4 border-amber-400 shadow-2xl flex items-center justify-center text-amber-400">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[2]" />
                    </div>
                  </div>

                  {/* Empty Spacer for Balance */}
                  <div className="hidden md:block w-1/2" />

                </div>
              </ScrollReveal>
            );
          })}

        </div>

        {/* Bottom Infographic Footer (QR Code & CTA) */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-20">
          
          {/* QR Code Badge (Bottom Left - Matching Image) */}
          <div className="bg-black/95 p-3.5 rounded-2xl border border-amber-400/60 shadow-xl flex items-center gap-3 text-left">
            <div className="bg-white p-2 rounded-xl text-black">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase">Mobile Ready</p>
              <p className="text-[11px] text-amber-400 font-semibold">Scan to build on iOS & Android</p>
            </div>
          </div>

          <a
            href="/auth?mode=register"
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
          >
            Start 5-Step Builder Free <ArrowRight className="w-5 h-5" />
          </a>

        </div>

      </div>

    </section>
  );
}
