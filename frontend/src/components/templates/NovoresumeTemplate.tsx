"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function NovoresumeTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#0891B2";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      {/* Novorésumé Header Banner */}
      <div className="p-6 rounded-2xl text-white shadow-sm flex justify-between items-center" style={{ backgroundColor: color }}>
        <div>
          <h1 className="text-3xl font-extrabold">{resumeData.name || "Alex Morgan"}</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-white/90 mt-1">{resumeData.title}</p>
          <p className="text-xs text-white/80 mt-2">{resumeData.email} • {resumeData.location}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center font-black text-white text-lg">
          {(resumeData.name || "A").charAt(0)}
        </div>
      </div>

      {/* Novorésumé Grid */}
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-8 space-y-5">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color, borderColor: color }}>
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color, borderColor: color }}>
              Experience
            </h2>
            <div className="space-y-4">
              {(resumeData.experience || []).map((exp: any, i: number) => (
                <div key={i} className="p-3.5 rounded-xl bg-cyan-50/40 border border-cyan-100/80">
                  <div className="flex justify-between font-bold text-xs">
                    <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                    <span className="text-gray-400 font-medium">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-5 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-900">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {skillsList.map((skill: string, idx: number) => (
                <span key={idx} className="bg-white text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
