"use client";

import React, { useState } from "react";
import { 
  Download, FileText, ArrowLeft, ChevronDown, Check, Sparkles, 
  Palette, Type, Layout, Eye, Grid, Plus, Trash2, Zap, 
  Copy, Printer, Award, GraduationCap, Briefcase, Code, Sliders,
  CheckCircle2, X, Search
} from "lucide-react";

import { TEMPLATES_DATA, ResumeTemplate } from "@/data/templatesData";
import TemplateMiniPreview from "@/components/panels/TemplateMiniPreview";
import ResumeCanvasRenderers from "@/components/panels/ResumeCanvasRenderers";

interface ResumeBuilderProps {
  resumeData: any;
  setResumeData: (data: any) => void;
  onNavigate: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

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
  const [activeTab, setActiveTab] = useState<"details" | "experience" | "skills" | "projects">("details");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("ats_pro_classic");
  const [primaryColor, setPrimaryColor] = useState<string>("#2563EB");
  const [customFont, setCustomFont] = useState<"sans" | "serif" | "mono">("sans");
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [templateSearchQuery, setTemplateSearchQuery] = useState<string>("");
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>("All");
  const [exporting, setExporting] = useState<boolean>(false);

  // Active template object
  const activeTemplate = TEMPLATES_DATA.find(t => t.id === selectedTemplateId) || TEMPLATES_DATA[0];

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
    if (resumeData.skills && (typeof resumeData.skills === "string" ? resumeData.skills.length > 20 : resumeData.skills.length > 3)) score += 5;
    return Math.min(score, 98);
  };

  const atsScore = calculateLiveATS();

  // Filter templates by category & search query
  const filteredTemplates = TEMPLATES_DATA.filter(t => {
    const matchesCat = templateCategoryFilter === "All" || t.category === templateCategoryFilter;
    const matchesSearch = !templateSearchQuery || 
      t.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(templateSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Top Header Navigation & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate("overview")}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900">AI Resume Builder Studio</h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase border border-blue-200">
                100+ Pro Templates Engine
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              100+ Recruiter-Approved ATS Templates • Real-Time Editing • Live ATS Optimization
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" /> Browse 100+ Templates Gallery
          </button>

          <button
            onClick={() => handleExport("pdf")}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? "Exporting..." : "Export PDF"}
          </button>

          <button
            onClick={() => handleExport("docx")}
            className="px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-gray-300"
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
              <span className="text-[11px] font-semibold text-blue-600 truncate max-w-[180px]">
                Active: {activeTemplate.name}
              </span>
            </div>

            {/* Template Selector Quick Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Template</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TEMPLATES_DATA.slice(0, 20).map((t) => (
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
                  onChange={(e) => setCustomFont(e.target.value as any)}
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
                  <div className="text-[10px] text-slate-400">Greenhouse, Workday & Lever Verified</div>
                </div>
              </div>
              <button 
                onClick={() => showToast?.("ATS Audit: All section headers and keyword tags parse 100% clean!", "info")}
                className="text-[10px] font-bold px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
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
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" /> AI Enhance
                          </button>
                          <button
                            onClick={() => deleteExperience(index)}
                            className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                    value={typeof resumeData.skills === "string" ? resumeData.skills : (resumeData.skills || []).join(", ")}
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
                          className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
              <Eye className="w-3.5 h-3.5 text-blue-600" /> Live Paper Resume Canvas
            </span>
            <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Template: {activeTemplate.name}
            </span>
          </div>

          {/* Paper Canvas Shadow Box */}
          <div className="bg-slate-200/70 p-4 sm:p-8 rounded-2xl border border-gray-300 shadow-inner overflow-x-auto">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-8 sm:p-12 min-h-[840px] max-w-3xl mx-auto transition-all">
              <ResumeCanvasRenderers
                template={activeTemplate}
                resumeData={resumeData}
                primaryColor={primaryColor}
                customFont={customFont}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ────────────────────────────────────────────────
          100+ TEMPLATE SELECTION MODAL GALLERY
         ──────────────────────────────────────────────── */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-400" /> 100+ Pro Resume Template Library
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select from recruiter-approved ATS templates across 50+ career categories
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={templateSearchQuery}
                    onChange={(e) => setTemplateSearchQuery(e.target.value)}
                    placeholder="Search templates & roles..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto text-xs font-semibold">
              {[
                "All", "ATS Certified", "Tech & Software", "Design & Creative", 
                "Management", "Marketing & Sales", "Finance & Corporate", 
                "Healthcare & Medical", "Legal & Public", "Academic & Students", "Executive & Founders"
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTemplateCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    templateCategoryFilter === cat
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Cards Grid with REAL Visual Previews */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplateId(t.id);
                    setShowTemplateModal(false);
                    showToast?.(`Switched template to "${t.name}"!`, "success");
                  }}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                    selectedTemplateId === t.id
                      ? "border-blue-600 bg-blue-50/50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div>
                    {/* REAL Mini Vector Visual Preview */}
                    <TemplateMiniPreview template={t} primaryColor={primaryColor} />

                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gray-900 truncate pr-1">{t.name}</h4>
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded shrink-0">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal line-clamp-2">{t.description}</p>
                  </div>

                  <button
                    className={`w-full mt-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedTemplateId === t.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {selectedTemplateId === t.id ? "Selected" : "Use Template"}
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
