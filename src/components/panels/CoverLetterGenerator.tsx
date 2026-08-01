"use client";

import React, { useState } from "react";
import { FileText, PenTool, Copy, Download, Sparkles, ArrowLeft } from "lucide-react";

export default function CoverLetterGenerator({ onNavigate, showToast }: { onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [company, setCompany] = useState("Vercel");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [jobDesc, setJobDesc] = useState("Looking for a frontend expert with deep experience in React, Next.js, and Tailwind CSS to optimize our dashboard components...");
  const [tone, setTone] = useState("Professional");
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setLetter(`[Your Contact Information]
[Date]

Hiring Team
${company}

Subject: Application for ${role}

Dear ${company} Hiring Team,

I am writing to express my enthusiastic interest in the ${role} position at ${company}. Having followed ${company}'s contributions to frontend technologies and Vercel deployments, I am eager to contribute my development capabilities to your team.

In my previous roles, I have focused heavily on optimization using React, Next.js, and styling frameworks. For example, at Stripe I refactored key payment checkout steps, which improved responsiveness by 40% and handled large transaction flows smoothly. Your requirement for a developer with deep expertise in optimizing dashboard modules maps perfectly with my career projects.

I look forward to discussing how my experience can support ${company}'s engineering initiatives. Thank you for your time and consideration.

Sincerely,

Sarah Jenkins`);
    }, 1500);
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
        <h1 className="text-3xl font-extrabold text-[#111827]">AI Cover Letter Generator</h1>
        <p className="text-sm text-[#6B7280]">Create custom, job-specific cover letters matching your resume experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Setup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Target Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Select Tone Style</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="clay-input w-full text-xs"
              >
                <option value="Professional">Professional & Corporate</option>
                <option value="Executive">Executive & Leadership</option>
                <option value="Passionate">Passionate & Bold</option>
                <option value="Conversational">Conversational & Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Job Description (Paste)</label>
              <textarea
                rows={5}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="clay-input w-full text-xs leading-relaxed"
                placeholder="Paste key keywords and parameters of the role here..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              {generating ? "Generating Cover Letter..." : "Generate Cover Letter"}
            </button>
          </div>
        </div>

        {/* Right Column: Output Letter */}
        <div className="lg:col-span-7 space-y-6">
          <div className="clay-card p-6 bg-white min-h-[460px] flex flex-col justify-between">
            {letter ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-[#6B7280] border-b border-[#E5E7EB] pb-3">
                  <span>AI Generated Letter • {tone} Tone</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(letter);
                        if (showToast) showToast("Copied to clipboard!", "success");
                        else alert("Copied to clipboard!");
                      }}
                      className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        if (showToast) showToast("Cover Letter downloaded as PDF!", "success");
                        else alert("Cover Letter downloaded as PDF!");
                      }}
                      className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Export PDF
                    </button>
                  </div>
                </div>

                <textarea
                  rows={14}
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  className="w-full text-xs md:text-sm text-[#111827] leading-relaxed font-sans bg-[#F5F7FB] p-4 rounded-xl border border-[#E5E7EB] focus:outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#6B7280] space-y-3 py-20">
                <FileText className="w-10 h-10 text-[#2563EB]" />
                <h4 className="font-bold text-sm text-[#111827]">Generated letter will display here</h4>
                <p className="text-xs max-w-sm">
                  Complete the target details and job description on the left to create a high-scoring customized cover letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
