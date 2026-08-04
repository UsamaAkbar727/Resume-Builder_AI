"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function RenderCVTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#059669";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-5 text-left text-gray-900 ${fontClass}`}>
      <div className="text-center border-b pb-3" style={{ borderColor: color }}>
        <h1 className="text-3xl font-extrabold">{resumeData.name}</h1>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mt-0.5">{resumeData.title}</p>
        <p className="text-xs text-gray-500 mt-1">{resumeData.email} | {resumeData.location}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-900 border-b pb-0.5">Summary</h2>
        <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 text-gray-900 border-b pb-0.5">Work Experience</h2>
        <div className="space-y-3">
          {(resumeData.experience || []).map((exp: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between font-bold text-xs">
                <span>{exp.company} — <span style={{ color }}>{exp.role}</span></span>
                <span className="text-gray-500 font-normal">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-900 border-b pb-0.5">Skills</h2>
        <p className="text-xs text-gray-800">{skillsList.join(", ")}</p>
      </div>
    </div>
  );
}
