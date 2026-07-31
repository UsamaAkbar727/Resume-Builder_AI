"use client";

import React from "react";
import { AnimatedCounter, ScrollReveal } from "./Animations";

export default function Stats() {
  const statsList = [
    { value: 95, suffix: "%", label: "ATS Success Rate", sub: "Outperforms standard templates" },
    { value: 500000, suffix: "+", label: "Resumes Built", sub: "Trusted by top engineers" },
    { value: 120, suffix: "+", label: "Countries Supported", sub: "Global formatting compliant" },
    { value: 98, suffix: "%", label: "Satisfaction Score", sub: "Positive feedback from users" },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-gray-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-4xl">
              Engineered for application success
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
              We leverage real recruiter parsing algorithms to ensure your resumes score high and bypass automated filters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <ScrollReveal
              key={stat.label}
              variant="scale-in"
              delay={idx * 100}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] flex flex-col justify-center items-center text-center hover:border-blue-500/10 transition-colors"
            >
              <span className="text-4xl md:text-5xl font-black text-blue-600 tracking-tight flex items-baseline justify-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-4 mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {stat.sub}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
