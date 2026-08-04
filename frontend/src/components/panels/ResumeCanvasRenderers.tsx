"use client";

import React from "react";
import { ResumeTemplate } from "@/data/templatesData";
import { Check, Mail, MapPin, Globe, Award, FileText, Sparkles, CheckCircle2 } from "lucide-react";

interface CanvasRendererProps {
  template: ResumeTemplate;
  resumeData: any;
  primaryColor: string;
  customFont: "sans" | "serif" | "mono";
}

export default function ResumeCanvasRenderers({
  template,
  resumeData,
  primaryColor,
  customFont,
}: CanvasRendererProps) {
  const color = primaryColor || template.defaultColor || "#2563EB";
  const fontClass = customFont === "serif" ? "font-serif" : customFont === "mono" ? "font-mono" : "font-sans";

  const skillsList = typeof resumeData?.skills === "string" 
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  const experiences = resumeData?.experience || [];
  const projects = resumeData?.projects || [];

  // 1. LEFT SIDEBAR / CORPORATE SPLIT LAYOUT
  if (template.layoutStyle === "left_sidebar" || template.layoutStyle === "corporate_split") {
    return (
      <div className={`grid grid-cols-12 min-h-[800px] text-left ${fontClass}`}>
        {/* Left Sidebar */}
        <div className="col-span-4 bg-slate-900 text-white p-6 space-y-6 rounded-l-lg">
          <div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-white font-extrabold text-lg mb-3">
              {(resumeData.name || "A").charAt(0)}
            </div>
            <h2 className="text-xl font-black text-white">{resumeData.name || "Alex Morgan"}</h2>
            <p className="text-xs font-semibold text-blue-400 mt-0.5">{resumeData.title || "Senior Engineer"}</p>
          </div>

          <hr className="border-slate-800" />

          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Contact</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400" /> {resumeData.email || "email@domain.com"}</p>
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {resumeData.location || "San Francisco, CA"}</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Core Competencies</p>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill: string, idx: number) => (
                <span key={idx} className="bg-slate-800 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Panel */}
        <div className="col-span-8 p-8 bg-white space-y-6 rounded-r-lg">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={{ color }}>Summary</h3>
            <p className="text-xs text-gray-700 leading-relaxed font-normal">{resumeData.summary}</p>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={{ color }}>Experience</h3>
            <div className="space-y-4">
              {experiences.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-xs text-gray-900">
                    <span>{exp.role} @ <span style={{ color }}>{exp.company}</span></span>
                    <span className="text-gray-400 font-normal">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {projects.length > 0 && (
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={{ color }}>Key Projects</h3>
              <div className="space-y-3">
                {projects.map((proj: any, i: number) => (
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
          )}
        </div>
      </div>
    );
  }

  // 2. CENTERED EXECUTIVE / ACADEMIC SERIF LAYOUT
  if (template.layoutStyle === "centered_executive" || template.layoutStyle === "academic_serif") {
    return (
      <div className={`space-y-6 text-center text-gray-900 ${fontClass}`}>
        <div className="border-b-2 pb-5" style={{ borderColor: color }}>
          <h2 className="text-3xl font-serif font-extrabold tracking-wide text-gray-900">{resumeData.name || "Alex Morgan"}</h2>
          <p className="text-xs font-bold uppercase tracking-widest mt-1 text-gray-700" style={{ color }}>
            {resumeData.title || "Senior Software Engineer"}
          </p>
          <p className="text-xs text-gray-500 mt-2 font-serif">{resumeData.email}  |  {resumeData.location}</p>
        </div>

        <div className="text-left space-y-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-800">Executive Summary</h3>
            <p className="text-xs text-gray-700 leading-relaxed italic">{resumeData.summary}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-800">Professional Leadership</h3>
            <div className="space-y-4">
              {experiences.map((exp: any, i: number) => (
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

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 text-gray-800">Core Competencies</h3>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill: string, idx: number) => (
                <span key={idx} className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. CREATIVE VISUAL LAYOUT
  if (template.layoutStyle === "creative_visual") {
    return (
      <div className={`space-y-6 text-left ${fontClass}`}>
        <div className="p-6 rounded-2xl text-white shadow-md flex items-center justify-between" style={{ backgroundColor: color }}>
          <div>
            <h2 className="text-3xl font-black">{resumeData.name || "Alex Morgan"}</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-1">{resumeData.title || "Product Designer"}</p>
            <p className="text-xs text-white/90 mt-2">{resumeData.email} • {resumeData.location}</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-black text-xl text-white">
            {(resumeData.name || "A").charAt(0)}
          </div>
        </div>

        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color, borderColor: color }}>Summary</h4>
          <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>

        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color, borderColor: color }}>Work Experience</h4>
          <div className="space-y-4">
            {experiences.map((exp: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex justify-between font-bold text-xs text-gray-900">
                  <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                  <span className="text-gray-500 font-medium">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. TIMELINE INFOGRAPHIC LAYOUT
  if (template.layoutStyle === "timeline_infographic") {
    return (
      <div className={`space-y-6 text-left ${fontClass}`}>
        <div className="border-b pb-4 flex justify-between items-start" style={{ borderColor: color }}>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{resumeData.name || "Alex Morgan"}</h2>
            <p className="text-sm font-bold uppercase tracking-wider mt-1" style={{ color }}>{resumeData.title || "Staff Engineer"}</p>
            <p className="text-xs text-gray-500 mt-1">{resumeData.email} • {resumeData.location}</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> High Impact CV
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-gray-900">Summary</h4>
          <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-gray-900">Career Progression Timeline</h4>
          <div className="space-y-5 relative pl-4 border-l-2" style={{ borderColor: color }}>
            {experiences.map((exp: any, i: number) => (
              <div key={i} className="relative">
                <div className="flex justify-between font-bold text-xs text-gray-900">
                  <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                  <span className="text-gray-400">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT HEADER BANNER / MINIMAL / PILL LAYOUT
  return (
    <div className={`space-y-6 text-left ${fontClass}`}>
      <div className="p-6 rounded-xl text-white shadow-sm" style={{ backgroundColor: color }}>
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

      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={{ color, borderColor: color }}>
          Professional Summary
        </h4>
        <p className="text-xs text-gray-700 leading-relaxed font-normal">{resumeData.summary}</p>
      </div>

      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={{ color, borderColor: color }}>
          Work Experience
        </h4>
        <div className="space-y-4">
          {experiences.map((exp: any, i: number) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-bold text-xs text-gray-900">
                <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                <span className="text-gray-400 font-normal">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={{ color, borderColor: color }}>
          Skills & Keywords
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {skillsList.map((skill: string, idx: number) => (
            <span key={idx} className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-gray-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
