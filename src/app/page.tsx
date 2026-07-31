"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  SearchCode, 
  Trello, 
  Mic, 
  Globe, 
  Compass, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ChevronDown 
} from "lucide-react";

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const pricing = {
    free: { monthly: 0, annually: 0 },
    pro: { monthly: 24, annually: 19 },
    enterprise: { monthly: 99, annually: 79 },
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#111827] relative overflow-hidden">
      {/* Dynamic Glowing Background Orbs & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/10 rounded-full filter blur-[120px] pointer-events-none z-0 animate-pulse duration-10000"></div>
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-200/15 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 bg-[#F5F7FB]/85 backdrop-blur-md border-b border-[#E5E7EB]/50 px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.25)]">
            R
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#111827]">
            ResumeFlow <span className="text-[#2563EB]">AI</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide uppercase text-[#6B7280]">
          <a href="#features" className="hover:text-[#2563EB] transition-colors">Features</a>
          <a href="#showroom" className="hover:text-[#2563EB] transition-colors">Showroom</a>
          <a href="#pricing" className="hover:text-[#2563EB] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[#2563EB] transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="clay-btn-secondary px-5 py-2.5 text-xs font-bold">
            Sign In
          </Link>
          <Link href="/auth?mode=register" className="clay-btn-primary px-5 py-2.5 text-xs text-white font-bold">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 text-center max-w-5xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2F7] text-[10px] font-extrabold tracking-wider uppercase text-[#2563EB] mb-8 border border-[#E5E7EB]/80 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.02)]">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
          Next-Gen AI Resume & Career Suite
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-6">
          Land your dream offer with <br />
          <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
            ATS-Friendly AI Resume Building
          </span>
        </h1>
        
        <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
          ResumeFlow AI is a premium dashboard designed to build optimized resumes, audit keyword coverage against job listings, organize applications on a Kanban board, and simulate mock interviews with AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/auth?mode=register" className="clay-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg w-full sm:w-auto flex items-center justify-center gap-2">
            Build Your Resume Now <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#features" className="clay-btn-secondary px-8 py-3.5 text-xs font-bold uppercase tracking-wider w-full sm:w-auto">
            Explore All Features
          </a>
        </div>

        {/* Hero Interactive Claymorphic Mockup Image */}
        <div className="relative mt-8 max-w-4xl mx-auto clay-card p-2.5 bg-white/80 rounded-2xl shadow-[0_30px_60px_rgba(37,99,235,0.08)]">
          <img 
            src="/resumeflow_dashboard_mockup.png" 
            alt="ResumeFlow AI Workspace Interface Preview" 
            className="w-full h-auto rounded-xl border border-[#E5E7EB]/60" 
          />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto border-t border-[#E5E7EB]/60 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] mb-4">
            Everything you need for your job search
          </h2>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto font-semibold">
            Ditch spreadsheets, text files, and generic resumes. ResumeFlow AI is a fully integrated career ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-blue-100">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">AI Resume Builder</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Create clean resumes utilizing designer styles. Reorder segments instantly with full drag-and-drop support.
              </p>
            </div>
            <div className="text-[10px] text-[#2563EB] font-bold uppercase tracking-wider">
              Templates • Drag & Drop • Instant PDF
            </div>
          </div>

          {/* Feature 2 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#16A34A] mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-green-100">
                <SearchCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">ATS Score Analyzer</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Detailed compatibility checks with targeted industry keywords density audits, grammar diagnostics, and readability index scores.
              </p>
            </div>
            <div className="text-[10px] text-[#16A34A] font-bold uppercase tracking-wider">
              Keyword Audit • Readability • formatting
            </div>
          </div>

          {/* Feature 3 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F59E0B] mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-amber-100">
                <Trello className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">Job Tracker Kanban</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Organize pipeline phases on a beautiful board (Wishlist, Applied, Interview, Offer). Drag-and-drop cards dynamically.
              </p>
            </div>
            <div className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wider">
              Timelines • Reminders • Notes Logs
            </div>
          </div>

          {/* Feature 4 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-indigo-100">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">Voice Mock Interview</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Practice screen rounds with real-time text-to-speech questions and comprehensive audio acoustics performance analysis.
              </p>
            </div>
            <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
              Audio Recording • Acoustics • scorecard
            </div>
          </div>

          {/* Feature 5 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-rose-100">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">Portfolio Builder</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Deploy a stunning portfolio portal detailing projects, experience, and custom styling themes linked to your resume data.
              </p>
            </div>
            <div className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">
              Static Deploy • DNS custom domains
            </div>
          </div>

          {/* Feature 6 */}
          <div className="clay-card p-6 bg-white flex flex-col justify-between items-start">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-purple-100">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-3">AI Career Advisor</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Create structured career roadmaps based on target roles, suggesting training modules and salary projection trends.
              </p>
            </div>
            <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">
              Learning plans • Skill Overlap Matrix
            </div>
          </div>
        </div>
      </section>

      {/* Showroom / Alignments Columns (Text with Image) */}
      <section id="showroom" className="py-24 px-6 max-w-6xl mx-auto border-t border-[#E5E7EB]/60 relative z-10 space-y-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] mb-4">
            Take a look inside the workspace
          </h2>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto font-semibold">
            See how ResumeFlow AI aligns candidate metrics and job information to maximize your application success.
          </p>
        </div>

        {/* Showroom Row 1 (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#16A34A] border border-green-200">
              <SearchCode className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#111827] leading-tight">
              Real-time ATS Keyword Checkers & Audits
            </h3>
            <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
              Don't get filtered by robotic filters. Our analyzer reads your resume raw text content exactly like standard enterprise ATS parsers. 
            </p>
            <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
              It matches keyword coverage ratios against target job descriptions, flags readability scores, highlights grammar improvements, and offers concrete edit commands.
            </p>
            <ul className="space-y-2.5 text-xs font-semibold text-[#111827]">
              <li className="flex items-center gap-2.5 text-[#16A34A]">
                <Check className="w-4 h-4" /> Flesch reading score calibration
              </li>
              <li className="flex items-center gap-2.5 text-[#16A34A]">
                <Check className="w-4 h-4" /> Exact target keyword overlaps
              </li>
              <li className="flex items-center gap-2.5 text-[#16A34A]">
                <Check className="w-4 h-4" /> Format and section parser auditing
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 clay-card p-2 bg-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <img 
              src="/resumeflow_ats_mockup.png" 
              alt="ResumeFlow AI ATS Checker Interface Preview" 
              className="w-full h-auto rounded-xl border border-[#E5E7EB]/50" 
            />
          </div>
        </div>

        {/* Showroom Row 2 (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-last lg:order-first clay-card p-6 bg-white text-left">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-ping"></div>
                  <span className="text-xs font-bold uppercase text-[#DC2626]">Audio Simulator Active</span>
                </div>
                <span className="text-[10px] text-[#6B7280]">01:45 / 03:00</span>
              </div>
              
              <div className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] space-y-3">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Question Prompt</span>
                <p className="text-xs text-[#111827] font-semibold leading-relaxed">
                  "Explain how you resolved a database query latency issue in your previous workspace."
                </p>
              </div>

              {/* Simulated Waveform animation */}
              <div className="flex justify-center items-center gap-1.5 h-16 bg-[#F5F7FB] border rounded-xl">
                {[2, 4, 8, 3, 5, 9, 12, 16, 12, 8, 5, 2, 4, 9, 14, 10, 6, 3, 5, 8, 12, 15, 11, 7, 4, 2].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#2563EB] rounded-full animate-bounce"
                    style={{
                      height: `${h * 2.5}px`,
                      animationDelay: `${i * 0.04}s`,
                      animationDuration: "1s"
                    }}
                  ></span>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="text-[#6B7280] font-semibold">Pacing: 135 Words/Min</span>
                <span className="text-[#16A34A] font-bold">Acoustic Score: 88/100</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB] border border-blue-200">
              <Mic className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#111827] leading-tight">
              AI Voice Mock Practice Simulator
            </h3>
            <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
              Ace phone screens and technical screenings. Our built-in voice recorder captures your answers aloud, analyzes your speech acoustics, and generates feedback scorecards.
            </p>
            <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
              It automatically detects redundant fillers ("um", "uh", "like"), evaluates technical vocabulary density, and provides bulleted summaries on key strengths and missing talking points.
            </p>
            <ul className="space-y-2.5 text-xs font-semibold text-[#111827]">
              <li className="flex items-center gap-2.5 text-[#2563EB]">
                <Check className="w-4 h-4" /> Filler words frequency analysis
              </li>
              <li className="flex items-center gap-2.5 text-[#2563EB]">
                <Check className="w-4 h-4" /> Pacing and pronunciation scores
              </li>
              <li className="flex items-center gap-2.5 text-[#2563EB]">
                <Check className="w-4 h-4" /> Audio text keywords matching
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Stepper */}
      <section id="timeline" className="py-24 px-6 bg-[#EEF2F7] border-y border-[#E5E7EB]/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] mb-4">
              Simple 3-Step Journey
            </h2>
            <p className="text-[#6B7280] font-semibold text-sm">
              How ResumeFlow AI guides your complete job search cycle from resume building to signed offer.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:left-12 before:top-2 before:bottom-2 before:w-[3px] before:bg-blue-100">
            {/* Step 1 */}
            <div className="flex gap-8 relative items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold shadow-md z-10 shrink-0">
                1
              </div>
              <div className="clay-card p-6 bg-white flex-1 text-left">
                <h4 className="font-bold text-lg text-[#111827] mb-2">Build & Optimize</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Draft a professional resume using our interactive custom styling controls. Check keyword overlap scores and rewrite bullet points using the AI Tone Modifier.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 relative items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold shadow-md z-10 shrink-0">
                2
              </div>
              <div className="clay-card p-6 bg-white flex-1 text-left">
                <h4 className="font-bold text-lg text-[#111827] mb-2">Import & Track</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Import job listings from LinkedIn or company careers pages. Keep track of status columns, schedule deadlines, and record custom notes on a Kanban board.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 relative items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold shadow-md z-10 shrink-0">
                3
              </div>
              <div className="clay-card p-6 bg-white flex-1 text-left">
                <h4 className="font-bold text-lg text-[#111827] mb-2">Practice & Land Offer</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Practice responding aloud via the AI Voice Interview simulator. Master technical and situational answers and secure your target job offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#6B7280] mb-8 font-semibold text-sm">
            Choose the plan that fits your career goals. Save up to 20% with annual billing cycles.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#EEF2F7] border border-[#E5E7EB]/80 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-[#2563EB] shadow-[1px_2px_4px_rgba(0,0,0,0.05)]"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === "annually"
                  ? "bg-white text-[#2563EB] shadow-[1px_2px_4px_rgba(0,0,0,0.05)]"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="clay-card p-8 bg-white flex flex-col justify-between text-left">
            <div>
              <h3 className="font-bold text-lg text-[#111827] mb-2">Free</h3>
              <p className="text-xs text-[#6B7280] mb-6 font-semibold">Perfect for drafting your initial resume.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-[#111827]">$0</span>
                <span className="text-xs text-[#6B7280]">/month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-[#6B7280] font-semibold">
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> 1 Basic Resume Version
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Basic ATS Keyword Checker
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Kanban Job Tracker (10 jobs)
                </li>
                <li className="flex items-center gap-2.5 text-gray-300">
                  ✕ AI Resume Optimizations
                </li>
                <li className="flex items-center gap-2.5 text-gray-300">
                  ✕ AI Mock Interviews
                </li>
              </ul>
            </div>
            <Link href="/auth?mode=register" className="clay-btn-secondary w-full py-3 text-xs font-bold mt-8">
              Start Free
            </Link>
          </div>

          {/* Pro Tier (Recommended) */}
          <div className="clay-card p-8 bg-white border-2 border-[#2563EB]/40 relative flex flex-col justify-between shadow-[0_12px_24px_rgba(37,99,235,0.08)] text-left">
            <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#2563EB] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_4px_10px_rgba(37,99,235,0.3)]">
              Recommended
            </span>
            <div>
              <h3 className="font-bold text-lg text-[#111827] mb-2">Premium Pro</h3>
              <p className="text-xs text-[#6B7280] mb-6 font-semibold">Build, optimize, track, and land the offer.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-[#111827]">
                  {billingCycle === "annually" ? `$${pricing.pro.annually}` : `$${pricing.pro.monthly}`}
                </span>
                <span className="text-xs text-[#6B7280]">/month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-[#6B7280] font-semibold">
                <li className="flex items-center gap-2.5 text-[#16A34A] font-bold">
                  <Check className="w-4 h-4" /> Unlimited Resume Versions
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Advanced ATS Scoring
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Unlimited Kanban Tracking
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Dynamic Cover Letter Gen
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> AI Voice Mock Simulator
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Export PDF, DOCX, JSON
                </li>
              </ul>
            </div>
            <Link href="/auth?mode=register" className="clay-btn-primary w-full py-3 text-xs text-white font-bold mt-8">
              Get Pro Access
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="clay-card p-8 bg-white flex flex-col justify-between text-left">
            <div>
              <h3 className="font-bold text-lg text-[#111827] mb-2">Team Enterprise</h3>
              <p className="text-xs text-[#6B7280] mb-6 font-semibold">For universities, cohorts, and agencies.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-[#111827]">
                  {billingCycle === "annually" ? `$${pricing.enterprise.annually}` : `$${pricing.enterprise.monthly}`}
                </span>
                <span className="text-xs text-[#6B7280]">/month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-[#6B7280] font-semibold">
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Everything in Pro Plan
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Team Workspace Collab
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Admin Analytics Dashboard
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Custom Developer API Access
                </li>
                <li className="flex items-center gap-2.5 text-[#16A34A]">
                  <Check className="w-4 h-4" /> Dedicated Account Manager
                </li>
              </ul>
            </div>
            <Link href="/auth?mode=register" className="clay-btn-secondary w-full py-3 text-xs font-bold mt-8">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-[#EEF2F7] border-t border-[#E5E7EB]/50 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#6B7280] font-semibold">
              Everything you need to know about resume parsing, speech acoustics, and billing cycles.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="clay-card p-5 bg-white text-left">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between font-bold text-sm text-[#111827] focus:outline-none"
              >
                <span>How does the AI Resume Analyzer score my resume?</span>
                <ChevronDown className={`w-4 h-4 text-[#2563EB] transition-transform duration-200 ${activeFaq === 0 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 0 && (
                <p className="mt-3 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB]/50 pt-3">
                  Our system evaluates your resume structure, keyword overlap ratios, and formatting rules exactly like standard corporate ATS parsers (Workday, Greenhouse, etc.), providing detailed edit recommendations.
                </p>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="clay-card p-5 bg-white text-left">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between font-bold text-sm text-[#111827] focus:outline-none"
              >
                <span>Can I export my resume back to PDF and DOCX format?</span>
                <ChevronDown className={`w-4 h-4 text-[#2563EB] transition-transform duration-200 ${activeFaq === 1 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 1 && (
                <p className="mt-3 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB]/50 pt-3">
                  Yes. All layouts are fully downloadable in standard PDF formats formatted to fit printer boundaries and be parsed correctly by tracking systems.
                </p>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="clay-card p-5 bg-white text-left">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between font-bold text-sm text-[#111827] focus:outline-none"
              >
                <span>What is the AI Voice Mock Interview tool?</span>
                <ChevronDown className={`w-4 h-4 text-[#2563EB] transition-transform duration-200 ${activeFaq === 2 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 2 && (
                <p className="mt-3 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB]/50 pt-3">
                  It simulates an screen interview round. The browser speaks mock questions, records your response aloud via microphone, and grades performance metrics like filler words count, pacing, and keywords coverage.
                </p>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="clay-card p-5 bg-white text-left">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between font-bold text-sm text-[#111827] focus:outline-none"
              >
                <span>Does it support custom domains for the portfolio website?</span>
                <ChevronDown className={`w-4 h-4 text-[#2563EB] transition-transform duration-200 ${activeFaq === 3 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 3 && (
                <p className="mt-3 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB]/50 pt-3">
                  Yes, Pro and Enterprise plans allow generating custom portfolio sites with responsive themes and downloading your resumes directly. You can map your custom domain with simple DNS settings.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-[#9CA3AF] py-12 px-6 border-t border-[#374151] relative z-10 text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                R
              </div>
              <span className="font-bold text-lg text-white">ResumeFlow AI</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-[#9CA3AF]">
              Ultimate AI Resume Builder, Job Tracker, and Career Suite designed to optimize your job application workflow and elevate your resume stats.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/auth" className="hover:text-white transition-colors">Authentication</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">App Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">ATS Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume Examples</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Cover Letters</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Interview Prep</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-[#374151] pt-6 flex flex-col md:flex-row items-center justify-between text-[11px]">
          <span>© 2026 ResumeFlow AI. All rights reserved. pair programming with Antigravity.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
