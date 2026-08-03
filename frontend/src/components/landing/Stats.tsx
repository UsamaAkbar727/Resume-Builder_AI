"use client";

import React from "react";
import { AnimatedCounter, ScrollReveal } from "./Animations";
import { TrendingUp, Users, Globe, Star } from "lucide-react";

const statsList = [
  {
    value: 95, suffix: "%", label: "ATS Success Rate",
    sub: "Outperforms standard templates",
    icon: TrendingUp, color: "blue",
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400", borderColor: "hover:border-blue-500/25",
    glow: "hover:shadow-[0_0_30px_rgba(79,110,247,0.1)]"
  },
  {
    value: 500000, suffix: "+", label: "Resumes Built",
    sub: "Trusted by top engineers worldwide",
    icon: Users, color: "violet",
    gradient: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400", borderColor: "hover:border-violet-500/25",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
  },
  {
    value: 120, suffix: "+", label: "Countries Supported",
    sub: "Global formatting compliant",
    icon: Globe, color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400", borderColor: "hover:border-cyan-500/25",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
  },
  {
    value: 98, suffix: "%", label: "Satisfaction Score",
    sub: "Positive reviews from candidates",
    icon: Star, color: "amber",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400", borderColor: "hover:border-amber-500/25",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
  },
];

const gradientTextMap: Record<string, string> = {
  blue: "text-gradient-blue",
  violet: "text-gradient-warm",
  cyan: "bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent",
  amber: "bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent",
};

export default function Stats() {
  return (
    <section className="py-24 bg-[#060A14] border-b border-white/[0.05] relative z-10 overflow-hidden">
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] orb orb-blue opacity-30 animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] text-[11px] font-bold text-[#7A8BA8] uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Performance Metrics
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4">
              Engineered for{" "}
              <span className="text-gradient">application success</span>
            </h2>
            <p className="text-sm sm:text-base text-[#7A8BA8] max-w-xl mx-auto font-normal leading-relaxed">
              We leverage real recruiter parsing algorithms to ensure your resumes score high and bypass automated filters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal
                key={stat.label}
                variant="scale-in"
                delay={idx * 100}
                className={`glow-card p-8 flex flex-col items-center text-center group transition-all duration-400 ${stat.borderColor} ${stat.glow} cursor-default`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>

                {/* Number */}
                <span className={`text-5xl md:text-6xl font-black tracking-tighter flex items-baseline justify-center mb-3 ${gradientTextMap[stat.color]}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
                </span>

                <h3 className="text-sm font-bold text-white mb-1.5">{stat.label}</h3>
                <p className="text-xs text-[#7A8BA8] font-medium leading-snug">{stat.sub}</p>

                {/* Bottom glow line */}
                <div className={`absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-${stat.color}-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
