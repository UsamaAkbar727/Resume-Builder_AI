"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, ShieldCheck, 
  FileText, CheckCircle2, Download, Upload,
  Zap, MousePointerClick, Globe, Navigation,
  Pause, Play
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
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-transparent blur-3xl animate-pulse-slow" />

      {/* Rotating Dotted Global Wireframe SVG */}
      <svg 
        className="w-full h-full text-amber-400/60 animate-[spin_80s_linear_infinite]" 
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
        <circle cx="100" cy="5" r="4" fill="#F59E0B" />
        <circle cx="195" cy="100" r="4" fill="#FBBF24" />
        <circle cx="100" cy="195" r="4" fill="#F59E0B" />
        <circle cx="5" cy="100" r="4" fill="#FCD34D" />
      </svg>

      <div className="absolute top-16 left-28 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-400/30 shadow-md text-amber-400 animate-float hidden sm:flex items-center gap-2 text-xs font-bold">
        <Globe className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <span>50+ Countries</span>
      </div>

      <div className="absolute bottom-24 left-16 p-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-400/30 shadow-md text-amber-400 animate-float-delayed hidden md:flex items-center gap-2 text-xs font-bold">
        <Navigation className="w-4 h-4 text-amber-400" />
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
    <section className="relative overflow-hidden bg-zinc-950 text-white pt-10 pb-20 md:pt-16 md:pb-28 border-b border-zinc-800">
      
      {/* Mesh Grid & World Globe Vector Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/10 via-yellow-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <BackgroundLeftWorldGlobe />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: High-Converting Headline & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <ScrollReveal variant="fade-up" delay={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                This resume builder gets you{" "}
                <span className="relative inline-block text-amber-400">
                  promoted
                  <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-amber-400/30 rounded-full" />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={60}>
              <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed">
                Only 2% of resumes win. Yours will be one of them.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal variant="fade-up" delay={120}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-base text-center shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create my resume <ArrowRight className="w-5 h-5 text-black" />
                </Link>

                <Link
                  href="/auth?mode=register"
                  className="px-7 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-amber-400 font-bold text-base text-center border border-amber-400/60 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-amber-400" /> Upload my resume
                </Link>
              </div>
            </ScrollReveal>

            {/* Micro Social Proof Badges */}
            <ScrollReveal variant="fade-up" delay={180}>
              <div className="space-y-2.5 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span><strong className="text-white font-extrabold">39%</strong> more likely to land the job</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span><strong className="text-white font-extrabold">Trustpilot</strong> 4.9 out of 5 | 55,912 reviews</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ── RIGHT COLUMN: PURE REAL CV TEMPLATE SHOWCASE ── */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center">
            
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/10 via-yellow-400/5 to-amber-300/10 blur-2xl pointer-events-none" />

            {/* Top Auto-Changing Template Name Header */}
            <div className="mb-3.5 z-20 flex items-center justify-between w-full max-w-lg bg-zinc-900/90 text-white px-4 py-2.5 rounded-2xl backdrop-blur-md border border-zinc-850 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                  Template #{slideIndex + 1}: {activeTemplate.name}
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-slate-350 transition-colors"
                title={isPlaying ? "Pause rotation" : "Play rotation"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* PRISTINE REAL CV DOCUMENT CANVAS WITH SMOOTH SLIDE ANIMATION */}
            <div className="relative w-full max-w-lg overflow-hidden">
              
              <div 
                key={activeTemplate.id}
                className="bg-zinc-900/95 text-zinc-100 rounded-3xl p-7 sm:p-9 shadow-2xl border border-zinc-800/80 space-y-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-700"
              >
                
                {/* CV Header & Candidate Avatar Photo */}
                <div className="flex justify-between items-start border-b pb-5 border-zinc-800">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{activeTemplate.candidateName}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: activeTemplate.accentColor === "#1E3A8A" ? "#F59E0B" : activeTemplate.accentColor }}>
                      {activeTemplate.candidateTitle}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">{activeTemplate.location}</p>
                  </div>

                  {/* Candidate Avatar Photo */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 blur-xs" />
                    <img
                      src={activeTemplate.avatar}
                      alt={activeTemplate.candidateName}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-zinc-900 shadow-md"
                    />
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Professional Summary</p>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">{activeTemplate.summary}</p>
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Employment History</p>
                  {activeTemplate.experience.map((exp, idx) => (
                    <div key={idx} className="pl-3 border-l-2" style={{ borderColor: activeTemplate.accentColor === "#1E3A8A" ? "#F59E0B" : activeTemplate.accentColor }}>
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{exp.role}</span>
                        <span className="text-zinc-500 text-[10px]">{exp.duration}</span>
                      </div>
                      <p className="text-[11px] font-semibold" style={{ color: activeTemplate.accentColor === "#1E3A8A" ? "#F59E0B" : activeTemplate.accentColor }}>{exp.company}</p>
                      <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Skills Chips */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Skills & Competencies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTemplate.skills.map((s) => (
                      <span key={s} className="bg-zinc-950 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-zinc-850">
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
                    slideIndex === idx ? "w-8 bg-amber-400 shadow-md shadow-amber-500/30" : "w-2.5 bg-zinc-800 hover:bg-zinc-700"
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
