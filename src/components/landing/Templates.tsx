"use client";

import React, { useState } from "react";
import { Check, Star, Sparkles, Layout, Eye, ArrowRight, Award, ShieldCheck, X, FileText } from "lucide-react";
import { ScrollReveal } from "./Animations";

interface Template {
  id: string;
  name: string;
  desc: string;
  type: string;
  atsScore: number;
  badge?: "Popular" | "Recommended";
  highlights: string[];
}

export default function Templates() {
  const [selectedColor, setSelectedColor] = useState<"navy" | "green" | "slate" | "charcoal">("navy");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const colors = [
    { id: "navy", class: "bg-blue-600", border: "border-blue-200", label: "Ocean Navy" },
    { id: "green", class: "bg-emerald-600", border: "border-emerald-200", label: "Forest Emerald" },
    { id: "slate", class: "bg-slate-500", border: "border-slate-200", label: "Slate Gray" },
    { id: "charcoal", class: "bg-slate-900", border: "border-slate-800", label: "Charcoal Black" },
  ];

  const templatesList: Template[] = [
    {
      id: "technologist",
      name: "The Technologist",
      desc: "Designed specifically for software engineers, systems developers, and product managers.",
      type: "Modern Tech Layout",
      atsScore: 98,
      badge: "Popular",
      highlights: ["Dual column layout", "Optimized tech stack category section", "Bold keyword calibration tags"]
    },
    {
      id: "minimalist",
      name: "The Minimalist",
      desc: "Inspired by clean Notion structures. Ideal for engineers, researchers, and minimal designers.",
      type: "Clean Spacing",
      atsScore: 97,
      highlights: ["Single column readability", "Compact margins for dense resumes", "Simple markdown style heading rules"]
    },
    {
      id: "corporate",
      name: "The Executive",
      desc: "Academic and traditional styling suited for senior administration, management, and executives.",
      type: "Classic Serif",
      atsScore: 95,
      badge: "Recommended",
      highlights: ["Centered branding design", "Traditional elegant Serif typography", "Double horizontal border accents"]
    },
    {
      id: "creative",
      name: "The Designer",
      desc: "High-contrast left sidebar format. Perfect for visual developers, designers, and creatives.",
      type: "Creative Column",
      atsScore: 96,
      highlights: ["Vibrant background sidebar", "Visual skill level indicator bars", "Compact contact metadata card"]
    }
  ];

  const getAccentBg = () => {
    switch (selectedColor) {
      case "green": return "bg-emerald-600";
      case "slate": return "bg-slate-500";
      case "charcoal": return "bg-slate-900";
      case "navy":
      default:
        return "bg-blue-600";
    }
  };

  const getAccentText = () => {
    switch (selectedColor) {
      case "green": return "text-emerald-600";
      case "slate": return "text-slate-500";
      case "charcoal": return "text-slate-900";
      case "navy":
      default:
        return "text-blue-600";
    }
  };

  const getBorderColor = () => {
    switch (selectedColor) {
      case "green": return "border-emerald-100";
      case "slate": return "border-slate-100";
      case "charcoal": return "border-slate-200";
      case "navy":
      default:
        return "border-blue-100";
    }
  };

  // Realistic Mini HTML Mockups for the thumbnails
  const renderResumeThumbnail = (id: string, isLarge: boolean = false) => {
    const accentBg = getAccentBg();
    const accentText = getAccentText();
    const borderCol = getBorderColor();
    const textSizeClass = isLarge ? "text-[9px]" : "text-[6px]";
    const paddingClass = isLarge ? "p-6" : "p-4.5";

    switch (id) {
      case "minimalist":
        return (
          <div className={`w-full h-full bg-white text-slate-800 flex flex-col justify-between text-left font-sans ${paddingClass}`}>
            <div>
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-1">
                  <span className={`${isLarge ? "text-sm" : "text-xs"}`}>💻</span>
                  <h4 className={`font-black tracking-tight text-slate-900 ${isLarge ? "text-lg" : "text-[10px]"}`}>Sarah Jenkins</h4>
                </div>
                <div className={`text-slate-400 font-bold uppercase mt-0.5 ${isLarge ? "text-[10px]" : "text-[6px]"}`}>
                  Senior Full Stack Developer
                </div>
              </div>
              
              {/* Body sections */}
              <div className="space-y-3">
                {/* Summary */}
                <div>
                  <h5 className={`font-bold border-b pb-0.5 text-slate-900 ${isLarge ? "text-[10px]" : "text-[7px]"}`}>Summary</h5>
                  <div className={`space-y-1 mt-1 opacity-70 ${textSizeClass}`}>
                    <div className="h-1.5 bg-slate-200 rounded-sm w-full"></div>
                    <div className="h-1.5 bg-slate-200 rounded-sm w-11/12"></div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h5 className={`font-bold border-b pb-0.5 text-slate-900 ${isLarge ? "text-[10px]" : "text-[7px]"}`}>Experience</h5>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-slate-800 ${textSizeClass}`}>Lead Software Engineer @ Stripe</span>
                      <span className={`text-slate-400 ${textSizeClass}`}>2024 - Present</span>
                    </div>
                    <div className={`space-y-1 opacity-75 ${textSizeClass}`}>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-full"></div>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-10/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills tags */}
            <div className="flex gap-1 flex-wrap pt-2">
              <span className={`font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm border ${textSizeClass}`}>React</span>
              <span className={`font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm border ${textSizeClass}`}>Next.js</span>
              <span className={`font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm border ${textSizeClass}`}>TypeScript</span>
            </div>
          </div>
        );

      case "corporate":
        return (
          <div className={`w-full h-full bg-[#FCFBF8] text-slate-800 flex flex-col justify-between text-center font-serif ${paddingClass}`}>
            <div>
              {/* Centered Executive Header */}
              <div className="pb-3 border-b-2 border-slate-200 mb-3">
                <h4 className={`font-bold text-slate-900 tracking-wide ${isLarge ? "text-lg" : "text-[11px]"}`}>SARAH JENKINS</h4>
                <div className={`text-slate-400 font-bold uppercase tracking-wider mt-0.5 ${isLarge ? "text-[9px]" : "text-[5.5px]"}`}>
                  Senior Full Stack Developer
                </div>
                <div className={`text-slate-400 mt-1 flex justify-center gap-2 ${isLarge ? "text-[8px]" : "text-[5px]"}`}>
                  <span>sarah@jenkins.com</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Serif Sections */}
              <div className="space-y-3 text-left">
                <div>
                  <h5 className={`font-bold text-center text-slate-800 uppercase tracking-widest ${isLarge ? "text-[9px]" : "text-[6px]"}`}>Professional Experience</h5>
                  <hr className="border-slate-200 my-1" />
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-slate-900 ${textSizeClass}`}>Stripe — Lead Software Engineer</span>
                      <span className={`text-slate-400 ${textSizeClass}`}>2024 - Present</span>
                    </div>
                    <div className={`space-y-1 opacity-70 ${textSizeClass}`}>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-full"></div>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-11/12"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className={`font-bold text-center text-slate-800 uppercase tracking-widest ${isLarge ? "text-[9px]" : "text-[6px]"}`}>Education</h5>
                  <hr className="border-slate-200 my-1" />
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-slate-900 ${textSizeClass}`}>Stanford University — B.S. Computer Science</span>
                    <span className={`text-slate-400 ${textSizeClass}`}>GPA 3.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered accent line divider */}
            <div className="flex justify-center items-center">
              <span className={`h-0.5 w-1/3 transition-colors ${accentBg}`}></span>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="w-full h-full bg-white flex text-slate-800 text-left font-sans overflow-hidden">
            {/* Dark Accent Sidebar */}
            <div className={`w-1/3 bg-slate-900 text-white flex flex-col justify-between ${paddingClass}`}>
              <div>
                <div className={`w-8 h-8 rounded-full bg-slate-700 border border-slate-600 mb-3 flex items-center justify-center font-bold text-white ${isLarge ? "text-xs" : "text-[8px]"}`}>
                  SJ
                </div>
                <h4 className={`font-black leading-tight ${isLarge ? "text-xs" : "text-[8px]"}`}>Sarah Jenkins</h4>
                <div className={`text-slate-400 mt-0.5 ${isLarge ? "text-[8px]" : "text-[5px]"}`}>Developer</div>
              </div>

              {/* Visual skill bars */}
              <div className="space-y-2">
                <div className="space-y-0.5">
                  <div className={`text-slate-400 uppercase tracking-wider font-bold ${isLarge ? "text-[7px]" : "text-[4.5px]"}`}>React</div>
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden w-full">
                    <div className={`h-full rounded-full transition-colors ${accentBg}`} style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className={`text-slate-400 uppercase tracking-wider font-bold ${isLarge ? "text-[7px]" : "text-[4.5px]"}`}>Node.js</div>
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden w-full">
                    <div className={`h-full rounded-full transition-colors ${accentBg}`} style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col justify-between ${paddingClass} bg-slate-50/50`}>
              <div className="space-y-3">
                {/* Accent boundary label */}
                <div>
                  <h4 className={`font-bold transition-colors uppercase tracking-wider border-b pb-0.5 ${accentText} ${isLarge ? "text-[9px]" : "text-[6px]"}`}>
                    Experience
                  </h4>
                  <div className="space-y-1.5 mt-1.5">
                    <div className={`font-bold text-slate-800 ${textSizeClass}`}>Lead Developer @ Stripe</div>
                    <div className={`space-y-1 opacity-70 ${textSizeClass}`}>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-full"></div>
                      <div className="h-1.5 bg-slate-200 rounded-sm w-10/12"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`font-bold transition-colors uppercase tracking-wider border-b pb-0.5 ${accentText} ${isLarge ? "text-[9px]" : "text-[6px]"}`}>
                    Key Projects
                  </h4>
                  <div className="space-y-1 mt-1">
                    <div className={`font-bold text-slate-800 ${textSizeClass}`}>Developer Portfolio Host</div>
                    <div className={`h-1.5 bg-slate-200 rounded-sm w-5/6 opacity-70`}></div>
                  </div>
                </div>
              </div>

              <div className={`text-[5px] text-slate-400 font-bold uppercase tracking-wider pt-2 ${isLarge ? "text-[7px]" : "text-[5px]"}`}>
                sarahjenkins.dev
              </div>
            </div>
          </div>
        );

      case "technologist":
      default:
        return (
          <div className={`w-full h-full bg-white text-slate-800 flex flex-col justify-between text-left font-sans ${paddingClass}`}>
            <div>
              {/* Header */}
              <div className={`pb-3 border-b-2 transition-colors mb-3 ${borderCol}`}>
                <h4 className={`font-black tracking-tight text-slate-900 ${isLarge ? "text-lg" : "text-[10px]"}`}>Sarah Jenkins</h4>
                <div className={`font-bold uppercase tracking-wide transition-colors ${accentText} ${isLarge ? "text-[8px]" : "text-[5.5px]"}`}>
                  Senior Full Stack Developer
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 space-y-2.5">
                  <div>
                    <h5 className={`font-bold uppercase tracking-wider text-slate-900 ${isLarge ? "text-[8px]" : "text-[6px]"}`}>Experience</h5>
                    <div className="mt-1">
                      <div className={`font-bold text-slate-800 leading-tight ${textSizeClass}`}>Lead Software Engineer @ Stripe</div>
                      <div className={`space-y-1 mt-1 opacity-70 ${textSizeClass}`}>
                        <div className="h-1.5 bg-slate-200 rounded-sm w-full"></div>
                        <div className="h-1.5 bg-slate-200 rounded-sm w-11/12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side stacks list */}
                <div className="col-span-4 space-y-2">
                  <h5 className={`font-bold uppercase tracking-wider text-slate-900 ${isLarge ? "text-[8px]" : "text-[6px]"}`}>Tech Stack</h5>
                  <div className="flex flex-wrap gap-0.5">
                    {["React", "Next.js", "TS", "Postgres", "AWS", "Node"].map((stack) => (
                      <span
                        key={stack}
                        className={`text-[5px] font-bold px-1 py-0.5 rounded-sm border border-slate-100 bg-slate-50 transition-all ${textSizeClass}`}
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom contact bar */}
            <div className={`text-slate-400 mt-2 pt-2 border-t flex justify-between ${isLarge ? "text-[8px]" : "text-[5px]"}`}>
              <span>sarah@jenkins.com</span>
              <span>SF, CA</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="templates" className="py-28 bg-[#F8FAFC] relative z-10 border-t border-slate-200/50 overflow-hidden">
      {/* Background Subtle Decorative Gradients without clutter */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 filter blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header and theme controls */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16">
            <div className="text-center lg:text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-700 mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Premium Resume Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Recruiter-tested layout gallery
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                Every template is specifically optimized to rank high on search parses while presenting clean, professional layouts. Toggle live colors below:
              </p>
            </div>

            {/* Theme Color Picker */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1.5 select-none">Accent Theme</span>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id as any)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedColor === color.id
                        ? "border-blue-600 scale-110 shadow-md shadow-blue-500/20"
                        : "border-transparent hover:scale-105"
                    } ${color.class}`}
                    title={color.label}
                  >
                    {selectedColor === color.id && <Check className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Templates layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templatesList.map((tpl, idx) => (
            <ScrollReveal
              key={tpl.id}
              variant="fade-up"
              delay={idx * 100}
              className="group bg-white border border-slate-200/80 rounded-[24px] p-5 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.18)] hover:-translate-y-2 hover:border-blue-500/35 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="bg-slate-100 rounded-2xl mb-5 aspect-[1/1.22] flex items-center justify-center overflow-hidden border border-slate-200/50 relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]">
                {/* Live CSS Thumbnail rendering */}
                <div className="w-full h-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] group-hover:scale-[1.01] transition-transform duration-500">
                  {renderResumeThumbnail(tpl.id)}
                </div>

                {/* Score and feature badges overlays */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none select-none">
                  {/* Badge */}
                  {tpl.badge ? (
                    <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(37,99,235,0.25)]">
                      {tpl.badge}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {/* Score */}
                  <span className="bg-slate-900/90 backdrop-blur-sm text-white text-[8px] font-black px-2 py-1 rounded-md shadow-xs border border-white/5 flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" /> ATS {tpl.atsScore}%
                  </span>
                </div>
              </div>

              {/* Template details */}
              <div className="text-left flex-1 flex flex-col justify-between mb-5">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/50">
                    {tpl.type}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-3 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {tpl.desc}
                  </p>
                </div>
              </div>

              {/* Multi action triggers */}
              <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="clay-btn-secondary py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-50 border border-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <a
                  href="/auth?mode=register"
                  className="clay-btn-primary py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 shadow-md hover:shadow-lg transition-transform"
                >
                  Use Layout
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Large Interactive Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div
            className="bg-white border border-slate-200/80 rounded-[28px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-800 hover:bg-slate-50 cursor-pointer z-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
              
              {/* Detailed information sidebar (Left) */}
              <div className="md:col-span-5 p-8 text-left bg-slate-50 border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-500/10 border border-blue-500/20 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      ATS Verified {previewTemplate.atsScore}%
                    </span>
                    {previewTemplate.badge && (
                      <span className="bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                        {previewTemplate.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{previewTemplate.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{previewTemplate.type}</p>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mb-6">
                    {previewTemplate.desc}
                  </p>

                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Key Highlights</h4>
                  <ul className="space-y-3 mb-8">
                    {previewTemplate.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href="/auth?mode=register"
                    className="clay-btn-primary py-3.5 w-full text-xs text-white font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
                  >
                    Use This Template <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="clay-btn-secondary py-3.5 w-full text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>

              {/* Render large realistic mockup (Right) */}
              <div className="md:col-span-7 bg-[#E2E8F0] p-6 sm:p-10 flex items-center justify-center max-h-[80vh] md:max-h-none overflow-y-auto">
                <div className="w-full max-w-[450px] shadow-2xl rounded-xs overflow-hidden transition-all duration-300">
                  {renderResumeThumbnail(previewTemplate.id, true)}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
