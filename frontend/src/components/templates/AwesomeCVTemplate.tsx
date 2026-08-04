"use client";

import React from "react";
import { Mail, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function AwesomeCVTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#DC2626"; // Awesome CV default accent red
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-5 text-left text-gray-900 ${fontClass}`}>
      
      {/* Awesome CV Header */}
      <div className="flex justify-between items-start border-b-2 pb-4" style={{ borderColor: color }}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {resumeData.name || "Alex Morgan"}
          </h1>
          <p className="text-sm font-bold uppercase tracking-wider mt-1" style={{ color }}>
            {resumeData.title || "Senior Software Engineer"}
          </p>
        </div>

        <div className="text-right text-xs space-y-1 text-gray-600">
          <p className="flex items-center justify-end gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color }} /> {resumeData.email || "alex@example.com"}</p>
          <p className="flex items-center justify-end gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color }} /> {resumeData.location || "San Francisco, CA"}</p>
          <p className="flex items-center justify-end gap-1.5"><Linkedin className="w-3.5 h-3.5 text-blue-600" /> linkedin.com/in/alexmorgan</p>
          <p className="flex items-center justify-end gap-1.5"><Github className="w-3.5 h-3.5 text-gray-900" /> github.com/alexmorgan</p>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-2">
            <span style={{ color }}>///</span> SUMMARY
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">{resumeData.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
            <span style={{ color }}>///</span> WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-bold text-xs">
                  <span className="text-gray-900">{exp.role} <span style={{ color }}>@ {exp.company}</span></span>
                  <span className="text-gray-500 font-normal">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed pl-3 border-l-2" style={{ borderColor: color }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-2">
            <span style={{ color }}>///</span> SKILLS & COMPETENCIES
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill: string, idx: number) => (
              <span key={idx} className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded border border-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
