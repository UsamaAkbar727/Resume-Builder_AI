"use client";

import React from "react";
import { ResumeTemplate } from "@/data/templatesData";

interface MiniPreviewProps {
  template: ResumeTemplate;
  primaryColor?: string;
}

export default function TemplateMiniPreview({ template, primaryColor }: MiniPreviewProps) {
  const color = primaryColor || template.defaultColor || "#2563EB";
  const style = template.layoutStyle;

  // 1. LEFT SIDEBAR LAYOUT
  if (style === "left_sidebar" || style === "corporate_split") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden grid grid-cols-12 shadow-xs group-hover:shadow-md transition-shadow">
        {/* Left Sidebar */}
        <div className="col-span-4 p-2 text-white flex flex-col justify-between" style={{ backgroundColor: color }}>
          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-white/30 mb-1 font-bold text-[8px] flex items-center justify-center">
              JS
            </div>
            <div className="w-12 h-1.5 rounded bg-white" />
            <div className="w-8 h-1 rounded bg-white/70" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 rounded bg-white/40" />
            <div className="w-3/4 h-1 rounded bg-white/40" />
            <div className="w-1/2 h-1 rounded bg-white/40" />
          </div>
        </div>
        {/* Right Main Content */}
        <div className="col-span-8 p-3 bg-gray-50/50 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="w-24 h-2 rounded bg-slate-800" />
            <div className="w-full h-1 rounded bg-slate-300" />
            <div className="w-5/6 h-1 rounded bg-slate-300" />
            <div className="w-4/6 h-1 rounded bg-slate-300" />
          </div>
          <div className="space-y-1">
            <div className="w-16 h-1.5 rounded bg-slate-700" />
            <div className="w-full h-1 rounded bg-slate-200" />
            <div className="w-3/4 h-1 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // 2. CENTERED EXECUTIVE / ACADEMIC SERIF LAYOUT
  if (style === "centered_executive" || style === "academic_serif") {
    return (
      <div className="h-40 bg-amber-50/30 rounded-xl mb-3 border border-amber-200/60 p-3.5 flex flex-col justify-between text-center shadow-xs group-hover:shadow-md transition-shadow">
        <div className="border-b-2 pb-2 flex flex-col items-center" style={{ borderColor: color }}>
          <div className="w-28 h-2.5 rounded bg-slate-900 mb-1" />
          <div className="w-16 h-1 rounded font-semibold" style={{ color }} />
        </div>
        <div className="space-y-1 text-left my-auto">
          <div className="w-full h-1 rounded bg-slate-400" />
          <div className="w-5/6 h-1 rounded bg-slate-300" />
          <div className="w-4/6 h-1 rounded bg-slate-300" />
        </div>
        <div className="border-t border-amber-200/80 pt-1.5 flex justify-between">
          <div className="w-12 h-1 rounded bg-slate-400" />
          <div className="w-12 h-1 rounded bg-slate-400" />
        </div>
      </div>
    );
  }

  // 3. CREATIVE VISUAL LAYOUT
  if (style === "creative_visual") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
        <div className="p-2 rounded-lg text-white flex items-center justify-between shadow-xs" style={{ backgroundColor: color }}>
          <div className="space-y-1">
            <div className="w-16 h-2 rounded bg-white" />
            <div className="w-10 h-1 rounded bg-white/80" />
          </div>
          <div className="w-6 h-6 rounded-full bg-white/30 shrink-0" />
        </div>
        <div className="space-y-1">
          <div className="w-full h-1 rounded bg-slate-200" />
          <div className="w-4/5 h-1 rounded bg-slate-200" />
          <div className="w-3/5 h-1 rounded bg-slate-200" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-8 h-2 rounded bg-purple-100 border border-purple-200" />
          <div className="w-8 h-2 rounded bg-indigo-100 border border-indigo-200" />
        </div>
      </div>
    );
  }

  // 4. TIMELINE INFOGRAPHIC LAYOUT
  if (style === "timeline_infographic") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center border-b pb-1.5">
          <div className="w-20 h-2 rounded bg-slate-900" />
          <div className="w-10 h-2.5 rounded text-[8px] font-bold text-white flex items-center justify-center px-1" style={{ backgroundColor: color }}>
            +45%
          </div>
        </div>
        <div className="pl-3 border-l-2 space-y-2 relative" style={{ borderColor: color }}>
          <div className="space-y-1">
            <div className="w-24 h-1.5 rounded bg-slate-800" />
            <div className="w-full h-1 rounded bg-slate-300" />
          </div>
          <div className="space-y-1">
            <div className="w-20 h-1.5 rounded bg-slate-800" />
            <div className="w-3/4 h-1 rounded bg-slate-300" />
          </div>
        </div>
      </div>
    );
  }

  // 5. MODERN PILL / COMPACT DENSE / DEFAULT HEADER BANNER
  return (
    <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
      <div className="p-2 rounded-md text-white flex justify-between items-center" style={{ backgroundColor: color }}>
        <div className="w-20 h-2 rounded bg-white" />
        <div className="w-8 h-1.5 rounded bg-white/80" />
      </div>
      <div className="space-y-1">
        <div className="w-full h-1 rounded bg-slate-300" />
        <div className="w-5/6 h-1 rounded bg-slate-300" />
        <div className="w-4/6 h-1 rounded bg-slate-300" />
      </div>
      <div className="flex justify-between items-center pt-1 border-t border-gray-100">
        <div className="w-12 h-1 rounded bg-slate-400" />
        <div className="w-8 h-1.5 rounded bg-emerald-400" />
      </div>
    </div>
  );
}
