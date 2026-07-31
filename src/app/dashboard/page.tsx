"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// Import panel components
import DashboardOverview from "@/components/panels/DashboardOverview";
import ResumeBuilder from "@/components/panels/ResumeBuilder";
import ResumeAnalyzer from "@/components/panels/ResumeAnalyzer";
import ResumeOptimizer from "@/components/panels/ResumeOptimizer";
import CoverLetterGenerator from "@/components/panels/CoverLetterGenerator";
import JobTracker from "@/components/panels/JobTracker";
import JobImport from "@/components/panels/JobImport";
import JobMatching from "@/components/panels/JobMatching";
import InterviewPrep from "@/components/panels/InterviewPrep";
import CareerAdvisor from "@/components/panels/CareerAdvisor";
import PortfolioBuilder from "@/components/panels/PortfolioBuilder";
import DocumentsManager from "@/components/panels/DocumentsManager";
import CalendarView from "@/components/panels/CalendarView";
import AnalyticsView from "@/components/panels/AnalyticsView";
import NotificationsView from "@/components/panels/NotificationsView";
import ProfileView from "@/components/panels/ProfileView";
import SettingsView from "@/components/panels/SettingsView";
import AdminPanel from "@/components/panels/AdminPanel";

// Centralized state models
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

type Tab =
  | "overview"
  | "builder"
  | "analyzer"
  | "optimizer"
  | "cover-letter"
  | "tracker"
  | "import"
  | "matching"
  | "interview"
  | "advisor"
  | "portfolio"
  | "documents"
  | "calendar"
  | "analytics"
  | "notifications"
  | "profile"
  | "settings"
  | "admin";

interface SidebarItem {
  id: Tab;
  label: string;
  icon: string;
  badge?: string;
  adminOnly?: boolean;
}

