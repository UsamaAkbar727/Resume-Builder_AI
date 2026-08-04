"use client";

import React from "react";
import { 
  Globe, FileText, TrendingUp, Zap, Sparkles, 
  Calendar, Briefcase, Plus, ArrowRight, Target, 
  Award, CheckCircle2, Clock, Grid, ChevronRight
} from "lucide-react";

import { TRANSLATIONS } from "@/utils/i18n";

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
  language?: string;
  onNavigate: (tab: string) => void;
}

// Pro Templates Quick List for Dashboard Quick Start
const QUICK_TEMPLATES = [
  { id: "studio_modern", name: "Studio Modern", color: "bg-blue-600", tag: "Popular" },
  { id: "executive", name: "Executive Leadership", color: "bg-slate-800", tag: "Serif" },
  { id: "tech_specialist", name: "Tech Specialist", color: "bg-emerald-600", tag: "Developer" },
  { id: "creative_visual", name: "Creative Visual", color: "bg-violet-600", tag: "Designer" },
];

export default function DashboardOverview({ jobs, language = "en", onNavigate }: OverviewProps) {
  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS["en"]?.[key] || key;
  };

  const stats = {
    totalApplications: jobs.length,
    interviewsScheduled: jobs.filter(j => j.status === "Interview").length,
    offersReceived: jobs.filter(j => j.status === "Offer").length,
    resumeScore: 94,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* ── Welcome Banner & Quick Action Buttons ── */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold mb-3 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Career Studio Active</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-400 font-bold">94% ATS Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t("welcome") || "Welcome back, Candidate"}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {t("subtext") || "Build ATS-winning resumes, track active applications, and practice AI interviews in real-time."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button 
              onClick={() => onNavigate("builder")} 
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create New Resume
            </button>
            <button 
              onClick={() => onNavigate("import")} 
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/15 backdrop-blur-sm transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-400" /> Import Job URL
            </button>
          </div>
        </div>

      </div>

      {/* ── Quick Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Tracked</span>
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900">{stats.totalApplications}</h3>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-4 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Live Job Pipeline
          </span>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Interviews</span>
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-indigo-600">{stats.interviewsScheduled}</h3>
          </div>
          <span className="text-[11px] text-indigo-600 font-bold mt-4 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Next round scheduled
          </span>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Offers Received</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-emerald-600">{stats.offersReceived}</h3>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-4 flex items-center gap-1">
            ★ High Conversion Rate
          </span>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">ATS Resume Match</span>
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-4xl font-extrabold text-amber-500">{stats.resumeScore}%</h3>
          </div>
          <button 
            onClick={() => onNavigate("builder")} 
            className="text-[11px] text-blue-600 hover:text-blue-800 font-bold mt-4 text-left flex items-center gap-1"
          >
            Optimize keywords →
          </button>
        </div>

      </div>

      {/* ── Canva Templates Quick Launch Banner ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-blue-600" /> Pro Resume Templates Quick Launch
            </h3>
            <p className="text-xs text-gray-500">
              Select any design template to open directly in the real-time AI Resume Builder
            </p>
          </div>
          <button 
            onClick={() => onNavigate("builder")} 
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            View All 10+ Templates <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onNavigate("builder")}
              className="group p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md bg-gray-50/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-3 h-3 rounded-full ${tmpl.color}`} />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                  {tmpl.tag}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tmpl.name}
              </h4>
              <p className="text-[11px] text-gray-500 mt-1">1-Click Instant Edit</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two Column Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Applications Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{t("recentApps") || "Recent Job Applications"}</h3>
                <p className="text-xs text-gray-500">Tracked company responses and interview status</p>
              </div>
              <button 
                onClick={() => onNavigate("tracker")} 
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                View Full Kanban Board →
              </button>
            </div>
            
            {jobs.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs">
                No job applications tracked yet. Click "Import Job URL" to start!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 font-bold text-gray-900">{job.company}</td>
                        <td className="py-3.5 text-gray-600 font-medium">{job.role}</td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            job.status === "Offer" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                            job.status === "Interview" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                            job.status === "Applied" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className={`text-[10px] font-bold ${
                            job.priority === "High" ? "text-red-600" :
                            job.priority === "Medium" ? "text-amber-600" : "text-emerald-600"
                          }`}>
                            {job.priority} Priority
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Co-Pilot & Upcoming Interviews */}
        <div className="space-y-6">
          
          {/* AI Insights Widget */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white rounded-2xl border border-blue-200 p-6 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI Career Co-Pilot
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Your resume has a <span className="font-bold text-emerald-700">94% ATS match</span> for Staff Engineer roles. Adding keywords like <span className="bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded text-[10px]">Docker Orchestration</span> will boost score by +4%.
            </p>
            <button 
              onClick={() => onNavigate("builder")} 
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Launch Builder & Tailor →
            </button>
          </div>

          {/* Upcoming Interviews Widget */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Upcoming Interview Rounds
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Stripe</h4>
                  <p className="text-[11px] text-gray-500">Systems Architecture</p>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Aug 01
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Notion</h4>
                  <p className="text-[11px] text-gray-500">Product Fit Screen</p>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Aug 03
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
