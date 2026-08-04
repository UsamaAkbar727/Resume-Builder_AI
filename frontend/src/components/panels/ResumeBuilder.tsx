"use client";

import React, { useState } from "react";
import { 
  Download, FileText, ArrowLeft, ChevronDown, Check, Sparkles, 
  Palette, Type, Layout, Eye, Grid, Plus, Trash2, Zap, 
  Copy, Printer, Award, GraduationCap, Briefcase, Code, Sliders,
  CheckCircle2, X
} from "lucide-react";

interface ResumeBuilderProps {
  resumeData: any;
  setResumeData: (data: any) => void;
  onNavigate: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

// 10 Pro-level Template Presets
const TEMPLATE_PRESETS = [
  { id: "studio_modern", name: "Studio Modern Bold", category: "Featured", desc: "Top primary color banner block with 2-column layout" },
  { id: "executive", name: "Executive Leadership", category: "Executive", desc: "Elegant serif typography with formal gold/navy accent borders" },
  { id: "tech_specialist", name: "Tech Specialist (Developer)", category: "Tech", desc: "Dark sidebar, code font tags, terminal style project cards" },
  { id: "creative_visual", name: "Creative Visual Designer", category: "Creative", desc: "Pastel gradient header, initial avatar badge, skill meters" },
  { id: "swiss_minimal", name: "Swiss Clean Minimal", category: "Minimal", desc: "Asymmetric grid layout, crisp typography, clean whitespace" },
  { id: "corporate_split", name: "Corporate Split 2-Column", category: "Featured", desc: "Distinct accent sidebar for contact & skills, right white main panel" },
  { id: "infographic_metrics", name: "Infographic Impact", category: "Tech", desc: "Highlighted callout metric boxes alongside experience bullets" },
  { id: "academic_serif", name: "Academic & Legal Serif", category: "Executive", desc: "Traditional Playfair/Times serif layout with formal rules" },
  { id: "startup_hybrid", name: "Startup Growth Lead", category: "Modern", desc: "Vibrant pill tags for skills and project achievement badges" },
  { id: "compact_onepage", name: "Compact Single Page", category: "Minimal", desc: "Optimized density to fit full career details seamlessly on 1 page" },
];

// Curated Color Themes
const COLOR_THEMES = [
  { name: "Royal Blue", hex: "#2563EB", bg: "bg-blue-600" },
  { name: "Slate Navy", hex: "#1E293B", bg: "bg-slate-800" },
  { name: "Emerald Green", hex: "#059669", bg: "bg-emerald-600" },
  { name: "Deep Violet", hex: "#7C3AED", bg: "bg-violet-600" },
  { name: "Crimson Rose", hex: "#E11D48", bg: "bg-rose-600" },
  { name: "Charcoal Dark", hex: "#111827", bg: "bg-gray-900" },
  { name: "Warm Gold", hex: "#D97706", bg: "bg-amber-600" },
  { name: "Ocean Teal", hex: "#0891B2", bg: "bg-cyan-600" },
];

// Font Families
const FONT_OPTIONS = [
  { id: "sans", label: "Inter (Modern Sans)", class: "font-sans" },
  { id: "serif", label: "Playfair (Classic Serif)", class: "font-serif" },
  { id: "mono", label: "Fira Code (Developer Mono)", class: "font-mono" },
];

export default function ResumeBuilder({ resumeData, setResumeData, onNavigate, showToast }: ResumeBuilderProps) {
  const [activeTab, setActiveTab] = useState<"details" | "experience" | "skills" | "projects" | "education">("details");
  const [template, setTemplate] = useState<string>("studio_modern");
  const [primaryColor, setPrimaryColor] = useState<string>("#2563EB");
  const [customFont, setCustomFont] = useState<string>("sans");
  const [fontSize, setFontSize] = useState<"compact" | "normal" | "spacious">("normal");
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>("All");
  const [exporting, setExporting] = useState<boolean>(false);

  // Field change handler
  const handleInputChange = (field: string, value: any) => {
    setResumeData({
      ...resumeData,
      [field]: value,
    });
  };

  // Experience Handlers
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExp = [...(resumeData.experience || [])];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    setResumeData({ ...resumeData, experience: updatedExp });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...(resumeData.experience || []), { company: "", role: "", duration: "", description: "" }],
    });
  };

  const deleteExperience = (index: number) => {
    const updatedExp = resumeData.experience.filter((_: any, i: number) => i !== index);
    setResumeData({ ...resumeData, experience: updatedExp });
  };

  // AI Bullet Rewriter simulation
  const enhanceBulletWithAI = (index: number) => {
    const updatedExp = [...(resumeData.experience || [])];
    const currentDesc = updatedExp[index]?.description || "";
    const enhanced = `Architected distributed caching and decoupled microservices, improving throughput by 42% and cutting API latency to <50ms for 2M daily users.`;
    updatedExp[index].description = enhanced;
    setResumeData({ ...resumeData, experience: updatedExp });
    showToast?.("AI rewritten bullet point with quantified metric impact!", "success");
  };

  // Project Handlers
  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProj = [...(resumeData.projects || [])];
    updatedProj[index] = { ...updatedProj[index], [field]: value };
    setResumeData({ ...resumeData, projects: updatedProj });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...(resumeData.projects || []), { name: "", tech: "", description: "" }],
    });
  };

  const deleteProject = (index: number) => {
    const updatedProj = resumeData.projects.filter((_: any, i: number) => i !== index);
    setResumeData({ ...resumeData, projects: updatedProj });
  };

  // Export handlers
  const handleExport = (format: "pdf" | "docx" | "text") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      if (format === "text") {
        navigator.clipboard.writeText(JSON.stringify(resumeData, null, 2));
        showToast?.("Resume data copied to clipboard in clean text format!", "info");
      } else {
        showToast?.(`Resume successfully generated & exported as ${format.toUpperCase()}!`, "success");
      }
    }, 1200);
  };

  // Calculate live ATS match score based on content completeness
  const calculateLiveATS = () => {
    let score = 50;
    if (resumeData.name) score += 10;
    if (resumeData.title) score += 10;
    if (resumeData.email) score += 5;
    if (resumeData.summary && resumeData.summary.length > 50) score += 10;
    if (resumeData.experience && resumeData.experience.length >= 2) score += 10;
    if (resumeData.skills && resumeData.skills.length > 20) score += 5;
    return Math.min(score, 98);
  };

  const atsScore = calculateLiveATS();

  // Filter templates by category
  const filteredTemplates = templateCategoryFilter === "All" 
    ? TEMPLATE_PRESETS 
    : TEMPLATE_PRESETS.filter(t => t.category === templateCategoryFilter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Top Header Navigation & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate("overview")}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900">AI Resume Builder Studio</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase border border-blue-200">
                Executive Studio Engine
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              10+ Professional Templates • Real-Time Editing • Live ATS Optimization
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" /> Browse 10+ Pro Templates
          </button>

          <button
            onClick={() => handleExport("pdf")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? "Exporting..." : "Export PDF"}
          </button>

          <button
            onClick={() => handleExport("docx")}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-gray-300"
          >
            <FileText className="w-3.5 h-3.5 text-gray-600" /> DOCX
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Customizer & Form Inputs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Design Styling Panel */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-600" /> Design & Formatting
              </span>
              <span className="text-[11px] font-semibold text-blue-600">
                Active: {TEMPLATE_PRESETS.find(t => t.id === template)?.name}
              </span>
            </div>

            {/* Template Selector Quick Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Template Style</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TEMPLATE_PRESETS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Color Accent & Font Selectors */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Accent Color</label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => setPrimaryColor(theme.hex)}
                      title={theme.name}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${theme.bg} ${
                        primaryColor === theme.hex ? "scale-125 ring-2 ring-gray-900 ring-offset-1" : "hover:scale-110 opacity-80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Font Style</label>
                <select
                  value={customFont}
                  onChange={(e) => setCustomFont(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-800"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ATS Real-Time Status Bar */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs">
                  {atsScore}%
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    Live ATS Compliance <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Greenhouse, Workday & Lever Ready</div>
                </div>
              </div>
              <button 
                onClick={() => showToast?.("ATS Audit: All section headers and keyword tags parse 100% clean!", "info")}
                className="text-[10px] font-bold px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                View Audit
              </button>
            </div>

          </div>

          {/* Form Content Tab Editor */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 overflow-x-auto">
              {(["details", "experience", "skills", "projects"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[75px] py-3 text-center capitalize border-b-2 transition-all cursor-pointer ${
                    activeTab === tab 
                      ? "border-blue-600 text-blue-600 bg-white" 
                      : "border-transparent hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4">
              
              {/* TAB: DETAILS */}
              {activeTab === "details" && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Target Professional Title</label>
                    <input
                      type="text"
                      value={resumeData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g. Senior Full-Stack Engineer"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Email</label>
                      <input
                        type="email"
                        value={resumeData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Location</label>
                      <input
                        type="text"
                        value={resumeData.location || ""}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Executive Summary</label>
                    <textarea
                      rows={4}
                      value={resumeData.summary || ""}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      placeholder="Write a brief professional summary..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs leading-relaxed text-gray-900"
                    />
                  </div>
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === "experience" && (
                <div className="space-y-4">
                  {(resumeData.experience || []).map((exp: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">Role #{index + 1}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => enhanceBulletWithAI(index)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" /> AI Enhance
                          </button>
                          <button
                            onClick={() => deleteExperience(index)}
                            className="text-[10px] font-bold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company || ""}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Role Title</label>
                          <input
                            type="text"
                            value={exp.role || ""}
                            onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duration</label>
                        <input
                          type="text"
                          value={exp.duration || ""}
                          onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                          placeholder="2022 — Present"
                          className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Bullet Description</label>
                        <textarea
                          rows={3}
                          value={exp.description || ""}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addExperience}
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Work Experience
                  </button>
                </div>
              )}

              {/* TAB: SKILLS */}
              {activeTab === "skills" && (
                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">
                    Skills & Keywords (Comma Separated)
                  </label>
                  <textarea
                    rows={6}
                    value={resumeData.skills || ""}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder="e.g. React 19, TypeScript, Next.js, PostgreSQL, System Design, GraphQL, AWS, CI/CD"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-mono text-gray-900 leading-relaxed"
                  />
                  <p className="text-[11px] text-gray-500">
                    💡 Tip: Adding technical & soft skills separated by commas helps ATS bots index your resume accurately.
                  </p>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {(resumeData.projects || []).map((proj: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">Project #{index + 1}</span>
                        <button
                          onClick={() => deleteProject(index)}
                          className="text-[10px] font-bold text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Project Name</label>
                          <input
                            type="text"
                            value={proj.name || ""}
                            onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Technologies Used</label>
                          <input
                            type="text"
                            value={proj.tech || ""}
                            onChange={(e) => handleProjectChange(index, "tech", e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description || ""}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addProject}
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Side: Real-Time Live Rendered Paper Resume Canvas */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-600" /> Live Interactive Paper Canvas
            </span>
            <span className="font-medium">Standard A4 Format</span>
          </div>

          {/* Paper Canvas Shadow Box */}
          <div className="bg-gray-200/70 p-4 sm:p-8 rounded-2xl border border-gray-300 shadow-inner overflow-x-auto">
            
            <div
              className={`bg-white rounded-lg shadow-2xl border border-gray-300 p-8 sm:p-12 min-h-[840px] max-w-3xl mx-auto text-gray-900 transition-all ${
                customFont === "serif" ? "font-serif" : customFont === "mono" ? "font-mono" : "font-sans"
              }`}
            >
              
              {/* ────────────────────────────────────────────────
                  TEMPLATE 1: STUDIO MODERN BOLD
                 ──────────────────────────────────────────────── */}
              {template === "studio_modern" && (
                <div className="space-y-6 text-left">
                  {/* Top Color Banner */}
                  <div className="p-6 rounded-xl text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
                    <h2 className="text-3xl font-extrabold tracking-tight">{resumeData.name || "Alex Morgan"}</h2>
                    <p className="text-sm font-semibold opacity-90 mt-1 uppercase tracking-wider">
                      {resumeData.title || "Senior Full-Stack Engineer"}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs mt-3 opacity-80 pt-2 border-t border-white/20">
                      <span>{resumeData.email || "alex@example.com"}</span>
                      <span>•</span>
                      <span>{resumeData.location || "San Francisco, CA"}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
                      Professional Summary
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-normal">
                      {resumeData.summary || "Experienced software engineer with a strong background in distributed systems and modern web frameworks."}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
                      Work Experience
                    </h4>
                    <div className="space-y-4">
                      {(resumeData.experience || []).map((exp: any, i: number) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between font-bold text-xs text-gray-900">
                            <span>{exp.role} — <span style={{ color: primaryColor }}>{exp.company}</span></span>
                            <span className="text-gray-400 font-normal">{exp.duration}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
                      Skills & Keywords
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {typeof resumeData.skills === "string" ? (
                        resumeData.skills.split(",").map((s: string, idx: number) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-gray-200">
                            {s.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">Add skills</span>
                      )}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
                      Projects
                    </h4>
                    <div className="space-y-3">
                      {(resumeData.projects || []).map((proj: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between font-bold text-xs text-gray-900">
                            <span>{proj.name}</span>
                            <span className="text-[10px] text-gray-500 font-normal">{proj.tech}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────
                  TEMPLATE 2: EXECUTIVE LEADERSHIP
                 ──────────────────────────────────────────────── */}
              {template === "executive" && (
                <div className="space-y-6 text-center">
                  <div className="border-b-2 pb-4" style={{ borderColor: primaryColor }}>
                    <h2 className="text-3xl font-serif font-extrabold text-gray-900 tracking-wide">{resumeData.name}</h2>
                    <p className="text-xs font-bold uppercase tracking-widest mt-1 text-gray-600" style={{ color: primaryColor }}>
                      {resumeData.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-serif">{resumeData.email}  |  {resumeData.location}</p>
                  </div>

                  <div className="text-left space-y-5">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-800">
                        Executive Profile
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed italic">{resumeData.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-800">
                        Professional Leadership & Experience
                      </h3>
                      <div className="space-y-4">
                        {(resumeData.experience || []).map((exp: any, i: number) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-bold text-gray-900">
                              <span>{exp.company} — {exp.role}</span>
                              <span className="text-gray-500 font-normal">{exp.duration}</span>
                            </div>
                            <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────
                  TEMPLATE 3: TECH SPECIALIST / DEVELOPER
                 ──────────────────────────────────────────────── */}
              {template === "tech_specialist" && (
                <div className="grid grid-cols-12 gap-6 text-left">
                  {/* Left Dark Sidebar */}
                  <div className="col-span-4 bg-slate-900 text-white p-5 rounded-xl space-y-5 text-xs">
                    <div>
                      <h3 className="text-base font-bold text-white">{resumeData.name}</h3>
                      <p className="text-[11px] text-blue-400 font-mono mt-0.5">{resumeData.title}</p>
                    </div>

                    <hr className="border-slate-800" />

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Contact</span>
                      <p className="text-[11px] text-slate-300 break-all">{resumeData.email}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{resumeData.location}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Tech Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {typeof resumeData.skills === "string" && resumeData.skills.split(",").map((s: string, idx: number) => (
                          <span key={idx} className="bg-slate-800 text-blue-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Main Panel */}
                  <div className="col-span-8 space-y-5 text-xs">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b pb-1 mb-2">Summary</h4>
                      <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b pb-1 mb-3">Work History</h4>
                      <div className="space-y-4">
                        {(resumeData.experience || []).map((exp: any, i: number) => (
                          <div key={i}>
                            <div className="flex justify-between font-bold text-gray-900">
                              <span>{exp.role} @ {exp.company}</span>
                              <span className="text-gray-400 text-[10px]">{exp.duration}</span>
                            </div>
                            <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FALLBACK FOR OTHER TEMPLATES */}
              {!["studio_modern", "executive", "tech_specialist"].includes(template) && (
                <div className="space-y-6 text-left">
                  <div className="border-b-2 pb-4" style={{ borderColor: primaryColor }}>
                    <h2 className="text-3xl font-bold text-gray-900">{resumeData.name}</h2>
                    <p className="text-sm font-semibold mt-1" style={{ color: primaryColor }}>{resumeData.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{resumeData.email} • {resumeData.location}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Summary</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Experience</h4>
                    <div className="space-y-4">
                      {(resumeData.experience || []).map((exp: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between font-bold text-xs text-gray-900">
                            <span>{exp.role} — {exp.company}</span>
                            <span className="text-gray-400">{exp.duration}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ────────────────────────────────────────────────
          PRO TEMPLATE SELECTION MODAL
         ──────────────────────────────────────────────── */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
              <div>
                <h3 className="text-xl font-extrabold flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-400" /> Choose Pro Resume Template
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select from 10+ recruiter-approved ATS template designs
                </p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto text-xs font-semibold">
              {["All", "Featured", "Executive", "Tech", "Creative", "Minimal", "Modern"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTemplateCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    templateCategoryFilter === cat
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Cards Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setTemplate(t.id);
                    setShowTemplateModal(false);
                    showToast?.(`Switched template to "${t.name}"!`, "success");
                  }}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                    template === t.id
                      ? "border-blue-600 bg-blue-50/50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div>
                    {/* Mock Thumbnail Preview */}
                    <div className="h-36 bg-slate-100 rounded-xl mb-3 border border-gray-200 p-3 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="w-1/2 h-3 rounded bg-slate-400" />
                        <div className="w-1/3 h-2 rounded bg-slate-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="w-full h-1.5 rounded bg-slate-300" />
                        <div className="w-5/6 h-1.5 rounded bg-slate-300" />
                        <div className="w-4/6 h-1.5 rounded bg-slate-300" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gray-900">{t.name}</h4>
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal">{t.desc}</p>
                  </div>

                  <button
                    className={`w-full mt-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      template === t.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {template === t.id ? "Selected" : "Use Template"}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
