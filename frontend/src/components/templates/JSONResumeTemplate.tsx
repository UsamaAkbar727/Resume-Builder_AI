"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function JSONResumeTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#2563EB";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-3xl font-black">{resumeData.name}</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mt-0.5">{resumeData.title}</p>
          <p className="text-xs text-slate-300 mt-2">{resumeData.email} • {resumeData.location}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
          JSON
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1 text-gray-900">About</h2>
        <p className="text-xs text-gray-700 leading-relaxed font-mono">{resumeData.summary}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1 text-gray-900">Work Experience</h2>
        <div className="space-y-4">
          {(resumeData.experience || []).map((exp: any, i: number) => (
            <div key={i} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex justify-between font-bold text-xs">
                <span>{exp.role} @ <span style={{ color }}>{exp.company}</span></span>
                <span className="text-gray-400 font-normal">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1 text-gray-900">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {skillsList.map((skill: string, idx: number) => (
            <span key={idx} className="bg-slate-800 text-blue-300 text-[10px] font-mono px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
