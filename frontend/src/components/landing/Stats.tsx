"use client";
import React from "react";
import { AnimatedCounter, ScrollReveal } from "./Animations";

const stats = [
  { value: 95, suffix: "%", label: "ATS Pass Rate", desc: "vs 42% industry avg", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { value: 500, suffix: "K+", label: "Resumes Built", desc: "across 120+ countries", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  { value: 3, suffix: "×", label: "More Interviews", desc: "reported by our users", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { value: 98, suffix: "%", label: "Satisfaction", desc: "5-star user reviews", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-zinc-950 text-white relative z-10 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Horizontal number bar — not cards, unique layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-zinc-800 border border-zinc-800 rounded-3xl overflow-hidden bg-black shadow-2xl">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} variant="fade-up" delay={i * 60}>
              <div className="px-8 py-10 relative group hover:bg-zinc-900/40 transition-colors duration-300">
                {/* Top colored bar */}
                <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="text-5xl font-black text-amber-400 leading-none mb-2">
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1600} />
                </div>
                <p className="text-sm font-bold text-white mb-0.5">{s.label}</p>
                <p className="text-xs text-zinc-500 font-medium">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
