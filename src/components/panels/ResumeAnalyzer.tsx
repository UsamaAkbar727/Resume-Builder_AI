"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function ResumeAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true); // default loaded for instant premium display
  const [score, setScore] = useState(85);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAnalyzing(true);
      setAnalyzed(false);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
        setScore(Math.floor(Math.random() * 15) + 80); // randomize high score for showcase
      }, 2000);
    }
  };

  const improvements = [
    {
      category: "Keywords",
      issue: "Missing core skill match: 'Kubernetes'",
      impact: "High Impact",
      impactColor: "text-[#DC2626] bg-red-50 border-red-200",
      fix: "Add Kubernetes under Skills and mention container cluster deployments in Stripe experience."
    },
    {
      category: "Action Verbs",
      issue: "Passive phrasing: 'Was responsible for scaling checkout'",
      impact: "Medium Impact",
      impactColor: "text-[#F59E0B] bg-amber-50 border-amber-200",
      fix: "Change to 'Architected checkout pipeline migrations, increasing transaction throughput by 30%.'"
    },
    {
      category: "Formatting",
      issue: "Invalid section title: 'Additional Fun Activities'",
      impact: "Low Impact",
      impactColor: "text-gray-500 bg-gray-50 border-gray-200",
      fix: "Rename to 'Projects' or 'Certifications' to align with standard ATS parser regex definitions."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">ATS Resume Analyzer</h1>
        <p className="text-sm text-[#6B7280]">Check keywords, alignment, syntax, and formatting compliance.</p>
      </div>

      {/* Drag & Drop File Upload */}
      <div className="clay-card p-8 bg-white text-center border-dashed border-2 border-[#2563EB]/20 hover:border-[#2563EB]/40 transition-colors relative flex flex-col items-center justify-center min-h-[220px]">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="max-w-md mx-auto space-y-3 flex flex-col items-center">
          <UploadCloud className="w-10 h-10 text-[#2563EB] mb-2" />
          <h4 className="font-bold text-sm text-[#111827]">Drag and drop your resume file here</h4>
          <p className="text-xs text-[#6B7280]">Supports PDF, DOCX, and TXT up to 5MB.</p>
          <button className="clay-btn-secondary px-4 py-2 text-xs font-semibold mt-2">
            Choose File from Drive
          </button>
        </div>
      </div>

      {analyzing && (
        <div className="clay-card p-12 bg-white text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-[#2563EB] animate-spin mx-auto"></div>
          <h4 className="font-bold text-sm text-[#111827]">Parsing file & compiling ATS matrix...</h4>
          <p className="text-xs text-[#6B7280]">Running syntactic checks and reading ease analyses.</p>
        </div>
      )}

      {analyzed && !analyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Score & Metrics */}
          <div className="space-y-6">
            <div className="clay-card p-6 bg-white text-center">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-4">ATS Compatibility Score</span>
              
              {/* Animated Circular Ring representation */}
              <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#EEF2F7"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#16A34A"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={376.8}
                    strokeDashoffset={376.8 - (376.8 * score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-[#111827]">{score}</span>
                  <span className="text-xs text-[#6B7280] block font-semibold">/ 100</span>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-[#16A34A] border border-green-200 uppercase tracking-wider">
                Good Match Range
              </span>
            </div>

            {/* Readability statistics */}
            <div className="clay-card p-6 bg-white space-y-4">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Readability Matrix</h3>
              <div className="space-y-3.5 text-xs text-left">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Flesch Reading Ease</span>
                  <span className="font-semibold">68.2 (Standard)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Average Sentence Length</span>
                  <span className="font-semibold">14.5 words</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Action Verb Frequency</span>
                  <span className="font-semibold text-[#16A34A]">High (12.4%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Total Word Count</span>
                  <span className="font-semibold">412 words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Detailed Optimization Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="clay-card p-6 bg-white">
              <h3 className="font-bold text-lg text-[#111827] mb-6 text-left">Actionable Improvements</h3>
              
              <div className="space-y-6">
                {improvements.map((imp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] space-y-3 text-left">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-bold uppercase text-[#2563EB] tracking-wide">
                        {imp.category}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${imp.impactColor}`}>
                        {imp.impact}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-sm text-[#111827]">{imp.issue}</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed italic bg-white p-2.5 rounded-lg border border-[#E5E7EB]/50 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span><strong>Fix:</strong> {imp.fix}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
