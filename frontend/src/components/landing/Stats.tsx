"use client";
import React from "react";
import { AnimatedCounter, ScrollReveal } from "./Animations";

const stats = [
  { value: 95, suffix: "%", label: "ATS Pass Rate", desc: "vs 42% industry avg", color: "text-indigo-400", hoverBar: "bg-indigo-500" },
  { value: 500, suffix: "K+", label: "Resumes Built", desc: "across 120+ countries", color: "text-violet-400", hoverBar: "bg-violet-500" },
  { value: 3, suffix: "×", label: "More Interviews", desc: "reported by our users", color: "text-emerald-400", hoverBar: "bg-emerald-500" },
  { value: 98, suffix: "%", label: "Satisfaction", desc: "5-star user reviews", color: "text-cyan-400", hoverBar: "bg-cyan-500" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#06060c] text-white relative z-10 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Horizontal number bar — not cards, unique layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-zinc-900 border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/40 backdrop-blur-md shadow-2xl">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} variant="fade-up" delay={i * 60}>
              <div className="px-8 py-10 relative group hover:bg-zinc-900/20 transition-colors duration-300">
                {/* Top colored bar */}
                <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-b-full ${s.hoverBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`text-5xl font-black ${s.color} leading-none mb-2 font-display`}>
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
