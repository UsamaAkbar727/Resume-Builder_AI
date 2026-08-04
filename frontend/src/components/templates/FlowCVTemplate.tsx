"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function FlowCVTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#2563EB";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">{resumeData.name}</h1>
        <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color }}>{resumeData.title}</p>
        <p className="text-xs text-gray-500 mt-2">{resumeData.email} • {resumeData.location}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-800">Profile</h2>
        <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-800">Work Experience</h2>
        <div className="space-y-4">
          {(resumeData.experience || []).map((exp: any, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-blue-50/30 border border-blue-100">
              <div className="flex justify-between font-bold text-xs">
                <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                <span className="text-gray-400 font-normal">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-800">Key Skills</h2>
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
