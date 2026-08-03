"use client";
import React, { useState } from "react";
import { 
  FileText, SearchCode, Trello, Mic, Globe, Compass, ArrowRight, Check, 
  Sparkles, Zap, ShieldCheck, Target, ChevronRight, BarChart3, Bot, Layout, Award
} from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Features() {
  const [activeTab, setActiveTab] = useState<"ats" | "tailor" | "formatting">("ats");

  return (
    <section id="features" className="py-28 bg-white relative z-10 overflow-hidden">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-24">
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8">
            <div>
              <span className="eyebrow text-blue-600 mb-3 block">01 / COMPLETE SUITE</span>
              <h2 className="display-lg text-gray-900 tracking-tight">
                Designed for high performers.<br />
                <span className="text-gray-400 font-normal">Built to eliminate application rejection.</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm mt-4 md:mt-0 text-base leading-relaxed">
              Every tool engineered to give you an unfair advantage in candidate shortlists.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Feature Showcase Row 1: AI Resume Builder */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fade-up" delay={0}>
              <span className="feature-num block mb-2">01 · RESUME BUILDER</span>
              <h3 className="display-feature text-gray-900 mb-6">
                Notion-speed editing.<br />
                <span className="text-gradient-primary">Executive-grade layout.</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Type directly into live pages with smart auto-suggest, dynamic bullet point scoring, and instant one-click template switching.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: "Real-time Action Verb Optimization", desc: "Turns passive descriptions into metric-driven accomplishment statements." },
                  { title: "40+ ATS-Approved Layout Templates", desc: "Tested across Workday, Greenhouse, Taleo, and Lever parsing engines." },
                  { title: "Multi-Format Export", desc: "Export crisp vector PDFs and editable Word documents anytime." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#interactive-tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Try the interactive builder demo <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right Product Mockup Visual */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-left" delay={100}>
              <div className="relative rounded-2xl bg-warm p-6 md:p-8 border border-gray-200/80 mockup-shadow">
                
                {/* Visual Editor Chrome */}
                <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AI</div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Senior Staff Software Engineer</div>
                        <div className="text-[10px] text-gray-400">Template: Modern Slate • Score: 98/100</div>
                      </div>
                    </div>
                    <span className="badge badge-green text-[10px]"><Zap className="w-3 h-3 fill-current" /> ATS Ready</span>
                  </div>

                  {/* Bullet comparison view */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bullet Point Optimization</div>
                    
                    {/* Before */}
                    <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-xs text-red-700 opacity-70">
                      <span className="font-bold text-[10px] uppercase text-red-500 block mb-1">Original Draft</span>
                      "Responsible for managing backend APIs and fixing performance issues in our database queries."
                    </div>

                    {/* AI Transformation arrow */}
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 px-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>AI Impact Rewrite (+42% ATS boost)</span>
                    </div>

                    {/* After */}
                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-gray-900 font-medium relative">
                      <span className="font-bold text-[10px] uppercase text-emerald-700 block mb-1">Optimized Result</span>
                      "Engineered high-throughput PostgreSQL queries, reducing latency by <strong>44%</strong> and scaling API throughput to <strong>50k+ RPM</strong> across 3 microservices."
                    </div>
                  </div>

                  {/* Live Metrics bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <div className="text-[10px] text-gray-400 font-semibold">Action Verbs</div>
                      <div className="text-sm font-black text-gray-900">9/9 Strong</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50">
                      <div className="text-[10px] text-gray-400 font-semibold">Quantified Impact</div>
                      <div className="text-sm font-black text-emerald-600">100%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50">
                      <div className="text-[10px] text-gray-400 font-semibold">Brevity Score</div>
                      <div className="text-sm font-black text-blue-600">Optimal</div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      <hr className="hr-gradient max-w-7xl mx-auto my-24" />

      {/* Feature Showcase Row 2: ATS Scanner & Matcher */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Product Visual (Reversed Order for rhythm) */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <ScrollReveal variant="fade-right" delay={100}>
              <div className="relative rounded-2xl bg-warm p-6 md:p-8 border border-gray-200/80 mockup-shadow">
                <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <SearchCode className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-gray-900">Job Match Analysis — Senior Frontend Engineer</span>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      94% Match Score
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-2">
                    {[
                      { name: "React 19 & Next.js App Router", match: true, impact: "Critical Match" },
                      { name: "TypeScript Strict Mode", match: true, impact: "Critical Match" },
                      { name: "Tailwind CSS Design Systems", match: true, impact: "High Match" },
                      { name: "CI/CD Pipeline Automation", match: false, impact: "Missing Keyword" },
                      { name: "GraphQL & REST Architecture", match: true, impact: "Match Found" },
                    ].map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 text-xs">
                        <div className="flex items-center gap-2.5">
                          {s.match ? (
                            <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] font-bold">!</div>
                          )}
                          <span className="font-semibold text-gray-800">{s.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${s.match ? "text-emerald-700" : "text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"}`}>
                          {s.impact}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* One-click fix box */}
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">Add missing keyword "CI/CD Pipeline" to bullet #3?</span>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                      Auto Inject
                    </button>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Text Block */}
          <div className="lg:col-span-5 lg:order-2 order-1">
            <ScrollReveal variant="fade-up" delay={0}>
              <span className="feature-num block mb-2">02 · ATS REJECTION GUARD</span>
              <h3 className="display-feature text-gray-900 mb-6">
                Never get filtered out<br />
                <span className="text-gradient-primary">by automated bots again.</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our algorithm simulates exact ATS parsers (Greenhouse, Workday, Lever). You get a line-by-line breakdown of matched and missing keywords before sending a single application.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: "Job Description Parser", desc: "Paste any job link or text to extract hidden target keywords instantly." },
                  { title: "Formatting Compliance Check", desc: "Detects unreadable tables, custom fonts, or header errors that confuse ATS systems." },
                  { title: "Role Alignment Rating", desc: "Get a clear percentage score showing how closely your profile fits the recruiter's exact prompt." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#ats-checker" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                Run a live ATS scan now <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>

        </div>
      </div>

      <hr className="hr-gradient max-w-7xl mx-auto my-24" />

      {/* Feature Showcase Row 3: Pipeline Tracker & Voice Coach */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fade-up" delay={0}>
              <span className="feature-num block mb-2">03 · FULL PIPELINE SUITE</span>
              <h3 className="display-feature text-gray-900 mb-6">
                From application<br />
                <span className="text-gradient-primary">to final offer letter.</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Manage your job search like a high-growth sales pipeline. Track follow-ups, store interview notes, and practice speech delivery with realistic voice simulation.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-warm rounded-xl border border-gray-200/70">
                  <Trello className="w-5 h-5 text-amber-500 mb-2" />
                  <h4 className="text-sm font-bold text-gray-900">Kanban Tracker</h4>
                  <p className="text-xs text-gray-500 mt-1">Drag-and-drop job stages with reminder alerts.</p>
                </div>
                <div className="p-4 bg-warm rounded-xl border border-gray-200/70">
                  <Mic className="w-5 h-5 text-purple-500 mb-2" />
                  <h4 className="text-sm font-bold text-gray-900">AI Voice Coach</h4>
                  <p className="text-xs text-gray-500 mt-1">Real-time tone analysis and filler-word detection.</p>
                </div>
                <div className="p-4 bg-warm rounded-xl border border-gray-200/70">
                  <Globe className="w-5 h-5 text-rose-500 mb-2" />
                  <h4 className="text-sm font-bold text-gray-900">Portfolio Host</h4>
                  <p className="text-xs text-gray-500 mt-1">Turn your resume into a live personal portfolio.</p>
                </div>
                <div className="p-4 bg-warm rounded-xl border border-gray-200/70">
                  <Compass className="w-5 h-5 text-cyan-500 mb-2" />
                  <h4 className="text-sm font-bold text-gray-900">Salary Advisor</h4>
                  <p className="text-xs text-gray-500 mt-1">Market rate insights to maximize negotiation.</p>
                </div>
              </div>

              <a href="#kanban-board" className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                Explore career tools <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right Product Visual — Combined Pipeline & Voice Mockup */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-left" delay={100}>
              <div className="relative rounded-2xl bg-warm p-6 md:p-8 border border-gray-200/80 mockup-shadow space-y-4">
                
                {/* Kanban Column Preview */}
                <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">
                    <span>Active Pipeline</span>
                    <span className="text-purple-600 text-[10px] bg-purple-50 px-2 py-0.5 rounded font-bold">4 Active Stages</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                      <div className="text-[10px] font-bold text-blue-700 uppercase">Screening</div>
                      <div className="text-xs font-bold text-gray-900 mt-1">Vercel</div>
                      <div className="text-[10px] text-gray-400">Senior UI Lead</div>
                    </div>
                    <div className="bg-violet-50/50 p-2.5 rounded-lg border border-violet-100">
                      <div className="text-[10px] font-bold text-violet-700 uppercase">Technical</div>
                      <div className="text-xs font-bold text-gray-900 mt-1">Linear</div>
                      <div className="text-[10px] text-gray-400">Product Designer</div>
                    </div>
                    <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">Offer Stage</div>
                      <div className="text-xs font-bold text-gray-900 mt-1">Stripe</div>
                      <div className="text-[10px] text-emerald-600 font-bold">$195k / yr</div>
                    </div>
                  </div>
                </div>

                {/* Voice Session Waveform Card */}
                <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white animate-pulse">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">AI Voice Mock Interview</div>
                      <div className="text-[10px] text-gray-400">Behavioral Question #3 • Pacing: Excellent</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[40, 75, 100, 60, 90, 45, 80, 50, 95].map((h, i) => (
                      <div key={i} className="w-1 bg-violet-500 rounded-full" style={{ height: `${h * 0.25}px` }} />
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

    </section>
  );
}

