"use client";

import React from "react";
import { ResumeTemplate } from "@/data/templatesData";

interface MiniPreviewProps {
  template: ResumeTemplate;
  primaryColor?: string;
}

/**
 * High-Fidelity Realistic A4 Document Preview Card (Resume.io / Zety / Canva Style)
 */
export default function TemplateMiniPreview({ template, primaryColor }: MiniPreviewProps) {
  const color = primaryColor || template.defaultColor || "#2563EB";
  const style = template.layoutStyle;

  // 1. STATEMENT / FULL COLOR SOLID BACKDROP (Resume.io Statement Inspired)
  if (style === "corporate_split" || template.id.includes("statement") || template.id.includes("blue")) {
    return (
      <div className="h-56 bg-blue-600 rounded-xl mb-3 border border-blue-700 p-3 flex flex-col justify-between text-white shadow-sm group-hover:shadow-lg transition-all relative overflow-hidden">
        {/* Top Header */}
        <div className="flex gap-2 items-start">
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[9px]">
            AE
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-[10px] font-extrabold uppercase tracking-wider">ALEX ELLISON</p>
            <p className="text-[8px] text-blue-100 font-semibold">(469) 203-1515 • alex@gmail.com</p>
          </div>
        </div>

        {/* 2-Column Body */}
        <div className="grid grid-cols-12 gap-2 text-left my-auto">
          <div className="col-span-4 border-r border-blue-400/40 pr-1.5 space-y-2">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">Registered Nurse</p>
              <p className="text-[6px] text-blue-100 leading-tight">Passionate nurse with over 6 years experience...</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">Skills</p>
              <div className="space-y-0.5 text-[6px]">
                <p>Patient Advocacy • 5.0</p>
                <p>Team Leadership • 4.8</p>
              </div>
            </div>
          </div>
          <div className="col-span-8 pl-1 space-y-2">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">Employment History</p>
              <p className="text-[6px] font-semibold text-white">Nursing Assistant — St. Jude</p>
              <p className="text-[5.5px] text-blue-100 leading-tight">Provided direct bedside care in high volume ICU unit...</p>
            </div>
          </div>
        </div>

        <div className="text-[6px] text-blue-200 border-t border-blue-400/40 pt-1 flex justify-between">
          <span>Page 1 of 1</span>
          <span>ResumeFlow AI</span>
        </div>
      </div>
    );
  }

  // 2. VINCE MURRAY / RED ACCENT BANNER WITH HEADSHOT (Resume.io Executive Inspired)
  if (style === "timeline_infographic" || style === "header_banner" || template.id.includes("exec")) {
    return (
      <div className="h-56 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Top Header Banner */}
        <div className="p-2.5 text-white flex items-center gap-2" style={{ backgroundColor: color }}>
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/50 shrink-0 overflow-hidden flex items-center justify-center font-bold text-[9px]">
            VM
          </div>
          <div>
            <p className="text-[10px] font-extrabold tracking-tight">Vince Murray</p>
            <p className="text-[7px] font-medium text-white/90">Administrative Assistant</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-2.5 space-y-2 my-auto">
          <div>
            <p className="text-[7px] font-bold uppercase text-gray-900 border-b pb-0.5 mb-0.5" style={{ borderColor: color }}>
              Profile
            </p>
            <p className="text-[6px] text-gray-600 leading-tight">
              Proficient administrative assistant with 7+ years of office management experience...
            </p>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 space-y-1">
              <p className="text-[7px] font-bold uppercase text-gray-900 border-b pb-0.5" style={{ borderColor: color }}>
                Employment History
              </p>
              <div>
                <p className="text-[6px] font-bold text-gray-900">Admin Support — Dallas</p>
                <p className="text-[5.5px] text-gray-500">Served as administrative lead overseeing office filing...</p>
              </div>
            </div>
            <div className="col-span-4 space-y-1">
              <p className="text-[7px] font-bold uppercase text-gray-900 border-b pb-0.5" style={{ borderColor: color }}>
                Skills
              </p>
              <div className="space-y-0.5 text-[5.5px] text-gray-600 font-semibold">
                <p>• Office Admin</p>
                <p>• Scheduling</p>
                <p>• MS Office</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2.5 py-1 text-[6px] text-gray-400 bg-gray-50 border-t flex justify-between">
          <span>Professional A4</span>
          <span className="font-bold text-gray-600">Executive</span>
        </div>
      </div>
    );
  }

  // 3. DANIEL JONES / CREATIVE ARTISTIC (Canva & FlowCV Creative Inspired)
  if (style === "creative_visual" || template.id.includes("creative") || template.id.includes("designer")) {
    return (
      <div className="h-56 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 rounded-xl mb-3 border border-gray-200 p-2.5 flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Creative Left/Right Header */}
        <div className="flex justify-between items-start border-b pb-1.5 border-blue-200">
          <div>
            <h4 className="text-[11px] font-black text-blue-900 leading-tight">Daniel Jones</h4>
            <p className="text-[7px] font-bold text-blue-600 uppercase">Photographer & Designer</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[9px] shadow-xs">
            DJ
          </div>
        </div>

        {/* Creative Body */}
        <div className="grid grid-cols-12 gap-2 text-left my-auto">
          <div className="col-span-7 space-y-1.5">
            <p className="text-[7px] font-extrabold text-blue-900 uppercase">Employment History</p>
            <div>
              <p className="text-[6px] font-bold text-gray-900">Lead Photographer — Vancouver</p>
              <p className="text-[5.5px] text-gray-600 leading-tight">Delivered over 200 commercial photoshoots...</p>
            </div>
          </div>
          <div className="col-span-5 space-y-1.5 bg-white/80 p-1.5 rounded-lg border border-purple-100">
            <p className="text-[7px] font-extrabold text-purple-900 uppercase">Skills</p>
            <div className="flex flex-wrap gap-0.5">
              <span className="bg-purple-100 text-purple-800 text-[5px] font-bold px-1 py-0.5 rounded">Digital Art</span>
              <span className="bg-blue-100 text-blue-800 text-[5px] font-bold px-1 py-0.5 rounded">Figma</span>
            </div>
          </div>
        </div>

        <div className="text-[6px] text-blue-600 font-bold border-t border-blue-100 pt-1 flex justify-between">
          <span>Creative Portfolio Layout</span>
          <span>A4 Ready</span>
        </div>
      </div>
    );
  }

  // 4. JEFF TARTABANO / TWO-COLUMN WITH PHOTO (Zety / Novorésumé Classic Inspired)
  if (style === "left_sidebar" || style === "right_sidebar" || template.id.includes("sidebar")) {
    return (
      <div className="h-56 bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden grid grid-cols-12 shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Left Dark Sidebar */}
        <div className="col-span-4 p-2 text-white flex flex-col justify-between" style={{ backgroundColor: color }}>
          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 overflow-hidden mx-auto flex items-center justify-center font-bold text-[8px]">
              JT
            </div>
            <div className="text-center">
              <p className="text-[8px] font-extrabold leading-tight">Jeff Tartabano</p>
              <p className="text-[6px] text-white/80">Logistics Director</p>
            </div>
          </div>
          <div className="space-y-1 text-[5.5px]">
            <p className="font-bold text-white/90 border-b border-white/20 pb-0.5">Skills</p>
            <p>• Fleet Operations</p>
            <p>• Route Auditing</p>
            <p>• Dispatch Tech</p>
          </div>
        </div>

        {/* Right White Main Panel */}
        <div className="col-span-8 p-2.5 bg-gray-50/50 flex flex-col justify-between">
          <div className="space-y-1.5">
            <p className="text-[7px] font-bold uppercase text-gray-900 border-b pb-0.5">Employment History</p>
            <div>
              <p className="text-[6px] font-bold text-gray-900">Bears Transportation — Phoenix</p>
              <p className="text-[5.5px] text-gray-600 leading-tight">Managed 200+ accident-free delivery routes...</p>
            </div>
          </div>
          <div className="text-[6px] text-gray-400 border-t pt-1 flex justify-between">
            <span>2-Column Premium</span>
            <span>ATS Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. TONY SANDERS / PASTEL MINIMAL (FlowCV / Reactive Resume Minimal Inspired)
  return (
    <div className="h-56 bg-amber-50/30 rounded-xl mb-3 border border-amber-200/60 p-2.5 flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
      {/* Header */}
      <div className="flex gap-2 items-center border-b border-amber-200/80 pb-1.5">
        <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[8px] shrink-0">
          TS
        </div>
        <div>
          <h4 className="text-[10px] font-extrabold text-gray-900">Tony Sanders</h4>
          <p className="text-[6.5px] font-bold text-amber-700 uppercase">HR Professional</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-1.5 my-auto">
        <div>
          <p className="text-[7px] font-bold uppercase text-gray-900">Employment History</p>
          <p className="text-[6px] font-bold text-gray-800">HR Professional — Stamford</p>
          <p className="text-[5.5px] text-gray-600 leading-tight">Implemented recruitment strategies across 12 departments...</p>
        </div>
        <div>
          <p className="text-[7px] font-bold uppercase text-gray-900">Skills</p>
          <div className="flex flex-wrap gap-0.5 text-[5px]">
            <span className="bg-white border border-amber-200 px-1 py-0.5 rounded font-medium">HR Policies</span>
            <span className="bg-white border border-amber-200 px-1 py-0.5 rounded font-medium">Payroll</span>
          </div>
        </div>
      </div>

      <div className="text-[6px] text-amber-800 font-semibold border-t border-amber-200/80 pt-1 flex justify-between">
        <span>Pastel Minimalist</span>
        <span>A4 Format</span>
      </div>
    </div>
  );
}
