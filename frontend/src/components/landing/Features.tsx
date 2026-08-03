"use client";

import React from "react";
import {
  FileText,
  SearchCode,
  Trello,
  Mic,
  Globe,
  Compass,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "./Animations";

const featuresList = [
  {
    icon: FileText,
    label: "01",
    color: "blue",
    title: "AI Resume Builder",
    description: "Draft high-impact resumes with designer layouts. Move or reorder sections dynamically with full drag-and-drop support.",
    tags: ["Notion-style", "Instant PDF"],
    link: "#resume-builder-demo",
    iconBg: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    glowColor: "rgba(79,110,247,0.12)",
    borderHover: "hover:border-blue-500/25",
    tagColor: "text-blue-400 bg-blue-500/[0.08] border-blue-500/15",
    linkColor: "text-blue-400",
  },
  {
    icon: SearchCode,
    label: "02",
    color: "emerald",
    title: "ATS Score Analyzer",
    description: "Scan your resume against job postings. Audit key coverage densities, syntax structures, and readability meters.",
    tags: ["Keyword Audit", "Parser Scanner"],
    link: "#ats-resume-checker",
    iconBg: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.1)",
    borderHover: "hover:border-emerald-500/25",
    tagColor: "text-emerald-400 bg-emerald-500/[0.08] border-emerald-500/15",
    linkColor: "text-emerald-400",
  },
  {
    icon: Trello,
    label: "03",
    color: "amber",
    title: "Kanban Job Tracker",
    description: "Manage applications in a centralized workspace. Move columns, log task deadlines, and document network notes.",
    tags: ["Pipeline Tracking", "Due Reminders"],
    link: "#job-tracker-kanban",
    iconBg: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
    glowColor: "rgba(245,158,11,0.1)",
    borderHover: "hover:border-amber-500/25",
    tagColor: "text-amber-400 bg-amber-500/[0.08] border-amber-500/15",
    linkColor: "text-amber-400",
  },
  {
    icon: Mic,
    label: "04",
    color: "violet",
    title: "Voice Mock Interview",
    description: "Practice answering tech questions aloud. Track speech pace, acoustic tones, and filler word alerts in real time.",
    tags: ["Speech Acoustics", "Score Metrics"],
    link: "#ai-interview-coach",
    iconBg: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
    glowColor: "rgba(139,92,246,0.12)",
    borderHover: "hover:border-violet-500/25",
    tagColor: "text-violet-400 bg-violet-500/[0.08] border-violet-500/15",
    linkColor: "text-violet-400",
  },
  {
    icon: Globe,
    label: "05",
    color: "rose",
    title: "Portfolio Builder",
    description: "Deploy an elegant portfolio website synced to your resume data. Attach custom domains with simple DNS configs.",
    tags: ["Web Hosting", "Custom Domains"],
    link: "#portfolio-builder",
    iconBg: "from-rose-500/20 to-rose-600/5",
    iconColor: "text-rose-400",
    glowColor: "rgba(244,63,94,0.1)",
    borderHover: "hover:border-rose-500/25",
    tagColor: "text-rose-400 bg-rose-500/[0.08] border-rose-500/15",
    linkColor: "text-rose-400",
  },
  {
    icon: Compass,
    label: "06",
    color: "cyan",
    title: "AI Career Advisor",
    description: "Receive optimized career paths based on overlap matrices. Learn missing tools and view salary index metrics.",
    tags: ["Skills Gap Analysis", "Roadmaps"],
    link: "#features",
    iconBg: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    glowColor: "rgba(34,211,238,0.1)",
    borderHover: "hover:border-cyan-500/25",
    tagColor: "text-cyan-400 bg-cyan-500/[0.08] border-cyan-500/15",
    linkColor: "text-cyan-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6 bg-[#060A14] relative z-10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] orb orb-blue opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] orb orb-violet opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] text-[11px] font-bold text-[#7A8BA8] uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Core Feature Suite
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-5">
              Everything for your{" "}
              <span className="text-gradient">career transition</span>
            </h2>
            <p className="text-sm sm:text-base text-[#7A8BA8] max-w-2xl mx-auto font-normal leading-relaxed">
              Forget messy spreadsheets and disjointed documents. ResumeFlow AI is a unified system engineered to manage your entire job search pipeline.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal
                key={feature.title}
                variant="fade-up"
                delay={idx * 60}
                className={`luxury-card p-8 flex flex-col justify-between items-start group cursor-default border border-white/[0.06] ${feature.borderHover}`}
                style={{ "--hover-glow": feature.glowColor } as React.CSSProperties}
              >
                <div className="w-full">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.iconBg} border border-white/[0.07] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${feature.iconColor} stroke-[1.8]`} />
                    </div>
                    <span className="text-[10px] font-black text-[#2A3A54] tracking-wider">{feature.label}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-[#7A8BA8] leading-relaxed mb-6">{feature.description}</p>
                </div>

                <div className="w-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${feature.tagColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={feature.link}
                    className={`text-xs font-bold ${feature.linkColor} flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 group/link`}
                  >
                    Explore Tool
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
