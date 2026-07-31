"use client";

import React from "react";

export default function CareerAdvisor() {
  const steps = [
    {
      title: "Consolidate Senior Experience",
      desc: "Lead at least one end-to-end multi-million dollar system redesign. Master Next.js 15, React 19, and cloud load management protocols.",
      status: "In Progress",
    },
    {
      title: "Add Distributed Orchestration Skills",
      desc: "Complete certification in Kubernetes infrastructure management. Integrate EKS services with modern microservices environments.",
      status: "Todo",
    },
    {
      title: "Target Staff Engineer Applications",
      desc: "Apply to positions requesting systems architecture focus, targeting starting salaries of $190K+. Prepare design systems templates.",
      status: "Todo",
    }
  ];

  const skillGaps = [
    { name: "Kubernetes & EKS", level: "Beginner", target: "Advanced", resource: "Certified Kubernetes Administrator (CKA) - Udemy" },
    { name: "GraphQL & Schema Stitching", level: "Intermediate", target: "Advanced", resource: "Apollo Graph Developer Training - official" },
    { name: "Playwright Integration Testing", level: "Beginner", target: "Intermediate", resource: "Testing Next.js applications - Frontend Masters" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                  <h4 className="font-bold text-xs text-[#111827]">{sg.name}</h4>
                  <p className="text-[10px] text-[#6B7280]">
                    Current: <span className="font-semibold text-[#DC2626]">{sg.level}</span> → Target:{" "}
                    <span className="font-semibold text-[#16A34A]">{sg.target}</span>
                  </p>
                  <p className="text-[10px] text-[#2563EB] font-medium leading-relaxed mt-1">
                    📖 Course: {sg.resource}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
