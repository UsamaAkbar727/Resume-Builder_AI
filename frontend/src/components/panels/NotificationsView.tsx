"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

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

  useEffect(() => {
    const list = [];
    const interviewJobs = jobs.filter(j => j.status === "Interview");
    
    if (interviewJobs.length > 0) {
      list.push({
        id: "1",
        title: "New Interview Scheduled",
        desc: `Your ${interviewJobs[0].company} ${interviewJobs[0].role} round is scheduled. Deadline focus: ${interviewJobs[0].deadline || "soon"}.`,
        time: "Just now",
        read: false
      });
    } else {
      list.push({
        id: "1",
        title: "Interview Tracker Status",
        desc: "No active interviews scheduled yet. Move a company to 'Interview' on your Kanban board to schedule.",
        time: "1h ago",
        read: true
      });
    }

    if (resumeData?.skills) {
      const skillCount = resumeData.skills.split(",").length;
      list.push({
        id: "2",
        title: "ATS Parser Synced",
        desc: `Active resume synced with builder profile. Indexed ${skillCount} tech capabilities.`,
        time: "10m ago",
        read: false
      });
    }

    list.push({
      id: "3",
      title: "Platform Database Synced",
      desc: `Total tracker indexes: ${jobs.length} vacancy applications saved in localStorage.`,
      time: "2h ago",
      read: true
    });

    setNotifications(list);
  }, [jobs, resumeData]);

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

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">Notifications Center</h1>
        <p className="text-sm text-[#6B7280]">Review critical application announcements and update push delivery guidelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Alerts Inbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Alerts Inbox</h3>
            <button className="text-xs text-[#2563EB] font-semibold hover:underline">Mark all as read</button>
          </div>

          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-colors text-left flex gap-4 items-start ${
                  n.read ? "bg-white border-[#E5E7EB]" : "bg-blue-50/50 border-[#2563EB]/20"
                }`}
              >
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0 animate-ping"></span>
                )}
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <h4 className="font-extrabold text-sm text-[#111827]">{n.title}</h4>
                    <span className="text-[10px] text-[#6B7280] font-medium shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{n.desc}</p>
                </div>
              </div>
            ))}
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
                  className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
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
                  className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
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
                  className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (showToast) showToast("Notification settings saved successfully!", "success");
                else alert("Notification settings saved successfully!");
              }}
              className="clay-btn-primary w-full py-2.5 text-xs text-white font-semibold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
