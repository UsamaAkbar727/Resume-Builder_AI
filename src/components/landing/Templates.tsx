"use client";

import React, { useState } from "react";
import { Check, Star, Sparkles, Layout } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Templates() {
  const [selectedColor, setSelectedColor] = useState<"navy" | "green" | "slate" | "charcoal">("navy");

  const colors = [
    { id: "navy", class: "bg-blue-600", border: "border-blue-200", label: "Ocean Navy" },
    { id: "green", class: "bg-emerald-600", border: "border-emerald-200", label: "Forest Emerald" },
    { id: "slate", class: "bg-slate-500", border: "border-slate-200", label: "Slate Gray" },
    { id: "charcoal", class: "bg-slate-900", border: "border-slate-800", label: "Charcoal Black" },
  ];

  const templatesList = [
    {
      id: "technologist",
      name: "The Technologist",
      desc: "Voted #1 for modern software engineering and systems roles.",
      type: "Modern Layout"
    },
    {
      id: "minimalist",
      name: "The Minimalist",
      desc: "Inspired by clean Notion formats. Excellent for product developers.",
      type: "Clean Spacing"
    },
    {
      id: "corporate",
      name: "The Executive",
      desc: "Academic and traditional styling suited for management tiers.",
      type: "Classic Serif"
    },
    {
      id: "creative",
      name: "The Designer",
      desc: "Dynamic structure displaying side columns. Suited for visual roles.",
      type: "Creative Column"
    }
  ];

  // Helper to resolve color class based on state
  const getThemeColorClass = () => {
    switch (selectedColor) {
      case "green": return "text-emerald-600 bg-emerald-500/10 border-emerald-500";
      case "slate": return "text-slate-600 bg-slate-500/10 border-slate-500";
      case "charcoal": return "text-slate-900 bg-slate-900/10 border-slate-900";
      case "navy":
      default:
        return "text-blue-600 bg-blue-500/10 border-blue-600";
    }
  };

  const getAccentBg = () => {
    switch (selectedColor) {
      case "green": return "bg-emerald-600";
      case "slate": return "bg-slate-500";
      case "charcoal": return "bg-slate-900";
      case "navy":
      default:
        return "bg-blue-600";
    }
  };

  const getAccentText = () => {
    switch (selectedColor) {
      case "green": return "text-emerald-600";
      case "slate": return "text-slate-500";
      case "charcoal": return "text-slate-900";
      case "navy":
      default:
        return "text-blue-600";
    }
  };

  const getBorderColor = () => {
    switch (selectedColor) {
      case "green": return "border-emerald-100";
      case "slate": return "border-slate-100";
      case "charcoal": return "border-slate-200";
      case "navy":
      default:
        return "border-blue-100";
    }
  };

  return (
    <section id="templates" className="py-24 bg-slate-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header and theme controls */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                Premium Layout Showroom
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-3 mb-2">
                Curated layouts by recruiters
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Switch themes to preview how each style renders. Fully compliant with parser filters.
              </p>
            </div>

            {/* Color switcher pills */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 mr-1.5">Accent Color</span>
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id as any)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    selectedColor === color.id
                      ? "border-blue-600 scale-110"
                      : "border-transparent hover:scale-105"
                  } ${color.class}`}
                  title={color.label}
                >
                  {selectedColor === color.id && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Templates layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templatesList.map((tpl, idx) => (
            <ScrollReveal
              key={tpl.id}
              variant="fade-up"
              delay={idx * 100}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Mini mockup resume representation */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 mb-6 aspect-[1/1.2] flex flex-col justify-between overflow-hidden">
                {/* Header mock */}
                <div className="pb-3 border-b border-slate-200">
                  <div className={`h-3 rounded-xs w-3/4 mb-1.5 transition-colors ${getAccentBg()}`}></div>
                  <div className="h-2 bg-slate-300 rounded-xs w-2/5"></div>
                </div>

                {/* Body lines mock */}
                <div className="space-y-2 py-3 flex-1">
                  <div className="flex items-center gap-1">
                    <span className={`w-1 h-3 rounded-full transition-colors ${getAccentBg()}`}></span>
                    <div className="h-2 bg-slate-300 rounded-xs w-1/4"></div>
                  </div>
                  <div className="space-y-1.5 pl-2">
                    <div className="h-1.5 bg-slate-200 rounded-xs w-full"></div>
                    <div className="h-1.5 bg-slate-200 rounded-xs w-11/12"></div>
                  </div>

                  <div className="flex items-center gap-1 pt-1">
                    <span className={`w-1 h-3 rounded-full transition-colors ${getAccentBg()}`}></span>
                    <div className="h-2 bg-slate-300 rounded-xs w-1/5"></div>
                  </div>
                  <div className="space-y-1.5 pl-2">
                    <div className="h-1.5 bg-slate-200 rounded-xs w-10/12"></div>
                  </div>
                </div>

                {/* Mini skill bubbles */}
                <div className="flex gap-1 flex-wrap pt-2">
                  <span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-sm border transition-all ${getBorderColor()} ${getAccentText()}`}>React</span>
                  <span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-sm border transition-all ${getBorderColor()} ${getAccentText()}`}>Node</span>
                  <span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-sm border transition-all ${getBorderColor()} ${getAccentText()}`}>Postgres</span>
                </div>
              </div>

              {/* Template details */}
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-150">
                  {tpl.type}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-1.5">{tpl.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{tpl.desc}</p>
              </div>

              <div className="pt-2">
                <a
                  href="/auth?mode=register"
                  className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1 transition-colors"
                >
                  Use Layout
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
