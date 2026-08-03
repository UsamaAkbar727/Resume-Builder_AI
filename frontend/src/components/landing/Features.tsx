"use client";
import React from "react";
import { FileText, SearchCode, Trello, Mic, Globe, Compass, ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Features() {
  return (
    <section id="features" className="py-28 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="max-w-2xl mb-16">
            <span className="eyebrow text-blue-600 mb-3 block">Feature Suite</span>
            <h2 className="display-lg text-gray-900 mb-5">
              One platform.<br />
              <span className="text-gradient-primary">Every career tool.</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed font-normal">
              Forget juggling ten different apps. ResumeFlow AI gives you everything from resume building to interview practice in a single workspace.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Large feature card — Resume Builder */}
          <ScrollReveal variant="fade-up" delay={0} className="lg:col-span-2">
            <div className="bento-card p-8 h-full min-h-[280px] flex flex-col justify-between bg-white group">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-wrap-blue w-11 h-11 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">AI Resume Builder</h3>
                    <p className="text-xs text-gray-400 font-medium">Notion-style editor • PDF export</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
                  Drag-and-drop sections, pick from 40+ designer templates, and let AI rewrite your bullet points to be impact-first and ATS-compliant.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Smart bullet rewriting", "40+ templates", "Instant PDF", "Real-time preview"].map(t => (
                    <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />{t}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#resume-builder-demo" className="flex items-center gap-1.5 text-sm font-bold text-blue-600 mt-6 group-hover:gap-2.5 transition-all">
                Explore builder <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* ATS Checker */}
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="bento-card p-8 h-full min-h-[280px] flex flex-col justify-between bg-gradient-to-br from-white to-emerald-50/40 group">
              <div>
                <div className="icon-wrap-green w-11 h-11 flex items-center justify-center mb-5">
                  <SearchCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">ATS Score Analyzer</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Scan against real job postings. See exactly which keywords are missing and fix them in one click.</p>
              </div>
              {/* Mini visual */}
              <div className="mt-5 space-y-2">
                {[["React / Next.js", 100, "text-emerald-600"], ["TypeScript", 92, "text-emerald-600"], ["GraphQL", 54, "text-amber-600"]].map(([label, pct, cls]) => (
                  <div key={label as string} className="flex items-center gap-2 text-[11px] font-semibold">
                    <span className="text-gray-500 w-24 truncate">{label as string}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-current transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className={cls as string}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Kanban Tracker */}
          <ScrollReveal variant="fade-up" delay={120}>
            <div className="bento-card p-8 flex flex-col justify-between bg-gradient-to-br from-white to-amber-50/30 group">
              <div className="icon-wrap-amber w-11 h-11 flex items-center justify-center mb-5">
                <Trello className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Kanban Job Tracker</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Drag cards across stages — Applied, Screening, Interview, Offer. Never lose track of a pipeline again.</p>
              </div>
              <div className="flex gap-2 mt-5">
                {["Applied", "Interview", "Offer"].map((col, ci) => (
                  <div key={col} className={`flex-1 rounded-xl p-2 text-center text-[10px] font-bold ${ci === 0 ? "bg-blue-50 text-blue-600" : ci === 1 ? "bg-violet-50 text-violet-600" : "bg-emerald-50 text-emerald-700"}`}>
                    {col}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Voice Coach */}
          <ScrollReveal variant="fade-up" delay={160}>
            <div className="bento-card p-8 flex flex-col justify-between bg-gradient-to-br from-white to-violet-50/30 group">
              <div className="icon-wrap-purple w-11 h-11 flex items-center justify-center mb-5">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Voice Interview Coach</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Practice real interview questions aloud. Get scored on pacing, clarity, and filler words.</p>
              </div>
              <div className="flex gap-1.5 mt-5">
                {[60, 80, 45, 90, 70, 85, 55, 95, 65].map((h, i) => (
                  <div key={i} className="flex-1 bg-violet-200 rounded-full" style={{ height: `${h * 0.3}px` }} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Portfolio + Career — two small cards side by side inside one cell */}
          <ScrollReveal variant="fade-up" delay={200} className="flex flex-col gap-5">
            <div className="bento-card p-6 flex gap-4 items-start bg-gradient-to-br from-white to-rose-50/30 group flex-1">
              <div className="icon-wrap-rose w-10 h-10 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Portfolio Builder</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Deploy a portfolio site with a custom domain in minutes.</p>
              </div>
            </div>
            <div className="bento-card p-6 flex gap-4 items-start bg-gradient-to-br from-white to-cyan-50/20 group flex-1">
              <div className="icon-wrap-cyan w-10 h-10 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">AI Career Advisor</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Skills gap analysis and salary benchmarks personalized to your goals.</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
