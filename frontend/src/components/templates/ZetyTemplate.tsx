"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function ZetyTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#2563EB";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      <div className="border-l-4 pl-4" style={{ borderColor: color }}>
        <h1 className="text-3xl font-extrabold text-gray-900">{resumeData.name}</h1>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mt-0.5">{resumeData.title}</p>
        <p className="text-xs text-gray-500 mt-1">{resumeData.email} • {resumeData.location}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color }}>Summary</h2>
        <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color }}>Experience</h2>
        <div className="space-y-4">
          {(resumeData.experience || []).map((exp: any, i: number) => (
            <div key={i} className="pl-3 border-l-2 border-gray-200">
              <div className="flex justify-between font-bold text-xs">
                <span>{exp.role} @ <span style={{ color }}>{exp.company}</span></span>
                <span className="text-gray-400 font-normal text-[10px]">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color }}>Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {skillsList.map((skill: string, idx: number) => (
            <span key={idx} className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-gray-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
