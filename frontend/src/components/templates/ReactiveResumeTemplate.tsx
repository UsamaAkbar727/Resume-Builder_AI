"use client";

import React from "react";

interface TemplateProps {
  resumeData: any;
  primaryColor: string;
  fontClass: string;
}

export default function ReactiveResumeTemplate({ resumeData, primaryColor, fontClass }: TemplateProps) {
  const color = primaryColor || "#7C3AED";
  const skillsList = typeof resumeData?.skills === "string"
    ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(resumeData?.skills) ? resumeData.skills : [];

  return (
    <div className={`grid grid-cols-12 min-h-[820px] text-left ${fontClass}`}>
      {/* Left Sidebar */}
      <div className="col-span-4 p-6 text-white space-y-6 rounded-l-xl" style={{ backgroundColor: color }}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-black text-2xl">
            {(resumeData.name || "U").charAt(0)}
          </div>
          <h2 className="text-xl font-black">{resumeData.name || "Usama Jutt"}</h2>
          <p className="text-xs text-white/80 font-bold uppercase tracking-wider">{resumeData.title}</p>
        </div>

        <hr className="border-white/20" />

        <div className="space-y-2 text-xs text-white/90">
          <p className="font-bold text-white uppercase text-[10px]">Contact</p>
          <p className="break-all">{resumeData.email}</p>
          <p>{resumeData.location}</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-white uppercase text-[10px]">Technologies</p>
          <div className="flex flex-wrap gap-1">
            {skillsList.map((skill: string, idx: number) => (
              <span key={idx} className="bg-white/10 text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="col-span-8 p-8 bg-white space-y-6 rounded-r-xl text-gray-900">
        <div>
          <h3 className="font-extrabold text-xs uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color, borderColor: color }}>
            Executive Summary
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed font-normal">{resumeData.summary}</p>
        </div>

        <div>
          <h3 className="font-extrabold text-xs uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color, borderColor: color }}>
            Work History
          </h3>
          <div className="space-y-4">
            {(resumeData.experience || []).map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.role} — <span style={{ color }}>{exp.company}</span></span>
                  <span className="text-gray-400 font-medium text-[10px]">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
