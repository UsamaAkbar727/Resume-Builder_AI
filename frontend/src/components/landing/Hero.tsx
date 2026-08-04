"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, ShieldCheck, 
  FileText, CheckCircle2, Download, Upload,
  Zap, MousePointerClick, Globe, MessageSquare, Plus
} from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Hero() {
  const [atsScore, setAtsScore] = useState(81);
  const [activeSkills, setActiveSkills] = useState(["Management Skills", "Analytical Thinking", "Leadership"]);

  const handleAddSkill = () => {
    const skills = ["Strategic Planning", "Data Analysis", "System Design", "Agile / Scrum"];
    const nextSkill = skills[activeSkills.length % skills.length];
    if (!activeSkills.includes(nextSkill)) {
      setActiveSkills([...activeSkills, nextSkill]);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-gray-200">
      
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/10 via-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: High-Converting Headline & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <ScrollReveal variant="fade-up" delay={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.12]">
                This resume builder gets you{" "}
                <span className="relative inline-block text-blue-600">
                  promoted
                  <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-400/30 rounded-full" />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={60}>
              <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed">
                Only 2% of resumes win. Yours will be one of them.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal variant="fade-up" delay={120}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base text-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create my resume <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/auth?mode=register"
                  className="px-7 py-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-base text-center border border-blue-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-blue-600" /> Upload my resume
                </Link>
              </div>
            </ScrollReveal>

            {/* Micro Social Proof Badges */}
            <ScrollReveal variant="fade-up" delay={180}>
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span><strong className="text-gray-900 font-extrabold">39%</strong> more likely to land the job</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="flex items-center text-emerald-500 gap-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span><strong className="text-gray-900 font-extrabold">Trustpilot</strong> 4.9 out of 5 | 55,912 reviews</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ── RIGHT COLUMN: High-Fidelity Showcase Graphic ── */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Soft Organic Outer Halo Frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-purple-200/40 rounded-full blur-2xl pointer-events-none" />

            {/* Main Interactive Document Card Box */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/80 space-y-6 text-left">
              
              {/* Document Header & Candidate Avatar Photo */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Alice Hart</h3>
                  <p className="text-sm font-semibold text-amber-600 mt-0.5">Math Teacher</p>
                  <p className="text-xs text-gray-400 mt-1">779 Pine St, Tuscaloosa, AL • (773) 489-3264</p>
                </div>

                {/* Candidate Avatar Photo Badge with Glowing Aura */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 animate-pulse-slow blur-xs" />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                    alt="Alice Hart"
                    className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
              </div>

              {/* Profile Summary Snippet */}
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Summary</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Enthusiastic math teacher with over 8 years experience fostering a nurturing and encouraging learning environment. Adopt at designing engaging lesson plans tailored to different learning styles...
                </p>
              </div>

              {/* Employment History Snippet */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Employment History</p>
                <div className="pl-3 border-l-2 border-amber-500 space-y-0.5">
                  <p className="text-xs font-bold text-gray-900">Tuscaloosa County High School</p>
                  <p className="text-[11px] text-gray-500">Mathematics Educator • 2017 — Present</p>
                </div>
              </div>

              {/* ── FLOATING INTERACTIVE BADGES ── */}

              {/* 1. FLOATING ATS SCORE BADGE (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-white rounded-2xl p-2.5 shadow-xl border border-gray-200 flex items-center gap-2.5 animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                  {atsScore}%
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">Resume Score</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Top 2% Candidate</p>
                </div>
              </div>

              {/* 2. FLOATING ATS PERFECT PILL (Top Right) */}
              <div className="absolute top-16 -right-3 sm:-right-6 z-20 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-full shadow-lg font-bold text-xs flex items-center gap-1.5 animate-float-delayed">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>ATS Perfect</span>
              </div>

              {/* 3. FLOATING ASK AI COACH SEARCH BAR (Bottom Left) */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700 animate-float">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Ask AI coach anything...</span>
              </div>

              {/* 4. FLOATING INTERACTIVE SKILLS DROPDOWN (Bottom Right) */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 z-20 bg-white rounded-2xl p-3 shadow-xl border border-gray-200 space-y-2 min-w-[170px]">
                <div className="flex justify-between items-center text-xs font-bold text-gray-900 border-b pb-1">
                  <span>Skills</span>
                  <span className="text-[10px] text-blue-600 font-semibold">{activeSkills.length} Added</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  {activeSkills.map((s) => (
                    <span key={s} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-left">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleAddSkill}
                  className="w-full py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add skill
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
