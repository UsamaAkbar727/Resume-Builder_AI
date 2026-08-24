"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  DollarSign, 
  Clock, 
  Layers, 
  Award, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Zap,
  TrendingUp,
  SlidersHorizontal,
  Plus,
  X,
  FileText
} from "lucide-react";

interface ProfileViewProps {
  userProfile?: {
    name: string;
    email: string;
    title: string;
    location: string;
    phone?: string;
    bio?: string;
    salary?: string;
    experienceLevel?: string;
    workPreference?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    skills?: string[];
  };
  onUpdateProfile?: (updated: any) => void;
  resumeData?: any;
  setResumeData?: (data: any) => void;
  jobs?: any[];
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function ProfileView({ 
  userProfile, 
  onUpdateProfile, 
  resumeData, 
  setResumeData, 
  jobs = [],
  onNavigate, 
  showToast 
}: ProfileViewProps) {
  // Core Profile Info
  const [name, setName] = useState(userProfile?.name || resumeData?.name || "Usama jutt");
  const [email, setEmail] = useState(userProfile?.email || resumeData?.email || "usama@stripe.com");
  const [title, setTitle] = useState(userProfile?.title || resumeData?.title || "Senior Full Stack Developer");
  const [location, setLocation] = useState(userProfile?.location || resumeData?.location || "San Francisco, CA");
  const [phone, setPhone] = useState(userProfile?.phone || "+1 (555) 234-5678");
  const [bio, setBio] = useState(
    userProfile?.bio || 
    resumeData?.summary || 
    "Results-driven Senior Engineer with 6+ years of experience architecting distributed cloud systems and high-concurrency web applications."
  );

  // Career Preferences
  const [salary, setSalary] = useState(userProfile?.salary || "$185,000 - $220,000");
  const [experienceLevel, setExperienceLevel] = useState(userProfile?.experienceLevel || "Senior (5-8 yrs)");
  const [workPreference, setWorkPreference] = useState(userProfile?.workPreference || "Remote / Hybrid");
  const [availability, setAvailability] = useState("Immediate (2 weeks notice)");

  // Socials & Links
  const [linkedin, setLinkedin] = useState(userProfile?.linkedin || "https://linkedin.com/in/usamajutt");
  const [github, setGithub] = useState(userProfile?.github || "https://github.com/usamajutt");
  const [portfolio, setPortfolio] = useState(userProfile?.portfolio || "https://usamajutt.dev");
  const [twitter, setTwitter] = useState("https://twitter.com/usamajutt");

  // Skills
  const [skills, setSkills] = useState<string[]>(() => {
    if (userProfile?.skills && Array.isArray(userProfile.skills)) return userProfile.skills;
    if (resumeData?.skills) {
      return typeof resumeData.skills === "string" 
        ? resumeData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : resumeData.skills;
    }
    return ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "PostgreSQL", "AWS", "Docker"];
  });

