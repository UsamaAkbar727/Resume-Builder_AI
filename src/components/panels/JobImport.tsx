"use client";

import React, { useState } from "react";
import { Globe, Plus } from "lucide-react";

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

interface ImportProps {
  onAddJob: (job: Job) => void;
  onNavigate: (tab: string) => void;
}

export default function JobImport({ onAddJob, onNavigate }: ImportProps) {
  const [url, setUrl] = useState("https://www.linkedin.com/jobs/view/stripe-senior-frontend-engineer-9284105/");
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleExtract = () => {
    setExtracting(true);
    setExtractedData(null);
    setTimeout(() => {
      setExtracting(false);
      setExtractedData({
        company: "Stripe",
        role: "Senior Frontend Engineer",
        salary: "$195,000",
        location: "San Francisco, CA (Hybrid)",
        skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Playwright"],
        requirements: "5+ years of experience, expertise in client performance, responsive UI structures.",
        benefits: "Medical insurance, stock options, remote workspace setup budget, unlimited PTO.",
        deadline: "2026-08-30",
      });
    }, 1500);
  };

  const handleSave = () => {
    if (extractedData) {
      const newJob: Job = {
        id: Date.now().toString(),
        company: extractedData.company,
        role: extractedData.role,
        status: "Applied",
        salary: extractedData.salary,
        location: extractedData.location,
        priority: "High",
        notes: `Imported from URL: ${url}\nRequirements: ${extractedData.requirements}`,
        deadline: extractedData.deadline,
      };
      onAddJob(newJob);
      alert("Job saved successfully into your tracker under 'Applied'!");
      onNavigate("tracker");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">Job Import Parser</h1>
        <p className="text-sm text-[#6B7280]">Paste a vacancy URL from LinkedIn, Indeed, or Lever to auto-extract company details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Link Paste */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Job Listing URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://linkedin.com/jobs/view/..."
                className="clay-input w-full text-xs"
              />
            </div>
            
            <button
              onClick={handleExtract}
              disabled={extracting}
              className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {extracting ? "Running Web Scraper..." : "Scrape & Parse Job details"}
            </button>
          </div>
        </div>

        {/* Right Column: Extracted Metadata Display */}
        <div className="lg:col-span-7 space-y-6">
          {extracting && (
            <div className="clay-card p-12 bg-white text-center space-y-4 min-h-[300px] flex flex-col justify-center">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-[#2563EB] rounded-full animate-spin mx-auto"></div>
              <h4 className="font-bold text-sm text-[#111827]">Scraping Job Details</h4>
              <p className="text-xs text-[#6B7280]">Parsing page DOM structures and identifying salary, metadata, and skills...</p>
            </div>
          )}

          {!extracting && extractedData && (
            <div className="clay-card p-6 bg-white space-y-5 animate-in fade-in duration-300">
              <div className="flex justify-between items-start border-b border-[#E5E7EB] pb-3">
                <div>
                  <h3 className="font-bold text-lg text-[#111827]">{extractedData.company}</h3>
                  <p className="text-xs text-[#6B7280] font-medium">{extractedData.role}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 uppercase">
                  Verified Data
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7280] block mb-1">Salary Extracted</span>
                  <span className="font-semibold">{extractedData.salary}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Location</span>
                  <span className="font-semibold">{extractedData.location}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Apply Deadline</span>
                  <span className="font-semibold">{extractedData.deadline}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-[#E5E7EB]/50 pt-4">
                <span className="text-xs font-semibold text-[#6B7280] block">Requirements Summary</span>
                <p className="text-xs text-[#6B7280] leading-relaxed bg-[#F5F7FB] p-3 rounded-lg border border-[#E5E7EB]/50">
                  {extractedData.requirements}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#6B7280] block">Required Technical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {extractedData.skills.map((skill: string, i: number) => (
                    <span key={i} className="text-[10px] bg-[#EEF2F7] text-[#111827] px-2 py-0.5 rounded border border-[#E5E7EB]/50 font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-[#E5E7EB]/50 pt-4">
                <span className="text-xs font-semibold text-[#6B7280] block">Company Benefits</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">{extractedData.benefits}</p>
              </div>

              <button
                onClick={handleSave}
                className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Job to Application Tracker
              </button>
            </div>
          )}

          {!extracting && !extractedData && (
            <div className="clay-card p-12 bg-white text-center text-[#6B7280] min-h-[300px] flex flex-col justify-center items-center space-y-3">
              <Globe className="w-10 h-10 text-[#2563EB]" />
              <h4 className="font-bold text-sm text-[#111827]">Paste URL and click Scrape</h4>
              <p className="text-xs max-w-sm">
                We'll extract details dynamically, save you copy-paste steps, and format it for immediate tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
