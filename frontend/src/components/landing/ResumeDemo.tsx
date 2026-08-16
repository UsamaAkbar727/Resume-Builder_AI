"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, FileText, Check, Layout, Plus, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./Animations";
import AltaCVTemplate from "@/components/templates/AltaCVTemplate";
import ModernCVTemplate from "@/components/templates/ModernCVTemplate";
import FlowCVTemplate from "@/components/templates/FlowCVTemplate";

export default function ResumeDemo() {
  const [selectedStyle, setSelectedStyle] = useState<"tech" | "executive" | "creative">("tech");
  const [activeTab, setActiveTab] = useState<"content" | "sections">("content");
  
  // Custom resume data state
  const [name, setName] = useState("Usama Jutt");
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
    const resumeData = {
      name: name,
      title: title,
      email: "s.jenkins@company.com",
      location: "San Francisco, CA",
      summary: summary,
      skills: skills,
      experience: [
        {
          role: "Lead Software Engineer",
          company: "Stripe",
          duration: "2024 - Present",
          description: "Scaled payment components managing $2B+ in annual transaction capital."
        },
        {
          role: "Software Engineer",
          company: "Notion",
          duration: "2022 - 2024",
          description: "Improved collaborative databases and workspace sync performance benchmarks by 25%."
        }
      ]
    };

    switch (selectedStyle) {
      case "creative":
        return (
          <div className="p-5 h-full overflow-y-auto bg-white text-slate-800 text-[10px] scale-[0.85] origin-top">
            <AltaCVTemplate resumeData={resumeData} primaryColor="#E87A36" fontClass="font-sans" />
          </div>
        );

      case "executive":
        return (
          <div className="p-5 h-full overflow-y-auto bg-[#FCFBF8] text-slate-800 text-[10px] scale-[0.85] origin-top">
            <ModernCVTemplate resumeData={resumeData} primaryColor="#6E4A35" fontClass="font-serif" />
          </div>
        );

      case "tech":
      default:
        return (
          <div className="p-5 h-full overflow-y-auto bg-white text-slate-800 text-[10px] scale-[0.85] origin-top">
            <FlowCVTemplate resumeData={resumeData} primaryColor="#67B0A7" fontClass="font-sans" />
          </div>
        );
    }
  };

  return (
    <section id="resume-builder-demo" className="py-24 bg-[#fbfbfc] text-zinc-900 relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-705 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Interactive Sandbox Demo
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
              Real-time designer customization
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto font-semibold font-display">
              Toggle styles, customize experiences, and use our AI Tone Modifier directly inside the sandbox to preview the experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Demo container */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Editor Control Panel */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-zinc-200/20">
              <div>
                {/* Header Toggles */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <div className="flex gap-2 font-display">
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        activeTab === "content"
                          ? "bg-zinc-100 border-zinc-200 text-zinc-900 shadow-sm"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      Resume Editor
                    </button>
                    <button
                      onClick={() => setActiveTab("sections")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        activeTab === "sections"
                          ? "bg-zinc-100 border-zinc-200 text-zinc-900 shadow-sm"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      Layout Templates
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Editor Connected
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === "content" ? (
                  <div className="space-y-6 mt-6">
                    {/* Name & Title Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Role Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                        />
                      </div>
                    </div>

                    {/* AI Summary Optimizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Professional Summary</label>
                        <button
                          onClick={handleImproveSummary}
                          disabled={showSummaryAi}
                          className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 hover:bg-indigo-100 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-display"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-650 text-indigo-600 animate-pulse" />
                          {showSummaryAi ? "Polishing..." : "AI Improve"}
                        </button>
                      </div>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 leading-relaxed resize-none font-sans"
                      />
                    </div>

                    {/* Skills Adder */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Skills Matrix</label>
                      <form onSubmit={handleAddSkill} className="flex gap-2 font-display">
                        <input
                          type="text"
                          placeholder="Add new skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl text-xs font-bold flex items-center justify-center shadow-sm cursor-pointer"
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
                            className="group text-[10px] font-bold text-zinc-800 bg-zinc-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 px-2.5 py-1 rounded-lg border border-zinc-200 cursor-pointer flex items-center gap-1 transition-colors font-display"
                            title="Click to remove"
                          >
                            {skill}
                            <span className="text-zinc-400 group-hover:text-red-650 font-normal">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Choose Theme Style</label>
                    <div className="space-y-3">
                      {/* Tech Style Option */}
                      <button
                        onClick={() => setSelectedStyle("tech")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "tech"
                            ? "border-indigo-600 bg-indigo-50/20 shadow-xs"
                            : "border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 font-display">The Technologist (Default)</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5 font-semibold">Clean sans-serif fonts with modern two-column layout.</p>
                        </div>
                        {selectedStyle === "tech" && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>

                      {/* Executive Style Option */}
                      <button
                        onClick={() => setSelectedStyle("executive")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "executive"
                            ? "border-indigo-600 bg-indigo-50/20 shadow-xs"
                            : "border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 font-display">The Executive (Academic)</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5 font-semibold">Formal serif styling with centered branding headers.</p>
                        </div>
                        {selectedStyle === "executive" && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>

                      {/* Creative Style Option */}
                      <button
                        onClick={() => setSelectedStyle("creative")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "creative"
                            ? "border-indigo-600 bg-indigo-50/20 shadow-xs"
                            : "border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50/50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 font-display">The Creative Developer</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5 font-semibold">High-contrast layout with a left sidebar profile column.</p>
                        </div>
                        {selectedStyle === "creative" && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Banner bottom */}
              <div className="pt-6 border-t border-zinc-100 mt-8 text-center font-display">
                <Link
                  href="/auth?mode=register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-indigo-600/10 transition-all cursor-pointer w-full"
                >
                  <FileText className="w-4 h-4 text-white" /> Save PDF Layout Now
                </Link>
              </div>
            </div>

            {/* Resume Sheet Preview Area with Browser Frame */}
            <div className="lg:col-span-7 bg-zinc-100/70 p-4 sm:p-8 rounded-3xl flex items-center justify-center border border-zinc-200/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] min-h-[500px]">
              <div className="relative w-full max-w-[550px] bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-250/20 overflow-hidden flex flex-col">
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between border-b border-zinc-200/65 px-4 py-2 bg-zinc-50/60 shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-md border border-zinc-200 text-[8px] text-zinc-500 font-medium">
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
