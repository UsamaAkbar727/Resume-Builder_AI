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
  const [selectedColor, setSelectedColor] = useState<"orange" | "teal" | "brown" | "charcoal">("orange");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const colors = [
    { id: "orange", class: "bg-[#E87A36]", border: "border-[#E87A36]/40", label: "Burnt Orange" },
    { id: "teal", class: "bg-[#67B0A7]", border: "border-[#67B0A7]/40", label: "Sage Teal" },
    { id: "brown", class: "bg-[#6E4A35]", border: "border-[#6E4A35]/40", label: "Chocolate Brown" },
    { id: "charcoal", class: "bg-stone-900", border: "border-stone-850", label: "Deep Stone" },
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
      case "teal": return "bg-[#67B0A7]";
      case "brown": return "bg-[#6E4A35]";
      case "charcoal": return "bg-stone-900";
      case "orange":
      default:
        return "bg-[#E87A36]";
    }
  };

  const getAccentText = () => {
    switch (selectedColor) {
      case "teal": return "text-[#67B0A7]";
      case "brown": return "text-[#6E4A35]";
      case "charcoal": return "text-stone-900";
      case "orange":
      default:
        return "text-[#E87A36]";
    }
  };

  const getBorderColor = () => {
    switch (selectedColor) {
      case "teal": return "border-[#67B0A7]/20";
      case "brown": return "border-[#6E4A35]/20";
      case "charcoal": return "border-stone-250";
      case "orange":
      default:
        return "border-[#E87A36]/20";
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
              <div className="mb-3">
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
                  <p className={`mt-1 opacity-75 leading-normal ${isLarge ? "text-[8px]" : "text-[4.5px] scale-95 origin-left"}`}>
                    Experienced Software Engineer building high-performance SaaS applications with React, Next.js, and Node.js. Focus on scalable backend schemas and low-latency APIs.
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h5 className={`font-bold border-b pb-0.5 text-slate-900 ${isLarge ? "text-[10px]" : "text-[7px]"}`}>Experience</h5>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-slate-800 ${textSizeClass}`}>Lead Software Engineer @ Stripe</span>
                      <span className={`text-slate-400 ${textSizeClass}`}>2024 - Present</span>
                    </div>
                    <p className={`mt-0.5 opacity-75 leading-normal ${isLarge ? "text-[7.5px]" : "text-[4.5px] scale-95 origin-left"}`}>
                      • Scaled Stripe checkout infrastructure for high transaction flows.<br/>
                      • Migrated microservices gateways to AWS container hosts.
                    </p>
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
                    <p className={`mt-0.5 opacity-70 leading-normal ${isLarge ? "text-[7.5px]" : "text-[4.5px] scale-95 origin-left"}`}>
                      Managed core developer API integrations, scaling checkout security and reliability to 99.99% uptime.
                    </p>
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
          <div className="w-full h-full bg-white flex text-stone-850 text-left font-sans overflow-hidden">
            {/* Dark Accent Sidebar */}
            <div className={`w-1/3 bg-stone-900 text-white flex flex-col justify-between ${paddingClass}`}>
              <div>
                <div className={`w-8 h-8 rounded-full bg-stone-800 border border-stone-700 mb-3 flex items-center justify-center font-bold text-white ${isLarge ? "text-xs" : "text-[8px]"}`}>
                  SJ
                </div>
                <h4 className={`font-black leading-tight ${isLarge ? "text-xs" : "text-[8px]"}`}>Sarah Jenkins</h4>
                <div className={`text-stone-400 mt-0.5 ${isLarge ? "text-[8px]" : "text-[5px]"}`}>Developer</div>
              </div>

              {/* Visual skill bars */}
              <div className="space-y-2">
                <div className="space-y-0.5">
                  <div className={`text-stone-400 uppercase tracking-wider font-bold ${isLarge ? "text-[7px]" : "text-[4.5px]"}`}>React</div>
                  <div className="h-1 bg-stone-800 rounded-full overflow-hidden w-full">
                    <div className={`h-full rounded-full transition-colors ${accentBg}`} style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className={`text-stone-400 uppercase tracking-wider font-bold ${isLarge ? "text-[7px]" : "text-[4.5px]"}`}>Node.js</div>
                  <div className="h-1 bg-stone-800 rounded-full overflow-hidden w-full">
                    <div className={`h-full rounded-full transition-colors ${accentBg}`} style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col justify-between ${paddingClass} bg-stone-50/50`}>
              <div className="space-y-3">
                {/* Accent boundary label */}
                <div>
                  <h4 className={`font-bold transition-colors uppercase tracking-wider border-b pb-0.5 ${accentText} ${isLarge ? "text-[9px]" : "text-[6px]"}`}>
                    Experience
                  </h4>
                  <div className="space-y-1 mt-1">
                    <div className={`font-bold text-stone-800 ${textSizeClass}`}>Lead Developer @ Stripe</div>
                    <p className={`mt-0.5 opacity-70 leading-normal ${isLarge ? "text-[7.5px]" : "text-[4.5px] scale-95 origin-left"}`}>
                      Designed transaction systems processing $2B+ payments.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className={`font-bold transition-colors uppercase tracking-wider border-b pb-0.5 ${accentText} ${isLarge ? "text-[9px]" : "text-[6px]"}`}>
                    Key Projects
                  </h4>
                  <div className="space-y-1 mt-1">
                    <div className={`font-bold text-stone-800 ${textSizeClass}`}>Portfolio Generator</div>
                    <p className={`mt-0.5 opacity-70 leading-normal ${isLarge ? "text-[7.5px]" : "text-[4.5px] scale-95 origin-left"}`}>
                      Open-source system translating YAML data to active portfolios.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`text-[5px] text-stone-400 font-bold uppercase tracking-wider pt-2 ${isLarge ? "text-[7px]" : "text-[5px]"}`}>
                sarahjenkins.dev
              </div>
            </div>
          </div>
        );

      case "technologist":
      default:
        return (
          <div className={`w-full h-full bg-white text-stone-850 flex flex-col justify-between text-left font-sans ${paddingClass}`}>
            <div>
              {/* Header */}
              <div className={`pb-3 border-b-2 transition-colors mb-3 ${borderCol}`}>
                <h4 className={`font-black tracking-tight text-stone-900 ${isLarge ? "text-lg" : "text-[10px]"}`}>Sarah Jenkins</h4>
                <div className={`font-bold uppercase tracking-wide transition-colors ${accentText} ${isLarge ? "text-[8px]" : "text-[5.5px]"}`}>
                  Senior Full Stack Developer
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 space-y-2.5">
                  <div>
                    <h5 className={`font-bold uppercase tracking-wider text-stone-900 ${isLarge ? "text-[8px]" : "text-[6px]"}`}>Experience</h5>
                    <div className="mt-1">
                      <div className={`font-bold text-stone-800 leading-tight ${textSizeClass}`}>Lead Software Engineer @ Stripe</div>
                      <p className={`mt-0.5 opacity-70 leading-normal ${isLarge ? "text-[7.5px]" : "text-[4.5px] scale-95 origin-left"}`}>
                        Spearheaded the migration of core payment checkout APIs to scale checkout availability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side stacks list */}
                <div className="col-span-4 space-y-2">
                  <h5 className={`font-bold uppercase tracking-wider text-stone-900 ${isLarge ? "text-[8px]" : "text-[6px]"}`}>Tech Stack</h5>
                  <div className="flex flex-wrap gap-0.5">
                    {["React", "Next.js", "TS", "Postgres", "AWS", "Node"].map((stack) => (
                      <span
                        key={stack}
                        className={`text-[5px] font-bold px-1 py-0.5 rounded-sm border border-stone-200 bg-stone-100 transition-all ${textSizeClass}`}
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom contact bar */}
            <div className={`text-stone-400 mt-2 pt-2 border-t flex justify-between ${isLarge ? "text-[8px]" : "text-[5px]"}`}>
              <span>sarah@jenkins.com</span>
              <span>SF, CA</span>
            </div>
      return (
    <section id="templates" className="py-28 bg-[#fbfbfc] relative z-10 border-t border-zinc-100 overflow-hidden">
      {/* Background Subtle Decorative Gradients without clutter */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/1 filter blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-violet-500/1 filter blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header and theme controls */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-705 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-4 w-fit">
                <Layout className="w-4 h-4 text-indigo-600" />
                Premium Resume Showcase
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 mb-3 tracking-tight leading-tight font-display">
                Recruiter-tested layout gallery
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 font-semibold font-display leading-relaxed">
                Every template is specifically optimized to rank high on search parses while presenting clean, professional layouts. Toggle live colors below:
              </p>
            </div>

            {/* Theme Color Picker */}
            <div className="flex items-center gap-3 bg-white border border-zinc-200 px-4 py-2.5 rounded-2xl shadow-xl shadow-zinc-200/20 text-zinc-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 text-zinc-500 mr-1.5 select-none font-display">Accent Theme</span>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id as any)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedColor === color.id
                        ? "border-zinc-800 scale-110 shadow-sm"
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
              className="group bg-white border border-zinc-200 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg shadow-zinc-200/20 hover:-translate-y-2 hover:bg-white transition-all duration-550 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="bg-zinc-100/50 rounded-2xl mb-5 aspect-[1/1.22] flex items-center justify-center overflow-hidden border border-zinc-200/80 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                {/* Live CSS Thumbnail rendering */}
                <div className="w-full h-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] group-hover:scale-[1.01] transition-transform duration-500">
                  {renderResumeThumbnail(tpl.id)}
                </div>

                {/* Score and feature badges overlays */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none select-none">
                  {/* Badge */}
                  {tpl.badge ? (
                    <span className="bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md font-display">
                      {tpl.badge}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {/* Score */}
                  <span className="bg-white/95 text-zinc-900 text-[8px] font-black px-2 py-1 rounded-md shadow-xs border border-zinc-200/85 flex items-center gap-0.5 font-display">
                    <ShieldCheck className="w-2.5 h-2.5 text-indigo-605 text-indigo-600 stroke-[3]" /> ATS {tpl.atsScore}%
                  </span>
                </div>
              </div>

              {/* Template details */}
              <div className="text-left flex-1 flex flex-col justify-between mb-5">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-650 text-indigo-605 text-indigo-650 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 font-display">
                    {tpl.type}
                  </span>
                  <h3 className="text-base font-black text-zinc-900 mt-3 mb-1.5 group-hover:text-indigo-600 transition-colors font-display">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                    {tpl.desc}
                  </p>
                </div>
              </div>

              {/* Multi action triggers */}
              <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase text-zinc-705 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-sm font-display"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <a
                  href="/auth?mode=register"
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 flex items-center justify-center gap-1 transition-all shadow-md font-display"
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
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-zinc-900/60 backdrop-blur-md p-4 animate-fade-in">
          <div
            className="bg-white border border-zinc-200 rounded-[28px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer z-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
              
              {/* Detailed information sidebar (Left) */}
              <div className="md:col-span-5 p-8 text-left bg-zinc-50/50 border-r border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md font-display">
                      ATS Verified {previewTemplate.atsScore}%
                    </span>
                    {previewTemplate.badge && (
                      <span className="bg-violet-50 border border-violet-100 text-violet-650 text-violet-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md font-display">
                        {previewTemplate.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 mb-2 font-display">{previewTemplate.name}</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4 font-display">{previewTemplate.type}</p>
                  
                  <p className="text-xs sm:text-sm text-zinc-650 text-zinc-600 leading-relaxed font-semibold mb-6">
                    {previewTemplate.desc}
                  </p>

                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-450 text-zinc-500 mb-3 font-display">Key Highlights</h4>
                  <ul className="space-y-3 mb-8">
                    {previewTemplate.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-xs text-zinc-705 text-zinc-700 font-semibold">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 stroke-[3]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href="/auth?mode=register"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-750 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer w-full font-display"
                  >
                    Use This Template <ArrowRight className="w-4 h-4 text-white" />
                  </a>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="px-8 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-705 text-zinc-705 text-zinc-700 hover:bg-zinc-50 font-black text-sm uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer w-full font-display"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>

              {/* Render large realistic mockup (Right) */}
              <div className="md:col-span-7 bg-zinc-100/80 p-6 sm:p-10 flex items-center justify-center max-h-[80vh] md:max-h-none overflow-y-auto">
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
