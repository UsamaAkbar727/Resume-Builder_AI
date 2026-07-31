"use client";

import React, { useState } from "react";
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
          wrapper: "font-serif bg-[#FCFBF7] text-[#1E293B]",
          header: "border-b border-[#94A3B8] pb-4 mb-4 text-center",
          name: "text-2xl font-bold tracking-tight text-[#1E3A8A]",
          title: "text-xs font-semibold tracking-wider text-slate-500 uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-[#1E3A8A] border-b border-slate-200 pb-1 mb-2",
        };
      case "creative":
        return {
          wrapper: "font-sans bg-[#FAFAFA] text-[#2D3748]",
          header: "border-l-4 border-indigo-600 pl-4 py-2 mb-4 text-left",
          name: "text-2xl font-black tracking-tight text-slate-800",
          title: "text-xs font-bold text-indigo-600 uppercase mt-0.5",
          sectionHeading: "text-xs font-black tracking-wide text-indigo-600 mb-2 uppercase border-b border-indigo-100 pb-0.5",
        };
      case "tech":
      default:
        return {
          wrapper: "font-sans bg-white text-slate-800",
          header: "border-b border-slate-200 pb-4 mb-4 text-left",
          name: "text-2xl font-extrabold tracking-tight text-slate-900",
          title: "text-xs font-semibold text-blue-600 uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 mb-2",
        };
    }
  };

  const styleClasses = getStyleClasses();

  return (
    <section id="resume-builder-demo" className="py-24 bg-slate-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-blue-700 mb-4 border border-blue-100/50">
              Interactive Builder Preview
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Real-time designer customization
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
              Toggle styles, customize experiences, and use our AI Tone Modifier directly inside the sandbox to preview the experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Demo container */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Editor Control Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05)]">
              <div>
                {/* Header Toggles */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "content"
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Resume Editor
                    </button>
                    <button
                      onClick={() => setActiveTab("sections")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "sections"
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Layout Templates
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    Live Editor Connected
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === "content" ? (
                  <div className="space-y-6 mt-6">
                    {/* Name & Title Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Role Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* AI Summary Optimizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Professional Summary</label>
                        <button
                          onClick={handleImproveSummary}
                          disabled={showSummaryAi}
                          className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                          {showSummaryAi ? "Polishing..." : "AI Improve"}
                        </button>
                      </div>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                      />
                    </div>

                    {/* Skills Adder */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Skills Matrix</label>
                      <form onSubmit={handleAddSkill} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add new skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center shadow-sm"
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
                            className="group text-[10px] font-bold text-slate-600 bg-slate-100/80 hover:bg-red-50 hover:text-red-600 px-2.5 py-1 rounded-lg border border-slate-200/50 cursor-pointer flex items-center gap-1 transition-colors"
                            title="Click to remove"
                          >
                            {skill}
                            <span className="text-slate-400 group-hover:text-red-400 font-normal">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Choose Theme Style</label>
                    <div className="space-y-3">
                      {/* Tech Style Option */}
                      <button
                        onClick={() => setSelectedStyle("tech")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                          selectedStyle === "tech"
                            ? "border-blue-500 bg-blue-50/20 shadow-xs"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">The Technologist (Default)</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Clean sans-serif fonts with modern blue accents.</p>
                        </div>
                        {selectedStyle === "tech" && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                      </button>

                      {/* Executive Style Option */}
                      <button
                        onClick={() => setSelectedStyle("executive")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                          selectedStyle === "executive"
                            ? "border-blue-500 bg-blue-50/20 shadow-xs"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">The Executive (Academic)</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Formal serif styling with centered branding headers.</p>
                        </div>
                        {selectedStyle === "executive" && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                      </button>

                      {/* Creative Style Option */}
                      <button
                        onClick={() => setSelectedStyle("creative")}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                          selectedStyle === "creative"
                            ? "border-blue-500 bg-blue-50/20 shadow-xs"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">The Creative Developer</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Left sidebar highlighting with vibrant indigo borders.</p>
                        </div>
                        {selectedStyle === "creative" && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Banner bottom */}
              <div className="pt-6 border-t border-slate-100 mt-8 text-center">
                <Link
                  href="/auth?mode=register"
                  className="clay-btn-primary w-full py-3 text-xs text-white font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 hover:shadow-lg"
                >
                  <FileText className="w-4 h-4" /> Save PDF Layout Now
                </Link>
              </div>
            </div>

            {/* Resume Sheet Preview Area */}
            <div className="lg:col-span-7 bg-[#E2E8F0] p-4 sm:p-8 rounded-3xl flex items-center justify-center border border-slate-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.06)] min-h-[500px]">
              <div
                className={`w-full max-w-[500px] aspect-[1/1.414] rounded-xs shadow-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 ${styleClasses.wrapper}`}
              >
                {/* Header Segment */}
                <div className={styleClasses.header}>
                  <h3 className={styleClasses.name}>{name}</h3>
                  <div className={styleClasses.title}>{title}</div>
                  <div className="text-[9px] text-slate-400 mt-1 flex justify-center gap-3">
                    <span>s.jenkins@company.com</span>
                    <span>•</span>
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Summary Segment */}
                <div className="mb-4">
                  <h4 className={styleClasses.sectionHeading}>Summary</h4>
                  <p className="text-[9.5px] leading-relaxed text-slate-600">{summary}</p>
                </div>

                {/* Work Experience */}
                <div className="mb-4">
                  <h4 className={styleClasses.sectionHeading}>Experience</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-900">Lead Software Engineer</span>
                        <span className="text-[9px] text-slate-400 font-semibold">2024 - Present</span>
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-500">Stripe</div>
                      <p className="text-[9px] text-slate-600 mt-0.5 leading-relaxed">
                        Scaled transaction payment components managing $2B+ in annual capital. Led microservice deployments inside containerized node architectures.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-900">Software Engineer II</span>
                        <span className="text-[9px] text-slate-400 font-semibold">2022 - 2024</span>
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-500">Notion</div>
                      <p className="text-[9px] text-slate-600 mt-0.5 leading-relaxed">
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
                        className="text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm border border-slate-200/50"
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
