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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-550 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
                <SearchCode className="w-4 h-4 text-indigo-600" />
                ATS RESUME CHECKER
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
                Verify keyword coverage before applying
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-semibold font-display mb-6">
                Upload your resume, paste the target job description, and watch our parser overlay keyword matrices, evaluate section weight, and flag clunky formatting.
              </p>
              <div className="bg-white border border-zinc-200 p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-zinc-200/20">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-xs text-zinc-600 font-semibold font-display">
                  Our scanner mimics corporate ATS filters (Greenhouse, Lever) to show you exactly how bots read your background.
                </p>
              </div>
            </div>

            {/* Checklist lists details */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight leading-none font-display">
                Advanced audit checklist parameters
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-zinc-600 font-display">
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Keyword density overlay scans
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Action verb index checks
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Quantifiable achievements count
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Avoid buzzwords & clutter
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Recruiter parseability testing
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Custom template sections format parser check
                </li>
              </ul>
            </div>

            {/* ATS Sandbox Screen */}
            <div className="lg:col-span-6 bg-zinc-100/70 border border-zinc-200/60 p-6 rounded-3xl shadow-xl shadow-zinc-200/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/2 rounded-full blur-xl group-hover:bg-indigo-500/5 transition-all pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
                
                {/* Resume side with active scan line beam */}
                <div className="sm:col-span-6 bg-white border border-zinc-200 rounded-2xl p-4 relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-md">
                  {/* Scan line animated bar */}
                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1.5 bg-indigo-500/15 border-y border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)] animate-scan z-30 pointer-events-none"></div>
                  )}

                  {/* Header content mock */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-4 bg-zinc-200 rounded-sm w-3/4"></div>
                    <div className="h-3 bg-zinc-300 rounded-sm w-1/2"></div>
                    <div className="h-2.5 bg-zinc-100 rounded-sm w-2/3"></div>
                  </div>

                  {/* Body text representation */}
                  <div className="space-y-2 py-4">
                    <div className="h-3 bg-zinc-100 rounded-sm w-full"></div>
                    <div className="h-3 bg-zinc-100 rounded-sm w-11/12"></div>
                    <div className="h-3 bg-zinc-100 rounded-sm w-full"></div>
                    {/* Active highlight matching animation */}
                    <div className={`h-3.5 rounded-sm w-5/6 transition-all duration-300 ${
                      isScanning ? "bg-indigo-50 border border-indigo-100 animate-pulse text-[9px] font-black text-indigo-600 flex items-center px-1.5" : "bg-zinc-200"
                    }`}>
                      {isScanning ? "Scanning keywords..." : ""}
                    </div>
                    <div className="h-3 bg-zinc-100 rounded-sm w-10/12"></div>
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
