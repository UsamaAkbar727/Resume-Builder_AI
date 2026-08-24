"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface ProfileViewProps {
  userProfile?: {
    name: string;
    email: string;
    title: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  onUpdateProfile?: (updated: any) => void;
  resumeData?: any;
  setResumeData?: (data: any) => void;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function ProfileView({ 
  userProfile, 
  onUpdateProfile, 
  resumeData, 
  setResumeData, 
  onNavigate, 
  showToast 
}: ProfileViewProps) {
  const [name, setName] = useState(userProfile?.name || resumeData?.name || "Usama jutt");
  const [email, setEmail] = useState(userProfile?.email || resumeData?.email || "usama@stripe.com");
  const [title, setTitle] = useState(userProfile?.title || resumeData?.title || "Senior Full Stack Developer");
  const [location, setLocation] = useState(userProfile?.location || resumeData?.location || "San Francisco, CA");
  const [linkedin, setLinkedin] = useState(userProfile?.linkedin || "https://linkedin.com/in/usamajutt");
  const [github, setGithub] = useState(userProfile?.github || "https://github.com/usamajutt");

  // Sync state when props change
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "Usama jutt");
      setEmail(userProfile.email || "usama@stripe.com");
      setTitle(userProfile.title || "Senior Full Stack Developer");
      setLocation(userProfile.location || "San Francisco, CA");
      if (userProfile.linkedin) setLinkedin(userProfile.linkedin);
      if (userProfile.github) setGithub(userProfile.github);
    } else if (resumeData) {
      setName(resumeData.name || "Usama jutt");
      setEmail(resumeData.email || "usama@stripe.com");
      setTitle(resumeData.title || "Senior Full Stack Developer");
      setLocation(resumeData.location || "San Francisco, CA");
    }
  }, [userProfile, resumeData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      location: location.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedData);
    }

    if (setResumeData && resumeData) {
      setResumeData({
        ...resumeData,
        name: updatedData.name,
        email: updatedData.email,
        title: updatedData.title,
        location: updatedData.location,
      });
    }

    showToast?.("Profile saved successfully and synced across all dashboard modules in real time!", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827] dark:text-white font-display">Job Seeker Profile</h1>
        <p className="text-sm text-[#6B7280] dark:text-slate-400">Manage contact details, targets, portfolios, and external accounts credentials.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSave} className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-6 text-left shadow-lg">
          {/* Avatar simulation */}
          <div className="flex items-center gap-4 border-b border-[#E5E7EB]/50 dark:border-slate-800 pb-5">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center font-extrabold text-[#2563EB] dark:text-blue-400 text-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-[#E5E7EB] dark:border-slate-700">
              {name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "UJ"}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">{name}</h3>
              <p className="text-xs text-[#6B7280] dark:text-slate-400">{title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="clay-input w-full text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-2">Target Career Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="clay-input w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-2">Current Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="clay-input w-full text-xs"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]/50 dark:border-slate-800">
            <h4 className="font-bold text-xs text-[#6B7280] dark:text-slate-400 uppercase tracking-wider">Social Channels & Portfolio</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] dark:text-slate-400 uppercase mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] dark:text-slate-400 uppercase mb-1.5">GitHub Profile URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="clay-btn-primary w-full py-3 text-sm text-white font-semibold cursor-pointer shadow-md shadow-indigo-600/20">
            Save Profile changes
          </button>
        </form>
      </div>
    </div>
  );
}
