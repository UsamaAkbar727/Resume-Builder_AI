"use client";

import React, { useState } from "react";

export default function JobMatching() {
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(true);

  const matchedJobs = [
    {
      company: "Stripe",
      role: "Senior Frontend Developer",
      match: 94,
      location: "San Francisco, CA",
      salary: "$195,000",
      matchedSkills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
      missingSkills: ["Playwright"],
    },
    {
      company: "Linear",
      role: "Product Engineer (Frontend)",
      match: 88,
      location: "Remote (US/EU)",
      salary: "$170,000",
      matchedSkills: ["React", "TypeScript", "Tailwind CSS"],
      missingSkills: ["GraphQL", "Linear sync engine"],
    },
    {
      company: "Vercel",
      role: "Frontend Engineer - Frameworks",
      match: 82,
      location: "Remote",
      salary: "$160,000",
      matchedSkills: ["React", "TypeScript", "REST APIs"],
      missingSkills: ["Next.js App Router core", "Rust compiled tools"],
    }
  ];

  const handleMatchCheck = () => {
    setMatching(true);
    setMatched(false);
    setTimeout(() => {
      setMatching(false);
      setMatched(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">AI Job Matching Index</h1>
          <p className="text-sm text-[#6B7280]">Calculate overlap percentages against active listings and reveal missing capabilities.</p>
        </div>
        <button onClick={handleMatchCheck} className="clay-btn-primary px-4 py-2.5 text-xs text-white">
          🔄 Recalculate Matches
        </button>
      </div>

      {matching && (
        <div className="clay-card p-12 bg-white text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-[#2563EB] rounded-full animate-spin mx-auto"></div>
          <h4 className="font-bold text-sm text-[#111827]">Comparing resume semantic structures...</h4>
          <p className="text-xs text-[#6B7280]">Evaluating keyword profiles and index factors across vacancy databases.</p>
        </div>
      )}

      {!matching && matched && (
        <div className="space-y-8">
          {/* Summary Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Highest Overlap</span>
              <h3 className="text-3xl font-extrabold text-[#16A34A]">94% Match</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">Senior Frontend Developer role at Stripe</p>
            </div>
            
            <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Core Strength Area</span>
              <h3 className="text-3xl font-extrabold text-[#2563EB]">Frontend Architecture</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">100% match on React, TypeScript stack</p>
            </div>

            <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Key Skill Gap</span>
              <h3 className="text-3xl font-extrabold text-[#DC2626]">End-to-End Testing</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">Missing Playwright/Cypress on 2 target listings</p>
            </div>
          </div>

          {/* List of recommended matches */}
          <div className="clay-card p-6 bg-white">
            <h3 className="font-bold text-lg text-[#111827] mb-6">Recommended Open Vacancies</h3>
            
            <div className="space-y-6">
              {matchedJobs.map((mj, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#EEF2F7]/50 border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Job Header */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-extrabold text-base text-[#111827]">{mj.company}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-50 text-[#16A34A] border border-green-200">
                        {mj.match}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] font-semibold">{mj.role} • {mj.location} • {mj.salary}</p>
                    
                    {/* Skills match check */}
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] text-[#6B7280]">
                        <strong>Matches:</strong>{" "}
                        {mj.matchedSkills.map((s, i) => (
                          <span key={i} className="text-[#16A34A] font-semibold mr-2">✓ {s}</span>
                        ))}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        <strong>Missing:</strong>{" "}
                        {mj.missingSkills.map((s, i) => (
                          <span key={i} className="text-[#DC2626] font-semibold mr-2">✗ {s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Redirecting to application link for ${mj.company}!`)}
                      className="clay-btn-primary px-4 py-2.5 text-xs text-white font-semibold"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => alert(`Job tracking details generated for ${mj.company}!`)}
                      className="clay-btn-secondary px-4 py-2.5 text-xs"
                    >
                      Save to Tracker
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