  const [newSkillInput, setNewSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<"overview" | "career" | "skills" | "links">("overview");

  // Sync state when props change
  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setName(userProfile.name);
      if (userProfile.email) setEmail(userProfile.email);
      if (userProfile.title) setTitle(userProfile.title);
      if (userProfile.location) setLocation(userProfile.location);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.bio) setBio(userProfile.bio);
      if (userProfile.salary) setSalary(userProfile.salary);
      if (userProfile.experienceLevel) setExperienceLevel(userProfile.experienceLevel);
      if (userProfile.workPreference) setWorkPreference(userProfile.workPreference);
      if (userProfile.linkedin) setLinkedin(userProfile.linkedin);
      if (userProfile.github) setGithub(userProfile.github);
      if (userProfile.portfolio) setPortfolio(userProfile.portfolio);
      if (userProfile.skills && Array.isArray(userProfile.skills)) setSkills(userProfile.skills);
    } else if (resumeData) {
      if (resumeData.name) setName(resumeData.name);
      if (resumeData.email) setEmail(resumeData.email);
      if (resumeData.title) setTitle(resumeData.title);
      if (resumeData.location) setLocation(resumeData.location);
      if (resumeData.summary) setBio(resumeData.summary);
    }
  }, [userProfile, resumeData]);

  // Calculate Profile Strength (0 - 100%)
  const profileStrength = React.useMemo(() => {
    let score = 0;
    if (name.trim()) score += 15;
    if (email.trim()) score += 15;
    if (title.trim()) score += 15;
    if (location.trim()) score += 10;
    if (bio.trim().length > 30) score += 15;
    if (skills.length >= 5) score += 15;
    if (linkedin.trim() || github.trim() || portfolio.trim()) score += 15;
    return Math.min(100, score);
  }, [name, email, title, location, bio, skills, linkedin, github, portfolio]);

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!skills.includes(newSkillInput.trim())) {
      const updated = [...skills, newSkillInput.trim()];
      setSkills(updated);
    }
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // AI Bio Enhancement
  const handleEnhanceBioWithAI = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const enhancedBio = `Accomplished ${title} with proven expertise in architecting scalable modern web applications and high-availability cloud systems. Adept at driving technical velocity with ${skills.slice(0, 4).join(", ")}, optimizing database performance, and delivering measurable business impact in fast-paced engineering environments.`;
      setBio(enhancedBio);
      setIsGeneratingBio(false);
      showToast?.("AI enhanced your professional summary with executive impact!", "success");
    }, 1000);
  };

  const handleCopyProfileLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`https://resumeflow.ai/p/${name.toLowerCase().replace(/\s+/g, "-")}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      showToast?.("Public profile link copied to clipboard!", "success");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedData = {
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      location: location.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
      salary: salary.trim(),
      experienceLevel,
      workPreference,
      linkedin: linkedin.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
      skills
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
        summary: updatedData.bio,
        skills: updatedData.skills.join(", ")
      });
    }

    // Save to localStorage for instant cross-tab sync
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_user", JSON.stringify(updatedData));
      window.dispatchEvent(new Event("storage"));
    }

    setTimeout(() => {
      setIsSaving(false);
      showToast?.("Profile saved and synced across all dashboard modules!", "success");
    }, 400);
  };

  const initials = name
    ? name
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "UJ";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left max-w-6xl mx-auto pb-12">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {onNavigate ? (
          <button
            onClick={() => onNavigate("overview")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 px-3.5 py-2 rounded-xl shadow-xs hover:shadow-sm group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </button>
        ) : <div />}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyProfileLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
          </button>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("builder")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Studio</span>
            </button>
          )}
        </div>
      </div>

      {/* ── HERO BANNER & CANDIDATE CARD ── */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
        {/* Decorative Gradient Cover */}
        <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
            {/* Avatar & Status */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white dark:bg-slate-900 p-1.5 shadow-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-inner tracking-wider font-display">
                    {initials}
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" title="Open to Opportunities" />
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                    {name || "Candidate Name"}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800">
                    <ShieldCheck className="w-3 h-3" /> Verified Candidate
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>{title || "Target Role Title"}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{location || "Location"}</span>
                </p>
              </div>
            </div>

            {/* Quick Status Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open to Work</span>
              </span>
            </div>
          </div>

          {/* Profile Strength Meter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Profile Completeness
                </span>
                <span className={profileStrength >= 80 ? "text-emerald-600" : "text-blue-600"}>
                  {profileStrength}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    profileStrength >= 85 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                    profileStrength >= 60 ? "bg-gradient-to-r from-blue-500 to-indigo-600" :
                    "bg-gradient-to-r from-amber-500 to-orange-500"
                  }`}
                  style={{ width: `${profileStrength}%` }}
                />
              </div>
            </div>

            {/* Quick Statistics Strip */}
            <div className="flex items-center gap-5 text-xs">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Skills</span>
                <span className="font-extrabold text-slate-800 dark:text-white text-sm">{skills.length} Indexed</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tracked Jobs</span>
                <span className="font-extrabold text-slate-800 dark:text-white text-sm">{jobs.length} Active</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Target Comp</span>
                <span className="font-extrabold text-slate-800 dark:text-white text-sm">{salary.split("-")[0] || "$180k"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION NAV TABS ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSection("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === "overview"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>General Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("career")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === "career"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Goals</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("skills")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === "skills"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Tech Stack & Skills</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("links")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === "links"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Socials & Portfolio</span>
        </button>
      </div>

      {/* ── MAIN EDIT FORM ── */}
      <form onSubmit={handleSave} className="space-y-6 text-left">
        {/* Section 1: Overview / General Info */}
        {activeSection === "overview" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Personal & Contact Credentials</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                These core details automatically synchronize with your resume header and cover letter signature.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Full Legal Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Usama Jutt"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Target Career Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Full Stack Developer"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. usama@company.com"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Current Location (City, Country / Timezone)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA (PST)"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Executive Bio & Professional Summary
                  </label>
                  <button
                    type="button"
                    onClick={handleEnhanceBioWithAI}
                    disabled={isGeneratingBio}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingBio ? "animate-spin" : ""}`} />
                    <span>{isGeneratingBio ? "Enhancing..." : "✨ AI Enhance Bio"}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Summarize your career impact, leadership track record, and key achievements..."
                  className="w-full text-xs leading-relaxed font-normal bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Career Aspirations */}
        {activeSection === "career" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Career Goals & Work Preferences</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure your target compensation and availability to tune AI job matching algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Expected Base Salary Range
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. $185,000 - $220,000"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Seniority Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                >
                  <option value="Entry Level (0-2 yrs)">Entry Level (0-2 yrs)</option>
                  <option value="Mid Level (2-5 yrs)">Mid Level (2-5 yrs)</option>
                  <option value="Senior (5-8 yrs)">Senior (5-8 yrs)</option>
                  <option value="Staff / Principal (8+ yrs)">Staff / Principal (8+ yrs)</option>
                  <option value="Engineering Manager / Director">Engineering Manager / Director</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Workplace Preference
                </label>
                <select
                  value={workPreference}
                  onChange={(e) => setWorkPreference(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                >
                  <option value="Remote Only">Remote Only (Worldwide / US)</option>
                  <option value="Remote / Hybrid">Remote / Hybrid Flexible</option>
                  <option value="On-site Preferred">On-site Preferred</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Notice Period & Availability
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. Immediate (2 weeks notice)"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Tech Stack & Skills */}
        {activeSection === "skills" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Technical Capabilities & Skill Tags</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  These keywords drive ATS matching scores across live job postings.
                </p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full w-fit">
                {skills.length} Skills Active
              </span>
            </div>

            {/* Input to add custom skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a technical skill (e.g. Kubernetes, Redis, PyTorch)..."
                className="flex-1 text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Active Skills Badges Grid */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-slate-700 transition-all"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-0.5 rounded cursor-pointer"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Recommended Suggestions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Recommended for {title}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["CI/CD", "Jest", "Microservices", "System Design", "Kafka", "Prisma"].map(rec => (
                  !skills.includes(rec) && (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => setSkills([...skills, rec])}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 border border-blue-100 dark:border-blue-900/60 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> {rec}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Socials & Portfolios */}
        {activeSection === "links" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Online Presence, Portfolio & Social Profiles</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Connect external accounts to generate verified candidate proof links.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Linkedin className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Github className="w-4 h-4 text-slate-800 dark:text-slate-200 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Personal Portfolio Website
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Globe className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Twitter / X Profile
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://x.com/username"
                    className="w-full text-xs font-semibold bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                  />
                  <Twitter className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STICKY BOTTOM SAVE BAR ── */}
        <div className="sticky bottom-6 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Changes will sync automatically to all 18 dashboard modules.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
