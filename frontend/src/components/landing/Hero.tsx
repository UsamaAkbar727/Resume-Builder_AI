"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, ShieldCheck, 
  FileText, CheckCircle2, Download, Upload,
  Zap, MousePointerClick, Globe, Navigation, MessageSquare, Plus,
  ChevronLeft, ChevronRight, Pause, Play
} from "lucide-react";
import { ScrollReveal } from "./Animations";

// Real Showcase Templates for Auto-Rotating Right Side
const SHOWCASE_TEMPLATES = [
  {
    id: "exec_leadership",
    name: "Executive Leadership",
    category: "Executive Series",
    accentColor: "#1E3A8A",
    atsScore: 98,
    candidateName: "Vince Murray",
    candidateTitle: "Executive Operations Director",
    location: "New York, NY • vince.murray@email.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    summary: "Senior operations executive with 8+ years scaling enterprise teams, optimizing P&L efficiency by 34%, and leading cross-functional strategic initiatives.",
    skills: ["Enterprise Leadership", "P&L Management", "Strategic Growth", "Cross-functional Ops"],
    experience: [
      { role: "Director of Operations", company: "SpaceX", duration: "2021 — Present", desc: "Overseeing 120+ team members, driving throughput gains and operational cost reductions of $4.2M." }
    ]
  },
  {
    id: "awesome_cv_tech",
    name: "Awesome CV (LaTeX Tech)",
    category: "Software Series",
    accentColor: "#DC2626",
    atsScore: 99,
    candidateName: "Alice Hart",
    candidateTitle: "Senior Staff Engineer",
    location: "San Francisco, CA • alice.hart@email.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    summary: "Staff Engineer with 7+ years building cloud microservices & high-throughput APIs. Improved API throughput by 45% for 15M daily users.",
    skills: ["React 19 / Next.js", "TypeScript", "System Architecture", "AWS / Docker", "PostgreSQL"],
    experience: [
      { role: "Senior Full-Stack Engineer", company: "Stripe", duration: "2022 — Present", desc: "Architected distributed caching services handling 15M+ daily API requests with 99.99% uptime." }
    ]
  },
  {
    id: "creative_designer",
    name: "Creative Visual Designer",
    category: "Design Series",
    accentColor: "#7C3AED",
    atsScore: 96,
    candidateName: "Sophia Chen",
    candidateTitle: "Lead Product Designer",
    location: "New York, NY • sophia.design@email.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    summary: "Design leader with 6+ years creating end-to-end user experiences for SaaS products. Expert in design system architecture & data-driven UX.",
    skills: ["Figma Design Systems", "User Research", "UI Animation", "Design Tokens"],
    experience: [
      { role: "Lead Product Designer", company: "Linear", duration: "2021 — Present", desc: "Spearheaded design system redesign, reducing feature build cycles across engineering by 35%." }
    ]
  },
  {
    id: "corporate_split",
    name: "Corporate Split 2-Column",
    category: "Healthcare & Legal",
    accentColor: "#059669",
    atsScore: 97,
    candidateName: "Alex Ellison",
    candidateTitle: "Clinical Lead & Registered Nurse",
    location: "Chicago, IL • alex.ellison@email.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    summary: "Clinical nurse specialist with 6+ years in high-volume ICU environments. Experienced in bedside care, triage management, and patient advocacy.",
    skills: ["Patient Care", "Emergency Triage", "ICU / CCU Care", "BLS / ACLS Certified"],
    experience: [
      { role: "Nursing Supervisor", company: "St. Jude Medical", duration: "2020 — Present", desc: "Directing 18 nurses in fast-paced ICU unit while maintaining 99% patient satisfaction rating." }
    ]
  }
];

