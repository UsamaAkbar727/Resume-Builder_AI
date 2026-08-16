"use client";

import React from "react";
import { Mail, MapPin, Award, CheckCircle2 } from "lucide-react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function AltaCVTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#059669";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`space-y-6 text-left text-gray-900 ${fontClass}`}>
      
      {/* AltaCV Header */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">{resumeData.name || "Usama Jutt"}</h1>
          <p className="text-sm font-bold opacity-90 tracking-wide">{resumeData.title}</p>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-300 mt-2">
            <span>{resumeData.email}</span>
            <span>•</span>
            <span>{resumeData.location}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center font-black text-xl">
          {(resumeData.name || "U").charAt(0)}
        </div>
      </div>

      {/* AltaCV 2-Column Body */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Main Column */}
        <div className="col-span-7 space-y-5">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color, borderColor: color }}>
              Philosophy & Profile
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed italic">{resumeData.summary}</p>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color, borderColor: color }}>
              Experience Timeline
            </h2>
            <div className="space-y-4">
              {(resumeData.experience || []).map((exp: any, i: number) => (
                <div key={i} className="pl-3 border-l-2" style={{ borderColor: color }}>
                  <div className="flex justify-between font-bold text-xs">
                    <span>{exp.role}</span>
                    <span className="text-gray-400 text-[10px]">{exp.duration}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="col-span-5 space-y-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 text-gray-900">
              Skills Cloud
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill: string, idx: number) => (
                <span key={idx} className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded-full border border-gray-300 shadow-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 text-gray-900">
                Key Accomplishments
              </h2>
              <div className="space-y-2">
                {resumeData.projects.map((p: any, i: number) => (
                  <div key={i} className="text-xs">
                    <p className="font-bold text-gray-900">{p.name}</p>
                    <p className="text-[11px] text-gray-600">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
