"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, ShieldCheck, 
  FileText, CheckCircle2, Download, Upload,
  Zap, MousePointerClick, Globe, Navigation, MessageSquare, Plus
} from "lucide-react";
import { ScrollReveal } from "./Animations";

// Role demo content for real-time interactive preview
const roleDemos = {
  software: {
    name: "Alice Hart",
    title: "Senior Software Engineer",
    location: "San Francisco, CA • alice.hart@email.com",
    summary: "Senior Full-Stack Engineer with 7+ years building cloud services & responsive UIs. Improved API throughput by 45% and mentored 8 developers.",
    atsScore: 98,
    skills: ["React 19 / Next.js", "TypeScript", "Node.js", "System Architecture", "AWS / Docker"],
    experience: [
      {
        role: "Senior Full-Stack Engineer",
        company: "Stripe",
        period: "2022 — Present",
        description: "Architected distributed microservices handling 15M+ daily API requests with 99.99% uptime."
      },
      {
        role: "Frontend Engineer",
        company: "Vercel",
        period: "2019 — 2022",
        description: "Reduced p99 page load latency by 48% by optimizing bundle sizes and implementing server components."
      }
    ]
  },
  design: {
    name: "Sophia Chen",
    title: "Lead Product Designer",
    location: "New York, NY • sophia.design@email.com",
    summary: "Design leader with 6+ years creating end-to-end user experiences for SaaS products. Expert in design system architecture & data-driven UX.",
    atsScore: 96,
    skills: ["Figma Design Systems", "User Research", "UI Animation", "Design Tokens", "HTML/CSS"],
    experience: [
      {
        role: "Lead Product Designer",
        company: "Linear",
        period: "2021 — Present",
        description: "Spearheaded multi-platform design system redesign, reducing feature build cycles across engineering by 35%."
      }
    ]
  },
  pm: {
    name: "Marcus Vance",
    title: "Principal Product Manager",
    location: "Austin, TX • marcus.vance@email.com",
    summary: "Product strategist with 8+ years scaling B2B SaaS products from zero to $10M+ ARR. Skilled in product-led growth (PLG) & roadmap execution.",
    atsScore: 97,
    skills: ["PLG Growth Strategy", "Roadmap Execution", "A/B Testing", "Agile / Scrum"],
    experience: [
      {
        role: "Principal Product Manager",
        company: "Notion",
        period: "2022 — Present",
        description: "Owned self-serve team onboard growth funnel, driving +34% MoM conversion and $3.2M expansion ARR."
      }
    ]
  }
};

