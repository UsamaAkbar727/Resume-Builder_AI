"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function ModernCVTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#1E3A8A";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      
      {/* ModernCV Header */}
      <div className="border-b-2 pb-4" style={{ borderColor: color }}>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900">
          {resumeData.name || "Alex Morgan"}
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color }}>
          {resumeData.title || "Senior Full-Stack Engineer"}
        </p>
        <p className="text-xs text-gray-500 mt-2 font-serif">
          {resumeData.email} • {resumeData.location}
        </p>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-right" style={{ color }}>
            Profile
          </div>
          <div className="col-span-9 text-xs text-gray-700 leading-relaxed font-serif">
            {resumeData.summary}
          </div>
        </div>
      )}

      {/* Work Experience with Left Date Column */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-right" style={{ color }}>
              Experience
            </div>
            <div className="col-span-9 border-b border-gray-200" />
          </div>

          {resumeData.experience.map((exp: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-4 text-xs items-start">
              <div className="col-span-3 text-right font-medium text-gray-500 text-[11px] pt-0.5">
                {exp.duration}
              </div>
              <div className="col-span-9 space-y-1">
                <p className="font-bold text-gray-900">{exp.role} — <span style={{ color }}>{exp.company}</span></p>
                <p className="text-gray-700 leading-relaxed font-serif">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-right" style={{ color }}>
            Skills
          </div>
          <div className="col-span-9 text-xs text-gray-800">
            {skillsList.join(" • ")}
          </div>
        </div>
      )}

    </div>
  );
}
