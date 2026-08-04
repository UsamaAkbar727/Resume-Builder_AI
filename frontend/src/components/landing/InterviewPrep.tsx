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
    bgColor: "bg-[#D1C7BD]",
    textColor: "text-stone-900",
    iconColor: "bg-stone-900/10 text-stone-900",
    icon: DollarSign,
    offsetClass: "ml-0"
  },
  {
    num: "02",
    stepTag: "SECOND STEP",
    title: "STAR Method Narrative Formulation",
    desc: "Structure your past experiences into Situation, Task, Action, and Quantified Result using AI guided prompt templates.",
    bgColor: "bg-[#E87A36]",
    textColor: "text-white",
    iconColor: "bg-white/20 text-white",
    icon: TrendingUp,
    offsetClass: "ml-6 sm:ml-12 lg:ml-16"
  },
  {
    num: "03",
    stepTag: "THIRD STEP",
    title: "Live AI Mock Interview Simulation",
    desc: "Simulate live behavioral & technical questions with real-time audio analysis and instant answer improvement suggestions.",
    bgColor: "bg-[#6E4A35]",
    textColor: "text-white",
    iconColor: "bg-white/20 text-white",
    icon: Search,
    offsetClass: "ml-12 sm:ml-24 lg:ml-32"
  },
  {
    num: "04",
    stepTag: "FOURTH STEP",
    title: "Confidence Score & Callback Optimization",
    desc: "Receive comprehensive scoring metrics on delivery tone, key metric inclusion, and salary negotiation leverage.",
    bgColor: "bg-[#67B0A7]",
    textColor: "text-white",
    iconColor: "bg-white/20 text-white",
    icon: Percent,
    offsetClass: "ml-16 sm:ml-32 lg:ml-48"
  }
];

export default function InterviewPrep() {
  return (
    <section id="interview-prep" className="relative py-20 lg:py-28 bg-[#F5F2EC] text-stone-900 overflow-hidden border-b border-stone-200">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-300 text-xs font-black uppercase tracking-widest border border-stone-800 shadow-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              AI INTERVIEW COACH STEPPER
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={60}>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              4-Step AI Interview Mastery
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-sm sm:text-base text-stone-600 font-medium max-w-2xl mx-auto">
              Master the STAR method, practice real-time mock interviews, and land 3x more job offers with our AI coach.
            </p>
          </ScrollReveal>
        </div>

        {/* ── 4-STEP OVERLAPPING SPEECH BUBBLE STEPPER INFOGRAPHIC ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-10 relative">
          
          {/* LEFT SIDE: Vertical Line with 01, 02, 03, 04 Numbers & Waving Person Graphic */}
          <div className="lg:col-span-4 space-y-10 text-left">
            
            {/* Vertical Line with Numbers 01-04 */}
            <div className="relative pl-6 border-l-2 border-stone-300 space-y-8">
              {INTERVIEW_STEPS.map((s) => (
                <div key={s.num} className="relative space-y-0.5">
                  {/* Number Bullet Point */}
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-stone-400 border-2 border-[#F5F2EC]" />
                  <div className="text-3xl sm:text-4xl font-black text-stone-400 tracking-tight leading-none">
                    {s.num}
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-stone-500">
                    • INFOGRAPHIC
                  </div>
                </div>
              ))}
            </div>

            {/* Waving Person Graphic & Dual Chat Bubbles (Matching Image Bottom Left) */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xl space-y-3 max-w-xs relative">
              <div className="flex items-center gap-3">
                
                {/* Waving Person Icon */}
                <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg shrink-0">
                  <User className="w-6 h-6" />
                </div>

                {/* Dual Orange & Teal Chat Bubbles */}
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-2xl bg-[#E87A36] text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="w-7 h-7 rounded-2xl bg-[#67B0A7] text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-stone-900 uppercase tracking-widest">BUSINESS INFOGRAPHICS ELEMENTS</h4>
                <p className="text-[11px] text-stone-500 font-semibold mt-0.5">AI Interview Coach Stepper</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: 4 STAIR-CASED SPEECH BUBBLE CARDS (Top-Left to Bottom-Right Shift) */}
          <div className="lg:col-span-8 space-y-6 relative">
            
            {INTERVIEW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.num} variant="fade-left" delay={idx * 100}>
                  <div 
                    className={`relative ${step.bgColor} ${step.textColor} ${step.offsetClass} max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl space-y-2 transition-transform hover:-translate-y-1`}
                  >
                    
                    {/* Speech Bubble Downward Tail (Matching Image Speech Bubble Tail) */}
                    <div 
                      className={`absolute -bottom-3 left-8 w-6 h-6 ${step.bgColor} rotate-45 shadow-sm`} 
                    />

                    {/* Step Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-90">• {step.stepTag}</span>
                      </div>

                      {/* Icon Circle Badge */}
                      <div className={`w-10 h-10 rounded-full ${step.iconColor} flex items-center justify-center shadow-xs`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
                      {step.desc}
                    </p>

                  </div>
                </ScrollReveal>
              );
            })}

          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-16 text-center">
          <a
            href="/auth?mode=register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer"
          >
            Start AI Interview Practice <ArrowRight className="w-5 h-5 text-amber-400" />
          </a>
        </div>

      </div>

    </section>
  );
}
