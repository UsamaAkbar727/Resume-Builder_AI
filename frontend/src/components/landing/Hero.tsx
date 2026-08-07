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

// Real Showcase Templates for Auto-Rotating Right Side (Customized from User Screenshots)
const SHOWCASE_TEMPLATES = [
  {
    id: "husnain_yousaf",
    name: "Husnain Yousaf",
    category: "Graphic Designer",
    accentColor: "#0d3c33",
    atsScore: 98,
    candidateName: "Husnain Yousaf",
    candidateTitle: "Graphic Designer",
    location: "03137840221",
    email: "husnainy258@gmail.com",
    secEmail: "contacthusnainyousaf@email.com",
    address: "P-31 Quzafi Bad St No.1 Satyana road FSD",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    summary: "I'm a creative Graphic Designer with expertise in branding, digital design, and visual communication, passionate about delivering innovative solutions.",
    skills: [
      { name: "Social Media Posts", level: "90%" },
      { name: "Banners", level: "75%" },
      { name: "LinkedIn Graphics", level: "85%" },
      { name: "Blog Visuals", level: "88%" }
    ],
    education: [
      { school: "Eagle Eye Incubation Center", degree: "EEIC Degree in Graphic Designer", duration: "2024 - 2025" },
      { school: "Eagle Eye Incubation Center", degree: "Master's Degree In Graphic Designer", duration: "2024 - 2025" }
    ],
    awards: [
      { school: "Eagle Eye Incubation Center", title: "First CERTIFICATE", duration: "2025" }
    ],
    experience: [
      { role: "Graphic Designer Internship", company: "Brandclickx.com (2024 - 2025)", desc: ["Creating Visual Designs", "Collaborating with Teams"] },
      { role: "Junior Graphic Designer", company: "Brandclickx.com (2024 - 2025)", desc: ["Design Creation", "Revising and Editing"] },
      { role: "Senior Graphic Designer", company: "Brandclickx.com (2024 - 2025)", desc: ["Leading Design Projects", "Mentoring Junior Designers"] }
    ]
  },
  {
    id: "usama_akbar",
    name: "Usama Akbar",
    category: "Full-Stack Web Developer",
    accentColor: "#967b66",
    atsScore: 99,
    candidateName: "USAMA AKBAR",
    candidateTitle: "Full-Stack Web Developer",
    location: "+92 3098643058",
    address: "Jahanian, Punjab, Pakistan",
    email: "usamaakbarjaatt@gmail.com",
    github: "https://github.com/UsamaAkbar727",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
    summary: "I am a passionate full-stack web developer experienced in building modern, responsive, and scalable web applications. I work with technologies including HTML, CSS, JavaScript, React.js, Bootstrap, Tailwind CSS, Node.js, Express.js, PHP, MySQL, and MongoDB to develop complete web solutions.",
    skills: ["Frontend & Backend Development", "Programming Languages", "Database Management", "GitHub & Version Control", "Responsive Web Design"],
    education: [
      { school: "Secondary School (Science)", degree: "Government High School, Jahanian, Punjab", duration: "Completed: 2018" },
      { school: "Intermediate", degree: "Government Degree College, Jahanian, Punjab", duration: "Completed: 2020" },
      { school: "Bachelor of Computer Science", degree: "Bahauddin Zakariya University (BZU), Multan", duration: "Graduated: 2024" }
    ],
    experience: [
      { role: "Junior Web Developer (Intern)", company: "Career Institute, Faisalabad", duration: "January 2024 - August 2025", desc: ["Designed and developed responsive web pages and small-scale applications using HTML, CSS, Bootstrap, JavaScript, PHP, and Laravel.", "Assisted in building full-stack solutions with clean, maintainable code practices.", "Partnered with senior developers to implement and refine frontend and backend features.", "Worked with MySQL databases for data management and query optimization.", "Integrated and tested RESTful APIs to connect frontend interfaces with backend services."] },
      { role: "Full Stack Web Developer", company: "Optify Studio Software House, Multan", duration: "February 2025 - Present", desc: ["Engineered web applications with React.js, Node.js, Express.js, and MongoDB.", "Developed dynamic features and optimized scalable backend APIs.", "Integrated RESTful APIs and external services for added functionality.", "Designed efficient MongoDB databases for data storage and retrieval.", "Collaborated in agile teams, using GitHub for version control and deployment."] }
    ]
  },
  {
    id: "sahib_khan",
    name: "Sahib Khan",
    category: "Graphic Designer",
    accentColor: "#582f60",
    atsScore: 97,
    candidateName: "SAHIB KHAN",
    candidateTitle: "Graphic Designer",
    location: "+91 8054400000",
    email: "24billions@mail.com",
    address: "New Delhi, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    summary: "Enthusiastic individual eager to start a promising career. Looking for an entry-level position where I can contribute positively to a team and gain valuable experience, whether it's in sales, administration, or any other field.",
    skills: ["Communication Skills", "Teamwork", "Adaptability", "Problem Solving", "Time Management", "Organizational Skills", "Initiative", "Dependability", "Positive Attitude"],
    techSkills: ["Computer Skills", "Internet Browsing", "Email Communication", "File Management"],
    languages: ["Hindi", "English", "French"],
    hobbies: ["Reading Books", "Sports and Fitness", "Music", "Cooking"],
    education: [
      { school: "Bachelor of Technology in Computer Science", degree: "Sunshine Engineering College, Mumbai, Maharashtra", duration: "May 2022" },
      { school: "Higher Secondary Education (12th Grade)", degree: "Golden Valley Senior Secondary School, Pune, Maharashtra", duration: "May 2018" },
      { school: "Secondary Education (10th Grade)", degree: "Bright Horizon Middle School, Pune, Maharashtra", duration: "May 2016" }
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

          {/* ── RIGHT COLUMN: PURE REAL CV TEMPLATE SHOWCASE (REDESIGNED PREMIUM SaaS WORKSPACE) ── */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center w-full">
            
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/10 via-yellow-450/5 to-amber-300/10 blur-2xl pointer-events-none" />

            {/* Redesigned template tracker header */}
            <div className="mb-4 z-20 flex items-center justify-between w-full max-w-lg bg-zinc-900/90 text-white px-4 py-2.5 rounded-2xl backdrop-blur-md border border-zinc-800/80 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-black text-amber-350 uppercase tracking-widest">
                  Live Showcase: {activeTemplate.name}
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-zinc-800/60"
                title={isPlaying ? "Pause rotation" : "Play rotation"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 1: ATS SCORE METER (TOP-RIGHT OVERLAPPING) */}
            <div className="absolute -top-5 -right-2 sm:-right-4 z-25 bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 text-white rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-3.5 animate-float max-w-[170px]">
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="#27272a" strokeWidth="2.5" fill="transparent" />
                  <circle 
                    cx="20" 
                    cy="20" 
                    r="16" 
                    stroke="#F59E0B" 
                    strokeWidth="2.5" 
                    fill="transparent"
                    strokeDasharray="100.5" 
                    strokeDashoffset={100.5 * (1 - activeTemplate.atsScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute text-[10px] font-black">{activeTemplate.atsScore}%</span>
              </div>
              <div className="min-w-0">
                <p className="text-[8px] font-black text-amber-400 uppercase tracking-widest leading-none">ATS Score</p>
                <p className="text-[10px] font-black text-white mt-1 truncate">Excellent Match</p>
              </div>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 2: AI AUDIT CHECKLIST (MID-LEFT OVERLAPPING) */}
            <div className="absolute top-1/4 -left-4 sm:-left-8 z-25 bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 text-white rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-2 animate-float-delayed max-w-[180px] hidden sm:block">
              <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[8px] font-black uppercase tracking-wider text-zinc-400">AI Checklist</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-300">Action Verbs (+12%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-300">Metrics Quantified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-300">No Clichés Found</span>
                </div>
              </div>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 3: EXPORT STATUS (BOTTOM-LEFT OVERLAPPING) */}
            <div className="absolute bottom-10 -left-2 sm:-left-6 z-25 bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 text-white rounded-2xl px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-2.5 animate-float">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 leading-none">Status</span>
                <span className="text-[10px] font-black text-zinc-200 mt-0.5">LaTeX Export Ready</span>
              </div>
            </div>

            {/* Redesigned Premium Editor Window Frame */}
            <div className="relative w-full max-w-lg bg-zinc-900/90 border border-zinc-800/80 rounded-3xl shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col z-10">
              
              {/* Editor Tab Bar & Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-850/80 px-4 py-3 bg-zinc-950/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/30" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/30" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/30" />
                </div>
                
                <div className="flex items-center gap-1 bg-zinc-950/65 px-3 py-1 rounded-lg border border-zinc-800 text-[10px] text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>resumeflow.ai/editor</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-black uppercase text-amber-400 tracking-wide bg-amber-450/10 px-2 py-0.5 rounded border border-amber-450/20">
                    Live Preview
                  </span>
                </div>
              </div>

              {/* Editor Canvas Area */}
              <div className="p-4 sm:p-6 bg-zinc-950/25 relative">
                
                {/* Crisp Printable Resume Sheet */}
                <div 
                  key={activeTemplate.id}
                  className="bg-white text-slate-800 rounded-2xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.3)] border border-slate-100 space-y-4 sm:space-y-5 text-left animate-in fade-in slide-in-from-bottom-6 duration-500 relative overflow-hidden"
                >
                  {/* Decorative faint background pattern for paper feel */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none rounded-2xl" />

                  {/* CV Header & Candidate Avatar Photo */}
                  <div className="flex justify-between items-start border-b pb-4 border-slate-100 relative z-10">
                    <div className="space-y-0.5">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">{activeTemplate.candidateName}</h3>
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-2.5" style={{ color: activeTemplate.accentColor }}>
                        {activeTemplate.candidateTitle}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{activeTemplate.location}</p>
                    </div>

                    {/* Candidate Photo */}
                    <div className="relative shrink-0">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-450 to-amber-300 blur-xs" />
                      <img
                        src={activeTemplate.avatar}
                        alt={activeTemplate.candidateName}
                        className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Profile Summary */}
                  <div className="space-y-1 relative z-10">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Professional Summary</p>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-normal">{activeTemplate.summary}</p>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-2.5 relative z-10">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Employment History</p>
                    {activeTemplate.experience.map((exp, idx) => (
                      <div key={idx} className="pl-3 border-l-2" style={{ borderColor: activeTemplate.accentColor }}>
                        <div className="flex justify-between text-[11px] font-bold text-slate-800 leading-none">
                          <span>{exp.role}</span>
                          <span className="text-slate-400 text-[9px] font-medium">{exp.duration}</span>
                        </div>
                        <p className="text-[10px] font-semibold mt-0.5" style={{ color: activeTemplate.accentColor }}>{exp.company}</p>
                        <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{exp.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 relative z-10">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Skills & Competencies</p>
                    <div className="flex flex-wrap gap-1">
                      {activeTemplate.skills.map((s) => (
                        <span 
                          key={s} 
                          className="bg-slate-50 text-slate-700 text-[9px] font-bold px-2.5 py-0.5 rounded-md border border-slate-150 transition-all hover:bg-slate-100 hover:text-slate-900"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
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
                    slideIndex === idx ? "w-8 bg-amber-400 shadow-md shadow-amber-500/30" : "w-2.5 bg-zinc-800 hover:bg-zinc-750"
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
