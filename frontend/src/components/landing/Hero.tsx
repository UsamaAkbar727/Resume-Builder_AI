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

interface BaseTemplate {
  id: string;
  name: string;
  category: string;
  accentColor: string;
  atsScore: number;
  candidateName: string;
  candidateTitle: string;
  location: string;
  address: string;
  email: string;
  avatar: string;
  summary: string;
  education: { school: string; degree: string; duration: string }[];
}

interface HusnainTemplate extends BaseTemplate {
  id: "husnain_yousaf";
  secEmail: string;
  skills: { name: string; level: string }[];
  awards: { school: string; title: string; duration: string }[];
  experience: { role: string; company: string; desc: string[] }[];
}

interface UsamaTemplate extends BaseTemplate {
  id: "usama_akbar";
  github: string;
  skills: string[];
  experience: { role: string; company: string; duration: string; desc: string[] }[];
}

interface SahibTemplate extends BaseTemplate {
  id: "sahib_khan";
  skills: string[];
  techSkills: string[];
  languages: string[];
  hobbies: string[];
}

type ShowcaseTemplate = HusnainTemplate | UsamaTemplate | SahibTemplate;

// Real Showcase Templates for Auto-Rotating Right Side (Customized from User Screenshots)
const SHOWCASE_TEMPLATES: ShowcaseTemplate[] = [
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
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/5 to-transparent blur-3xl animate-pulse-slow" />

      {/* Rotating Dotted Global Wireframe SVG */}
      <svg 
        className="w-full h-full text-indigo-400/30 animate-[spin_80s_linear_infinite]" 
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
        <circle cx="100" cy="5" r="4" fill="#6366F1" />
        <circle cx="195" cy="100" r="4" fill="#8B5CF6" />
        <circle cx="100" cy="195" r="4" fill="#6366F1" />
        <circle cx="5" cy="100" r="4" fill="#06B6D4" />
      </svg>

      <div className="absolute top-16 left-28 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-lg text-indigo-600 animate-float hidden sm:flex items-center gap-2 text-xs font-bold z-10">
        <Globe className="w-4 h-4 text-indigo-600 animate-spin-slow" />
        <span>50+ Countries</span>
      </div>

      <div className="absolute bottom-24 left-16 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-lg text-indigo-600 animate-float-delayed hidden md:flex items-center gap-2 text-xs font-bold z-10">
        <Navigation className="w-4 h-4 text-indigo-600" />
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
    <section className="relative overflow-hidden bg-[#fbfbfc] text-zinc-900 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-zinc-100">
      
      {/* Mesh Grid & World Globe Vector Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 via-violet-500/3 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <BackgroundLeftWorldGlobe />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: High-Converting Headline & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <ScrollReveal variant="fade-up" delay={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.12] font-display">
                This resume builder gets you{" "}
                <span className="relative inline-block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent pb-1">
                  promoted
                  <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-indigo-500/10 rounded-full" />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={60}>
              <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed">
                Only 2% of resumes win. Yours will be one of them.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal variant="fade-up" delay={120}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 font-display">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-base text-center shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create my resume <ArrowRight className="w-5 h-5 text-white" />
                </Link>

                <Link
                  href="/auth?mode=register"
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-base text-center border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-zinc-600" /> Upload my resume
                </Link>
              </div>
            </ScrollReveal>

            {/* Micro Social Proof Badges */}
            <ScrollReveal variant="fade-up" delay={180}>
              <div className="space-y-2.5 pt-4 border-t border-zinc-200/80">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-650 text-zinc-600">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span><strong className="text-zinc-900 font-extrabold">39%</strong> more likely to land the job</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-650 text-zinc-600">
                  <div className="flex items-center text-indigo-600 gap-0.5">
                    <Star className="w-4 h-4 fill-current animate-pulse-slow" />
                    <Star className="w-4 h-4 fill-current animate-pulse-slow" />
                    <Star className="w-4 h-4 fill-current animate-pulse-slow" />
                    <Star className="w-4 h-4 fill-current animate-pulse-slow" />
                    <Star className="w-4 h-4 fill-current animate-pulse-slow" />
                  </div>
                  <span><strong className="text-zinc-900 font-extrabold">Trustpilot</strong> 4.9 out of 5 | 55,912 reviews</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ── RIGHT COLUMN: PURE REAL CV TEMPLATE SHOWCASE (REDESIGNED PREMIUM SaaS WORKSPACE) ── */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center w-full">
            
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-violet-500/3 to-cyan-500/3 blur-2xl pointer-events-none" />

            {/* Redesigned template tracker header */}
            <div className="mb-4 z-20 flex items-center justify-between w-full max-w-lg bg-white/95 text-zinc-900 px-4 py-2.5 rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/25">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-display">
                  Live Showcase: {activeTemplate.name}
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-zinc-200"
                title={isPlaying ? "Pause rotation" : "Play rotation"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 1: ATS SCORE METER */}
            <div className="absolute -top-5 -right-2 sm:-right-4 z-25 bg-white/95 backdrop-blur-md border border-zinc-200/80 text-zinc-900 rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center gap-3.5 animate-float max-w-[170px]">
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="#f4f4f5" strokeWidth="2.5" fill="transparent" />
                  <circle 
                    cx="20" 
                    cy="20" 
                    r="16" 
                    stroke="#4f46e5" 
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
                <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest leading-none font-display">ATS Score</p>
                <p className="text-[10px] font-black text-zinc-800 mt-1 truncate">Excellent Match</p>
              </div>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 2: AI AUDIT CHECKLIST */}
            <div className="absolute top-1/4 -left-4 sm:-left-8 z-25 bg-white/95 backdrop-blur-md border border-zinc-200/80 text-zinc-900 rounded-2xl p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-2 animate-float-delayed max-w-[180px] hidden sm:block">
              <div className="flex items-center gap-1.5 border-b border-zinc-100 pb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-650 text-indigo-600" />
                <span className="text-[8px] font-black uppercase tracking-wider text-zinc-400 font-display">AI Checklist</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-600">Action Verbs (+12%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-600">Metrics Quantified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[7px]">✓</div>
                  <span className="text-[9px] font-bold text-zinc-600">No Clichés Found</span>
                </div>
              </div>
            </div>

            {/* FLOATING INTERACTIVE WIDGET 3: EXPORT STATUS */}
            <div className="absolute bottom-10 -left-2 sm:-left-6 z-25 bg-white/95 backdrop-blur-md border border-zinc-200/80 text-zinc-900 rounded-2xl px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center gap-2.5 animate-float">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-450 text-zinc-500 leading-none font-display">Status</span>
                <span className="text-[10px] font-black text-zinc-800 mt-0.5">LaTeX Export Ready</span>
              </div>
            </div>

            {/* Redesigned Premium Editor Window Frame */}
            <div className="relative w-full max-w-lg bg-zinc-100/60 backdrop-blur-md border border-zinc-200/80 rounded-3xl shadow-[0_24px_50px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-10">
              
              {/* Editor Tab Bar & Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/60 px-4 py-3 bg-zinc-50/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/30" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/30" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/30" />
                </div>
                
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-zinc-200 text-[10px] text-zinc-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>resumeflow.ai/editor</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-black uppercase text-indigo-650 text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-display">
                    Live Preview
                  </span>
                </div>
              </div>

              {/* Editor Canvas Area */}
              <div className="p-4 sm:p-6 bg-zinc-50/20 relative">
                
                {/* Crisp Printable Resume Sheet (Customized Layouts from User Screenshots) */}
                <div 
                  key={activeTemplate.id}
                  className="bg-white text-slate-800 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-zinc-200/60 min-h-[385px] text-left animate-in fade-in slide-in-from-bottom-6 duration-500 relative overflow-hidden grid grid-cols-12 z-10"
                >
                  {/* Decorative faint background pattern for paper feel */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none rounded-2xl z-0" />

                  {activeTemplate.id === "husnain_yousaf" && (
                    <>
                      {/* Teal/Dark Green Sidebar (Left Column) */}
                      <div className="col-span-5 bg-[#0d3c33] text-white p-3 space-y-4 relative z-10 flex flex-col justify-start">
                        {/* Profile Photo */}
                        <div className="flex justify-center my-1 shrink-0">
                          <div className="relative w-14 h-14 rounded-full border-2 border-[#165046] overflow-hidden shadow-sm">
                            <img src={activeTemplate.avatar} alt={activeTemplate.candidateName} className="w-full h-full object-cover" />
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-1 shrink-0">
                          <div className="bg-[#165046] text-white font-extrabold py-0.5 px-2 rounded-r-full -ml-3 w-fit text-[8px] uppercase tracking-wider">
                            Contact
                          </div>
                          <div className="space-y-1 text-[7.5px] text-zinc-300 leading-tight">
                            <p className="truncate">📞 {activeTemplate.location}</p>
                            <p className="truncate">✉️ {activeTemplate.email}</p>
                            <p className="truncate text-zinc-400">🌐 {activeTemplate.secEmail}</p>
                            <p className="text-[7px] leading-snug line-clamp-2">📍 {activeTemplate.address}</p>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-1 shrink-0">
                          <div className="bg-[#165046] text-white font-extrabold py-0.5 px-2 rounded-r-full -ml-3 w-fit text-[8px] uppercase tracking-wider">
                            Education
                          </div>
                          <div className="space-y-2 text-[7px] text-zinc-300 leading-snug">
                            {activeTemplate.education.map((edu, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="font-extrabold text-white text-[7.5px] leading-tight">{edu.school}</p>
                                <p className="text-[6.5px] text-zinc-355">{edu.degree}</p>
                                <p className="text-[6.5px] text-zinc-450 font-semibold">{edu.duration}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Award */}
                        <div className="space-y-1 shrink-0">
                          <div className="bg-[#165046] text-white font-extrabold py-0.5 px-2 rounded-r-full -ml-3 w-fit text-[8px] uppercase tracking-wider">
                            Award
                          </div>
                          <div className="space-y-0.5 text-[7px] text-zinc-300 leading-snug">
                            {activeTemplate.awards.map((aw, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="font-extrabold text-white text-[7.5px] leading-tight">{aw.school}</p>
                                <p className="text-amber-350 text-[6.5px] font-bold">{aw.title} | {aw.duration}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Main Body */}
                      <div className="col-span-7 bg-white p-3 space-y-3 relative z-10 flex flex-col justify-start">
                        {/* Header block */}
                        <div className="bg-[#0d3c33] text-white p-3 -mx-3 -mt-3 rounded-tr-2xl space-y-0.5 shrink-0">
                          <h3 className="text-sm sm:text-base font-black tracking-tight leading-none">Husnain Yousaf</h3>
                          <p className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-350">Graphic Designer</p>
                          <p className="text-[7.5px] text-zinc-300 leading-relaxed font-medium pt-1 border-t border-emerald-900/60 mt-1 line-clamp-2">
                            {activeTemplate.summary}
                          </p>
                        </div>

                        {/* Work Experience */}
                        <div className="space-y-1 shrink-0">
                          <div className="bg-[#0d3c33] text-white font-extrabold py-0.5 px-2 rounded-full w-fit text-[7.5px] uppercase tracking-widest mb-1">
                            Work Experience
                          </div>
                          <div className="space-y-1.5">
                            {activeTemplate.experience.map((exp, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="text-[8px] font-black text-slate-800 leading-tight">{exp.role}</p>
                                <p className="text-[7.5px] font-bold text-[#0d3c33]">{exp.company}</p>
                                <ul className="list-disc pl-3 text-[7px] text-slate-500 space-y-0.5 font-medium leading-none">
                                  {exp.desc.map((d, i) => (
                                    <li key={i}>{d}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-1 shrink-0">
                          <div className="bg-[#0d3c33] text-white font-extrabold py-0.5 px-2 rounded-full w-fit text-[7.5px] uppercase tracking-widest mb-1">
                            Skills
                          </div>
                          <div className="space-y-1">
                            {activeTemplate.skills.map((sk, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="text-[7px] font-bold text-slate-700 w-20 truncate leading-none">{sk.name}</span>
                                <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden">
                                  <div className="bg-[#0d3c33] h-full rounded-full" style={{ width: sk.level }} />
                                </div>
                                <span className="text-[6.5px] font-bold text-slate-400 leading-none shrink-0">{sk.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTemplate.id === "usama_akbar" && (
                    <>
                      {/* Dark Gray/Black Sidebar (Left Column) */}
                      <div className="col-span-5 bg-zinc-950 text-white p-3 space-y-4 relative z-10 flex flex-col justify-start">
                        {/* Profile Photo - Rectangular */}
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-lg shadow-sm border border-zinc-800 shrink-0">
                          <img src={activeTemplate.avatar} alt={activeTemplate.candidateName} className="w-full h-full object-cover" />
                        </div>

                        {/* Contact */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-zinc-400 border-b border-zinc-850 pb-1 uppercase">Contact</h4>
                          <div className="space-y-1 text-[7px] text-zinc-400 leading-tight">
                            <p className="truncate">📞 {activeTemplate.location}</p>
                            <p className="truncate">✉️ {activeTemplate.email}</p>
                            <p className="truncate">🔗 github.com/UsamaAkbar727</p>
                            <p className="text-[6.5px] leading-snug line-clamp-2">📍 {activeTemplate.address}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-zinc-400 border-b border-zinc-850 pb-1 uppercase">Skills</h4>
                          <div className="space-y-1 text-zinc-350 text-[7px] leading-snug font-medium">
                            {activeTemplate.skills.map((sk, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full border border-amber-400 flex-shrink-0" />
                                <span className="truncate">{sk}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-zinc-400 border-b border-zinc-850 pb-1 uppercase">Education</h4>
                          <div className="space-y-2 text-[7px] text-zinc-400 leading-snug">
                            {activeTemplate.education.map((edu, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="font-extrabold text-white text-[7.5px] leading-tight">{edu.school}</p>
                                <p className="text-zinc-350 text-[6.5px] leading-snug">{edu.degree}</p>
                                <p className="text-zinc-550 font-bold text-[6.5px]">{edu.duration}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Main Body */}
                      <div className="col-span-7 bg-white p-3 space-y-3 relative z-10 flex flex-col justify-start">
                        {/* Header Banner */}
                        <div className="bg-[#967b66] text-white p-3 -mx-3 -mt-3 rounded-tr-2xl space-y-0.5 shrink-0">
                          <h3 className="text-sm sm:text-base font-black tracking-tight uppercase leading-none">USAMA AKBAR</h3>
                          <p className="text-[8.5px] font-extrabold tracking-widest italic opacity-95 text-[#fcd34d]">Full-Stack Web Developer</p>
                        </div>

                        {/* About Me */}
                        <div className="space-y-1 shrink-0">
                          <h4 className="text-[8.5px] font-black tracking-wider text-slate-900 border-b border-slate-100 pb-0.5 uppercase">ABOUT ME</h4>
                          <p className="text-[7.5px] text-slate-650 leading-relaxed font-normal line-clamp-3">{activeTemplate.summary}</p>
                        </div>

                        {/* Experience */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8.5px] font-black tracking-wider text-slate-900 border-b border-slate-100 pb-0.5 uppercase">EXPERIENCE</h4>
                          <div className="space-y-2">
                            {activeTemplate.experience.map((exp, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="text-[8px] font-black text-slate-900 leading-tight">{exp.role}</p>
                                <div className="flex justify-between items-center text-[6.5px] font-bold text-slate-500">
                                  <span>{exp.company}</span>
                                  <span>{exp.duration}</span>
                                </div>
                                <ul className="list-disc pl-3 text-[7px] text-slate-500 space-y-0.5 font-medium leading-tight">
                                  {exp.desc.slice(0, 3).map((d, i) => (
                                    <li key={i} className="line-clamp-2">{d}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTemplate.id === "sahib_khan" && (
                    <>
                      {/* Purple Sidebar (Left Column) */}
                      <div className="col-span-5 bg-[#582f60] text-white p-3 space-y-4 relative z-10 flex flex-col justify-start">
                        {/* Profile Photo - Rounded pill wrapper */}
                        <div className="flex justify-center my-1 shrink-0">
                          <div className="bg-white/10 p-0.5 rounded-2xl">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/60 shadow-sm">
                              <img src={activeTemplate.avatar} alt={activeTemplate.candidateName} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-white border-b border-purple-800 pb-0.5 uppercase">Contact</h4>
                          <div className="space-y-1 text-[7px] text-purple-200 leading-tight">
                            <p className="truncate">📞 {activeTemplate.location}</p>
                            <p className="truncate">✉️ {activeTemplate.email}</p>
                            <p className="truncate text-purple-300">📍 {activeTemplate.address}</p>
                          </div>
                        </div>

                        {/* Personal Skills */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-white border-b border-purple-800 pb-0.5 uppercase">Personal Skills</h4>
                          <ul className="list-disc pl-3 text-purple-200 text-[7px] space-y-0.5 leading-snug font-medium">
                            {activeTemplate.skills.slice(0, 5).map((sk, idx) => (
                              <li key={idx} className="truncate">{sk}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Languages */}
                        <div className="space-y-1.5 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-white border-b border-purple-800 pb-0.5 uppercase">Language</h4>
                          <div className="flex flex-wrap gap-1 text-[7px] text-purple-200 font-bold">
                            {activeTemplate.languages.map((ln, idx) => (
                              <span key={idx} className="bg-purple-900/60 border border-purple-800/80 px-1 py-0.2 rounded">{ln}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Main Body */}
                      <div className="col-span-7 bg-white p-3 space-y-2.5 relative z-10 flex flex-col justify-start">
                        {/* Header name block */}
                        <div className="space-y-0.5 border-b pb-1.5 border-slate-100 shrink-0">
                          <h3 className="text-sm sm:text-base font-black tracking-tight text-[#582f60] uppercase leading-none">SAHIB KHAN</h3>
                          <p className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">Graphic Designer</p>
                        </div>

                        {/* Career Objective */}
                        <div className="space-y-1 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-[#582f60] uppercase flex items-center gap-1.5">💼 Career Objective</h4>
                          <p className="text-[7.5px] text-slate-650 leading-relaxed font-normal line-clamp-3">{activeTemplate.summary}</p>
                        </div>

                        {/* Education */}
                        <div className="space-y-1 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-[#582f60] uppercase flex items-center gap-1.5">🎓 Education</h4>
                          <div className="space-y-1.5">
                            {activeTemplate.education.slice(0, 2).map((edu, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <div className="flex justify-between items-center text-[7.5px] font-extrabold text-slate-800">
                                  <span className="truncate max-w-[120px]">{edu.school}</span>
                                  <span className="text-[6.5px] text-slate-400 font-bold shrink-0">{edu.duration}</span>
                                </div>
                                <p className="text-[6.5px] text-slate-500 font-medium leading-none">{edu.degree}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technical Skills */}
                        <div className="space-y-1 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-[#582f60] uppercase flex items-center gap-1.5">💻 Technical Skills</h4>
                          <ul className="list-disc pl-3.5 text-[7px] text-slate-500 space-y-0.5 font-medium leading-none">
                            {activeTemplate.techSkills.map((ts, idx) => (
                              <li key={idx} className="truncate">{ts}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Hobbies */}
                        <div className="space-y-1 shrink-0">
                          <h4 className="text-[8px] font-black tracking-wider text-[#582f60] uppercase flex items-center gap-1.5">🎭 Hobbies</h4>
                          <div className="flex flex-wrap gap-1 text-[7px] text-slate-600 font-medium leading-none">
                            {activeTemplate.hobbies.join(" • ")}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

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
