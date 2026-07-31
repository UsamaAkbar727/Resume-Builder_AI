"use client";

import React from "react";
import { 
  Globe, 
  FileText, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  Calendar, 
  PenTool, 
  Mic, 
  Compass, 
  Briefcase 
} from "lucide-react";

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  salary: string;
  location: string;
  priority: "High" | "Medium" | "Low";
}

interface OverviewProps {
  jobs: Job[];
  onNavigate: (tab: string) => void;
}

export default function DashboardOverview({ jobs, onNavigate }: OverviewProps) {
  const stats = {
    totalApplications: jobs.length,
    interviewsScheduled: jobs.filter(j => j.status === "Interview").length,
    offersReceived: jobs.filter(j => j.status === "Offer").length,
    resumeScore: 85,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Welcome back, Sarah</h1>
          <p className="text-sm text-[#6B7280]">Here is what is happening with your job applications search today.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate("import")} className="clay-btn-secondary px-4 py-2.5 text-xs flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Import Job URL
          </button>
          <button onClick={() => onNavigate("builder")} className="clay-btn-primary px-4 py-2.5 text-xs text-white flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Edit Resume
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="clay-card p-6 bg-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">Total Applications</span>
            <h3 className="text-4xl font-extrabold text-[#111827]">{stats.totalApplications}</h3>
          </div>
          <span className="text-[10px] text-[#16A34A] font-semibold mt-4 block">✓ Active Tracking</span>
        </div>

        <div className="clay-card p-6 bg-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">Interviews</span>
            <h3 className="text-4xl font-extrabold text-[#2563EB]">{stats.interviewsScheduled}</h3>
          </div>
          <span className="text-[10px] text-[#2563EB] font-semibold mt-4 block">→ Next interview: Tomorrow</span>
        </div>

        <div className="clay-card p-6 bg-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">Offers Secured</span>
            <h3 className="text-4xl font-extrabold text-[#16A34A]">{stats.offersReceived}</h3>
          </div>
          <span className="text-[10px] text-[#16A34A] font-semibold mt-4 block">★ 20% conversion rate</span>
        </div>

        <div className="clay-card p-6 bg-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">Primary ATS Score</span>
            <h3 className="text-4xl font-extrabold text-[#F59E0B]">{stats.resumeScore}%</h3>
          </div>
          <span className="text-[10px] text-[#6B7280] mt-4 block">Targeting Staff Engineer</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Recent Applications & Match progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Applications list */}
          <div className="clay-card p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-[#111827]">Recent Job Applications</h3>
              <button onClick={() => onNavigate("tracker")} className="text-xs text-[#2563EB] font-semibold hover:underline">
                View Kanban Board →
              </button>
            </div>
            
            {jobs.length === 0 ? (
              <div className="text-center py-8 text-[#6B7280] text-sm">
                No job applications tracked yet. Click \"Import Job URL\" to start!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-semibold uppercase tracking-wider">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]/50">
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-[#EEF2F7]/30 transition-colors">
                        <td className="py-3 font-semibold text-[#111827]">{job.company}</td>
                        <td className="py-3 text-[#6B7280]">{job.role}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            job.status === "Offer" ? "bg-green-50 text-[#16A34A] border border-green-200" :
                            job.status === "Interview" ? "bg-blue-50 text-[#2563EB] border border-blue-200" :
                            job.status === "Applied" ? "bg-amber-50 text-[#F59E0B] border border-amber-200" :
                            "bg-gray-100 text-[#6B7280]"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`text-[10px] font-semibold ${
                            job.priority === "High" ? "text-[#DC2626]" :
                            job.priority === "Medium" ? "text-[#F59E0B]" : "text-[#16A34A]"
                          }`}>
                            {job.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* AI Suggestions Widget */}
          <div className="clay-card p-6 bg-white border border-[#2563EB]/10 bg-gradient-to-r from-white to-[#EEF2F7]/10">
            <h3 className="font-bold text-lg text-[#111827] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" /> AI Suggestions Panel
            </h3>
            <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
              Based on your target role of <span className="font-semibold text-[#111827]">Staff Engineer</span>, your resume is missing keywords like <span className="bg-red-50 text-[#DC2626] font-semibold px-1 py-0.5 rounded text-[10px] border border-red-100">Kubernetes Orchestration</span> and <span className="bg-red-50 text-[#DC2626] font-semibold px-1 py-0.5 rounded text-[10px] border border-red-100">GraphQL Federation</span>. Adding these will likely increase your score by 12 points.
            </p>
            <div className="flex gap-3">
              <button onClick={() => onNavigate("optimizer")} className="clay-btn-primary px-4 py-2 text-xs text-white">
                Optimize Now
              </button>
              <button onClick={() => onNavigate("matching")} className="clay-btn-secondary px-4 py-2 text-xs">
                Check Skills Match
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Upcoming Interviews & Notifications */}
        <div className="space-y-8">
          {/* Upcoming interviews */}
          <div className="clay-card p-6 bg-white">
            <h3 className="font-bold text-lg text-[#111827] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563EB]" /> Upcoming Interviews
            </h3>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-[#111827]">Stripe</h4>
                  <p className="text-xs text-[#6B7280]">Systems Design Round</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#2563EB] block">Aug 01</span>
                  <span className="text-[10px] text-[#6B7280]">10:00 AM</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-[#111827]">Notion</h4>
                  <p className="text-xs text-[#6B7280]">Culture & Fit Interview</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#2563EB] block">Aug 03</span>
                  <span className="text-[10px] text-[#6B7280]">02:30 PM</span>
                </div>
              </div>
            </div>
            <button onClick={() => onNavigate("calendar")} className="clay-btn-secondary w-full py-2.5 text-xs mt-6 flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Open Calendar Schedule
            </button>
          </div>

          {/* Quick Actions Panel */}
          <div className="clay-card p-6 bg-white">
            <h3 className="font-bold text-lg text-[#111827] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <button onClick={() => onNavigate("cover-letter")} className="p-3 rounded-xl bg-[#EEF2F7]/50 hover:bg-[#EEF2F7] border border-[#E5E7EB]/50 transition-colors text-xs font-semibold flex flex-col items-center gap-1.5 justify-center">
                <PenTool className="w-4 h-4 text-indigo-600" /> Letter Gen
              </button>
              <button onClick={() => onNavigate("interview")} className="p-3 rounded-xl bg-[#EEF2F7]/50 hover:bg-[#EEF2F7] border border-[#E5E7EB]/50 transition-colors text-xs font-semibold flex flex-col items-center gap-1.5 justify-center">
                <Mic className="w-4 h-4 text-emerald-600" /> Mock Practice
              </button>
              <button onClick={() => onNavigate("advisor")} className="p-3 rounded-xl bg-[#EEF2F7]/50 hover:bg-[#EEF2F7] border border-[#E5E7EB]/50 transition-colors text-xs font-semibold flex flex-col items-center gap-1.5 justify-center">
                <Compass className="w-4 h-4 text-amber-600" /> Career Coach
              </button>
              <button onClick={() => onNavigate("portfolio")} className="p-3 rounded-xl bg-[#EEF2F7]/50 hover:bg-[#EEF2F7] border border-[#E5E7EB]/50 transition-colors text-xs font-semibold flex flex-col items-center gap-1.5 justify-center">
                <Briefcase className="w-4 h-4 text-sky-600" /> Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
