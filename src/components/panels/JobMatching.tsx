"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface JobMatchingProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function JobMatching({ resumeData, onNavigate, showToast }: JobMatchingProps) {
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(true);
  const [dynamicJobs, setDynamicJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    highestOverlap: "94% Match",
    highestOverlapText: "Stripe",
    strengthArea: "Frontend Developer",
    skillGap: "Playwright",
    skillGapCount: "2 target listings"
  });

  const jobDatabase = [
    {
      company: "Stripe",
      role: "Senior Frontend Developer",
      location: "San Francisco, CA",
      salary: "$195,000",
      skills: ["react", "typescript", "tailwind css", "rest apis", "playwright"],
    },
    {
      company: "Linear",
      role: "Product Engineer (Frontend)",
      location: "Remote (US/EU)",
      salary: "$170,000",
      skills: ["react", "typescript", "tailwind css", "graphql", "node.js"],
    },
    {
      company: "Vercel",
      role: "Frontend Engineer - Frameworks",
      location: "Remote",
      salary: "$160,000",
      skills: ["react", "typescript", "next.js", "tailwind css", "serverless"],
    },
    {
      company: "Google",
      role: "Software Engineer",
      location: "Mountain View, CA",
      salary: "$210,000",
      skills: ["python", "c++", "go", "systems", "algorithms"],
    },
    {
      company: "Netflix",
      role: "Senior Full Stack Engineer",
      location: "Los Gatos, CA",
      salary: "$240,000",
      skills: ["react", "node.js", "aws", "postgresql", "docker", "redis"],
    }
  ];

  useEffect(() => {
    const userSkills = (resumeData?.skills || "")
      .toLowerCase()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    const computed = jobDatabase.map((job) => {
      const matched = job.skills.filter((sk) => userSkills.includes(sk));
      const missing = job.skills.filter((sk) => !userSkills.includes(sk));
      const matchPct = Math.round((matched.length / job.skills.length) * 100);

      return {
        company: job.company,
        role: job.role,
        match: matchPct,
        location: job.location,
        salary: job.salary,
        matchedSkills: matched.map(s => s.toUpperCase()),
        missingSkills: missing.map(s => s.toUpperCase())
      };
    });

    // Sort descending by match percentage
    computed.sort((a, b) => b.match - a.match);
    setDynamicJobs(computed);

    // Compute key statistics
    const bestJob = computed[0] || { match: 0, company: "None" };
    
    // Find key skill gaps
    const gapCounts: Record<string, number> = {};
    computed.forEach((job) => {
      job.missingSkills.forEach((sk) => {
        gapCounts[sk] = (gapCounts[sk] || 0) + 1;
      });
    });

    let topGap = "No skill gaps found";
    let maxCount = 0;
    Object.keys(gapCounts).forEach((sk) => {
      if (gapCounts[sk] > maxCount) {
        maxCount = gapCounts[sk];
        topGap = sk.charAt(0) + sk.slice(1).toLowerCase();
      }
    });

    setStats({
      highestOverlap: `${bestJob.match}% Match`,
      highestOverlapText: `${bestJob.role} at ${bestJob.company}`,
      strengthArea: userSkills.includes("react") || userSkills.includes("typescript") ? "Frontend Client Frameworks" : "Engineering Core",
      skillGap: topGap,
      skillGapCount: maxCount > 0 ? `Missing ${topGap} on ${maxCount} listings` : "100% matched!"
    });
  }, [resumeData]);

  const handleMatchCheck = () => {
    setMatching(true);
    setMatched(false);
    setTimeout(() => {
      setMatching(false);
      setMatched(true);
      if (showToast) showToast("Job matching score database recalculated!", "success");
    }, 1000);
  };

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
            <div className="clay-card p-6 bg-white text-left">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Highest Overlap</span>
              <h3 className="text-3xl font-extrabold text-[#16A34A]">{stats.highestOverlap}</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">{stats.highestOverlapText}</p>
            </div>
            
            <div className="clay-card p-6 bg-white text-left">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Core Strength Area</span>
              <h3 className="text-3xl font-extrabold text-[#2563EB]">{stats.strengthArea}</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">Strong profile intersection tags</p>
            </div>

            <div className="clay-card p-6 bg-white text-left">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Key Skill Gap</span>
              <h3 className="text-3xl font-extrabold text-[#DC2626]">{stats.skillGap}</h3>
              <p className="text-[10px] text-[#6B7280] mt-2">{stats.skillGapCount}</p>
            </div>
          </div>

          {/* List of recommended matches */}
          <div className="clay-card p-6 bg-white text-left">
            <h3 className="font-bold text-lg text-[#111827] mb-6">Recommended Open Vacancies</h3>
            
            <div className="space-y-6">
              {dynamicJobs.map((mj, idx) => (
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
                        {mj.matchedSkills.map((s: string, i: number) => (
                          <span key={i} className="text-[#16A34A] font-semibold mr-2">✓ {s}</span>
                        ))}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        <strong>Missing:</strong>{" "}
                        {mj.missingSkills.map((s: string, i: number) => (
                          <span key={i} className="text-[#DC2626] font-semibold mr-2">✗ {s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => showToast?.(`Redirecting to application link for ${mj.company}!`, "info")}
                      className="clay-btn-primary px-4 py-2.5 text-xs text-white font-semibold"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => showToast?.(`Job tracking details generated for ${mj.company}!`, "success")}
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
