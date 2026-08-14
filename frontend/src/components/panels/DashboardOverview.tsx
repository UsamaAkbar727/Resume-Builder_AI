"use client";

import React from "react";
import { 
  Globe, FileText, TrendingUp, Zap, Sparkles, 
  Calendar, Briefcase, Plus, ArrowRight, Target, 
  Award, CheckCircle2, Clock, Grid, ChevronRight,
  Mic, SearchCode, PenTool, Layout, Layers, ShieldCheck
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
  userName?: string;
}

// Interactive Quick AI Tools for Dashboard Bento Grid
const BENTO_TOOLS = [
  { id: "builder", title: "AI Resume Studio", desc: "Build ATS-winning resumes with 10+ templates", icon: FileText, color: "from-blue-500 to-indigo-600", tag: "10+ Templates" },
  { id: "analyzer", title: "ATS Keyword Matcher", desc: "Audit keyword match against target job posts", icon: SearchCode, color: "from-purple-500 to-violet-600", tag: "Live Score" },
  { id: "matching", title: "Live Job Search Engine", desc: "Aggregated live listings from RemoteOK & APIs", icon: Briefcase, color: "from-emerald-500 to-teal-600", tag: "Live Feed" },
  { id: "interview", title: "AI Interview Coach", desc: "Practice STAR mock questions with live feedback", icon: Mic, color: "from-amber-500 to-orange-600", tag: "Voice & Text" },
  { id: "portfolio", title: "Portfolio Site Generator", desc: "Generate & export deployable portfolio code", icon: Layout, color: "from-cyan-500 to-blue-600", tag: "Code Export" },
  { id: "cover-letter", title: "AI Cover Letter Writer", desc: "Generate tailored application letters in seconds", icon: PenTool, color: "from-rose-500 to-pink-600", tag: "Instant AI" },
];

export default function DashboardOverview({ jobs, language = "en", onNavigate, userName }: OverviewProps) {
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
      
      {/* ── Top Executive Dark Hero Banner ── */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
        
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/20 shrink-0">
              {userName ? userName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "UJ"}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold mb-2.5 border border-white/15 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>AI Career Operating System</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-bold">94% ATS Ready</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Welcome back, {userName ? userName.split(" ")[0] : "Usama"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal leading-relaxed">
                Build recruiter-approved resumes, track your job application pipeline in real-time, and practice AI mock interviews.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <button 
              onClick={() => onNavigate("builder")} 
              className="flex-1 lg:flex-none px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create New Resume
            </button>
            <button 
              onClick={() => onNavigate("import")} 
              className="flex-1 lg:flex-none px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-400" /> Import Job URL
            </button>
          </div>

        </div>

      </div>

      {/* ── Dynamic Quick Stats Grid (Glassmorphic Accent Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Applications Tracked</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-gray-900">{stats.totalApplications}</h3>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-4 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> +12% vs last month
          </span>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Interviews Scheduled</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-indigo-600">{stats.interviewsScheduled}</h3>
          </div>
          <span className="text-[11px] text-indigo-600 font-bold mt-4 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Stripe & Notion Next
          </span>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Offers Received</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-emerald-600">{stats.offersReceived}</h3>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-4 flex items-center gap-1">
            ★ 20% Top Conversion Rate
          </span>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">ATS Resume Score</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-amber-500">{stats.resumeScore}%</h3>
          </div>
          <button 
            onClick={() => onNavigate("builder")} 
            className="text-[11px] text-blue-600 hover:text-blue-800 font-bold mt-4 text-left flex items-center gap-1 cursor-pointer"
          >
            Optimize keywords →
          </button>
        </div>

      </div>

      {/* ── Interactive Quick Tools Bento Grid ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" /> Interactive AI Career Tools
            </h3>
            <p className="text-xs text-gray-500">Click any suite tool to launch directly in your workspace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENTO_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="group p-5 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-xl bg-white transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Ribbon */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color}`} />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      {tool.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tool.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two Column Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Applications Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">{t("recentApps") || "Recent Job Applications"}</h3>
                <p className="text-xs text-gray-500">Tracked company responses and interview status</p>
              </div>
              <button 
                onClick={() => onNavigate("tracker")} 
                className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
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
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 font-bold text-gray-900 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                            {job.company.charAt(0)}
                          </div>
                          <span>{job.company}</span>
                        </td>
                        <td className="py-3.5 text-gray-600 font-semibold">{job.role}</td>
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
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white rounded-2xl border border-blue-200 p-6 shadow-sm">
            <h3 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI Career Co-Pilot
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Your resume has a <span className="font-bold text-emerald-700">94% ATS match</span> for Staff Engineer roles. Adding keywords like <span className="bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded text-[10px]">Docker Orchestration</span> will boost score by +4%.
            </p>
            <button 
              onClick={() => onNavigate("builder")} 
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Launch Builder & Tailor →
            </button>
          </div>

          {/* Upcoming Interviews Widget */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