export default function DashboardWrapper() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Shared Job Tracker State
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      company: "Stripe",
      role: "Senior Frontend Engineer",
      status: "Interview",
      salary: "$195,000",
      location: "San Francisco, CA",
      priority: "High",
      notes: "Systems Design scheduled for Aug 01. Focus on caching and security structures.",
      deadline: "2026-08-30",
    },
    {
      id: "2",
      company: "Notion",
      role: "Product Engineer",
      status: "Interview",
      salary: "$180,000",
      location: "San Francisco, CA (Hybrid)",
      priority: "High",
      notes: "Culture Screen scheduled for Aug 03. Prepared Stripe project achievements.",
      deadline: "2026-08-25",
    },
    {
      id: "3",
      company: "Linear",
      role: "Frontend Engineer",
      status: "Applied",
      salary: "$170,000",
      location: "Remote",
      priority: "Medium",
      notes: "Referral submitted. Checking back in 1 week.",
      deadline: "2026-09-05",
    },
    {
      id: "4",
      company: "Vercel",
      role: "Frameworks Engineer",
      status: "Offer",
      salary: "$165,000",
      location: "Remote",
      priority: "High",
      notes: "Offer sheet under review. Base salary negotiation target is $175K.",
      deadline: "2026-08-15",
    }
  ]);

  // Shared Resume Builder State
  const [resumeData, setResumeData] = useState({
    name: "Sarah Jenkins",
    title: "Senior Full Stack Developer",
    email: "sarah.jenkins@company.com",
    location: "San Francisco, CA",
    summary: "Designed and built highly scalable SaaS applications with React, Node.js, and TypeScript. Optimized database schemas to improve payload retrieval speed by 40%.",
    skills: "React, Next.js 15, TypeScript, Tailwind CSS, Node.js, PostgreSQL, GraphQL, AWS",
    experience: [
      {
        company: "Stripe",
        role: "Lead Software Engineer",
        duration: "2024 - Present",
        description: "Scaled payment checkout page handling $2B+ in annual transaction volume. Led migration of microservices architectures to AWS EKS container hosts.",
      },
      {
        company: "Notion",
        role: "Software Engineer II",
        duration: "2022 - 2024",
        description: "Designed core collaborative workspace elements, improving offline state sync performance by 25%. Refactored PostgreSQL indexing tables.",
      }
    ],
    projects: [
      {
        name: "Developer Portfolio Generator",
        tech: "React, Next.js, Vercel API",
        description: "Built automated website creator for job seekers, mapping resume JSON files directly to customizable responsive portfolio hosts.",
      }
    ]
  });

  const sidebarItems: SidebarItem[] = [
    { id: "overview", label: "Dashboard", icon: "LayoutDashboard" },
    { id: "builder", label: "AI Resume Builder", icon: "FileText" },
    { id: "analyzer", label: "Resume Analyzer", icon: "Search", badge: "85%" },
    { id: "optimizer", label: "AI Resume Optimizer", icon: "Zap" },
    { id: "cover-letter", label: "AI Cover Letter", icon: "Mail" },
    { id: "tracker", label: "Job Kanban Tracker", icon: "Kanban" },
    { id: "import", label: "Job Import Scraper", icon: "Globe" },
    { id: "matching", label: "AI Job Matching", icon: "Target" },
    { id: "interview", label: "AI Mock Interview", icon: "Mic" },
    { id: "advisor", label: "AI Career Advisor", icon: "Compass" },
    { id: "portfolio", label: "Portfolio Builder", icon: "Briefcase" },
    { id: "documents", label: "Documents", icon: "FolderOpen" },
    { id: "calendar", label: "Calendar", icon: "Calendar" },
    { id: "analytics", label: "Analytics Stats", icon: "TrendingUp" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "profile", label: "Profile", icon: "User" },
    { id: "settings", label: "Settings", icon: "Settings" },
    { id: "admin", label: "Admin Operations", icon: "Key", adminOnly: true },
  ];

  const handleAddJob = (newJob: Job) => {
    setJobs([...jobs, newJob]);
  };

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex text-[#111827] font-sans">
      {/* Sidebar navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#F5F7FB] border-r border-[#E5E7EB]/50 shrink-0 p-5 justify-between">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-base shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.4)]">
              R
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#111827]">
              ResumeFlow <span className="text-[#2563EB]">AI</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
              const isActive = activeTab === item.id;
              
              // Custom brand colors for each active sidebar icon category
              const iconColors: Record<string, string> = {
                overview: "text-indigo-600",
                builder: "text-blue-600",
                analyzer: "text-emerald-600",
                optimizer: "text-purple-600",
                "cover-letter": "text-pink-600",
                tracker: "text-violet-600",
                import: "text-sky-600",
                matching: "text-red-600",
                interview: "text-amber-600",
                advisor: "text-rose-600",
                portfolio: "text-teal-600",
                documents: "text-cyan-600",
                calendar: "text-orange-600",
                analytics: "text-fuchsia-600",
                notifications: "text-yellow-600",
                profile: "text-blue-600",
                settings: "text-gray-700",
                admin: "text-red-600",
              };
              
              const activeColor = iconColors[item.id] || "text-[#2563EB]";

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-white border border-[#E5E7EB]/40 shadow-[0_4px_10px_rgba(0,0,0,0.04)] text-[#111827]"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-[#EEF2F7]/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                      isActive 
                        ? "bg-[#EEF2F7]/50 border-[#E5E7EB]/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.02)]" 
                        : "bg-white border-[#E5E7EB]/40 group-hover:bg-[#EEF2F7]/30 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                    }`}>
                      {IconComponent && <IconComponent className={`w-3.5 h-3.5 transition-colors ${isActive ? activeColor : "text-[#6B7280] group-hover:text-[#111827]"}`} />}
                    </span>
                    <span className={isActive ? "font-bold text-[#111827]" : "font-semibold text-[#6B7280] group-hover:text-[#111827]"}>
                      {item.label}
                    </span>
                  </span>
                  {item.badge && (
                    <span className="bg-[#16A34A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-[0_2px_4px_rgba(22,163,74,0.15)] animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card footer */}
        <div className="border-t border-[#E5E7EB]/60 pt-4 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-[#2563EB]">
              SJ
            </div>
            <div>
              <h5 className="font-bold text-xs text-[#111827]">Sarah Jenkins</h5>
              <span className="text-[10px] text-[#6B7280] block truncate max-w-[110px]">sarah@stripe.com</span>
            </div>
          </div>
          <Link href="/auth?mode=login" className="text-[#6B7280] hover:text-[#DC2626] font-bold p-1.5 hover:bg-[#EEF2F7] rounded-lg transition-colors border border-transparent hover:border-[#E5E7EB]/50">
            <LucideIcons.LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Workspace content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#F5F7FB]/95 backdrop-blur-md border-b border-[#E5E7EB]/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
                R
              </div>
              <span className="font-bold text-sm">ResumeFlow</span>
            </div>

            {/* Global Search Command trigger button */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="clay-card-flat px-4 py-2 text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-3 cursor-pointer bg-white"
            >
              <LucideIcons.Search className="w-4 h-4 text-[#6B7280]" />
              <span>Search dashboard command palette...</span>
              <kbd className="bg-[#EEF2F7] px-1.5 py-0.5 rounded text-[10px] font-mono border">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("notifications")}
              className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB]/80 flex items-center justify-center text-sm relative hover:bg-[#EEF2F7]/50 text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <LucideIcons.Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626]"></span>
            </button>
            <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-xs text-[#111827]">Sarah Jenkins</span>
              <span className="text-[10px] text-[#6B7280]">Staff Account</span>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-[#2563EB] border border-[#E5E7EB]/50"
            >
              SJ
            </button>
          </div>
        </header>

        {/* Primary Page Canvas */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && <DashboardOverview jobs={jobs} onNavigate={setActiveTab} />}
          {activeTab === "builder" && (
            <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} onNavigate={setActiveTab} />
          )}
          {activeTab === "analyzer" && <ResumeAnalyzer />}
          {activeTab === "optimizer" && <ResumeOptimizer />}
          {activeTab === "cover-letter" && <CoverLetterGenerator />}
          {activeTab === "tracker" && <JobTracker jobs={jobs} setJobs={setJobs} />}
          {activeTab === "import" && <JobImport onAddJob={handleAddJob} onNavigate={setActiveTab} />}
          {activeTab === "matching" && <JobMatching />}
          {activeTab === "interview" && <InterviewPrep />}
          {activeTab === "advisor" && <CareerAdvisor />}
          {activeTab === "portfolio" && <PortfolioBuilder />}
          {activeTab === "documents" && <DocumentsManager />}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "notifications" && <NotificationsView />}
          {activeTab === "profile" && <ProfileView />}
          {activeTab === "settings" && <SettingsView />}
          {activeTab === "admin" && <AdminPanel />}
        </main>
      </div>

      {/* Global Command Palette Modal */}
      {showCommandPalette && (
        <div
          onClick={() => setShowCommandPalette(false)}
          className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clay-card w-full max-w-lg bg-white overflow-hidden shadow-2xl"
          >
            <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3">
              <LucideIcons.Search className="w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                autoFocus
                placeholder="Type to filter dashboard modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-[#111827] focus:outline-none"
              />
            </div>
            
            <div className="max-h-72 overflow-y-auto p-2">
              {filteredSidebarItems.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#6B7280]">No matching views found.</div>
              ) : (
                <div className="space-y-0.5">
                  {filteredSidebarItems.map((item) => {
                    const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setShowCommandPalette(false);
                          setSearchQuery("");
                        }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#111827] hover:bg-[#EEF2F7] transition-all flex items-center gap-3"
                      >
                        {IconComponent ? <IconComponent className="w-4 h-4 text-[#6B7280]" /> : <span className="text-base">▪</span>}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
