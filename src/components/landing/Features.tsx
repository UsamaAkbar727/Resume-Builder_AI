"use client";

import React from "react";
import { 
  FileText, 
  SearchCode, 
  Trello, 
  Mic, 
  Globe, 
  Compass, 
  ArrowRight 
} from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Features() {
  const featuresList = [
    {
      icon: FileText,
      color: "blue",
      title: "AI Resume Builder",
      description: "Draft high-impact resumes utilizing designer layouts. Move or reorder sections dynamically with full drag-and-drop support.",
      tags: ["Notion-style", "Instant PDF export"],
      link: "#resume-builder-demo"
    },
    {
      icon: SearchCode,
      color: "green",
      title: "ATS Score Analyzer",
      description: "Scan your resume against target job postings. Audit key coverage densities, syntax structures, and readability meters.",
      tags: ["Keyword Audit", "Parser scanner"],
      link: "#ats-resume-checker"
    },
    {
      icon: Trello,
      color: "amber",
      title: "Kanban Job Tracker",
      description: "Manage applications in a centralized workspace. Move columns, log task deadlines, and document network notes.",
      tags: ["Pipeline tracking", "Due reminders"],
      link: "#job-tracker-kanban"
    },
    {
      icon: Mic,
      color: "indigo",
      title: "Voice Mock Interview",
      description: "Practice answering tech screening questions aloud. Track speech pace, acoustic tones, and filler word alerts.",
      tags: ["Speech Acoustics", "Score metrics"],
      link: "#ai-interview-coach"
    },
    {
      icon: Globe,
      color: "rose",
      title: "Portfolio Builder",
      description: "Deploy an elegant portfolio website synced to your resume details. Attach custom domains with simple DNS configs.",
      tags: ["Web Hosting", "Theme options"],
      link: "#portfolio-builder"
    },
    {
      icon: Compass,
      color: "purple",
      title: "AI Career Advisor",
      description: "Receive optimized career paths based on overlap matrices. Learn missing tools and view salary index metrics.",
      tags: ["Skills gap analysis", "Roadmaps"],
      link: "#features"
    }
  ];

  const getColorStyles = (color: string) => {
    switch (color) {
      case "blue":
        return { bg: "bg-blue-500/10", text: "text-blue-600", border: "hover:border-blue-500/20" };
      case "green":
        return { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "hover:border-emerald-500/20" };
      case "amber":
        return { bg: "bg-amber-500/10", text: "text-amber-600", border: "hover:border-amber-500/20" };
      case "indigo":
        return { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "hover:border-indigo-500/20" };
      case "rose":
        return { bg: "bg-rose-500/10", text: "text-rose-600", border: "hover:border-rose-500/20" };
      case "purple":
      default:
        return { bg: "bg-purple-500/10", text: "text-purple-600", border: "hover:border-purple-500/20" };
    }
  };

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <ScrollReveal variant="fade-up" delay={100}>
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Everything you need for your career transition
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-medium">
            Forget messy spreadsheets and disjointed documents. ResumeFlow AI is a unified system engineered to manage your entire job search pipeline.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, idx) => {
          const styles = getColorStyles(feature.color);
          const Icon = feature.icon;

          return (
            <ScrollReveal
              key={feature.title}
              variant="fade-up"
              delay={idx * 50}
              className={`glass-card p-8 flex flex-col justify-between items-start transition-all duration-300 hover:-translate-y-1.5 border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.06)] hover:bg-white ${styles.border}`}
            >
              <div>
                {/* Icon wrapper */}
                <div className={`w-11 h-11 rounded-xl ${styles.bg} flex items-center justify-center ${styles.text} mb-6 border border-white/40 shadow-xs`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{feature.description}</p>
              </div>
              
              <div className="w-full">
                {/* Custom Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={feature.link}
                  className={`text-xs font-bold ${styles.text} flex items-center gap-1 hover:gap-2 transition-all`}
                >
                  Explore Tool <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
