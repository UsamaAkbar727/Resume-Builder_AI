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
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-[#100D24] text-white overflow-hidden border-b border-[#1E1B38]">
      
      {/* Decorative glows */}
      <div className="cta-dark-glow-1" />
      <div className="cta-dark-glow-2" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 footer-grid opacity-100 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] text-indigo-300 text-xs font-black uppercase tracking-widest border border-white/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              5-Step Success Roadmap
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={60}>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display">
              How ResumeFlow AI Gets You Hired
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-sm sm:text-base text-zinc-400 font-semibold font-display">
              Follow our 5-step intelligent workflow to turn your experience into a recruiter-favorite resume.
            </p>
          </ScrollReveal>
        </div>

        {/* ── THE AI TRANSFORMATION SHOWCASE SPOTLIGHT ── */}
        <ScrollReveal variant="fade-up" delay={150}>
          <div className="my-10 lg:my-14 relative rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-indigo-950/50 overflow-hidden group">
            {/* Background ambient lighting */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Visual Image with luxury 3D glass frame */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-indigo-500/40 transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Glowing overlay highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-indigo-500/20 pointer-events-none z-10" />
                  <img
                    src="/images/ai-career-portal.png"
                    alt="AI Resume to Career Opportunity Portal"
                    className="w-full h-auto object-cover transform scale-[1.04] group-hover:scale-[1.08] transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Floating status badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 bg-slate-950/85 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center justify-between text-xs shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-white font-bold text-[11px] sm:text-xs">100% Recruiter & ATS Ready</span>
                    </div>
                    <span className="text-amber-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider">3x Callbacks</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative / Story */}
              <div className="lg:col-span-6 text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  The AI Evolution
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight font-display">
                  Turn A Flat Resume Into An{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    Open Door to Top Roles
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Traditional resumes get trapped in automated filters. ResumeFlow AI bridges the gap by connecting your raw experience to real-time hiring metrics, high-converting action phrasing, and recruiter-approved ATS architectures.
                </p>

                {/* Feature highlight bullet points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-Time Keyword Match</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Quantified Impact Bullets</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Parse Layout Errors</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-Click PDF/DOCX Export</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/auth?mode=register"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 hover:text-white group/link transition-colors cursor-pointer"
                  >
                    <span>Experience the transformation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ── S-CURVE INFOGRAPHIC ROADMAP CONTAINER ── */}
        <div className="relative my-8 space-y-12 md:space-y-16">
          
          {/* Vertical Wave Center Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-indigo-500/10 -translate-x-1/2 hidden md:block rounded-full opacity-60" />

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
                    <div className="bg-white/[0.04] backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-indigo-500/40 shadow-xl shadow-black/10 space-y-2 relative overflow-hidden group transition-all duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/15 transition-all" />
                      
                      <div className={`flex items-center gap-3 ${isRight ? "justify-start md:justify-end" : "justify-start"}`}>
                        <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-wider font-display">
                          {step.num}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-display">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-semibold">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Numbered Circular 3D Embossed Node Badge (Center) */}
                  <div className="relative shrink-0 z-20">
                    {/* Outer Glowing Yellow Pulse Arc */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 blur-sm animate-pulse-slow opacity-80" />
                    
                    {/* Dark Embossed Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1A1535] border-4 border-indigo-550 border-indigo-500 shadow-lg flex items-center justify-center text-indigo-400">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 stroke-[2]" />
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
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-20">
          
          {/* QR Code Badge */}
          <div className="bg-white/[0.04] backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-xl shadow-black/10 flex items-center gap-3 text-left">
            <div className="bg-white/[0.06] border border-white/10 p-2 rounded-xl text-white">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase font-display">Mobile Ready</p>
              <p className="text-[11px] text-indigo-300 font-semibold font-display">Scan to build on iOS & Android</p>
            </div>
          </div>

          <a
            href="/auth?mode=register"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-bold text-sm tracking-wide uppercase flex items-center gap-2 shadow-xl shadow-indigo-500/20 transition-all cursor-pointer font-display"
          >
            Start 5-Step Builder Free <ArrowRight className="w-5 h-5" />
          </a>

        </div>

      </div>

    </section>
  );
}
