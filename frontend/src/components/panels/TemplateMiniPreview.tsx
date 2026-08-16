"use client";

import React from "react";
import { ResumeTemplate } from "@/data/templatesData";

interface MiniPreviewProps {
  template: ResumeTemplate;
  primaryColor?: string;
  userName?: string;
  userRole?: string;
}

/**
 * High-Fidelity Realistic A4 Document Preview Card (Resume.io / Zety / Canva Style)
 */
export default function TemplateMiniPreview({ template, primaryColor, userName, userRole }: MiniPreviewProps) {
  const color = primaryColor || template.defaultColor || "#2563EB";
  const style = template.layoutStyle;

  const displayName = userName || "Usama Jutt";
  const displayRole = userRole || "Senior Full Stack Developer";
  const displayInitials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  // 1. STATEMENT / FULL COLOR SOLID BACKDROP (Resume.io Statement Inspired)
  if (style === "corporate_split" || template.id.includes("statement") || template.id.includes("blue")) {
    return (
      <div className="h-56 bg-blue-600 rounded-xl mb-3 border border-blue-700 p-3 flex flex-col justify-between text-white shadow-sm group-hover:shadow-lg transition-all relative overflow-hidden">
        {/* Top Header */}
        <div className="flex gap-2 items-start">
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[9px]">
            {displayInitials}
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-[10px] font-extrabold uppercase tracking-wider">{displayName.toUpperCase()}</p>
            <p className="text-[8px] text-blue-100 font-semibold">(469) 203-1515 • usama@stripe.com</p>
          </div>
        </div>

        {/* 2-Column Body */}
        <div className="grid grid-cols-12 gap-2 text-left my-auto">
          <div className="col-span-4 border-r border-blue-400/40 pr-1.5 space-y-2">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">{displayRole}</p>
              <p className="text-[6px] text-blue-100 leading-tight">Senior engineering leader designing distributed web architectures...</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">Skills</p>
              <div className="space-y-0.5 text-[6px]">
                <p>React 19 & Next.js</p>
                <p>TypeScript & APIs</p>
              </div>
            </div>
          </div>
          <div className="col-span-8 pl-1 space-y-2">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-blue-200">Employment History</p>
              <p className="text-[6px] font-semibold text-white">Lead Engineer — Stripe</p>
              <p className="text-[5.5px] text-blue-100 leading-tight">Architected payment microservices scaling to $2.4B annual volume...</p>
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

  // 2. EXECUTIVE / ACCENT BANNER (Resume.io Executive Inspired)
  if (style === "timeline_infographic" || style === "header_banner" || template.id.includes("exec")) {
    return (
      <div className="h-56 bg-white dark:bg-slate-900 rounded-xl mb-3 border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Top Header Banner */}
        <div className="p-2.5 text-white flex items-center gap-2" style={{ backgroundColor: color }}>
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/50 shrink-0 overflow-hidden flex items-center justify-center font-bold text-[9px]">
            {displayInitials}
          </div>
          <div>
            <p className="text-[10px] font-extrabold tracking-tight">{displayName}</p>
            <p className="text-[7px] font-medium text-white/90">{displayRole}</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-2.5 space-y-2 my-auto">
          <div>
            <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white border-b pb-0.5 mb-0.5" style={{ borderColor: color }}>
              Profile
            </p>
            <p className="text-[6px] text-gray-600 dark:text-slate-400 leading-tight">
              Experienced software engineering lead with 6+ years delivering high-impact SaaS products...
            </p>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 space-y-1">
              <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white border-b pb-0.5" style={{ borderColor: color }}>
                Employment History
              </p>
              <div>
                <p className="text-[6px] font-bold text-gray-900 dark:text-white">Lead Engineer — Stripe</p>
                <p className="text-[5.5px] text-gray-500 dark:text-slate-400">Scaled high-availability infrastructure with sub-50ms latency...</p>
              </div>
            </div>
            <div className="col-span-4 space-y-1">
              <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white border-b pb-0.5" style={{ borderColor: color }}>
                Skills
              </p>
              <div className="space-y-0.5 text-[5.5px] text-gray-600 dark:text-slate-400 font-semibold">
                <p>• System Design</p>
                <p>• TypeScript / React</p>
                <p>• Cloud & Docker</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2.5 py-1 text-[6px] text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-950 border-t dark:border-slate-800 flex justify-between">
          <span>Professional A4</span>
          <span className="font-bold text-gray-600 dark:text-slate-400">Executive</span>
        </div>
      </div>
    );
  }

  // 3. CREATIVE ARTISTIC (Canva & FlowCV Creative Inspired)
  if (style === "creative_visual" || template.id.includes("creative") || template.id.includes("designer")) {
    return (
      <div className="h-56 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 rounded-xl mb-3 border border-gray-200 dark:border-slate-800 p-2.5 flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Creative Left/Right Header */}
        <div className="flex justify-between items-start border-b pb-1.5 border-blue-200 dark:border-slate-800">
          <div>
            <h4 className="text-[11px] font-black text-blue-900 dark:text-white leading-tight">{displayName}</h4>
            <p className="text-[7px] font-bold text-blue-600 dark:text-blue-400 uppercase">{displayRole}</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[9px] shadow-xs">
            {displayInitials}
          </div>
        </div>

        {/* Creative Body */}
        <div className="grid grid-cols-12 gap-2 text-left my-auto">
          <div className="col-span-7 space-y-1.5">
            <p className="text-[7px] font-extrabold text-blue-900 dark:text-white uppercase">Employment History</p>
            <div>
              <p className="text-[6px] font-bold text-gray-900 dark:text-white">Lead Engineer — Stripe</p>
              <p className="text-[5.5px] text-gray-600 dark:text-slate-400 leading-tight">Engineered core payment microservices and frontend platforms...</p>
            </div>
          </div>
          <div className="col-span-5 space-y-1.5 bg-white/80 dark:bg-slate-950/80 p-1.5 rounded-lg border border-purple-100 dark:border-slate-800">
            <p className="text-[7px] font-extrabold text-purple-900 dark:text-purple-400 uppercase">Skills</p>
            <div className="flex flex-wrap gap-0.5">
              <span className="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[5px] font-bold px-1 py-0.5 rounded">Next.js 15</span>
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[5px] font-bold px-1 py-0.5 rounded">TypeScript</span>
            </div>
          </div>
        </div>

        <div className="text-[6px] text-blue-600 dark:text-blue-400 font-bold border-t border-blue-100 dark:border-slate-800 pt-1 flex justify-between">
          <span>Creative Portfolio Layout</span>
          <span>A4 Ready</span>
        </div>
      </div>
    );
  }

  // 4. TWO-COLUMN WITH SIDEBAR (Zety / Novorésumé Classic Inspired)
  if (style === "left_sidebar" || style === "right_sidebar" || template.id.includes("sidebar")) {
    return (
      <div className="h-56 bg-white dark:bg-slate-900 rounded-xl mb-3 border border-gray-200 dark:border-slate-800 overflow-hidden grid grid-cols-12 shadow-sm group-hover:shadow-lg transition-all relative text-left">
        {/* Left Dark Sidebar */}
        <div className="col-span-4 p-2 text-white flex flex-col justify-between" style={{ backgroundColor: color }}>
          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 overflow-hidden mx-auto flex items-center justify-center font-bold text-[8px]">
              {displayInitials}
            </div>
            <div className="text-center">
              <p className="text-[8px] font-extrabold leading-tight">{displayName}</p>
              <p className="text-[6px] text-white/80">{displayRole}</p>
            </div>
          </div>
          <div className="space-y-1 text-[5.5px]">
            <p className="font-bold text-white/90 border-b border-white/20 pb-0.5">Skills</p>
            <p>• Next.js 15 & React</p>
            <p>• Distributed Systems</p>
            <p>• Docker & AWS</p>
          </div>
        </div>

        {/* Right White Main Panel */}
        <div className="col-span-8 p-2.5 bg-gray-50/50 dark:bg-slate-950 flex flex-col justify-between">
          <div className="space-y-1.5">
            <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white border-b dark:border-slate-800 pb-0.5">Employment History</p>
            <div>
              <p className="text-[6px] font-bold text-gray-900 dark:text-white">Lead Engineer — Stripe</p>
              <p className="text-[5.5px] text-gray-600 dark:text-slate-400 leading-tight">Architected payment workflows handling $2.4B GMV...</p>
            </div>
          </div>
          <div className="text-[6px] text-gray-400 dark:text-slate-500 border-t dark:border-slate-800 pt-1 flex justify-between">
            <span>2-Column Premium</span>
            <span>ATS Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. PASTEL MINIMAL (FlowCV / Reactive Resume Minimal Inspired)
  return (
    <div className="h-56 bg-amber-50/30 dark:bg-slate-900 rounded-xl mb-3 border border-amber-200/60 dark:border-slate-800 p-2.5 flex flex-col justify-between shadow-sm group-hover:shadow-lg transition-all relative text-left">
      {/* Header */}
      <div className="flex gap-2 items-center border-b border-amber-200/80 dark:border-slate-800 pb-1.5">
        <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[8px] shrink-0">
          {displayInitials}
        </div>
        <div>
          <h4 className="text-[10px] font-extrabold text-gray-900 dark:text-white">{displayName}</h4>
          <p className="text-[6.5px] font-bold text-amber-700 dark:text-amber-400 uppercase">{displayRole}</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-1.5 my-auto">
        <div>
          <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white">Employment History</p>
          <p className="text-[6px] font-bold text-gray-800 dark:text-slate-300">Lead Engineer — Stripe</p>
          <p className="text-[5.5px] text-gray-600 dark:text-slate-400 leading-tight">Delivered high performance applications with 99.99% uptime...</p>
        </div>
        <div>
          <p className="text-[7px] font-bold uppercase text-gray-900 dark:text-white">Skills</p>
          <div className="flex flex-wrap gap-0.5 text-[5px]">
            <span className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 px-1 py-0.5 rounded font-medium text-slate-800 dark:text-slate-200">React 19</span>
            <span className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 px-1 py-0.5 rounded font-medium text-slate-800 dark:text-slate-200">TypeScript</span>
          </div>
        </div>
      </div>

      <div className="text-[6px] text-amber-800 dark:text-amber-400 font-semibold border-t border-amber-200/80 dark:border-slate-800 pt-1 flex justify-between">
        <span>Pastel Minimalist</span>
        <span>A4 Format</span>
      </div>
    </div>
  );
}
