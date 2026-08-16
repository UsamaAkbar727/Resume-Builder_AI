"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Mail, Send, ChevronDown, Check } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CoverLetter() {
  const [role, setRole] = useState("Software Engineer II");
  const [company, setCompany] = useState("Vercel");
  const [tone, setTone] = useState("Professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const fullLetter = `Dear Hiring Team at ${company},

I am writing to express my strong interest in the ${role} position. With over four years of experience designing scalable frontend architectures, optimizing rendering pipelines, and engineering high-impact user experiences, I am confident in my ability to immediately add value to your product team.

At my previous role, I led the transition to server-side frameworks, improving user retention metrics by 18% and cutting paint latency by 35%. I admire ${company}'s dedication to developer ecosystems and core speed, and I am excited by the prospect of contributing to your frontend systems.

Thank you for your time and consideration.

Sincerely,
Usama Jutt`;

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutputText("");
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullLetter.length) {
        // Output chunks for speed
        const offset = Math.min(5, fullLetter.length - currentIdx);
        setOutputText(prev => prev + fullLetter.substr(currentIdx, offset));
        currentIdx += offset;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText || fullLetter);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  // Set initial default text on mount
  useEffect(() => {
    setOutputText(
      `Dear Hiring Team at Vercel,\n\nClick "Write Cover Letter" on the left panel to test our AI writer and generate an optimized letter for this role.`
    );
  }, []);

  return (
    <section className="py-24 bg-[#fbfbfc] text-zinc-900 relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls side */}
          <div className="lg:col-span-5 text-left order-first">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
                <Mail className="w-4 h-4 text-indigo-600" />
                AI COVER LETTER STUDIO
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
                Draft tailormade cover letters in 5 seconds
              </h2>
              <p className="text-sm sm:text-base text-zinc-550 text-zinc-555 text-zinc-500 leading-relaxed font-semibold font-display mb-8">
                Say goodbye to generic applications. Our AI scans target company core values to draft persuasive letters aligned to matching skills in your resume.
              </p>
            </ScrollReveal>

            {/* Input form */}
            <ScrollReveal variant="fade-up" delay={200} className="space-y-4 bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl shadow-zinc-200/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Job Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-display">Tone of Voice</label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-800 appearance-none focus:outline-none focus:border-indigo-500 font-sans cursor-pointer"
                  >
                    <option>Professional</option>
                    <option>Confident & Bold</option>
                    <option>Creative & Humorous</option>
                    <option>Casual</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold uppercase tracking-wide rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/15 disabled:opacity-50 mt-4 cursor-pointer transition-all font-display"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                {isGenerating ? "AI Writing Letter..." : "Write Cover Letter"}
              </button>
            </ScrollReveal>
          </div>

          {/* Letter layout sheet side */}
          <div className="lg:col-span-7 bg-zinc-100/70 border border-zinc-200/60 p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center min-h-[460px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
            <ScrollReveal variant="scale-in" delay={300} className="w-full max-w-[500px]">
              <div className="bg-white rounded-xl shadow-xl shadow-zinc-250/20 p-6 sm:p-8 border border-zinc-200 min-h-[400px] flex flex-col justify-between text-left">
                {/* Paper header */}
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">AI Written Copy</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-bold text-zinc-700 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-display"
                  >
                    {showCopySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-indigo-650 text-indigo-650 text-indigo-600" /> Copied!
                      </>
                    ) : (
                      "Copy Code"
                    )}
                  </button>
                </div>

                {/* Letter Body Text */}
                <div className="flex-1">
                  <pre className="text-[10px] sm:text-xs font-semibold text-zinc-750 text-zinc-700 leading-relaxed font-sans whitespace-pre-wrap">
                    {outputText}
                    {isGenerating && (
                      <span className="inline-block w-1.5 h-3.5 bg-indigo-605 bg-indigo-600 ml-0.5 animate-pulse"></span>
                    )}
                  </pre>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
