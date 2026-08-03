"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Star, Sparkles, TrendingUp } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Hero() {
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      const i = setInterval(() => {
        c += 2;
        if (c >= 94) { setAtsScore(94); clearInterval(i); }
        else setAtsScore(c);
      }, 20);
      return () => clearInterval(i);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Large decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-0">

        {/* Two-column split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left Column — Copy ── */}
          <div className="relative z-10">
            {/* Eyebrow badge */}
            <ScrollReveal variant="fade-up" delay={0}>
              <div className="flex items-center gap-2 mb-8">
                <span className="badge badge-blue">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                  </span>
                  AI-Powered Career Platform
                </span>
                <span className="badge badge-green">
                  <TrendingUp className="w-3 h-3" /> 95% ATS Pass Rate
                </span>
              </div>
            </ScrollReveal>

            {/* Main headline — big, bold, specific */}
            <ScrollReveal variant="fade-up" delay={80}>
              <h1 className="display-xl text-gray-900 mb-6">
                Your resume,<br />
                <span className="text-gradient-primary">engineered</span><br />
                to get hired.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={160}>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-md font-normal">
                Build ATS-beating resumes, track every application in a Kanban board, practice interviews with our AI Voice Coach — all in one place.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="fade-up" delay={220}>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/auth?mode=register" className="btn-primary">
                  Build my resume — free <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#interactive-tools" className="btn-outline">
                  See it in action
                </a>
              </div>
            </ScrollReveal>

            {/* Social proof row */}
            <ScrollReveal variant="fade-up" delay={280}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex -space-x-2.5">
                  {["MA", "SJ", "DC", "RP", "KL"].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                      style={{ background: ["#6366F1","#EC4899","#14B8A6","#F59E0B","#3B82F6"][i] }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                    <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Loved by 5,000+ engineers & designers</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right Column — Visual Product Card ── */}
          <ScrollReveal variant="fade-left" delay={200} duration={800}>
            <div className="relative lg:mt-0 mt-10 pb-16">

              {/* Main dashboard card */}
              <div className="relative card p-5 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] border-gray-100">

                {/* Fake browser chrome */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 h-5 rounded-lg bg-gray-100 mx-4 flex items-center px-2.5">
                    <span className="text-[9px] text-gray-400 font-medium">app.resumeflow.ai/dashboard</span>
                  </div>
                  <div className="w-6 h-5 rounded-md bg-blue-100 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </div>
                </div>

                {/* Resume preview area */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-4 mb-4">
                  <img
                    src="/resumeflow_dashboard_mockup.png"
                    alt="ResumeFlow AI Dashboard"
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                </div>

                {/* Keyword bar at bottom */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-gray-700 mb-1">Keyword Match — React, TypeScript, GraphQL</div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-blue-600 shrink-0">87%</span>
                </div>
              </div>

              {/* Floating widget 1 — ATS Score */}
              <div
                className="absolute -top-6 -left-8 w-[155px] card p-4 shadow-[0_12px_30px_rgba(0,0,0,0.1)] animate-float"
              >
                <p className="eyebrow text-gray-400 mb-2">ATS Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-gray-900 leading-none">{atsScore}</span>
                  <span className="text-sm font-bold text-gray-400 mb-0.5">%</span>
                </div>
                <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-emerald-600 mt-1.5">✓ Highly Compatible</p>
              </div>

              {/* Floating widget 2 — Interview booked */}
              <div
                className="absolute -bottom-4 -right-6 w-[195px] card p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.1)] animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 text-sm font-black text-violet-700">S</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">Stripe · Systems Design</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Interview scheduled 🎉</p>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="relative h-24 bg-white">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 30 1440 30V60H0Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>
  );
}
