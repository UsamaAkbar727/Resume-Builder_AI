"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Bell, BellOff, Check, Trash2, X, Sparkles, Calendar, Layers, ShieldAlert } from "lucide-react";

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

export default function NotificationsView({ jobs = [], resumeData, onNavigate, showToast }: { jobs?: Job[]; resumeData?: any; onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Load from localStorage or seed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("resumeflow_notif_settings");
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setEmailAlerts(parsed.emailAlerts ?? true);
          setPushAlerts(parsed.pushAlerts ?? false);
          setWeeklyDigest(parsed.weeklyDigest ?? true);
        } catch (e) {}
      }

      const savedNotifs = localStorage.getItem("resumeflow_notifications");
      if (savedNotifs) {
        try {
          setNotifications(JSON.parse(savedNotifs));
          return;
        } catch (e) {}
      }

      // Seed default notifications
      const list = [];
      const interviewJobs = jobs.filter(j => j.status === "Interview");
      
      if (interviewJobs.length > 0) {
        list.push({
          id: "seed-1",
          title: "New Interview Scheduled",
          desc: `Your ${interviewJobs[0].company} ${interviewJobs[0].role} round is scheduled. Deadline focus: ${interviewJobs[0].deadline || "soon"}.`,
          time: "Just now",
          read: false,
          category: "interview"
        });
      } else {
        list.push({
          id: "seed-1",
          title: "Interview Tracker Status",
          desc: "No active interviews scheduled yet. Move a company to 'Interview' on your Kanban board to schedule.",
          time: "1h ago",
          read: true,
          category: "tracker"
        });
      }

      if (resumeData?.skills) {
        const skillCount = typeof resumeData.skills === "string" ? resumeData.skills.split(",").length : 5;
        list.push({
          id: "seed-2",
          title: "ATS Parser Synced",
          desc: `Active resume synced with builder profile. Indexed ${skillCount} tech capabilities.`,
          time: "10m ago",
          read: false,
          category: "system"
        });
      }

      list.push({
        id: "seed-3",
        title: "Welcome to ResumeFlow AI",
        desc: "Optimize your resume, track job listings, and practice mock interviews inside your new career co-pilot.",
        time: "1d ago",
        read: true,
        category: "system"
      });

      localStorage.setItem("resumeflow_notifications", JSON.stringify(list));
      setNotifications(list);
    }
  }, [jobs, resumeData]);

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("resumeflow_notifications", JSON.stringify(updated));
    showToast?.("All notifications marked as read.", "success");
    
    // Dispatch a storage event to update the red dot badge elsewhere in the layout
    window.dispatchEvent(new Event("storage"));
  };

  const dismissNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("resumeflow_notifications", JSON.stringify(updated));
    showToast?.("Notification dismissed.", "info");
    window.dispatchEvent(new Event("storage"));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("resumeflow_notifications", JSON.stringify([]));
    showToast?.("All notifications cleared.", "info");
    window.dispatchEvent(new Event("storage"));
  };

  const saveSettings = () => {
    const settings = { emailAlerts, pushAlerts, weeklyDigest };
    localStorage.setItem("resumeflow_notif_settings", JSON.stringify(settings));
    showToast?.("Notification preferences saved successfully!", "success");
  };

  // Helper to render category icon
  const renderCategoryIcon = (category?: string) => {
    switch (category) {
      case "interview":
        return (
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        );
      case "tracker":
        return (
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        );
      case "system":
      default:
        return (
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] pb-4 flex justify-between items-end">
        <div className="text-left">
          <h1 className="text-3xl font-extrabold text-[#111827]">Notifications Center</h1>
          <p className="text-sm text-[#6B7280]">Review critical application announcements and update push delivery guidelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Alerts Inbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-xs text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span>Alerts Inbox ({notifications.filter(n => !n.read).length} unread)</span>
            </h3>
            <div className="flex items-center gap-3">
              {notifications.length > 0 && (
                <>
                  <button 
                    onClick={markAllRead} 
                    className="text-xs text-[#2563EB] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all as read
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={clearAll} 
                    className="text-xs text-[#DC2626] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear all
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3.5">
            {notifications.length === 0 ? (
              <div className="clay-card p-12 bg-white text-center text-[#6B7280] min-h-[250px] flex flex-col justify-center items-center space-y-3">
                <BellOff className="w-10 h-10 text-gray-300" />
                <h4 className="font-bold text-sm text-[#111827]">All Caught Up!</h4>
                <p className="text-xs max-w-xs">
                  You have no new notifications. Key application updates, interview schedules, and ATS syncing alerts will appear here.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition-all text-left flex gap-4 items-start relative group shadow-sm ${
                    n.read ? "bg-white border-[#E5E7EB]" : "bg-indigo-50/20 border-indigo-200/60 shadow-[0_2px_8px_rgba(99,102,241,0.03)]"
                  }`}
                >
                  {!n.read && (
                    <span className="absolute top-4 left-3.5 w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  )}
                  
                  {/* Category Styled Icon */}
                  <div className={!n.read ? "pl-2" : ""}>
                    {renderCategoryIcon(n.category)}
                  </div>

                  <div className="space-y-1 flex-1 pr-6">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="font-extrabold text-sm text-[#111827]">{n.title}</h4>
                      <span className="text-[10px] text-[#6B7280] font-semibold shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{n.desc}</p>
                  </div>

                  {/* Individual Dismiss Button */}
                  <button
                    onClick={() => dismissNotification(n.id)}
                    className="absolute right-4 top-4 p-1 rounded-lg border border-transparent text-gray-400 hover:text-gray-650 hover:bg-gray-50 hover:border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Preferences Toggles */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-5 text-left">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]/50 pb-2">Delivery Channels</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Email Alerts</h4>
                  <p className="text-[10px] text-[#6B7280]">Receive immediate emails on scheduled interviews.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4.5 h-4.5 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Push Notifications</h4>
                  <p className="text-[10px] text-[#6B7280]">Receive browser alerts on application deadline changes.</p>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  className="w-4.5 h-4.5 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Weekly Career Digest</h4>
                  <p className="text-[10px] text-[#6B7280]">Weekly roadmap advice and learning recommendations summary.</p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="w-4.5 h-4.5 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="clay-btn-primary w-full py-2.5 text-xs text-white font-bold tracking-wide uppercase cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
