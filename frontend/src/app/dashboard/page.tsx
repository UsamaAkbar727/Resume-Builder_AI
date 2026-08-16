"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/utils/api";

// Custom premium glassmorphic loader with pulse animation
function PanelLoader({ label }: { label: string }) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/85 shadow-xs animate-pulse">
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-500 animate-spin" />
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
        Loading {label}...
      </h3>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
        Preparing your premium ATS-optimized space
      </p>
    </div>
  );
}

// Dynamically imported panel components
const DashboardOverview = dynamic(() => import("@/components/panels/DashboardOverview"), {
  ssr: false,
  loading: () => <PanelLoader label="Dashboard Overview" />
});
const ResumeBuilder = dynamic(() => import("@/components/panels/ResumeBuilder"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Resume Builder" />
});
const ResumeAnalyzer = dynamic(() => import("@/components/panels/ResumeAnalyzer"), {
  ssr: false,
  loading: () => <PanelLoader label="Resume Analyzer" />
});
const ResumeOptimizer = dynamic(() => import("@/components/panels/ResumeOptimizer"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Resume Optimizer" />
});
const CoverLetterGenerator = dynamic(() => import("@/components/panels/CoverLetterGenerator"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Cover Letter Generator" />
});
const JobTracker = dynamic(() => import("@/components/panels/JobTracker"), {
  ssr: false,
  loading: () => <PanelLoader label="Job Kanban Tracker" />
});
const JobImport = dynamic(() => import("@/components/panels/JobImport"), {
  ssr: false,
  loading: () => <PanelLoader label="Job Import Scraper" />
});
const JobMatching = dynamic(() => import("@/components/panels/JobMatching"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Job Matching" />
});
const InterviewPrep = dynamic(() => import("@/components/panels/InterviewPrep"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Mock Interview Prep" />
});
const CareerAdvisor = dynamic(() => import("@/components/panels/CareerAdvisor"), {
  ssr: false,
  loading: () => <PanelLoader label="AI Career Advisor" />
});
const PortfolioBuilder = dynamic(() => import("@/components/panels/PortfolioBuilder"), {
  ssr: false,
  loading: () => <PanelLoader label="Portfolio Builder" />
});
const DocumentsManager = dynamic(() => import("@/components/panels/DocumentsManager"), {
  ssr: false,
  loading: () => <PanelLoader label="Documents Manager" />
});
const CalendarView = dynamic(() => import("@/components/panels/CalendarView"), {
  ssr: false,
  loading: () => <PanelLoader label="Calendar" />
});
const AnalyticsView = dynamic(() => import("@/components/panels/AnalyticsView"), {
  ssr: false,
  loading: () => <PanelLoader label="Analytics Stats" />
});
const NotificationsView = dynamic(() => import("@/components/panels/NotificationsView"), {
  ssr: false,
  loading: () => <PanelLoader label="Notifications" />
});
const ProfileView = dynamic(() => import("@/components/panels/ProfileView"), {
  ssr: false,
  loading: () => <PanelLoader label="Profile" />
});
const SettingsView = dynamic(() => import("@/components/panels/SettingsView"), {
  ssr: false,
  loading: () => <PanelLoader label="Settings" />
});
const AdminPanel = dynamic(() => import("@/components/panels/AdminPanel"), {
  ssr: false,
  loading: () => <PanelLoader label="Admin Operations" />
});
import { TRANSLATIONS } from "@/utils/i18n";

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
  gradient: string;
  badge?: string;
  adminOnly?: boolean;
}

