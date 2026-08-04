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

  // 1. sb2nov / JAKE'S RESUME (minimal_swiss)
  if (style === "minimal_swiss") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-300 p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow text-center">
        <div className="border-b border-gray-900 pb-1 flex flex-col items-center">
          <div className="w-20 h-2 rounded bg-slate-900 mb-1" />
          <div className="w-28 h-1 rounded bg-slate-400" />
        </div>
        <div className="space-y-1.5 text-left my-auto">
          <div className="w-16 h-1.5 rounded bg-slate-800 border-b border-gray-900" />
          <div className="w-full h-1 rounded bg-slate-300" />
          <div className="w-5/6 h-1 rounded bg-slate-300" />
        </div>
        <div className="pt-1 border-t border-gray-900 text-left">
          <div className="w-24 h-1 rounded bg-slate-500" />
        </div>
      </div>
    );
  }

  // 2. AWESOME CV (timeline_infographic)
  if (style === "timeline_infographic") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start border-b-2 pb-1.5" style={{ borderColor: color }}>
          <div className="space-y-1">
            <div className="w-20 h-2 rounded bg-slate-900" />
            <div className="w-12 h-1 rounded font-bold" style={{ color }} />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[8px] text-gray-500">
            ///
          </div>
        </div>
        <div className="pl-2 border-l-2 space-y-1.5" style={{ borderColor: color }}>
          <div className="w-24 h-1.5 rounded bg-slate-800" />
          <div className="w-full h-1 rounded bg-slate-300" />
          <div className="w-4/5 h-1 rounded bg-slate-300" />
        </div>
      </div>
    );
  }

  // 3. ALTA CV (left_sidebar)
  if (style === "left_sidebar") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden grid grid-cols-12 shadow-xs group-hover:shadow-md transition-shadow">
        <div className="col-span-7 p-2.5 bg-white flex flex-col justify-between border-r border-gray-100">
          <div className="space-y-1.5">
            <div className="w-16 h-2 rounded bg-slate-900" />
            <div className="w-full h-1 rounded bg-slate-300" />
            <div className="w-4/5 h-1 rounded bg-slate-300" />
          </div>
          <div className="space-y-1 pl-1 border-l-2" style={{ borderColor: color }}>
            <div className="w-12 h-1 rounded bg-slate-700" />
            <div className="w-full h-1 rounded bg-slate-200" />
          </div>
        </div>
        <div className="col-span-5 p-2 bg-slate-50 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="w-10 h-1.5 rounded bg-slate-800" />
            <div className="flex flex-wrap gap-1">
              <div className="w-5 h-2 rounded-full bg-white border border-gray-300" />
              <div className="w-5 h-2 rounded-full bg-white border border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. MODERN CV (academic_serif)
  if (style === "academic_serif") {
    return (
      <div className="h-40 bg-amber-50/20 rounded-xl mb-3 border border-amber-200/50 p-3 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
        <div className="border-b-2 pb-1" style={{ borderColor: color }}>
          <div className="w-24 h-2 rounded bg-slate-900 mb-1 font-serif" />
          <div className="w-16 h-1 rounded font-serif" style={{ color }} />
        </div>
        <div className="grid grid-cols-12 gap-2 text-left my-auto">
          <div className="col-span-4 text-right pr-1 font-mono text-[8px] text-gray-400">2022 — Pres</div>
          <div className="col-span-8 space-y-1">
            <div className="w-16 h-1.5 rounded bg-slate-800" />
            <div className="w-full h-1 rounded bg-slate-300" />
          </div>
        </div>
      </div>
    );
  }

  // 5. REACTIVE RESUME (corporate_split)
  if (style === "corporate_split") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden grid grid-cols-12 shadow-xs group-hover:shadow-md transition-shadow">
        <div className="col-span-4 p-2 text-white flex flex-col justify-between" style={{ backgroundColor: color }}>
          <div className="space-y-1 text-center">
            <div className="w-6 h-6 rounded-full bg-white/20 mx-auto mb-1 flex items-center justify-center font-bold text-[8px]">
              RR
            </div>
            <div className="w-10 h-1.5 rounded bg-white mx-auto" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 rounded bg-white/40" />
            <div className="w-3/4 h-1 rounded bg-white/40" />
          </div>
        </div>
        <div className="col-span-8 p-2.5 bg-white flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="w-20 h-2 rounded bg-slate-900" />
            <div className="w-full h-1 rounded bg-slate-300" />
            <div className="w-4/5 h-1 rounded bg-slate-300" />
          </div>
        </div>
      </div>
    );
  }

  // 6. NOVORÉSUMÉ (creative_visual)
  if (style === "creative_visual") {
    return (
      <div className="h-40 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden p-2.5 flex flex-col justify-between shadow-xs group-hover:shadow-md transition-shadow">
        <div className="p-2 rounded-lg text-white flex justify-between items-center shadow-xs" style={{ backgroundColor: color }}>
          <div className="w-16 h-2 rounded bg-white" />
          <div className="w-5 h-5 rounded-md bg-white/20" />
        </div>
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded bg-cyan-100 border border-cyan-200" />
          <div className="w-full h-1.5 rounded bg-cyan-100 border border-cyan-200" />
        </div>
      </div>
    );
  }

  // DEFAULT / FLOWCV / ZETY / RENDERCV / JSON RESUME
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
