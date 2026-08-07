"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, FileText, Check, Layout, Plus, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function ResumeDemo() {
  const [selectedStyle, setSelectedStyle] = useState<"tech" | "executive" | "creative">("tech");
  const [activeTab, setActiveTab] = useState<"content" | "sections">("content");
  
  // Custom resume data state
  const [name, setName] = useState("Sarah Jenkins");
  const [title, setTitle] = useState("Senior Full Stack Developer");
  const [skills, setSkills] = useState([
    "React", "Next.js 15", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [showSummaryAi, setShowSummaryAi] = useState(false);
  const [summary, setSummary] = useState(
    "Designed and built highly scalable SaaS applications with React, Node.js, and TypeScript. Optimized database schemas to improve payload retrieval speed by 40%."
  );

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleImproveSummary = () => {
    setShowSummaryAi(true);
    setTimeout(() => {
      setSummary(
        "Senior Software Engineer specializing in modern architectures (React, Next.js, Node.js). Engineered high-throughput Stripe payment services, increasing transaction performance by 25% and scaling queries."
      );
      setShowSummaryAi(false);
    }, 1200);
  };

  // Get style class wrappers
  const getStyleClasses = () => {
    switch (selectedStyle) {
      case "executive":
        return {
          wrapper: "font-serif bg-[#FCFBF7] text-stone-800",
          header: "border-b border-stone-300 pb-4 mb-4 text-center",
          name: "text-2xl font-bold tracking-tight text-[#6E4A35]",
          title: "text-xs font-semibold tracking-wider text-stone-500 uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-1 mb-2",
        };
      case "creative":
        return {
          wrapper: "font-sans bg-[#FAFAFA] text-stone-800",
          header: "border-l-4 border-[#E87A36] pl-4 py-2 mb-4 text-left",
          name: "text-2xl font-black tracking-tight text-stone-900",
          title: "text-xs font-bold text-[#E87A36] uppercase mt-0.5",
          sectionHeading: "text-xs font-black tracking-wide text-[#E87A36] mb-2 uppercase border-b border-[#E87A36]/10 pb-0.5",
        };
      case "tech":
      default:
        return {
          wrapper: "font-sans bg-white text-stone-800",
          header: "border-b border-stone-200 pb-4 mb-4 text-left",
          name: "text-2xl font-extrabold tracking-tight text-stone-900",
          title: "text-xs font-semibold text-[#67B0A7] uppercase mt-0.5",
          sectionHeading: "text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-1 mb-2",
        };
    }
  };

  const styleClasses = getStyleClasses();

  const renderResumeSandbox = () => {
    switch (selectedStyle) {
      case "creative":
        return (
          <div className="w-full h-full bg-white flex text-stone-850 text-left font-sans overflow-hidden">
            {/* Dark Sidebar */}
            <div className="w-1/3 bg-stone-900 text-white p-4 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 mb-3 flex items-center justify-center font-bold text-amber-400 text-xs">
                  SJ
                </div>
                <h4 className="font-black leading-tight text-[9px] text-white">{name}</h4>
                <div className="text-stone-400 text-[6.5px] uppercase tracking-wider mt-0.5">{title}</div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <div className="text-stone-450 text-[6.5px] font-bold uppercase tracking-wider mb-2">Skills</div>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span key={skill} className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-850 text-stone-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[6px] text-stone-500 font-bold uppercase tracking-wider">
                s.jenkins@company.com
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-5 bg-stone-50/50 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="font-black text-[#E87A36] uppercase tracking-wider border-b border-[#E87A36]/10 pb-0.5 text-[8px]">
                    Professional Summary
                  </h4>
                  <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
                </div>

                <div>
                  <h4 className="font-black text-[#E87A36] uppercase tracking-wider border-b border-[#E87A36]/10 pb-0.5 text-[8px]">
                    Experience
                  </h4>
                  <div className="space-y-2 mt-1.5">
                    <div>
                      <div className="flex justify-between items-center text-[7.5px] font-black text-stone-800">
                        <span>Lead Engineer @ Stripe</span>
                        <span className="text-stone-450 text-stone-400">2024 - Pres</span>
                      </div>
                      <p className="text-[7px] text-stone-600 mt-0.5 leading-normal">
                        Scaled transaction payment components managing $2B+ in annual capital.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[7.5px] font-black text-stone-800">
                        <span>Software Engineer @ Notion</span>
                        <span className="text-stone-450 text-stone-400">2022 - 2024</span>
                      </div>
                      <p className="text-[7px] text-stone-600 mt-0.5 leading-normal">
                        Designed core collaborative elements, improving sync performance by 25%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "executive":
        return (
          <div className="w-full h-full bg-[#FCFBF7] text-stone-800 p-6 flex flex-col justify-between text-left font-serif overflow-y-auto">
            <div>
              {/* Centered Header */}
              <div className="pb-3 border-b border-stone-300 mb-3 text-center">
                <h4 className="font-bold tracking-tight text-stone-900 text-base">{name}</h4>
                <div className="font-semibold uppercase tracking-wider text-[#6E4A35] text-[8px] mt-0.5">
                  {title}
                </div>
                <div className="text-[7px] text-stone-500 mt-1 flex justify-center gap-3">
                  <span>s.jenkins@company.com</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-3.5">
                <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Summary</h5>
                <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-3.5">
                <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Experience</h5>
                <div className="space-y-2 mt-1">
                  <div>
                    <div className="flex justify-between items-center text-[7.5px] font-bold text-stone-800">
                      <span>Lead Software Engineer — Stripe</span>
                      <span className="text-stone-450 text-stone-400">2024 - Present</span>
                    </div>
                    <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                      Scaled transaction payment components managing $2B+ in annual capital.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[7.5px] font-bold text-stone-800">
                      <span>Software Engineer II — Notion</span>
                      <span className="text-stone-450 text-stone-400">2022 - 2024</span>
                    </div>
                    <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                      Designed core collaborative elements, improving offline sync benchmarks by 25%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#6E4A35] border-b border-stone-200 pb-0.5 text-[8px]">Skills</h5>
              <div className="flex flex-wrap gap-1 mt-1">
                {skills.map((skill) => (
                  <span key={skill} className="text-[7px] font-bold border border-stone-250 bg-stone-50 px-1.5 py-0.5 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "tech":
      default:
        return (
          <div className="w-full h-full bg-white text-stone-850 p-6 flex flex-col justify-between text-left font-sans overflow-y-auto">
            <div>
              {/* Left Aligned Header */}
              <div className="pb-3 border-b border-stone-200 mb-3">
                <h4 className="font-black tracking-tight text-stone-900 text-base">{name}</h4>
                <div className="font-bold uppercase tracking-wide text-[#67B0A7] text-[8px] mt-0.5">
                  {title}
                </div>
                <div className="text-[7.5px] text-stone-405 text-stone-400 mt-1 flex gap-3">
                  <span>s.jenkins@company.com</span>
                  <span>•</span>
                  <span>SF, CA</span>
                </div>
              </div>

              {/* Grid System for two column */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 space-y-3.5">
                  {/* Summary */}
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Summary</h5>
                    <p className="text-[8px] leading-relaxed text-stone-600 mt-1">{summary}</p>
                  </div>
                  {/* Experience */}
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Experience</h5>
                    <div className="space-y-2 mt-1">
                      <div>
                        <div className="font-bold text-stone-850 text-[8px]">Lead Software Engineer @ Stripe</div>
                        <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                          Scaled payment components managing $2B+ capital.
                        </p>
                      </div>
                      <div>
                        <div className="font-bold text-stone-850 text-[8px]">Software Engineer @ Notion</div>
                        <p className="text-[7px] text-stone-600 mt-0.5 leading-relaxed">
                          Improved Notion offline sync benchmarks by 25%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 space-y-3">
                  <h5 className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-0.5 text-[8px]">Tech Stack</h5>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <span key={skill} className="text-[7px] font-bold px-1.5 py-0.5 rounded-sm border border-stone-150 bg-stone-50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-stone-400 pt-2 border-t flex justify-between text-[7px] mt-2">
              <span>sarahjenkins.dev</span>
              <span>SF, CA</span>
            </div>
          </div>
        );
    }
  };


}