{/* Large Animated 3D World Globe Vector Background Component */}
function BackgroundLeftWorldGlobe() {
  return (
    <div className="absolute top-6 -left-28 sm:-left-36 md:-left-44 lg:-left-52 w-[420px] h-[420px] sm:w-[550px] sm:h-[550px] lg:w-[720px] lg:h-[720px] pointer-events-none z-0 opacity-20 sm:opacity-25 lg:opacity-30">
      
      {/* Ambient Pulsing Radial Aura behind Left Globe */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-500/10 to-transparent blur-3xl animate-pulse-slow" />

      {/* Rotating Dotted Global Wireframe SVG */}
      <svg 
        className="w-full h-full text-blue-600 animate-[spin_80s_linear_infinite]" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <ellipse cx="100" cy="100" rx="95" ry="38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.65" />
        <ellipse cx="100" cy="100" rx="38" ry="95" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.65" />
        <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <circle cx="100" cy="5" r="4" fill="#2563EB" />
        <circle cx="195" cy="100" r="4" fill="#3B82F6" />
        <circle cx="100" cy="195" r="4" fill="#10B981" />
        <circle cx="5" cy="100" r="4" fill="#6366F1" />
      </svg>

      <div className="absolute top-16 left-28 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 shadow-md text-blue-600 animate-float hidden sm:flex items-center gap-2 text-xs font-bold">
        <Globe className="w-4 h-4 text-blue-600 animate-spin-slow" />
        <span>50+ Countries</span>
      </div>

      <div className="absolute bottom-24 left-16 p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100 shadow-md text-emerald-600 animate-float-delayed hidden md:flex items-center gap-2 text-xs font-bold">
        <Navigation className="w-4 h-4 text-emerald-600" />
        <span>Global Remote Hire</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto Rotation Interval (3.5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SHOWCASE_TEMPLATES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeTemplate = SHOWCASE_TEMPLATES[slideIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-gray-200">
      
      {/* Mesh Grid & World Globe Vector Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <BackgroundLeftWorldGlobe />

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

          {/* ── RIGHT COLUMN: Auto-Rotating CV Template Showcase ── */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center">
            
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-purple-200/40 blur-2xl pointer-events-none" />

            {/* Top Auto-Changing Headline Badge */}
            <div className="mb-3.5 z-20 flex items-center justify-between w-full max-w-lg bg-slate-900/90 text-white px-4 py-2.5 rounded-2xl backdrop-blur-md border border-slate-800 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
                <span className="text-xs font-extrabold text-blue-300 uppercase tracking-wider">
                  Template #{slideIndex + 1}: {activeTemplate.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title={isPlaying ? "Pause rotation" : "Play rotation"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* REAL CV DOCUMENT PREVIEW CANVAS WITH BOTTOM-TO-TOP SLIDE ANIMATION */}
            <div className="relative w-full max-w-lg overflow-hidden">
              
              <div 
                key={activeTemplate.id}
                className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/80 space-y-5 text-left animate-in fade-in slide-in-from-bottom-8 duration-700"
              >
                
                {/* Header & Photo Badge */}
                <div className="flex justify-between items-start border-b pb-4 border-gray-200">
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">{activeTemplate.candidateName}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: activeTemplate.accentColor }}>
                      {activeTemplate.candidateTitle}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">{activeTemplate.location}</p>
                  </div>

                  {/* Candidate Avatar Photo Badge */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 blur-xs" />
                    <img
                      src={activeTemplate.avatar}
                      alt={activeTemplate.candidateName}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Professional Summary</p>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">{activeTemplate.summary}</p>
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Employment History</p>
                  {activeTemplate.experience.map((exp, idx) => (
                    <div key={idx} className="pl-3 border-l-2" style={{ borderColor: activeTemplate.accentColor }}>
                      <div className="flex justify-between text-xs font-bold text-gray-900">
                        <span>{exp.role}</span>
                        <span className="text-gray-400 text-[10px]">{exp.duration}</span>
                      </div>
                      <p className="text-[11px] font-semibold" style={{ color: activeTemplate.accentColor }}>{exp.company}</p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>

                {/* ── FLOATING LIVE BADGES ── */}

                {/* 1. ATS SCORE BADGE */}
                <div className="absolute -top-3 -left-3 z-20 bg-white rounded-2xl p-2 shadow-xl border border-gray-200 flex items-center gap-2 animate-float">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">
                    {activeTemplate.atsScore}%
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-900">Resume Score</p>
                    <p className="text-[9px] text-emerald-600 font-bold">Top 2% Candidate</p>
                  </div>
                </div>

                {/* 2. ATS PERFECT PILL */}
                <div className="absolute top-12 -right-3 z-20 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-1 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 animate-float-delayed">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>ATS Perfect</span>
                </div>

                {/* 3. ASK AI COACH BADGE */}
                <div className="absolute -bottom-3 -left-3 z-20 bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700 animate-float">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ask AI coach anything...</span>
                </div>

                {/* 4. SKILLS CHIPS */}
                <div className="absolute -bottom-5 -right-3 z-20 bg-white rounded-2xl p-2.5 shadow-xl border border-gray-200 space-y-1.5 min-w-[160px]">
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-900 border-b pb-1">
                    <span>Skills</span>
                    <span className="text-[9px] text-blue-600 font-semibold">{activeTemplate.skills.length} Listed</span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {activeTemplate.skills.slice(0, 3).map((s) => (
                      <span key={s} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-left">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex items-center justify-center gap-2 z-20">
              {SHOWCASE_TEMPLATES.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    slideIndex === idx ? "w-8 bg-blue-600 shadow-md shadow-blue-500/30" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  title={t.name}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
