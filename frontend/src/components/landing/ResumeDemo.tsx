"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, FileText, Check, Layout, Plus, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function ResumeDemo() {
  const [selectedStyle, setSelectedStyle] = useState<"tech" | "executive" | "creative">("tech");
  const [activeTab, setActiveTab] = useState<"content" | "sections">("content");
  
  // Custom resume data state
  const [name, setName] = useState("Sarah Jenkins");
  const [title, setTitle] = useState("Senior Full Stack Developer");
  const [skills, setSkills] = useState([
    "React", "Next.js 15", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [showSummaryAi, setShowSummaryAi] = useState(false);
  const [summary, setSummary] = useState(
    "Designed and built highly scalable SaaS applications with React, Node.js, and TypeScript. Optimized database schemas to improve payload retrieval speed by 40%."
  );

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleImproveSummary = () => {
    setShowSummaryAi(true);
    setTimeout(() => {
      setSummary(
        "Senior Software Engineer specializing in modern architectures (React, Next.js, Node.js). Engineered high-throughput Stripe payment services, increasing transaction performance by 25% and scaling queries."
      );
      setShowSummaryAi(false);
    }, 1200);
  };

  // Get style class wrappers
  const getStyleClasses = () => {
    switch (selectedStyle) {
      case "executive":
        return {
          wrapper: "font-serif bg-[#FCFBF7] text-stone-800",
          header: "border-b border-stone-300 pb-4 mb-4 text-center",
          name: "text-2xl font-bold tracking-tight text-[#6E4A35]",
          title: "text-xs font-semibold tracking-wider text-stone-500 uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-1 mb-2",
        };
      case "creative":
        return {
          wrapper: "font-sans bg-[#FAFAFA] text-stone-800",
          header: "border-l-4 border-[#E87A36] pl-4 py-2 mb-4 text-left",
          name: "text-2xl font-black tracking-tight text-stone-900",
          title: "text-xs font-bold text-[#E87A36] uppercase mt-0.5",
          sectionHeading: "text-xs font-black tracking-wide text-[#E87A36] mb-2 uppercase border-b border-[#E87A36]/10 pb-0.5",
        };
      case "tech":
      default:
        return {
          wrapper: "font-sans bg-white text-stone-800",
          header: "border-b border-stone-200 pb-4 mb-4 text-left",
          name: "text-2xl font-extrabold tracking-tight text-stone-900",
          title: "text-xs font-semibold text-[#67B0A7] uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-1 mb-2",
        };
    }
  };

  const styleClasses = getStyleClasses();

  const renderResumeSandbox = () => {
    switch (selectedStyle) {
      case "creative":
        return (
          <div className="w-full h-full bg-white flex text-stone-850 text-left font-sans overflow-hidden">
            {/* Dark Sidebar */}
            <div className="w-1/3 bg-stone-900 text-white p-4 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 mb-3 flex items-center justify-center font-bold text-amber-400 text-xs">
                  SJ
                </div>
                <h4 className="font-black leading-tight text-[9px] text-white">{name}</h4>
                <div className="text-stone-400 text-[6.5px] uppercase tracking-wider mt-0.5">{title}</div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <div className="text-stone-450 text-[6.5px] font-bold uppercase tracking-wider mb-2">Skills</div>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span key={skill} className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-850 text-stone-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[6px] text-stone-500 font-bold uppercase tracking-wider">
                s.jenkins@company.com
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-5 bg-stone-50/50 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="font-black text-[#E87A36] uppercase tracking-wider border-b border-[#E87A36]/10 pb-0.5 text-[8px]">
                    Professional Summary
                  </h4>
                  <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
                </div>

                <div>
                  <h4 className="font-black text-[#E87A36] uppercase tracking-wider border-b border-[#E87A36]/10 pb-0.5 text-[8px]">
                    Experience
                  </h4>
                  <div className="space-y-2 mt-1.5">
                    <div>
                      <div className="flex justify-between items-center text-[7.5px] font-black text-stone-800">
                        <span>Lead Engineer @ Stripe</span>
                        <span className="text-stone-450 text-stone-400">2024 - Pres</span>
                      </div>
                      <p className="text-[7px] text-stone-600 mt-0.5 leading-normal">
                        Scaled transaction payment components managing $2B+ in annual capital.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[7.5px] font-black text-stone-800">
                        <span>Software Engineer @ Notion</span>
                        <span className="text-stone-450 text-stone-400">2022 - 2024</span>
                      </div>
                      <p className="text-[7px] text-stone-600 mt-0.5 leading-normal">
                        Designed core collaborative elements, improving sync performance by 25%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "executive":
        return (
          <div className="w-full h-full bg-[#FCFBF7] text-stone-800 p-6 flex flex-col justify-between text-left font-serif overflow-y-auto">
            <div>
              {/* Centered Header */}
              <div className="pb-3 border-b border-stone-300 mb-3 text-center">
                <h4 className="font-bold tracking-tight text-stone-900 text-base">{name}</h4>
                <div className="font-semibold uppercase tracking-wider text-[#6E4A35] text-[8px] mt-0.5">
                  {title}
                </div>
                <div className="text-[7px] text-stone-500 mt-1 flex justify-center gap-3">
                  <span>s.jenkins@company.com</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-3.5">
                <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Summary</h5>
                <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-3.5">
                <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Experience</h5>
                <div className="space-y-2 mt-1">
                  <div>
                    <div className="flex justify-between items-center text-[7.5px] font-bold text-stone-800">
                      <span>Lead Software Engineer — Stripe</span>
                      <span className="text-stone-450 text-stone-400">2024 - Present</span>
                    </div>
                    <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                      Scaled transaction payment components managing $2B+ in annual capital.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[7.5px] font-bold text-stone-800">
                      <span>Software Engineer II — Notion</span>
                      <span className="text-stone-450 text-stone-400">2022 - 2024</span>
                    </div>
                    <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                      Designed core collaborative elements, improving offline sync benchmarks by 25%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Skills</h5>
              <div className="flex flex-wrap gap-1 mt-1">
                {skills.map((skill) => (
                  <span key={skill} className="text-[7px] font-bold border border-stone-250 bg-stone-50 px-1.5 py-0.5 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "tech":
      default:
        return (
          <div className="w-full h-full bg-white text-stone-850 p-6 flex flex-col justify-between text-left font-sans overflow-y-auto">
            <div>
              {/* Left Aligned Header */}
              <div className="pb-3 border-b border-stone-200 mb-3">
                <h4 className="font-black tracking-tight text-stone-900 text-base">{name}</h4>
                <div className="font-bold uppercase tracking-wide text-[#67B0A7] text-[8px] mt-0.5">
                  {title}
                </div>
                <div className="text-[7.5px] text-stone-405 text-stone-400 mt-1 flex gap-3">
                  <span>s.jenkins@company.com</span>
                  <span>•</span>
                  <span>SF, CA</span>
                </div>
              </div>

              {/* Grid System for two column */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 space-y-3.5">
                  {/* Summary */}
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Summary</h5>
                    <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
                  </div>
                  {/* Experience */}
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Experience</h5>
                    <div className="space-y-2 mt-1">
                      <div>
                        <div className="font-bold text-stone-850 text-[8px]">Lead Software Engineer @ Stripe</div>
                        <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                          Scaled payment components managing $2B+ capital.
                        </p>
                      </div>
                      <div>
                        <div className="font-bold text-stone-850 text-[8px]">Software Engineer @ Notion</div>
                        <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                          Improved Notion offline sync benchmarks by 25%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 space-y-3">
                  <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Tech Stack</h5>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <span key={skill} className="text-[7px] font-bold px-1.5 py-0.5 rounded-sm border border-stone-150 bg-stone-50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-stone-400 pt-2 border-t flex justify-between text-[7px] mt-2">
              <span>sarahjenkins.dev</span>
              <span>SF, CA</span>
            </div>
          </div>
        );
    }
  };  return (
    <section id="resume-builder-demo" className="py-24 bg-zinc-950 text-white relative z-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/90 text-amber-450 text-xs font-black uppercase tracking-widest border border-amber-450/40 shadow-xl mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-450" />
              Interactive Sandbox Demo
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Real-time designer customization
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-medium">
              Toggle styles, customize experiences, and use our AI Tone Modifier directly inside the sandbox to preview the experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Demo container */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Editor Control Panel */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
              <div>
                {/* Header Toggles */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        activeTab === "content"
                          ? "bg-zinc-800 border-zinc-700 text-white shadow-sm"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-350"
                      }`}
                    >
                      Resume Editor
                    </button>
                    <button
                      onClick={() => setActiveTab("sections")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        activeTab === "sections"
                          ? "bg-zinc-800 border-zinc-700 text-white shadow-sm"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-350"
                      }`}
                    >
                      Layout Templates
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Editor Connected
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === "content" ? (
                  <div className="space-y-6 mt-6">
                    {/* Name & Title Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-450 focus:ring-1 focus:ring-amber-450/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Role Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-450 focus:ring-1 focus:ring-amber-450/30"
                        />
                      </div>
                    </div>

                    {/* AI Summary Optimizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Professional Summary</label>
                        <button
                          onClick={handleImproveSummary}
                          disabled={showSummaryAi}
                          className="text-[10px] font-bold text-amber-400 flex items-center gap-1 hover:text-amber-350 bg-amber-450/10 px-2.5 py-1 rounded-md border border-amber-450/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                          {showSummaryAi ? "Polishing..." : "AI Improve"}
                        </button>
                      </div>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-450 focus:ring-1 focus:ring-amber-450/30 leading-relaxed resize-none"
                      />
                    </div>

                    {/* Skills Adder */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Skills Matrix</label>
                      <form onSubmit={handleAddSkill} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add new skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="flex-1 bg-zinc-950 border border-zinc-850 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-450 focus:ring-1 focus:ring-amber-450/30"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-amber-400 text-black rounded-xl text-xs font-bold hover:bg-amber-300 flex items-center justify-center shadow-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </form>

                      {/* Displaying tag capsules */}
                      <div className="flex flex-wrap gap-1.5 pt-2 max-h-[100px] overflow-y-auto">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            onClick={() => handleRemoveSkill(skill)}
                            className="group text-[10px] font-bold text-zinc-300 bg-zinc-950 hover:bg-red-500/10 hover:text-red-400 px-2.5 py-1 rounded-lg border border-zinc-800 cursor-pointer flex items-center gap-1 transition-colors"
                            title="Click to remove"
                          >
                            {skill}
                            <span className="text-zinc-500 group-hover:text-red-400 font-normal">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Choose Theme Style</label>
                    <div className="space-y-3">
                      {/* Tech Style Option */}
                      <button
                        onClick={() => setSelectedStyle("tech")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "tech"
                            ? "border-amber-450 bg-amber-450/5 shadow-xs"
                            : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">The Technologist (Default)</h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Clean sans-serif fonts with modern two-column layout.</p>
                        </div>
                        {selectedStyle === "tech" && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>

                      {/* Executive Style Option */}
                      <button
                        onClick={() => setSelectedStyle("executive")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "executive"
                            ? "border-amber-450 bg-amber-450/5 shadow-xs"
                            : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">The Executive (Academic)</h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Formal serif styling with centered branding headers.</p>
                        </div>
                        {selectedStyle === "executive" && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>

                      {/* Creative Style Option */}
                      <button
                        onClick={() => setSelectedStyle("creative")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "creative"
                            ? "border-amber-450 bg-amber-450/5 shadow-xs"
                            : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">The Creative Developer</h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5">High-contrast layout with a left sidebar profile column.</p>
                        </div>
                        {selectedStyle === "creative" && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Banner bottom */}
              <div className="pt-6 border-t border-zinc-800 mt-8 text-center">
                <Link
                  href="/auth?mode=register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer w-full"
                >
                  <FileText className="w-4 h-4 text-black" /> Save PDF Layout Now
                </Link>
              </div>
            </div>

            {/* Resume Sheet Preview Area with Browser Frame */}
            <div className="lg:col-span-7 bg-zinc-900/40 p-4 sm:p-8 rounded-3xl flex items-center justify-center border border-zinc-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] min-h-[500px]">
              <div className="relative w-full max-w-[450px] bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between border-b border-zinc-850/80 px-4 py-2 bg-zinc-950/40 shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1 bg-zinc-950/65 px-2.5 py-0.5 rounded-md border border-zinc-800 text-[8px] text-zinc-400 font-medium">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span>resumeflow.ai/canvas</span>
                  </div>
                  <div className="w-8"></div>
                </div>
                {/* Resume Sheet */}
                <div className="w-full aspect-[1/1.414] overflow-hidden bg-white">
                  {renderResumeSandbox()}
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
