"use client";

import React from "react";
import { 
  DollarSign, TrendingUp, Search, Percent, 
  MessageSquare, User, Sparkles, ArrowRight
} from "lucide-react";
import { ScrollReveal } from "./Animations";

const INTERVIEW_STEPS = [
  {
    num: "01",
    stepTag: "FIRST STEP",
    title: "Target Role & Compensation Calibration",
    desc: "Define your target job title, industry level, and target compensation package to calibrate mock interview questions.",
    bgColor: "bg-white border border-zinc-200 hover:border-indigo-500/40",
    textColor: "text-zinc-900",
    iconColor: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    icon: DollarSign,
    offsetClass: "ml-0"
  },
  {
    num: "02",
    stepTag: "SECOND STEP",
    title: "STAR Method Narrative Formulation",
    desc: "Structure your past experiences into Situation, Task, Action, and Quantified Result using AI guided prompt templates.",
    bgColor: "bg-white border border-zinc-200 hover:border-violet-500/40",
    textColor: "text-zinc-900",
    iconColor: "bg-violet-50 text-violet-600 border border-violet-100",
    icon: TrendingUp,
    offsetClass: "ml-6 sm:ml-12 lg:ml-16"
  },
  {
    num: "03",
    stepTag: "THIRD STEP",
    title: "Live AI Mock Interview Simulation",
    desc: "Simulate live behavioral & technical questions with real-time audio analysis and instant answer improvement suggestions.",
    bgColor: "bg-white border border-zinc-200 hover:border-emerald-500/40",
    textColor: "text-zinc-900",
    iconColor: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    icon: Search,
    offsetClass: "ml-12 sm:ml-24 lg:ml-32"
  },
  {
    num: "04",
    stepTag: "FOURTH STEP",
    title: "Confidence Score & Callback Optimization",
    desc: "Receive comprehensive scoring metrics on delivery tone, key metric inclusion, and salary negotiation leverage.",
    bgColor: "bg-white border border-zinc-200 hover:border-cyan-500/40",
    textColor: "text-zinc-900",
    iconColor: "bg-cyan-550 bg-cyan-50 text-cyan-600 border border-cyan-100",
    icon: Percent,
    offsetClass: "ml-16 sm:ml-32 lg:ml-48"
  }
];

export default function InterviewPrep() {
  return (
    <section id="interview-prep" className="relative py-20 lg:py-28 bg-[#EEF2FF] text-zinc-900 overflow-hidden">
      
      {/* Subtle centered radial glow */}
      <div className="section-radial-accent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-spin-slow" />
              AI INTERVIEW COACH STEPPER
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={60}>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight font-display">
              4-Step AI Interview Mastery
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-sm sm:text-base text-zinc-550 text-zinc-500 font-semibold font-display max-w-2xl mx-auto">
              Master the STAR method, practice real-time mock interviews, and land 3x more job offers with our AI coach.
            </p>
          </ScrollReveal>
        </div>

        {/* ── 4-STEP OVERLAPPING SPEECH BUBBLE STEPPER INFOGRAPHIC ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-10 relative">
          
          {/* LEFT SIDE: Vertical Line with 01, 02, 03, 04 Numbers & Waving Person Graphic */}
          <div className="lg:col-span-4 space-y-10 text-left">
            
            {/* Vertical Line with Numbers 01-04 */}
            <div className="relative pl-6 border-l border-zinc-200 space-y-8">
              {INTERVIEW_STEPS.map((s) => (
                <div key={s.num} className="relative space-y-0.5 animate-pulse-slow">
                  {/* Number Bullet Point */}
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-indigo-600 border border-white" />
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight leading-none font-display">
                    {s.num}
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    • INFOGRAPHIC
                  </div>
                </div>
              ))}
            </div>

            {/* Waving Person Graphic & Dual Chat Bubbles */}
            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-xl shadow-zinc-200/25 space-y-3 max-w-xs relative text-zinc-900">
              <div className="flex items-center gap-3">
                
                {/* Waving Person Icon */}
                <div className="w-12 h-12 rounded-full bg-zinc-50 text-indigo-600 border border-zinc-200 flex items-center justify-center shadow-md shrink-0">
                  <User className="w-6 h-6" />
                </div>

                {/* Dual Chat Bubbles */}
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="w-7 h-7 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-zinc-700 uppercase tracking-widest font-display">BUSINESS INFOGRAPHICS ELEMENTS</h4>
                <p className="text-[11px] text-zinc-500 font-semibold mt-0.5">AI Interview Coach Stepper</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: 4 STAIR-CASED SPEECH BUBBLE CARDS */}
          <div className="lg:col-span-8 space-y-6 relative">
            
            {INTERVIEW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.num} variant="fade-left" delay={idx * 100}>
                  <div 
                    className={`relative ${step.bgColor} ${step.textColor} ${step.offsetClass} max-w-xl rounded-3xl p-6 sm:p-7 shadow-xl shadow-zinc-200/20 space-y-2 transition-all duration-300 hover:-translate-y-1`}
                  >
                    
                    {/* Speech Bubble Downward Tail */}
                    <div 
                      className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white border-r border-b border-zinc-200 rotate-45" 
                    />

                    {/* Step Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-90 font-display">• {step.stepTag}</span>
                      </div>

                      {/* Icon Circle Badge */}
                      <div className={`w-10 h-10 rounded-full ${step.iconColor} flex items-center justify-center shadow-xs`}>
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug font-display">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-semibold opacity-90 leading-relaxed text-zinc-500 font-display">
                      {step.desc}
                    </p>

                  </div>
                </ScrollReveal>
              );
            })}

          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-16 text-center font-display">
          <a
            href="/auth?mode=register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-indigo-600/15 transition-all cursor-pointer"
          >
            Start AI Interview Practice <ArrowRight className="w-5 h-5 text-white" />
          </a>
        </div>

      </div>

    </section>
  );
}
