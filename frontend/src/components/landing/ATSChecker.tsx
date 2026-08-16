"use client";

import React, { useState } from "react";
import { SearchCode, Sparkles, Check, AlertTriangle, Play, RefreshCw } from "lucide-react";
import { ScrollReveal } from "./Animations";

interface Keyword {
  name: string;
  found: boolean;
  type: "hard" | "soft" | "tool";
}

export default function ATSChecker() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [currentScore, setCurrentScore] = useState(62);
  const [scanKeywords, setScanKeywords] = useState<Keyword[]>([
    { name: "React", found: true, type: "hard" },
    { name: "Next.js", found: true, type: "hard" },
    { name: "PostgreSQL", found: true, type: "hard" },
    { name: "Kubernetes", found: false, type: "tool" },
    { name: "TypeScript", found: false, type: "hard" },
    { name: "System Design", found: true, type: "soft" },
    { name: "Tailwind CSS", found: true, type: "tool" },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setHasScanned(false);
    
    // Reset keywords
    setScanKeywords(prev => prev.map(k => ({ ...k, found: k.name !== "Kubernetes" && k.name !== "TypeScript" ? k.found : false })));
    setCurrentScore(62);

    // Simulate step-by-step scanner checking
    setTimeout(() => {
      // Find TypeScript
      setScanKeywords(prev => prev.map(k => k.name === "TypeScript" ? { ...k, found: true } : k));
      setCurrentScore(78);
    }, 1200);

    setTimeout(() => {
      // Find Kubernetes is still missing, but let's improve other scores
      setCurrentScore(95);
      setIsScanning(false);
      setHasScanned(true);
    }, 2500);
  };

  return (
    <section id="ats-resume-checker" className="py-24 bg-[#fbfbfc] text-zinc-900 relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="max-w-3xl text-left mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
              <SearchCode className="w-4 h-4 text-indigo-600" />
              ATS RESUME CHECKER
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
              Verify keyword coverage{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent pb-1">
                before applying
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-550 text-zinc-500 leading-relaxed font-semibold font-display">
              Upload your resume, paste the target job description, and watch our parser overlay keyword matrices, evaluate section weight, and flag clunky formatting.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Split Workspace */}
        <ScrollReveal variant="fade-up" delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: AI Robot Inspector Showcase Card & Audit Parameters */}
            <div className="lg:col-span-5 text-left space-y-6">
              
              {/* Visual Showcase: AI Humanoid Scanning Hologram */}
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white p-4 sm:p-5 shadow-xl shadow-indigo-100/50 group">
                <div className="relative rounded-2xl overflow-hidden border border-indigo-200/80 shadow-md">
                  <img
                    src="/images/ai-ats-scanner.png"
                    alt="AI Robot scanning holographic job resume"
                    className="w-full h-auto object-cover transform scale-[1.03] group-hover:scale-[1.06] transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Floating Hologram Scanner Pill */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-white/15 p-2.5 rounded-xl flex items-center justify-between text-xs text-white shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-bold text-[11px] sm:text-xs text-cyan-200">Neural Resume Diagnostics</span>
                    </div>
                    <span className="text-emerald-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider">Zero False Rejections</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-extrabold text-zinc-900 font-display">Recruiter-Grade AI Parsing Engine</h4>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed font-display">
                    Our AI models emulate the exact algorithmic parsing used by Greenhouse, Lever, and Workday to pinpoint formatting friction points before recruiters see them.
                  </p>
                </div>
              </div>

              {/* Advanced Audit Parameters List */}
              <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl space-y-3 shadow-md shadow-zinc-100">
                <h3 className="text-xs font-black text-indigo-600 uppercase tracking-wider font-display">
                  Core Keyword & Layout Matrices
                </h3>
                <div className="grid grid-cols-2 gap-2.5 text-[11px] font-semibold text-zinc-600 font-display">
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[3]" /> Keyword density scan
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[3]" /> Action verb index
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[3]" /> Quantified metrics
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[3]" /> Section hierarchy
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: ATS Sandbox Screen */}
            <div className="lg:col-span-7 bg-zinc-100/70 border border-zinc-200/60 p-6 rounded-3xl shadow-xl shadow-zinc-200/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/2 rounded-full blur-xl group-hover:bg-indigo-500/5 transition-all pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
                
                {/* Resume side with active scan line beam */}
                <div className="sm:col-span-6 bg-white border border-zinc-200 rounded-2xl p-4 relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-md">
                  {/* Scan line animated bar */}
                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1.5 bg-indigo-500/15 border-y border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)] animate-scan z-30 pointer-events-none"></div>
                  )}

                  {/* Resume Content Mock */}
                  <div className="text-left space-y-3 font-display py-2">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-black text-zinc-800 tracking-tight">ALEX MORGAN</h4>
                          <p className="text-[9px] font-bold text-indigo-600">Full Stack Engineer</p>
                        </div>
                        <span className="text-[7px] text-zinc-400 font-bold bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded-sm">
                          ATS COMPLIANT
                        </span>
                      </div>
                      <p className="text-[8px] text-zinc-400 font-semibold mt-1">alex.morgan@email.com | San Francisco, CA</p>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1">
                      <h5 className="text-[8px] font-black text-zinc-400 uppercase tracking-wider">Summary</h5>
                      <p className="text-[9px] text-zinc-500 font-medium leading-relaxed">
                        Results-driven software engineer with 3+ years of experience building modern web applications and scalable database systems.
                      </p>
                    </div>

                    {/* Experience section */}
                    <div className="space-y-1">
                      <h5 className="text-[8px] font-black text-zinc-400 uppercase tracking-wider">Experience</h5>
                      <div className="space-y-2 text-[9px] text-zinc-650 text-zinc-600 font-medium leading-relaxed">
                        <div>
                          <div className="flex justify-between text-[8px] font-bold text-zinc-700">
                            <span>TechCorp Inc. — Software Engineer</span>
                            <span>2024 - Present</span>
                          </div>
                          <p className="text-[8px] text-zinc-500 mt-1">
                            • Engineered dynamic frontend interfaces using{" "}
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm font-bold text-[8px]">
                              React
                            </span>{" "}
                            and{" "}
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm font-bold text-[8px]">
                              Next.js
                            </span>{" "}
                            styled with{" "}
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm font-bold text-[8px]">
                              Tailwind CSS
                            </span>
                            .
                          </p>
                          <p className="text-[8px] text-zinc-500 mt-1">
                            • Designed database schemas in{" "}
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm font-bold text-[8px]">
                              PostgreSQL
                            </span>{" "}
                            aligned with robust backend{" "}
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm font-bold text-[8px]">
                              System Design
                            </span>
                            .
                          </p>
                          <p className="text-[8px] text-zinc-500 mt-1">
                            • Built type-safe backend microservices leveraging{" "}
                            <span className={`px-1 py-0.5 rounded-sm font-bold text-[8px] transition-all duration-300 ${
                              scanKeywords.find(k => k.name === "TypeScript")?.found
                                ? "bg-indigo-50 border border-indigo-100 text-indigo-700"
                                : "bg-zinc-100 border border-zinc-200 text-zinc-400"
                            }`}>
                              TypeScript
                            </span>{" "}
                            to ensure overall system reliability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Click scan button */}
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold uppercase rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer transition-all font-display"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white text-white" /> Run ATS Audit
                      </>
                    )}
                  </button>
                </div>

                {/* Score and matched keywords info */}
                <div className="sm:col-span-6 bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between shadow-md">
                  {/* Score circle */}
                  <div className="text-center pb-4 border-b border-zinc-100">
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" className="text-zinc-100" strokeWidth="6" stroke="currentColor" fill="transparent" />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          className="text-indigo-600 transition-all duration-1000"
                          strokeWidth="6"
                          strokeDasharray={213.6}
                          strokeDashoffset={213.6 - (213.6 * currentScore) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-zinc-900 font-display">{currentScore}%</span>
                    </div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">Audit Rating</h4>
                  </div>

                  {/* Keywords list checked off */}
                  <div className="space-y-2 py-3 flex-1 overflow-y-auto max-h-[140px] scrollbar-thin font-display">
                    {scanKeywords.map((kw) => (
                      <div key={kw.name} className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-zinc-700">{kw.name}</span>
                        {kw.found ? (
                          <span className="text-indigo-600 flex items-center gap-0.5 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" /> Match
                          </span>
                        ) : (
                          <span className="text-zinc-400 flex items-center gap-0.5 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded-sm">
                            <AlertTriangle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Alert prompt based on scanning */}
                  <div className="text-[9px] bg-zinc-50 border border-zinc-200 rounded-lg p-2 font-semibold text-zinc-550 text-zinc-500 leading-normal text-left font-display">
                    {hasScanned ? (
                      <span className="text-indigo-600 font-semibold flex items-start gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-650 text-indigo-650 text-indigo-650 text-indigo-600 shrink-0 mt-0.5" /> Great! TypeScript matched. Add &quot;Kubernetes&quot; to hit 100% density.
                      </span>
                    ) : isScanning ? (
                      <span>Running diagnostics and checks...</span>
                    ) : (
                      <span>Press &quot;Run ATS Audit&quot; to trace compatibility.</span>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
