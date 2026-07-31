"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Star, ShieldCheck, Heart } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Hero() {
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= 98) {
          setAtsScore(98);
          clearInterval(interval);
        } else {
          setAtsScore(current);
        }
      }, 30);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-24 md:pb-32 px-6 overflow-hidden bg-mesh-grid">
      {/* Background Radial Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full radial-glow-blue pointer-events-none z-0"></div>
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full radial-glow-indigo pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badges Pill */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-700 mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            AI Powered • ATS Optimizations Included
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal variant="fade-up" delay={200}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6 max-w-5xl mx-auto">
            Land your dream offer with <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Enterprise-Grade AI Resumes
            </span>
          </h1>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal variant="fade-up" delay={300}>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            ResumeFlow AI is an elite career co-pilot. Build high-compatibility resumes, analyze keyword density against job descriptions, track pipeline status, and ace interviews with our AI Voice Coach.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal variant="fade-up" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/auth?mode=register"
              className="clay-btn-primary px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl hover:shadow-blue-500/20 w-full sm:w-auto flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform duration-200"
            >
              Build Your Resume Now{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#interactive-tools"
              className="clay-btn-secondary px-8 py-3.5 text-sm font-semibold tracking-wide w-full sm:w-auto hover:bg-gray-50 border border-gray-200 shadow-sm text-slate-800"
            >
              Try Interactive Tools
            </a>
          </div>
        </ScrollReveal>

        {/* Ratings and Trust Badges */}
        <ScrollReveal variant="fade-up" delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-800 ml-1">4.9/5</span>
              <span className="text-slate-400 font-normal">by 5,000+ candidates</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Secure & Privacy Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Trusted by candidates at Vercel, Stripe, Linear</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Mockup with Perspective & Floating Widgets */}
        <ScrollReveal variant="scale-in" delay={500} duration={850}>
          <div className="relative mt-8 max-w-4xl mx-auto perspective-1000">
            {/* Soft backdrop radial shadow and glow */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-2xl filter blur-3xl pointer-events-none scale-90 z-0"></div>

            {/* Dashboard Wrapper */}
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-2.5 shadow-[0_30px_70px_rgba(15,23,42,0.08)] transform rotate-x-6 rotate-y-neg-4 transition-transform duration-500 hover:rotate-x-3 hover:rotate-y-neg-2 z-10">
              <img
                src="/resumeflow_dashboard_mockup.png"
                alt="ResumeFlow AI Workspace Interface Preview"
                className="w-full h-auto rounded-xl border border-slate-200/60"
              />

              {/* Floating Widget 1: ATS Score */}
              <div className="absolute -top-6 -right-6 md:-right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 animate-float max-w-[170px] text-left">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      className="text-slate-100"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      className="text-blue-600 transition-all duration-1000"
                      strokeWidth="4"
                      strokeDasharray={125.6}
                      strokeDashoffset={125.6 - (125.6 * atsScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-800">{atsScore}%</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">ATS Score</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-none">Highly Compatible</p>
                </div>
              </div>

              {/* Floating Widget 2: Keyword matches */}
              <div
                className="absolute bottom-10 -left-6 md:-left-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-slate-100 text-left animate-float z-20 max-w-[190px]"
                style={{ animationDelay: "1.5s" }}
              >
                <h4 className="text-[11px] font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Keyword Density
                </h4>
                <div className="space-y-1.5 text-[9px] font-semibold text-slate-600">
                  <div className="flex justify-between items-center gap-4">
                    <span>React / Next.js</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Check className="w-3 h-3 stroke-[3]" /> 100%
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>TypeScript</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Check className="w-3 h-3 stroke-[3]" /> 100%
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>GraphQL</span>
                    <span className="text-blue-600 font-bold">Audit</span>
                  </div>
                </div>
              </div>

              {/* Floating Widget 3: Live updates Feed */}
              <div
                className="absolute bottom-24 -right-8 md:-right-14 bg-white/95 backdrop-blur-md px-3.5 py-3 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-2.5 text-left animate-float max-w-[210px]"
                style={{ animationDelay: "3s" }}
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold shadow-xs">
                  S
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-900 leading-tight">Stripe Interview</p>
                  <p className="text-[8px] text-slate-500">Systems design scheduled 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
