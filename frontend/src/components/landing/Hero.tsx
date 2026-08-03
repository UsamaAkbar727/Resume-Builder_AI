"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Star, ShieldCheck, Zap } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Hero() {
  const [atsScore, setAtsScore] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      }, 25);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative pt-16 pb-28 md:pb-36 px-6 overflow-hidden bg-[#060A14]">
      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 bg-mesh-grid opacity-100 pointer-events-none" />

      {/* Ambient Orb Blobs — parallax on mouse */}
      <div
        className="absolute top-[-15%] left-[-5%] w-[55vw] h-[55vw] orb orb-blue animate-pulse-slow pointer-events-none z-0"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      />
      <div
        className="absolute top-[5%] right-[-10%] w-[45vw] h-[45vw] orb orb-violet pointer-events-none z-0"
        style={{ transform: `translate(${-mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`, animationDelay: "3s", filter: "blur(90px)" }}
      />
      <div className="absolute bottom-[0%] left-[30%] w-[30vw] h-[30vw] orb orb-cyan pointer-events-none z-0" />

      {/* Horizontal shimmer line */}
      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* Animated Badge */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/[0.08] text-xs font-bold text-blue-300 mb-10 shimmer-badge relative overflow-hidden">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI-Powered Career Engine • ATS Optimization Included</span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal variant="fade-up" delay={200}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.04] mb-7 max-w-5xl mx-auto">
            <span className="text-white">Land your dream</span>
            <br />
            <span className="text-gradient">offer with AI</span>
          </h1>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal variant="fade-up" delay={300}>
          <p className="text-base sm:text-lg md:text-xl text-[#7A8BA8] max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Build high-ATS resumes, analyze keyword density against job descriptions, track your pipeline, and ace interviews with our AI Voice Coach — all in one workspace.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal variant="fade-up" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Link
              href="/auth?mode=register"
              className="btn-glow px-9 py-4 text-sm font-semibold text-white w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              <Zap className="w-4 h-4" />
              Build My Resume — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#interactive-tools"
              className="btn-ghost px-8 py-4 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explore Tools
              <ArrowRight className="w-4 h-4 opacity-60" />
            </a>
          </div>
        </ScrollReveal>

        {/* Trust Badges */}
        <ScrollReveal variant="fade-up" delay={450}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20 text-xs text-[#7A8BA8] font-medium">
            <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] px-4 py-2 rounded-full backdrop-blur-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
              <span className="font-bold text-white ml-1">4.9/5</span>
              <span className="text-[#7A8BA8]">by 5,000+ users</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] px-4 py-2 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Trusted at Vercel, Stripe, Linear</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Mockup with Floating Widgets */}
        <ScrollReveal variant="scale-in" delay={500} duration={900}>
          <div className="relative mt-6 max-w-5xl mx-auto perspective-1000">
            {/* Deep glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/15 via-violet-600/8 to-transparent rounded-3xl filter blur-3xl pointer-events-none scale-90 z-0" />

            {/* Dashboard Wrapper */}
            <div className="relative rounded-2xl p-[1px] z-10 bg-gradient-to-br from-white/10 via-white/[0.03] to-blue-500/10">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0B1022]/90 backdrop-blur-sm p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.7)] transform rotate-x-6 rotate-y-neg-4 transition-transform duration-500 hover:rotate-x-3 hover:rotate-y-neg-2">
                <div className="w-full h-8 flex items-center px-4 gap-2 border-b border-white/[0.05] mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-4 h-4 rounded-md bg-white/[0.04] border border-white/[0.05]" />
                </div>

                <img
                  src="/resumeflow_dashboard_mockup.png"
                  alt="ResumeFlow AI Workspace Interface Preview"
                  className="w-full h-auto rounded-xl border border-white/[0.06] opacity-90"
                />

                {/* Floating Widget 1: ATS Score */}
                <div className="absolute -top-7 -right-5 md:-right-12 bg-[#0D1628]/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center gap-3 animate-float max-w-[175px] text-left border border-white/[0.06]">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" className="text-white/[0.06]" strokeWidth="3" stroke="currentColor" fill="transparent" />
                      <circle
                        cx="24" cy="24" r="20"
                        strokeWidth="3"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 - (125.6 * atsScore) / 100}
                        strokeLinecap="round"
                        stroke="url(#atsGrad)"
                        fill="transparent"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4F6EF7" />
                          <stop offset="100%" stopColor="#A78BFA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute text-[11px] font-black text-white">{atsScore}%</span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-tight">ATS Score</h4>
                    <p className="text-[9px] text-emerald-400 mt-0.5 font-semibold">✓ Highly Compatible</p>
                  </div>
                </div>

                {/* Floating Widget 2: Keywords */}
                <div
                  className="absolute bottom-12 -left-5 md:-left-14 bg-[#0D1628]/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] text-left animate-float z-20 max-w-[195px] border border-white/[0.06]"
                  style={{ animationDelay: "1.5s" }}
                >
                  <h4 className="text-[11px] font-bold text-white mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Keyword Match
                  </h4>
                  <div className="space-y-2 text-[9px] font-semibold">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[#7A8BA8]">React / Next.js</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> 100%
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[#7A8BA8]">TypeScript</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> 100%
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[#7A8BA8]">GraphQL</span>
                      <span className="text-blue-400 font-bold">Audit</span>
                    </div>
                    <div className="mt-2 w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                    </div>
                  </div>
                </div>

                {/* Floating Widget 3: Interview */}
                <div
                  className="absolute bottom-28 -right-6 md:-right-16 bg-[#0D1628]/95 backdrop-blur-xl px-4 py-3 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center gap-3 text-left animate-float max-w-[215px] border border-white/[0.06]"
                  style={{ animationDelay: "3s" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center text-violet-300 text-[11px] font-black shrink-0">
                    S
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white leading-tight">Stripe Interview</p>
                    <p className="text-[8px] text-[#7A8BA8] mt-0.5">Systems design scheduled 🎉</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060A14] to-transparent pointer-events-none z-20 rounded-b-2xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
