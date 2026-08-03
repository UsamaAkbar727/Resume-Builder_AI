"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

interface CareerAdvisorProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function CareerAdvisor({ resumeData, onNavigate, showToast }: CareerAdvisorProps) {
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    const userSkills = (resumeData?.skills || "")
      .toLowerCase()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    // List of target skills and recommended resources
    const targetDatabase = [
      { name: "Kubernetes & Orchestration", search: "kubernetes", level: "Beginner", target: "Advanced", resource: "Certified Kubernetes Administrator (CKA) - Udemy" },
      { name: "GraphQL & Schemas", search: "graphql", level: "Intermediate", target: "Advanced", resource: "Apollo Graph Developer Certification Course" },
      { name: "Playwright Integration Testing", search: "playwright", level: "Beginner", target: "Intermediate", resource: "End-to-End Testing with Playwright - Frontend Masters" },
      { name: "AWS Services & EKS", search: "aws", level: "Intermediate", target: "Advanced", resource: "AWS Certified Solutions Architect Training Course" },
      { name: "Redis Systems Caching", search: "redis", level: "Beginner", target: "Intermediate", resource: "Redis University: Systems Caching RU101" }
    ];

    // Compute gaps
    const gaps = targetDatabase.map((item) => {
      const acquired = userSkills.some((sk: string) => sk.includes(item.search) || item.search.includes(sk));
      return {
        ...item,
        acquired
      };
    });

    setSkillGaps(gaps);

    // Dynamic steps roadmap
    const step1Complete = userSkills.includes("next.js 15") || userSkills.includes("react") || userSkills.includes("typescript");
    const step2Complete = userSkills.includes("postgresql") || userSkills.includes("graphql") || userSkills.includes("node.js");
    const step3Complete = userSkills.includes("kubernetes") || userSkills.includes("aws");

    setSteps([
      {
        title: "Consolidate Client Layout Architectures",
        desc: "Build highly interactive client interfaces. Master Next.js 15 routing, React 19 server hooks, and Tailwind CSS design libraries.",
        status: step1Complete ? "Completed" : "In Progress",
      },
      {
        title: "Integrate Advanced Data Pipelines",
        desc: "Design and implement database schema normalization. Focus on GraphQL Apollo stitch layers and PostgreSQL search queries.",
        status: step2Complete ? "Completed" : (step1Complete ? "In Progress" : "Todo"),
      },
      {
        title: "Deploy Orchestration Infrastructure",
        desc: "Transition applications to microservices. Implement Docker files and Kubernetes cluster definitions inside AWS cloud servers.",
        status: step3Complete ? "Completed" : (step2Complete ? "In Progress" : "Todo"),
      }
    ]);
  }, [resumeData]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">AI Career Advisor & Coach</h1>
        <p className="text-sm text-[#6B7280]">Review your career roadmap, salary projections, and recommended learning resources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step-by-Step Roadmap (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="clay-card p-6 bg-white">
            <h3 className="font-bold text-lg text-[#111827] mb-6">Target Roadmap: Staff Engineer</h3>
            
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-100">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-sm z-10 shrink-0 text-white ${
                    step.status === "In Progress" ? "bg-[#2563EB]" : "bg-gray-300"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] flex-1 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm md:text-base text-[#111827]">{step.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        step.status === "In Progress" ? "bg-blue-50 text-[#2563EB] border-blue-200" : "bg-gray-100 text-[#6B7280] border-gray-200"
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill gaps & Salaries */}
        <div className="space-y-6">
          {/* Salary Projections Card */}
          <div className="clay-card p-6 bg-white space-y-4 text-left">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Salary Estimator (US Region)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1 text-[#6B7280]">
                  <span>Junior Developer</span>
                  <span>$80k - $110k</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-[#6B7280]">
                  <span>Senior Developer</span>
                  <span>$130k - $165k</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-[#111827] font-semibold">
                  <span>Staff Engineer (Target)</span>
                  <span>$180k - $240k</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full">
                  <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#6B7280] leading-relaxed pt-2 border-t border-[#E5E7EB]/50">
              Salary indicators calculated utilizing local industry averages in San Francisco, CA.
            </p>
          </div>

          {/* Skill gaps */}
          <div className="clay-card p-6 bg-white text-left space-y-4">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Recommended Studies</h3>
            
            <div className="space-y-4">
              {skillGaps.map((sg, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-[#E5E7EB]/50 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-[#111827]">{sg.name}</h4>
                    {sg.acquired ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-200 font-bold uppercase">Acquired</span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 font-bold uppercase">Gap</span>
                    )}
                  </div>
                  {!sg.acquired ? (
                    <>
                      <p className="text-[10px] text-[#6B7280]">
                        Current: <span className="font-semibold text-[#DC2626]">{sg.level}</span> → Target:{" "}
                        <span className="font-semibold text-[#16A34A]">{sg.target}</span>
                      </p>
                      <p className="text-[10px] text-[#2563EB] font-medium leading-relaxed mt-1">
                        📖 Course: {sg.resource}
                      </p>
                    </>
                  ) : (
                    <p className="text-[10px] text-green-600/70">Matching skill verified inside your active resume builder profile.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
