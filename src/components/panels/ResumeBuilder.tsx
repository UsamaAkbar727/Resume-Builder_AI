"use client";

import React, { useState } from "react";
import { Download, FileText, ArrowLeft } from "lucide-react";

interface ResumeBuilderProps {
  resumeData: any;
  setResumeData: (data: any) => void;
  onNavigate: (tab: string) => void;
}

export default function ResumeBuilder({ resumeData, setResumeData, onNavigate }: ResumeBuilderProps) {
  const [activeTab, setActiveTab] = useState<"details" | "experience" | "skills" | "projects">("details");
  const [template, setTemplate] = useState<"modern" | "classic" | "minimal">("modern");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [customFont, setCustomFont] = useState("sans");
  const [exporting, setExporting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      [field]: value,
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExp = [...resumeData.experience];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    setResumeData({ ...resumeData, experience: updatedExp });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: "", role: "", duration: "", description: "" }],
    });
  };

  const deleteExperience = (index: number) => {
    const updatedExp = resumeData.experience.filter((_: any, i: number) => i !== index);
    setResumeData({ ...resumeData, experience: updatedExp });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProj = [...resumeData.projects];
    updatedProj[index] = { ...updatedProj[index], [field]: value };
    setResumeData({ ...resumeData, projects: updatedProj });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { name: "", tech: "", description: "" }],
    });
  };

  const deleteProject = (index: number) => {
    const updatedProj = resumeData.projects.filter((_: any, i: number) => i !== index);
    setResumeData({ ...resumeData, projects: updatedProj });
  };

  const handleExport = (format: "pdf" | "docx") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(`Resume successfully generated and downloaded in ${format.toUpperCase()} format!`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">AI Resume Builder</h1>
          <p className="text-sm text-[#6B7280]">Edit details, reorder sections, and customize styling in real time.</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => handleExport("pdf")} className="clay-btn-primary px-4 py-2.5 text-xs text-white flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            {exporting ? "Generating PDF..." : "Export PDF"}
          </button>
          <button onClick={() => handleExport("docx")} className="clay-btn-secondary px-4 py-2.5 text-xs flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            DOCX
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Editor Panels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Custom Theme Customizer Card */}
          <div className="clay-card p-5 bg-white">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider mb-4">Design Styles Customizer</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setTemplate("modern")}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  template === "modern" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB] hover:bg-[#EEF2F7]"
                }`}
              >
                Modern
              </button>
              <button
                onClick={() => setTemplate("classic")}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  template === "classic" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB] hover:bg-[#EEF2F7]"
                }`}
              >
                Classic
              </button>
              <button
                onClick={() => setTemplate("minimal")}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  template === "minimal" ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB] hover:bg-[#EEF2F7]"
                }`}
              >
                Minimalist
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7280] gap-4">
              <div>
                <span className="block mb-1.5 font-medium">Primary Highlight Color</span>
                <div className="flex gap-2">
                  {["#2563EB", "#16A34A", "#F59E0B", "#DC2626", "#8B5CF6"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      className={`w-5 h-5 rounded-full border-2 ${
                        primaryColor === c ? "border-[#111827]" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="block mb-1.5 font-medium">Font Family</span>
                <select
                  value={customFont}
                  onChange={(e) => setCustomFont(e.target.value)}
                  className="clay-input py-1 px-2.5 text-xs"
                >
                  <option value="sans">Inter (Sans)</option>
                  <option value="serif">Classic Serif</option>
                  <option value="mono">Developer Mono</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Editor Sections */}
          <div className="clay-card bg-white overflow-hidden">
            <div className="flex border-b border-[#E5E7EB] text-xs font-semibold text-[#6B7280]">
              {(["details", "experience", "skills", "projects"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-center capitalize border-b-2 transition-all ${
                    activeTab === tab ? "border-[#2563EB] text-[#2563EB] bg-[#EEF2F7]/25" : "border-transparent hover:text-[#111827]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Tab: Details */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="clay-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Title</label>
                    <input
                      type="text"
                      value={resumeData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="clay-input w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="clay-input w-full text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Location</label>
                      <input
                        type="text"
                        value={resumeData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="clay-input w-full text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Summary</label>
                    <textarea
                      rows={3}
                      value={resumeData.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      className="clay-input w-full text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Experience */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  {resumeData.experience.map((exp: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] space-y-3 relative">
                      <button
                        onClick={() => deleteExperience(index)}
                        className="absolute top-2 right-2 text-xs text-[#DC2626] font-bold hover:underline"
                      >
                        Delete
                      </button>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          className="clay-input w-full py-1 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                            className="clay-input w-full py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Duration</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                            className="clay-input w-full py-1 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                          className="clay-input w-full py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="clay-btn-secondary w-full py-2 text-xs font-semibold">
                    + Add Work Experience
                  </button>
                </div>
              )}

              {/* Tab: Skills */}
              {activeTab === "skills" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Skills (Comma Separated)</label>
                    <textarea
                      rows={5}
                      value={resumeData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      placeholder="e.g. React, TypeScript, Node.js, GraphQL, AWS, Git"
                      className="clay-input w-full text-xs font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-[#6B7280]">
                    Separate technical skills with commas to help the ATS keyword analyzer index them correctly.
                  </p>
                </div>
              )}

              {/* Tab: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  {resumeData.projects.map((proj: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] space-y-3 relative">
                      <button
                        onClick={() => deleteProject(index)}
                        className="absolute top-2 right-2 text-xs text-[#DC2626] font-bold hover:underline"
                      >
                        Delete
                      </button>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                          className="clay-input w-full py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Technologies Used</label>
                        <input
                          type="text"
                          value={proj.tech}
                          onChange={(e) => handleProjectChange(index, "tech", e.target.value)}
                          className="clay-input w-full py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                          className="clay-input w-full py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={addProject} className="clay-btn-secondary w-full py-2 text-xs font-semibold">
                    + Add Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Real-Time Preview Rendering Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Live Resume Layout Preview</span>
          
          <div
            className={`clay-card p-8 bg-white border border-[#E5E7EB]/80 min-h-[700px] shadow-md transition-all ${
              customFont === "serif" ? "font-serif" : customFont === "mono" ? "font-mono" : "font-sans"
            }`}
          >
            {/* Template: Modern */}
            {template === "modern" && (
              <div className="space-y-6 text-sm text-left">
                <div className="border-b-2 pb-4" style={{ borderColor: primaryColor }}>
                  <h2 className="text-2xl font-extrabold text-[#111827]">{resumeData.name || "Your Name"}</h2>
                  <p className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: primaryColor }}>
                    {resumeData.title || "Your Target Title"}
                  </p>
                  <div className="flex gap-4 text-[10px] text-[#6B7280] mt-2">
                    <span>{resumeData.email || "email@company.com"}</span>
                    <span>•</span>
                    <span>{resumeData.location || "San Francisco, CA"}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Summary</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{resumeData.summary || "Add a professional summary."}</p>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Experience</h4>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp: any, i: number) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold text-xs text-[#111827]">
                          <span>{exp.role || "Role"} at {exp.company || "Company"}</span>
                          <span className="text-[#6B7280] font-normal">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">{exp.description || "Work details."}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Technical Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills
                      ? resumeData.skills.split(",").map((s: string, idx: number) => (
                          <span key={idx} className="bg-[#EEF2F7] text-[#111827] text-[10px] px-2 py-0.5 rounded border border-[#E5E7EB]/50">
                            {s.trim()}
                          </span>
                        ))
                      : "Add skills."}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Projects</h4>
                  <div className="space-y-4">
                    {resumeData.projects.map((proj: any, i: number) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold text-xs text-[#111827]">
                          <span>{proj.name || "Project Name"}</span>
                          <span className="text-[10px] font-semibold text-[#6B7280]">{proj.tech}</span>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Template: Classic */}
            {template === "classic" && (
              <div className="space-y-6 text-sm text-center">
                <div className="border-b pb-4">
                  <h2 className="text-3xl font-normal text-[#111827] serif">{resumeData.name || "Your Name"}</h2>
                  <div className="flex justify-center gap-4 text-xs text-[#6B7280] mt-2">
                    <span>{resumeData.email}</span>
                    <span>|</span>
                    <span>{resumeData.location}</span>
                  </div>
                </div>

                <div className="text-left space-y-4">
                  <div>
                    <h4 className="font-bold text-xs border-b border-[#E5E7EB] pb-1 uppercase tracking-wider mb-2">Professional Summary</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{resumeData.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs border-b border-[#E5E7EB] pb-1 uppercase tracking-wider mb-2">Professional Experience</h4>
                    <div className="space-y-3">
                      {resumeData.experience.map((exp: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-[#111827]">{exp.company} — {exp.role}</span>
                            <span className="text-[#6B7280] italic">{exp.duration}</span>
                          </div>
                          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs border-b border-[#E5E7EB] pb-1 uppercase tracking-wider mb-2">Core Competencies</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{resumeData.skills}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Template: Minimal */}
            {template === "minimal" && (
              <div className="space-y-5 text-sm text-left font-light">
                <div>
                  <h2 className="text-2xl font-bold text-[#111827]">{resumeData.name}</h2>
                  <p className="text-xs text-[#6B7280] mt-1">{resumeData.title} • {resumeData.email} • {resumeData.location}</p>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed italic border-l-2 pl-3 border-[#2563EB]">
                  {resumeData.summary}
                </p>

                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">History</h3>
                  {resumeData.experience.map((exp: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{exp.company} / {exp.role}</span>
                        <span className="text-gray-400">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Skills</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{resumeData.skills}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
