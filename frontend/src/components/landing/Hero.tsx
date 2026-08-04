"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Star, Sparkles, ShieldCheck, 
  FileText, CheckCircle2, Download, Upload,
  Zap, MousePointerClick, Globe, Compass, Navigation, MapPin
} from "lucide-react";
import { ScrollReveal } from "./Animations";

// Role demo content for real-time interactive preview
const roleDemos = {
  software: {
    name: "Alex Morgan",
    title: "Senior Full-Stack Engineer",
    location: "San Francisco, CA • alex.morgan@email.com",
    summary: "Senior Engineer with 7+ years of experience building high-scale cloud services and responsive UI applications. Proven track record of improving system latency by 45% and leading cross-functional teams.",
    atsScore: 98,
    templateName: "Executive Tech",
    skills: ["React 19 / Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS / Docker", "System Architecture"],
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Stripe",
        period: "2022 — Present",
        bullets: [
          "Architected distributed microservices handling 15M+ daily API requests with 99.99% uptime.",
          "Reduced frontend p99 load times by 48% by optimizing bundle sizes and implementing server components.",
          "Mentored 6 junior engineers and established automated CI/CD deployment pipelines."
        ]
      },
      {
        role: "Full-Stack Developer",
        company: "Vercel",
        period: "2019 — 2022",
        bullets: [
          "Developed core dashboard features used by over 2M global developers.",
          "Integrated Stripe billing system resulting in +28% increase in self-serve enterprise conversions."
        ]
      }
    ]
  },
  design: {
    name: "Sophia Chen",
    title: "Lead Product Designer",
    location: "New York, NY • sophia.design@email.com",
    summary: "Design leader with 6+ years creating end-to-end user experiences for SaaS products. Expert in design system architecture, rapid interactive prototyping, and data-driven UX optimization.",
    atsScore: 96,
    templateName: "Modern Minimalist",
    skills: ["Figma Design Systems", "User Research", "Prototyping", "UI Animation", "HTML/CSS", "Design Tokens"],
    experience: [
      {
        role: "Lead Product Designer",
        company: "Linear",
        period: "2021 — Present",
        bullets: [
          "Spearheaded multi-platform design system redesign, reducing feature build cycles across engineering by 35%.",
          "Conducted 40+ user testing sessions to optimize core workflow, lifting weekly active user retention by 22%.",
          "Collaborated directly with founders to define product vision and visual brand identity."
        ]
      },
      {
        role: "Senior UX Designer",
        company: "Figma",
        period: "2018 — 2021",
        bullets: [
          "Designed collaborative canvas tools used daily by 500k+ design professionals.",
          "Created accessibility component guidelines meeting WCAG 2.1 AA standards across all web apps."
        ]
      }
    ]
  },
  pm: {
    name: "Marcus Vance",
    title: "Principal Product Manager",
    location: "Austin, TX • marcus.vance@email.com",
    summary: "Product strategist with 8+ years scaling B2B SaaS products from zero to $10M+ ARR. Skilled in product-led growth (PLG), cross-functional roadmap execution, and quantitative analytics.",
    atsScore: 97,
    templateName: "Corporate Leader",
    skills: ["PLG Growth Strategy", "Roadmap Execution", "SQL / Mixpanel", "A/B Testing", "Agile / Scrum", "User Acquisition"],
    experience: [
      {
        role: "Principal Product Manager",
        company: "Notion",
        period: "2022 — Present",
        bullets: [
          "Owned self-serve team onboard growth funnel, driving +34% MoM conversion and $3.2M in new expansion ARR.",
          "Launched enterprise workspace governance tools adopted by 450+ Fortune 500 enterprise customers.",
          "Managed roadmap for a cross-functional team of 14 engineers, 3 designers, and 2 data analysts."
        ]
      },
      {
        role: "Senior Product Manager",
        company: "Atlassian",
        period: "2019 — 2022",
        bullets: [
          "Led Jira team productivity feature launch, increasing daily active user engagement by 26%.",
          "Executed global pricing experiment that boosted average revenue per account (ARPA) by 18%."
        ]
      }
    ]
  }
};

