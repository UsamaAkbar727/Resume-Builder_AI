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
    <section id="ats-resume-checker" className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6 shadow-xs">
                <SearchCode className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 leading-tight">
                Scan keyword densities raw like corporate ATS parsers
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium mb-6">
                Most companies filter resumes with robots before a human ever reads them. ResumeFlow AI replicates ATS algorithms to highlight syntax matches and improve your placement probabilities.
              </p>
              <ul className="space-y-3.5 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-3 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Flesch readability calibration diagnostics
                </li>
                <li className="flex items-center gap-3 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Targeted density audits for core skills
                </li>
                <li className="flex items-center gap-3 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Custom template sections format parser check
                </li>
              </ul>
            </div>

            {/* ATS Sandbox Screen */}
            <div className="lg:col-span-6 glass-card p-6 border border-slate-200/80 bg-slate-50/50 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
                
                {/* Resume side with active scan line beam */}
                <div className="sm:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                  {/* Scan line animated bar */}
                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1.5 bg-emerald-500/30 border-y border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-scan z-30 pointer-events-none"></div>
                  )}

                  {/* Header content mock */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded-sm w-1/2"></div>
                    <div className="h-2.5 bg-slate-50 rounded-sm w-2/3"></div>
                  </div>

                  {/* Body text representation */}
                  <div className="space-y-2 py-4">
                    <div className="h-3 bg-slate-100 rounded-sm w-full"></div>
                    <div className="h-3 bg-slate-100 rounded-sm w-11/12"></div>
                    <div className="h-3 bg-slate-100 rounded-sm w-full"></div>
                    {/* Active highlight matching animation */}
                    <div className={`h-3.5 rounded-sm w-5/6 transition-all duration-300 ${
                      isScanning ? "bg-emerald-50 border border-emerald-200 animate-pulse text-[9px] font-bold text-emerald-600 flex items-center px-1.5" : "bg-slate-100"
                    }`}>
                      {isScanning ? "Scanning keywords matches..." : ""}
                    </div>
                    <div className="h-3 bg-slate-100 rounded-sm w-10/12"></div>
                  </div>

                  {/* Click scan button */}
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning Resume...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Run ATS Audit
                      </>
                    )}
                  </button>
                </div>

                {/* Score and matched keywords info */}
                <div className="sm:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                  {/* Score circle */}
                  <div className="text-center pb-4 border-b border-slate-100">
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" className="text-slate-100" strokeWidth="6" stroke="currentColor" fill="transparent" />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          className={`${currentScore >= 80 ? "text-emerald-500" : "text-blue-500"} transition-all duration-1000`}
                          strokeWidth="6"
                          strokeDasharray={213.6}
                          strokeDashoffset={213.6 - (213.6 * currentScore) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-slate-800">{currentScore}%</span>
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Rating</h4>
                  </div>

                  {/* Keywords list checked off */}
                  <div className="space-y-2 py-3 flex-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                    {scanKeywords.map((kw) => (
                      <div key={kw.name} className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-700">{kw.name}</span>
                        {kw.found ? (
                          <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" /> Match
                          </span>
                        ) : (
                          <span className="text-amber-600 flex items-center gap-0.5 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-sm">
                            <AlertTriangle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Alert prompt based on scanning */}
                  <div className="text-[9px] bg-slate-50 border border-slate-100 rounded-lg p-2 font-medium text-slate-500 leading-normal text-left">
                    {hasScanned ? (
                      <span className="text-emerald-600 font-semibold flex items-start gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /> Great! TypeScript matched. Add "Kubernetes" to hit 100% density.
                      </span>
                    ) : isScanning ? (
                      <span>Running diagnostics and checks...</span>
                    ) : (
                      <span>Press "Run ATS Audit" to trace compatibility.</span>
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
