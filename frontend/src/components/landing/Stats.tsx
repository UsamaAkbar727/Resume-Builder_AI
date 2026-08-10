"use client";
import React from "react";
import { AnimatedCounter, ScrollReveal } from "./Animations";

const stats = [
  { value: 95, suffix: "%", label: "ATS Pass Rate", desc: "vs 42% industry avg", color: "text-indigo-600", hoverBar: "bg-indigo-600" },
  { value: 500, suffix: "K+", label: "Resumes Built", desc: "across 120+ countries", color: "text-violet-600", hoverBar: "bg-violet-600" },
  { value: 3, suffix: "×", label: "More Interviews", desc: "reported by our users", color: "text-emerald-600", hoverBar: "bg-emerald-600" },
  { value: 98, suffix: "%", label: "Satisfaction", desc: "5-star user reviews", color: "text-cyan-600", hoverBar: "bg-cyan-600" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#EEF2FF] text-zinc-900 relative z-10 overflow-hidden">
      {/* Subtle centered radial glow */}
      <div className="section-radial-accent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Horizontal number bar — not cards, unique layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-zinc-200/60 border border-zinc-200/60 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md shadow-xl shadow-indigo-900/5">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} variant="fade-up" delay={i * 60}>
              <div className="px-8 py-10 relative group hover:bg-zinc-50/50 transition-colors duration-300">
                {/* Top colored bar */}
                <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-b-full ${s.hoverBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`text-5xl font-black ${s.color} leading-none mb-2 font-display`}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1600} />
                </div>
                <p className="text-sm font-bold text-zinc-900 mb-0.5">{s.label}</p>
                <p className="text-xs text-zinc-550 font-medium">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