const colorAccents = [
  { id: "blue", hex: "#2563EB", bgClass: "bg-blue-600" },
  { id: "emerald", hex: "#059669", bgClass: "bg-emerald-600" },
  { id: "violet", hex: "#7C3AED", bgClass: "bg-violet-600" },
  { id: "rose", hex: "#E11D48", bgClass: "bg-rose-600" }
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
        {/* Outer Orbit Circles */}
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.3" />

        {/* Latitudes & Longitudes Wireframe */}
        <ellipse cx="100" cy="100" rx="95" ry="38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.65" />
        <ellipse cx="100" cy="100" rx="38" ry="95" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.65" />
        <ellipse cx="100" cy="100" rx="95" ry="70" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.45" />
        <ellipse cx="100" cy="100" rx="70" ry="95" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.45" />
        <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

        {/* Global Network Nodes & Connection Lines */}
        <line x1="45" y1="65" x2="135" y2="40" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
        <line x1="135" y1="40" x2="155" y2="120" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
        <line x1="155" y1="120" x2="65" y2="155" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
        <line x1="65" y1="155" x2="45" y2="65" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />

        {/* Glowing Network Location Pins/Nodes */}
        <circle cx="100" cy="5" r="4" fill="#2563EB" />
        <circle cx="195" cy="100" r="4" fill="#3B82F6" />
        <circle cx="100" cy="195" r="4" fill="#10B981" />
        <circle cx="5" cy="100" r="4" fill="#6366F1" />

        <circle cx="45" cy="65" r="3.5" fill="#2563EB" />
        <circle cx="135" cy="40" r="3.5" fill="#6366F1" />
        <circle cx="155" cy="120" r="3.5" fill="#10B981" />
        <circle cx="65" cy="155" r="3.5" fill="#F59E0B" />
        <circle cx="100" cy="100" r="4.5" fill="#2563EB" />
      </svg>

      {/* Floating Auxiliary World Badges on Left Background */}
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
  const [activeRole, setActiveRole] = useState<"software" | "design" | "pm">("software");
  const [activeAccent, setActiveAccent] = useState(colorAccents[0]);
  const [activeSkills, setActiveSkills] = useState(["Management Skills", "Analytical Thinking", "Leadership"]);

  const current = roleDemos[activeRole];

  const handleAddSkill = () => {
    const skills = ["Strategic Planning", "Data Analysis", "System Design", "Agile / Scrum"];
    const nextSkill = skills[activeSkills.length % skills.length];
    if (!activeSkills.includes(nextSkill)) {
      setActiveSkills([...activeSkills, nextSkill]);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-gray-200">
      
      {/* ── Background Mesh Grid & World Globe Vector ── */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* 3D Animated World Globe on Left Background */}
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

          {/* ── RIGHT COLUMN: High-Fidelity Interactive Showcase Studio ── */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Outer Glow Halo Frame */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-purple-200/40 blur-2xl pointer-events-none" />

            {/* Main Interactive App Frame */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
              
              {/* Studio Toolbar Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-2 border-b border-slate-800">
                
                {/* Role Switcher */}
                <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                  {(["software", "design", "pm"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRole(r)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeRole === r 
                          ? "bg-blue-600 text-white shadow-xs" 
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {r === "software" ? "Engineering" : r === "design" ? "UI/UX" : "Product"}
                    </button>
                  ))}
                </div>

                {/* Theme Color Selector */}
                <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
                  {colorAccents.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setActiveAccent(acc)}
                      className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${acc.bgClass} ${
                        activeAccent.id === acc.id ? "scale-125 ring-2 ring-white" : "opacity-70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Document Canvas Area */}
              <div className="p-6 bg-slate-50 relative space-y-5 text-left">
                
                {/* Header & Photo Badge */}
                <div className="flex justify-between items-start border-b pb-4 border-gray-200">
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">{current.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: activeAccent.hex }}>
                      {current.title}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">{current.location}</p>
                  </div>

                  {/* Candidate Avatar Photo Badge */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 blur-xs" />
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                      alt={current.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Professional Profile</p>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">{current.summary}</p>
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Employment History</p>
                  {current.experience.map((exp, idx) => (
                    <div key={idx} className="pl-3 border-l-2" style={{ borderColor: activeAccent.hex }}>
                      <div className="flex justify-between text-xs font-bold text-gray-900">
                        <span>{exp.role}</span>
                        <span className="text-gray-400 text-[10px]">{exp.period}</span>
                      </div>
                      <p className="text-[11px] font-semibold" style={{ color: activeAccent.hex }}>{exp.company}</p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* ── FLOATING INTERACTIVE BADGES ── */}

                {/* 1. ATS SCORE BADGE */}
                <div className="absolute -top-3 -left-3 z-20 bg-white rounded-2xl p-2 shadow-xl border border-gray-200 flex items-center gap-2 animate-float">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">
                    {current.atsScore}%
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

                {/* 4. INTERACTIVE SKILLS DROPDOWN */}
                <div className="absolute -bottom-5 -right-3 z-20 bg-white rounded-2xl p-2.5 shadow-xl border border-gray-200 space-y-1.5 min-w-[150px]">
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-900 border-b pb-1">
                    <span>Skills</span>
                    <span className="text-[9px] text-blue-600 font-semibold">{activeSkills.length} Added</span>
                  </div>
                  <div className="flex flex-col gap-1 text-[10px]">
                    {activeSkills.map((s) => (
                      <span key={s} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-left">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleAddSkill}
                    className="w-full py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[10px] rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add skill
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
