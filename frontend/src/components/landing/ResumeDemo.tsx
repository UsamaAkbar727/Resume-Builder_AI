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

  return (
    <section id="resume-builder-demo" className="py-24 bg-[#F5F2EC] relative z-10 border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-300 text-xs font-black uppercase tracking-widest border border-stone-850 shadow-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Interactive Sandbox Demo
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
              Real-time designer customization
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-medium">
              Toggle styles, customize experiences, and use our AI Tone Modifier directly inside the sandbox to preview the experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Demo container */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Editor Control Panel */}
            <div className="lg:col-span-5 bg-white border border-stone-200/90 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
              <div>
                {/* Header Toggles */}
                <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "content"
                          ? "bg-stone-900 text-white shadow-sm"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Resume Editor
                    </button>
                    <button
                      onClick={() => setActiveTab("sections")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "sections"
                          ? "bg-stone-900 text-white shadow-sm"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Layout Templates
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#67B0A7] animate-ping"></span>
                    Live Editor Connected
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === "content" ? (
                  <div className="space-y-6 mt-6">
                    {/* Name & Title Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-850 focus:outline-none focus:border-stone-550 focus:ring-1 focus:ring-stone-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Role Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-850 focus:outline-none focus:border-stone-550 focus:ring-1 focus:ring-stone-400"
                        />
                      </div>
                    </div>

                    {/* AI Summary Optimizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Professional Summary</label>
                        <button
                          onClick={handleImproveSummary}
                          disabled={showSummaryAi}
                          className="text-[10px] font-bold text-[#E87A36] flex items-center gap-1 hover:text-[#E87A36]/90 bg-[#E87A36]/10 px-2.5 py-1 rounded-md border border-[#E87A36]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-[#E87A36] animate-pulse" />
                          {showSummaryAi ? "Polishing..." : "AI Improve"}
                        </button>
                      </div>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-850 focus:outline-none focus:border-stone-550 focus:ring-1 focus:ring-stone-400 leading-relaxed resize-none"
                      />
                    </div>

                    {/* Skills Adder */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Skills Matrix</label>
                      <form onSubmit={handleAddSkill} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add new skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-850 focus:outline-none focus:border-stone-550 focus:ring-1 focus:ring-stone-400"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-850 flex items-center justify-center shadow-sm cursor-pointer"
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
                            className="group text-[10px] font-bold text-stone-700 bg-stone-100 hover:bg-red-50 hover:text-red-600 px-2.5 py-1 rounded-lg border border-stone-200 cursor-pointer flex items-center gap-1 transition-colors"
                            title="Click to remove"
                          >
                            {skill}
                            <span className="text-stone-400 group-hover:text-red-400 font-normal">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Choose Theme Style</label>
                    <div className="space-y-3">
                      {/* Tech Style Option */}
                      <button
                        onClick={() => setSelectedStyle("tech")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "tech"
                            ? "border-[#67B0A7] bg-[#67B0A7]/5 shadow-xs"
                            : "border-stone-100 hover:border-stone-250 hover:bg-stone-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-stone-850">The Technologist (Default)</h4>
                          <p className="text-[10px] text-stone-450 mt-0.5">Clean sans-serif fonts with modern blue accents.</p>
                        </div>
                        {selectedStyle === "tech" && <CheckCircle2 className="w-4 h-4 text-[#67B0A7] shrink-0" />}
                      </button>

                      {/* Executive Style Option */}
                      <button
                        onClick={() => setSelectedStyle("executive")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "executive"
                            ? "border-[#67B0A7] bg-[#67B0A7]/5 shadow-xs"
                            : "border-stone-100 hover:border-stone-250 hover:bg-stone-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-stone-850">The Executive (Academic)</h4>
                          <p className="text-[10px] text-stone-450 mt-0.5">Formal serif styling with centered branding headers.</p>
                        </div>
                        {selectedStyle === "executive" && <CheckCircle2 className="w-4 h-4 text-[#67B0A7] shrink-0" />}
                      </button>

                      {/* Creative Style Option */}
                      <button
                        onClick={() => setSelectedStyle("creative")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          selectedStyle === "creative"
                            ? "border-[#67B0A7] bg-[#67B0A7]/5 shadow-xs"
                            : "border-stone-100 hover:border-stone-250 hover:bg-stone-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-stone-850">The Creative Developer</h4>
                          <p className="text-[10px] text-stone-450 mt-0.5">Left sidebar highlighting with vibrant indigo borders.</p>
                        </div>
                        {selectedStyle === "creative" && <CheckCircle2 className="w-4 h-4 text-[#67B0A7] shrink-0" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Banner bottom */}
              <div className="pt-6 border-t border-stone-100 mt-8 text-center">
                <Link
                  href="/auth?mode=register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer w-full"
                >
                  <FileText className="w-4 h-4 text-amber-400" /> Save PDF Layout Now
                </Link>
              </div>
            </div>

            {/* Resume Sheet Preview Area */}
            <div className="lg:col-span-7 bg-[#D1C7BD] p-4 sm:p-8 rounded-3xl flex items-center justify-center border border-stone-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.06)] min-h-[500px]">
              <div
                className={`w-full max-w-[500px] aspect-[1/1.414] rounded-xs shadow-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 ${styleClasses.wrapper}`}
              >
                {/* Header Segment */}
                <div className={styleClasses.header}>
                  <h3 className={styleClasses.name}>{name}</h3>
                  <div className={styleClasses.title}>{title}</div>
                  <div className="text-[9px] text-stone-400 mt-1 flex justify-center gap-3">
                    <span>s.jenkins@company.com</span>
                    <span>•</span>
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Summary Segment */}
                <div className="mb-4">
                  <h4 className={styleClasses.sectionHeading}>Summary</h4>
                  <p className="text-[9.5px] leading-relaxed text-stone-600">{summary}</p>
                </div>

                {/* Work Experience */}
                <div className="mb-4">
                  <h4 className={styleClasses.sectionHeading}>Experience</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-stone-900">Lead Software Engineer</span>
                        <span className="text-[9px] text-stone-400 font-semibold">2024 - Present</span>
                      </div>
                      <div className="text-[9.5px] font-semibold text-stone-550">Stripe</div>
                      <p className="text-[9px] text-stone-600 mt-0.5 leading-relaxed">
                        Scaled transaction payment components managing $2B+ in annual capital. Led microservice deployments inside containerized node architectures.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-stone-900">Software Engineer II</span>
                        <span className="text-[9px] text-stone-400 font-semibold">2022 - 2024</span>
                      </div>
                      <div className="text-[9.5px] font-semibold text-stone-550">Notion</div>
                      <p className="text-[9px] text-stone-600 mt-0.5 leading-relaxed">
                        Designed core collaborative elements, improving offline offline sync performance benchmarks by 25%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div>
                  <h4 className={styleClasses.sectionHeading}>Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-sm border border-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
