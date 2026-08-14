"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface ProfileViewProps {
  resumeData?: any;
  setResumeData?: (data: any) => void;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function ProfileView({ resumeData, setResumeData, onNavigate, showToast }: ProfileViewProps) {
  const [name, setName] = useState("Usama jutt");
  const [title, setTitle] = useState("Senior Full Stack Developer");
  const [location, setLocation] = useState("San Francisco, CA");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/sjenkins");
  const [github, setGithub] = useState("https://github.com/sjenkins");

  // Sync state with resumeData updates
  useEffect(() => {
    if (resumeData) {
      setName(resumeData.name || "Usama jutt");
      setTitle(resumeData.title || "Senior Full Stack Developer");
      setLocation(resumeData.location || "San Francisco, CA");
    }
  }, [resumeData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (setResumeData && resumeData) {
      setResumeData({
        ...resumeData,
        name,
        title,
        location
      });
    }
    showToast?.("Profile saved successfully and synced with Resume Builder!", "success");
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

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">Job Seeker Profile</h1>
        <p className="text-sm text-[#6B7280]">Manage contact details, targets, portfolios, and external accounts credentials.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSave} className="clay-card p-6 bg-white space-y-6 text-left">
          {/* Avatar simulation */}
          <div className="flex items-center gap-4 border-b border-[#E5E7EB]/50 pb-5">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-extrabold text-[#2563EB] text-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-[#E5E7EB]">
              {name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "UJ"}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111827]">{name}</h3>
              <p className="text-xs text-[#6B7280]">{title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="clay-input w-full text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Target Career Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="clay-input w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Current Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="clay-input w-full text-xs"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]/50">
            <h4 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider">Social Channels & Portfolio</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] uppercase mb-1.5">GitHub Profile URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="clay-btn-primary w-full py-3 text-sm text-white font-semibold">
            Save Profile changes
          </button>
        </form>
      </div>
    </div>
  );
}