const colorAccents = [
  { id: "blue", hex: "#2563EB", bgClass: "bg-blue-600", borderClass: "border-blue-600", lightBg: "bg-blue-50", textClass: "text-blue-600" },
  { id: "navy", hex: "#1E293B", bgClass: "bg-slate-800", borderClass: "border-slate-800", lightBg: "bg-slate-100", textClass: "text-slate-800" },
  { id: "emerald", hex: "#059669", bgClass: "bg-emerald-600", borderClass: "border-emerald-600", lightBg: "bg-emerald-50", textClass: "text-emerald-600" },
  { id: "violet", hex: "#7C3AED", bgClass: "bg-violet-600", borderClass: "border-violet-600", lightBg: "bg-violet-50", textClass: "text-violet-600" },
  { id: "rose", hex: "#E11D48", bgClass: "bg-rose-600", borderClass: "border-rose-600", lightBg: "bg-rose-50", textClass: "text-rose-600" }
];

{/* Large Animated World Globe Vector Background Component */}
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

  const current = roleDemos[activeRole];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/70 pt-10 pb-20 md:pt-14 md:pb-28 border-b border-gray-200/80">
      
      {/* ── Premium Background Animations ── */}
      
      {/* 1. Interactive Mesh Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none z-0" />
      
      {/* 2. Top Centered Soft Aura Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-100/50 via-indigo-100/20 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* 3. Floating Ambient Animated Color Blobs (Pulsing) */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-300/15 to-purple-300/10 blur-3xl animate-float pointer-events-none z-0" />
      <div className="absolute top-20 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-indigo-300/20 via-blue-200/15 to-emerald-200/10 blur-3xl animate-float-delayed pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow pointer-events-none z-0" />

      {/* 4. Left Side Big World / Globe Background Animation */}
      <BackgroundLeftWorldGlobe />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          
          {/* Social Proof Badge */}
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm mb-6 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex -space-x-1.5 items-center">
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">A</span>
                <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">M</span>
                <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">S</span>
              </div>
              <div className="flex items-center text-amber-400 gap-0.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-gray-900 font-bold">4.9/5</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">Trusted by 50,000+ Job Seekers Worldwide</span>
            </div>
          </ScrollReveal>

          {/* Clean Commercial Title */}
          <ScrollReveal variant="fade-up" delay={60}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12] mb-6 text-balance">
              Only 2% of resumes pass the first round. <br className="hidden sm:inline" />
              <span className="text-gradient-primary">Yours will be one of them.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal variant="fade-up" delay={120}>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal text-balance">
              Create professional, ATS-optimized resumes in 5 minutes with AI assistance. Crafted to get you noticed by top recruiters and land 3x more interview callbacks.
            </p>
          </ScrollReveal>

          {/* Call to Actions */}
          <ScrollReveal variant="fade-up" delay={180}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link 
                href="/auth?mode=register" 
                className="btn-blue w-full sm:w-auto px-8 py-4 text-base font-bold justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all"
              >
                Create My Resume Free <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <Link 
                href="/auth?mode=register" 
                className="btn-outline w-full sm:w-auto px-7 py-4 text-base font-semibold justify-center bg-white/90 backdrop-blur-sm hover:bg-gray-50 text-gray-800 border-gray-300"
              >
                <Upload className="w-4 h-4 text-gray-500 mr-1" /> Import Existing Resume
              </Link>
            </div>
          </ScrollReveal>

          {/* Micro Trust Bullets */}
          <ScrollReveal variant="fade-up" delay={240}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> No credit card required
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> 100% ATS Parsing Guarantee
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Free PDF & Word Export
              </span>
            </div>
          </ScrollReveal>

        </div>

        {/* ── Interactive Live Resume Editor Showcase ── */}
        <ScrollReveal variant="fade-up" delay={300}>
          <div className="relative max-w-5xl mx-auto">
            
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-200/50 via-indigo-100/40 to-slate-200/50 blur-2xl opacity-70 pointer-events-none" />

            {/* Main Interactive App Container */}
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              
              {/* Interactive Header Toolbar */}
              <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                
                {/* Left: Window Dots & App Status */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Live Builder Studio
                  </span>
                </div>

                {/* Center: Role Switcher Tabs */}
                <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                  <span className="hidden md:inline-block text-[10px] text-slate-400 uppercase font-bold px-2 tracking-wider">
                    Role:
                  </span>
                  {(["software", "design", "pm"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRole(r)}
                      className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        activeRole === r 
                          ? "bg-blue-600 text-white shadow-sm font-semibold" 
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {r === "software" ? "Software Eng" : r === "design" ? "Product Design" : "Product Mgmt"}
                    </button>
                  ))}
                </div>

                {/* Right: Accent Color Picker */}
                <div className="flex items-center gap-2">
                  <span className="hidden lg:inline-block text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Theme Accent:
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                    {colorAccents.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => setActiveAccent(acc)}
                        title={`Switch accent to ${acc.id}`}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${acc.bgClass} ${
                          activeAccent.id === acc.id ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900" : "hover:scale-110 opacity-70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Resume Document Studio Workspace */}
              <div className="bg-slate-100 p-4 sm:p-8 md:p-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* FLOATING BADGE 1: ATS Live Score */}
                <div className="absolute top-6 right-6 lg:right-10 z-20 bg-white rounded-xl p-3 shadow-lg border border-gray-200 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-black text-sm">
                    {current.atsScore}%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      ATS Verified <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[11px] text-gray-500">Greenhouse & Workday Ready</div>
                  </div>
                </div>

                {/* FLOATING BADGE 2: AI Bullet Enhancer */}
                <div className="absolute bottom-6 left-6 lg:left-10 z-20 bg-white rounded-xl p-3 shadow-lg border border-gray-200 items-center gap-3 hidden md:flex">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      AI Action Verbs Active
                    </div>
                    <div className="text-[11px] text-gray-500">+45% Quantified Impact Score</div>
                  </div>
                </div>

                {/* REAL RESUME DOCUMENT PREVIEW CANVAS (A4 Paper Style) */}
                <div className="lg:col-span-12 bg-white rounded-lg shadow-xl border border-gray-200/80 p-6 sm:p-10 text-gray-800 font-sans max-w-3xl mx-auto w-full transition-all">
                  
                  {/* Resume Header Banner with Active Accent */}
                  <div className="border-b pb-6 mb-6" style={{ borderColor: activeAccent.hex }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                          {current.name}
                        </h2>
                        <p className="text-base font-bold mt-1" style={{ color: activeAccent.hex }}>
                          {current.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {current.location}
                        </p>
                      </div>
                      
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> PDF Clean Format
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Match Score: 98%
                        </span>
                      </div>
                    </div>

                    {/* Professional Summary */}
                    <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-900 block mb-0.5">Professional Profile:</span>
                      {current.summary}
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeAccent.hex }} />
                      Core Competencies & Keywords
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {current.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md border text-gray-700 bg-gray-50 border-gray-200 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeAccent.hex }} />
                      Work Experience
                    </h3>

                    <div className="space-y-5">
                      {current.experience.map((exp, idx) => (
                        <div key={idx} className="relative pl-4 border-l-2" style={{ borderColor: idx === 0 ? activeAccent.hex : "#E2E8F0" }}>
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <span className="text-sm font-bold text-gray-900">{exp.role}</span>
                            <span className="text-xs font-semibold text-gray-400">{exp.period}</span>
                          </div>
                          <div className="text-xs font-semibold mb-2" style={{ color: activeAccent.hex }}>
                            {exp.company}
                          </div>
                          <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside leading-relaxed">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-gray-700">
                                <span className={bIdx === 0 ? "bg-amber-50 text-gray-900 px-1 py-0.5 rounded font-medium border border-amber-200/60" : ""}>
                                  {b}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Interactive Toolbar Footer */}
              <div className="bg-slate-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2 font-medium">
                  <MousePointerClick className="w-4 h-4 text-blue-600" />
                  <span>Click role tabs or theme accents above to test live customization</span>
                </div>
                <div className="flex items-center gap-3 font-semibold">
                  <span className="text-gray-400">Export Ready:</span>
                  <Link href="/auth?mode=register" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-bold">
                    <Download className="w-4 h-4" /> Download This Resume PDF →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>

    </section>
  );
}
