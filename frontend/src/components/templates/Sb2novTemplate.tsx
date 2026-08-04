"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function Sb2novTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-4 text-left text-gray-900 leading-normal ${fontClass}`}>
      
      {/* Centered Name & Contact Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
          {resumeData.name || "Alex Morgan"}
        </h1>
        <div className="text-xs text-gray-700 flex flex-wrap justify-center items-center gap-2">
          <span>{resumeData.email || "alex@example.com"}</span>
          <span>|</span>
          <span>{resumeData.location || "San Francisco, CA"}</span>
          <span>|</span>
          <span className="text-blue-700 underline font-medium">linkedin.com/in/alexmorgan</span>
          <span>|</span>
          <span className="text-blue-700 underline font-medium">github.com/alexmorgan</span>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-gray-900 pb-0.5">
            SUMMARY
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed font-normal">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-gray-900 pb-0.5">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3">
            {resumeData.experience.map((exp: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-xs">
                  <span className="text-gray-900">{exp.role} <span className="font-semibold text-gray-700">— {exp.company}</span></span>
                  <span className="text-gray-600 font-medium text-[11px]">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-normal pl-3 border-l border-gray-300">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-gray-900 pb-0.5">
            PROJECTS
          </h2>
          <div className="space-y-2.5">
            {resumeData.projects.map((proj: any, i: number) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between items-baseline text-xs font-bold">
                  <span>{proj.name} <span className="font-normal text-gray-600 text-[11px]">| {proj.tech}</span></span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skillsList.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-gray-900 pb-0.5">
            TECHNICAL SKILLS
          </h2>
          <p className="text-xs text-gray-800">
            <span className="font-bold">Languages & Technologies: </span>
            {skillsList.join(", ")}
          </p>
        </div>
      )}

    </div>
  );
}