export default function DashboardWrapper() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [unreadCount, setUnreadCount] = useState(0);

  const [userProfile, setUserProfile] = useState<{ name: string; email: string }>({
    name: "Usama jutt",
    email: "usama@stripe.com",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const u = await api.auth.user();
        let name = u.name;
        let email = u.email;
        if (!name || name === "Sarah Jenkins") {
          name = "Usama jutt";
          email = "usama@stripe.com";
          if (typeof window !== "undefined") {
            localStorage.setItem("resumeflow_user", JSON.stringify({ ...u, name, email }));
          }
        }
        setUserProfile({ name, email });
      } catch (e) {
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem("resumeflow_user");
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              let name = parsed.name;
              let email = parsed.email;
              if (!name || name === "Sarah Jenkins") {
                name = "Usama jutt";
                email = "usama@stripe.com";
                localStorage.setItem("resumeflow_user", JSON.stringify({ ...parsed, name, email }));
              }
              setUserProfile({ name, email });
            } catch (err) {}
          }
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      console.error(e);
    }
  };

  const addNotification = (title: string, desc: string, category: string = "system") => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("resumeflow_notifications");
      let list = [];
      if (saved) {
        try {
          list = JSON.parse(saved);
        } catch (e) {}
      }
      const newNotif = {
        id: Date.now().toString(),
        title,
        desc,
        time: "Just now",
        read: false,
        category
      };
      list.unshift(newNotif);
      localStorage.setItem("resumeflow_notifications", JSON.stringify(list));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const updateUnreadCount = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("resumeflow_notifications");
      if (saved) {
        try {
          const list = JSON.parse(saved);
          setUnreadCount(list.filter((n: any) => !n.read).length);
          return;
        } catch (e) {}
      }
      setUnreadCount(1); // default seed count
    }
  };

  useEffect(() => {
    updateUnreadCount();
    window.addEventListener("storage", updateUnreadCount);
    return () => window.removeEventListener("storage", updateUnreadCount);
  }, []);

  // Read language on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("resumeflow_lang") || "en";
      setLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage on state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_lang", language);
    }
  }, [language]);

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS["en"]?.[key] || key;
  };

  const [themeMode, setThemeMode] = useState("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Read theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("resumeflow_theme") || "light";
      setThemeMode(savedTheme);
      setIsThemeLoaded(true);
    }
  }, []);

  // Write theme and apply classes
  useEffect(() => {
    if (!isThemeLoaded) return;
    
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_theme", themeMode);
      const root = window.document.documentElement;
      
      const applyCurrentTheme = (val: string) => {
        if (val === "dark") {
          root.classList.add("dark");
        } else if (val === "light") {
          root.classList.remove("dark");
        } else {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          if (systemTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
      };

      applyCurrentTheme(themeMode);

      if (themeMode === "system") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (e: MediaQueryListEvent) => {
          if (e.matches) {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        };
        mediaQuery.addEventListener("change", listener);
        return () => mediaQuery.removeEventListener("change", listener);
      }
    }
  }, [themeMode, isThemeLoaded]);

  const handleToggleTheme = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextTheme);
  };

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning"; show: boolean }>({
    message: "",
    type: "success",
    show: false
  });

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type, show: true });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

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
    name: "Usama jutt",
    title: "Senior Full Stack Developer",
    email: "usama.jutt@company.com",
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

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply theme preference
      const savedTheme = localStorage.getItem("resumeflow_theme") || "light";
      const root = window.document.documentElement;
      
      const applyCurrentTheme = (val: string) => {
        if (val === "dark") {
          root.classList.add("dark");
        } else if (val === "light") {
          root.classList.remove("dark");
        } else {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          if (systemTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
      };
      applyCurrentTheme(savedTheme);

      const savedJobs = localStorage.getItem("resumeflow_jobs");
      if (savedJobs) {
        try {
          setJobs(JSON.parse(savedJobs));
        } catch (e) {
          console.error("Error loading jobs:", e);
        }
      }

      const savedResume = localStorage.getItem("resumeflow_resume");
      if (savedResume) {
        try {
          setResumeData(JSON.parse(savedResume));
        } catch (e) {
          console.error("Error loading resume:", e);
        }
      }
    }
  }, []);

  const prevJobsRef = React.useRef<Job[]>([]);
  const prevResumeRef = React.useRef<any>(null);
  const isInitialMount = React.useRef(true);

  // Save to localStorage and detect changes when jobs update
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_jobs", JSON.stringify(jobs));
    }

    if (isInitialMount.current) {
      prevJobsRef.current = jobs;
      return;
    }

    // Compare and find modified/new jobs
    jobs.forEach(job => {
      const prevJob = prevJobsRef.current.find(j => j.id === job.id);
      
      // Status change alert
      if (prevJob && prevJob.status !== job.status) {
        let category = "system";
        if (job.status === "Interview") category = "interview";
        else if (job.status === "Applied" || job.status === "Offer") category = "tracker";
        
        let msg = `Your application status for ${job.role} at ${job.company} was updated to '${job.status}'.`;
        if (job.status === "Interview") {
          msg = `Congrats! Your interview process with ${job.company} for the ${job.role} position has officially started.`;
        } else if (job.status === "Offer") {
          msg = `Excellent news! You received an official job offer from ${job.company} for the ${job.role} role. 🎉`;
        }

        addNotification(
          job.status === "Offer" ? "Offer Received! 🎉" : "Application Status Changed",
          msg,
          category
        );
      }
    });

    prevJobsRef.current = jobs;
  }, [jobs]);

  // Save to localStorage and detect resume updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_resume", JSON.stringify(resumeData));
    }

    if (isInitialMount.current) {
      prevResumeRef.current = resumeData;
      isInitialMount.current = false;
      return;
    }

    if (prevResumeRef.current && JSON.stringify(prevResumeRef.current) !== JSON.stringify(resumeData)) {
      const skillsPart = typeof resumeData.skills === "string" ? resumeData.skills.split(",").slice(0, 3).join(", ") : "skills";
      addNotification(
        "Resume Profile Updated",
        `Your active resume profile has been updated. Key capabilities: ${skillsPart}...`,
        "system"
      );
    }

    prevResumeRef.current = resumeData;
  }, [resumeData]);

  const sidebarItems: SidebarItem[] = [
    { id: "overview", label: "Dashboard", icon: "LayoutGrid", gradient: "from-blue-500 to-indigo-600" },
    { id: "builder", label: "AI Resume Builder", icon: "Layers", gradient: "from-indigo-500 to-purple-600" },
    { id: "analyzer", label: "Resume Analyzer", icon: "Gauge", badge: "85%", gradient: "from-emerald-500 to-teal-600" },
    { id: "optimizer", label: "AI Resume Optimizer", icon: "Rocket", gradient: "from-purple-500 to-pink-600" },
    { id: "cover-letter", label: "AI Cover Letter", icon: "Send", gradient: "from-pink-500 to-rose-600" },
    { id: "tracker", label: "Job Kanban Tracker", icon: "Columns4", gradient: "from-violet-500 to-purple-600" },
    { id: "import", label: "Job Import Scraper", icon: "CloudDownload", gradient: "from-sky-500 to-blue-600" },
    { id: "matching", label: "AI Job Matching", icon: "Fingerprint", gradient: "from-red-500 to-rose-600" },
    { id: "interview", label: "AI Mock Interview", icon: "MessageSquareCode", gradient: "from-amber-500 to-orange-600" },
    { id: "advisor", label: "AI Career Advisor", icon: "Lightbulb", gradient: "from-rose-500 to-red-600" },
    { id: "portfolio", label: "Portfolio Builder", icon: "ExternalLink", gradient: "from-teal-500 to-emerald-600" },
    { id: "documents", label: "Documents", icon: "FolderGit", gradient: "from-cyan-500 to-blue-600" },
    { id: "calendar", label: "Calendar", icon: "Calendar", gradient: "from-orange-500 to-red-600" },
    { id: "analytics", label: "Analytics Stats", icon: "BarChart3", gradient: "from-fuchsia-500 to-purple-600" },
    { id: "notifications", label: "Notifications", icon: "BellRing", gradient: "from-yellow-500 to-amber-600" },
    { id: "profile", label: "Profile", icon: "UserCheck", gradient: "from-blue-500 to-sky-600" },
    { id: "settings", label: "Settings", icon: "Sliders", gradient: "from-gray-500 to-slate-600" },
    { id: "admin", label: "Admin Operations", icon: "Terminal", gradient: "from-red-600 to-rose-700", adminOnly: true },
  ];

  const handleAddJob = (newJob: Job) => {
    setJobs([...jobs, newJob]);
    addNotification(
      "Job Added to Tracker", 
      `Successfully added ${newJob.company} (${newJob.role}) to your Kanban tracker as '${newJob.status}'.`,
      "tracker"
    );
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as Tab);
  };

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#F5F7FB] dark:bg-[#0B0F19] flex text-[#111827] dark:text-white font-sans overflow-hidden">
      {/* Sidebar navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#0B0F19] border-r border-[#E5E7EB]/60 dark:border-slate-800/80 shrink-0 p-5 justify-between h-screen sticky top-0 shadow-[1px_0_5px_rgba(0,0,0,0.015)]">
        <div className="space-y-6 flex flex-col">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 px-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-base shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.4)]">
              R
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#111827] dark:text-white">
              ResumeFlow <span className="text-[#2563EB]">AI</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="space-y-1.5 overflow-y-auto pr-1 max-h-[calc(100vh-175px)]">
            {sidebarItems.map((item) => {
              const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition-all duration-300 group border cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-slate-800 border-[#E5E7EB]/60 dark:border-slate-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-[#111827] dark:text-white"
                      : "bg-transparent border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white hover:bg-[#EEF2F7]/40 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                      isActive 
                        ? `bg-gradient-to-tr ${item.gradient} text-white shadow-[0_3px_8px_rgba(0,0,0,0.12)] border-white/10 scale-105` 
                        : `bg-white dark:bg-slate-800 border-[#E5E7EB]/60 dark:border-slate-700/50 text-[#6B7280] dark:text-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.01)] group-hover:border-transparent group-hover:bg-gradient-to-tr group-hover:${item.gradient} group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_3px_8px_rgba(0,0,0,0.1)]`
                    }`}>
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                    </span>
                    <span className={isActive ? "font-bold text-[#111827] dark:text-white" : "font-semibold text-[#6B7280] dark:text-slate-400 group-hover:text-[#111827] dark:group-hover:text-white"}>
                      {t(item.id)}
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
        <div className="border-t border-[#E5E7EB]/60 dark:border-slate-800/80 pt-4 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center font-bold text-xs text-[#2563EB] dark:text-blue-400">
              {userProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h5 className="font-bold text-xs text-[#111827] dark:text-white">{userProfile.name}</h5>
              <span className="text-[10px] text-[#6B7280] dark:text-slate-400 block truncate max-w-[110px]">{userProfile.email}</span>
            </div>
          </div>
          <Link href="/auth?mode=login" onClick={handleLogout} className="text-[#6B7280] dark:text-slate-400 hover:text-[#DC2626] dark:hover:text-red-400 font-bold p-1.5 hover:bg-[#EEF2F7] dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-[#E5E7EB]/50 dark:hover:border-slate-700/50">
            <LucideIcons.LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Workspace content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#F5F7FB]/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#E5E7EB]/40 dark:border-slate-800/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-8.5 h-8.5 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB]/80 dark:border-slate-700/50 flex items-center justify-center text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer"
              >
                <LucideIcons.Menu className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
                R
              </div>
              <span className="font-bold text-sm hidden sm:inline">ResumeFlow</span>
            </div>

            {/* Global Search Command trigger button */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="clay-card-flat px-3 py-2 text-xs text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white flex items-center gap-2.5 cursor-pointer bg-white dark:bg-slate-800 max-w-[120px] xs:max-w-[180px] sm:max-w-xs md:max-w-md shrink-0 border border-[#E5E7EB]/80 dark:border-slate-700/50"
            >
              <LucideIcons.Search className="w-4 h-4 text-[#6B7280] shrink-0" />
              <span className="truncate hidden sm:inline">Search dashboard command palette...</span>
              <span className="truncate inline sm:hidden">Search...</span>
              <kbd className="hidden md:inline-block bg-[#EEF2F7] px-1.5 py-0.5 rounded text-[10px] font-mono border shrink-0">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick theme toggler shortcut */}
            <button
              onClick={handleToggleTheme}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB]/80 dark:border-slate-700/50 flex items-center justify-center text-sm relative hover:bg-[#EEF2F7]/50 dark:hover:bg-slate-750/50 text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer"
              title={themeMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {themeMode === "dark" ? (
                <LucideIcons.Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <LucideIcons.Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB]/80 dark:border-slate-700/50 flex items-center justify-center text-sm relative hover:bg-[#EEF2F7]/50 dark:hover:bg-slate-750/50 text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer"
            >
              <LucideIcons.Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
              )}
            </button>
            <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-xs text-[#111827] dark:text-white">{userProfile.name}</span>
              <span className="text-[10px] text-[#6B7280] dark:text-slate-400">Staff Account</span>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center font-bold text-xs text-[#2563EB] dark:text-blue-400 border border-[#E5E7EB]/50 dark:border-slate-700/50"
            >
              {userProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </button>
          </div>
        </header>

        {/* Primary Page Canvas */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && <DashboardOverview jobs={jobs} language={language} onNavigate={handleNavigate} userName={userProfile.name} />}
          {activeTab === "builder" && (
            <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} onNavigate={handleNavigate} showToast={showToast} />
          )}
          {activeTab === "analyzer" && <ResumeAnalyzer resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "optimizer" && <ResumeOptimizer resumeData={resumeData} setResumeData={setResumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "cover-letter" && <CoverLetterGenerator resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "tracker" && <JobTracker jobs={jobs} setJobs={setJobs} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "import" && <JobImport onAddJob={handleAddJob} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "matching" && <JobMatching resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} onAddJob={handleAddJob} />}
          {activeTab === "interview" && <InterviewPrep resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "advisor" && <CareerAdvisor resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "portfolio" && <PortfolioBuilder resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "documents" && <DocumentsManager onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "calendar" && <CalendarView jobs={jobs} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "analytics" && <AnalyticsView jobs={jobs} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "notifications" && <NotificationsView jobs={jobs} resumeData={resumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "profile" && <ProfileView resumeData={resumeData} setResumeData={setResumeData} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "settings" && <SettingsView themeMode={themeMode} setThemeMode={setThemeMode} language={language} setLanguage={setLanguage} onNavigate={handleNavigate} showToast={showToast} />}
          {activeTab === "admin" && <AdminPanel onNavigate={handleNavigate} showToast={showToast} />}
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
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#111827] hover:bg-[#EEF2F7] dark:hover:bg-slate-800/60 transition-all flex items-center gap-3"
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

      {/* Modern Luxury Floating Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300 w-auto max-w-sm pointer-events-auto">
          <div className="bg-slate-950/95 dark:bg-slate-900/95 text-white backdrop-blur-xl border border-slate-800/90 rounded-2xl p-3 pl-3.5 pr-2.5 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.45)] relative overflow-hidden">
            {/* Status Icon */}
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
              toast.type === "success" ? "bg-emerald-500/15 text-emerald-400" :
              toast.type === "warning" ? "bg-amber-500/15 text-amber-400" :
              "bg-blue-500/15 text-blue-400"
            }`}>
              {toast.type === "success" ? <LucideIcons.CheckCircle2 className="w-4 h-4" /> :
               toast.type === "warning" ? <LucideIcons.AlertTriangle className="w-4 h-4" /> :
               <LucideIcons.Info className="w-4 h-4" />}
            </div>

            {/* Message Text */}
            <div className="flex-1 pr-1 min-w-0">
              <p className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors shrink-0 cursor-pointer"
            >
              <LucideIcons.X className="w-3.5 h-3.5" />
            </button>
            
            {/* Fine Bottom Countdown Border */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800/40 overflow-hidden">
              <div className={`h-full animate-toast-progress ${
                toast.type === "success" ? "bg-emerald-500" :
                toast.type === "warning" ? "bg-amber-500" :
                "bg-blue-500"
              }`} />
            </div>
          </div>
        </div>
      )}
      {/* Mobile Sidebar drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop blur overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Sidebar Drawer container */}
          <div className="relative flex flex-col w-64 max-w-xs bg-[#F5F7FB] border-r border-[#E5E7EB] p-5 justify-between animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="space-y-6">
              {/* Header logo & Close button */}
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-base">
                    R
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-[#111827]">
                    ResumeFlow <span className="text-[#2563EB]">AI</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <LucideIcons.X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="space-y-1.5 max-h-[calc(100vh-175px)] overflow-y-auto pr-1">
                {sidebarItems.map((item) => {
                  const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition-all duration-300 group border ${
                        isActive
                          ? "bg-white border-[#E5E7EB]/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-[#111827]"
                          : "bg-transparent border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-[#EEF2F7]/40"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                          isActive 
                            ? `bg-gradient-to-tr ${item.gradient} text-white shadow-[0_3px_8px_rgba(0,0,0,0.12)] border-white/10 scale-105` 
                            : `bg-white border-[#E5E7EB]/60 text-[#6B7280] shadow-[0_2px_4px_rgba(0,0,0,0.01)] group-hover:border-transparent group-hover:bg-gradient-to-tr group-hover:${item.gradient} group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_3px_8px_rgba(0,0,0,0.1)]`
                        }`}>
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                        </span>
                        <span className={isActive ? "font-bold text-[#111827]" : "font-semibold text-[#6B7280] group-hover:text-[#111827]"}>
                          {item.label}
                        </span>
                      </span>
                      {item.badge && (
                        <span className="bg-[#16A34A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer User Card Footer */}
            <div className="border-t border-[#E5E7EB]/60 pt-4 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-[#2563EB]">
                  {userProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#111827]">{userProfile.name}</h5>
                  <span className="text-[10px] text-[#6B7280] block truncate max-w-[110px]">{userProfile.email}</span>
                </div>
              </div>
              <Link 
                href="/auth?mode=login" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-[#6B7280] hover:text-[#DC2626] font-bold p-1.5 hover:bg-[#EEF2F7] rounded-lg transition-colors border border-transparent hover:border-[#E5E7EB]/50"
              >
                <LucideIcons.LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
