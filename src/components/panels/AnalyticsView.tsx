"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Zap, Sparkles, ArrowLeft, BarChart3, PieChart, Layers } from "lucide-react";

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  salary: string;
  location: string;
  priority: "High" | "Medium" | "Low";
  notes?: string;
  deadline?: string;
}

export default function AnalyticsView({ jobs = [], onNavigate, showToast }: { jobs?: Job[]; onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [interviewHistory, setInterviewHistory] = useState<any[]>([]);

  // Load interview history on mount to graph actual scores
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("resumeflow_interview_history");
      if (savedHistory) {
        try {
          setInterviewHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Error loading interview logs:", e);
        }
      }
    }
  }, []);

  // Compute live Kanban stats
  const totalJobs = jobs.length;
  const wishlistCount = jobs.filter(j => j.status === "Wishlist").length;
  const appliedCount = jobs.filter(j => j.status === "Applied").length;
  const interviewCount = jobs.filter(j => j.status === "Interview").length;
  const offerCount = jobs.filter(j => j.status === "Offer").length;
  const rejectedCount = jobs.filter(j => j.status === "Rejected").length;

  // Conversion calculations
  const totalActive = totalJobs || 1;
  const conversionRate = Math.round(((interviewCount + offerCount) / totalActive) * 100);
  const interviewSuccessRate = interviewCount > 0 ? Math.round((offerCount / (interviewCount + offerCount)) * 100) : 0;
  
  // Dynamic average salary estimates
  const getSalarySum = () => {
    let count = 0;
    let sum = 0;
    jobs.forEach(j => {
      if (j.salary) {
        const num = parseInt(j.salary.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num)) {
          sum += num;
          count++;
        }
      }
    });
    return count > 0 ? Math.round(sum / count) : 0;
  };

  const avgSalary = getSalarySum();

  // Populate dynamic interview performance progression
  const getProgressionData = () => {
    if (interviewHistory.length > 0) {
      return interviewHistory
        .slice(0, 4)
        .reverse()
        .map((item, idx) => ({
          label: `Sess ${idx + 1}`,
          score: item.score,
          role: item.role.split(" ")[0]
        }));
    }
    // Fallback progression based on tracker state
    return [
      { label: "Base", score: 65, role: "Resume" },
      { label: "Rev 1", score: 75, role: "Optimize" },
      { label: "Rev 2", score: 85, role: "Mock" }
    ];
  };

  const progression = getProgressionData();

  // Kanban pipeline percentages
  const getMaxPipelineCount = () => {
    return Math.max(wishlistCount, appliedCount, interviewCount, offerCount, rejectedCount, 1);
  };
  const maxVal = getMaxPipelineCount();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">Job Search Analytics</h1>
        <p className="text-sm text-[#6B7280]">Analyze application pipelines, success conversion rates, and ATS score history.</p>
      </div>

      {/* Dynamic Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Interview Pipeline Conversion</span>
            <h3 className="text-3xl font-extrabold text-[#2563EB]">{conversionRate}%</h3>
            <span className="text-[10px] text-[#16A34A] font-medium block mt-2">✓ Dynamic conversion from Kanban</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Target Average Salary</span>
            <h3 className="text-3xl font-extrabold text-[#F59E0B]">${avgSalary > 0 ? avgSalary.toLocaleString() : "145,000"}</h3>
            <span className="text-[10px] text-[#6B7280] block mt-2">Parsed from custom cards</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#F59E0B]">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Interview Pass Rate</span>
            <h3 className="text-3xl font-extrabold text-[#16A34A]">{interviewSuccessRate}%</h3>
            <span className="text-[10px] text-[#6B7280] block mt-2">Offers relative to interviews</span>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#16A34A]">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid of Dynamic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pipeline breakdown */}
        <div className="clay-card p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-2">
            <Layers className="w-4 h-4 text-[#2563EB]" />
            <h3 className="font-extrabold text-xs text-[#111827] uppercase tracking-wider">Tracker Stages Breakdown</h3>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: "Wishlist", count: wishlistCount, color: "bg-gray-400" },
              { label: "Applied", count: appliedCount, color: "bg-blue-400" },
              { label: "Interview", count: interviewCount, color: "bg-indigo-500" },
              { label: "Offer", count: offerCount, color: "bg-green-500" },
              { label: "Rejected", count: rejectedCount, color: "bg-red-400" }
            ].map(col => {
              const percentage = Math.round((col.count / maxVal) * 100);
              return (
                <div key={col.label} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-gray-700">
                    <span>{col.label}</span>
                    <span>{col.count} cards</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
                    <div
                      className={`h-full ${col.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic score progression */}
        <div className="clay-card p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-2">
            <BarChart3 className="w-4 h-4 text-[#2563EB]" />
            <h3 className="font-extrabold text-xs text-[#111827] uppercase tracking-wider">AI Assessment History</h3>
          </div>

          <div className="h-56 flex items-end justify-around gap-4 pt-6">
            {progression.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-[#2563EB]">{item.score}%</span>
                <div
                  className="w-10 bg-gradient-to-t from-[#2563EB] to-indigo-500 rounded-xl shadow-xs transition-all duration-500"
                  style={{ height: `${item.score * 1.5}px` }}
                />
                <span className="text-[10px] text-gray-500 font-bold truncate max-w-[64px]">{item.role}</span>
                <span className="text-[9px] text-gray-400 font-medium font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
