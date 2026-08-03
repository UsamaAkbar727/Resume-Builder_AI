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
Sarah Jenkins`;

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
    <section className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls side */}
          <div className="lg:col-span-5 text-left order-first">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-200 flex items-center justify-center text-violet-600 mb-6 shadow-xs">
                <Mail className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 leading-tight">
                Draft tailormade cover letters in 5 seconds
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium mb-8">
                Say goodbye to generic applications. Our AI scans target company core values to draft persuasive letters aligned to matching skills in your resume.
              </p>
            </ScrollReveal>

            {/* Input form */}
            <ScrollReveal variant="fade-up" delay={200} className="space-y-4 bg-slate-50 border border-slate-200/80 p-6 rounded-3xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Job Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tone of Voice</label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-blue-500"
                  >
                    <option>Professional</option>
                    <option>Confident & Bold</option>
                    <option>Creative & Humorous</option>
                    <option>Casual</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 mt-4 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                {isGenerating ? "AI Writing Letter..." : "Write Cover Letter"}
              </button>
            </ScrollReveal>
          </div>

          {/* Letter layout sheet side */}
          <div className="lg:col-span-7 bg-[#F1F5F9] border border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center min-h-[460px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
            <ScrollReveal variant="scale-in" delay={300} className="w-full max-w-[500px]">
              <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-slate-100 min-h-[400px] flex flex-col justify-between text-left">
                {/* Paper header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Written Copy</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                  >
                    {showCopySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      "Copy Code"
                    )}
                  </button>
                </div>

                {/* Letter Body Text */}
                <div className="flex-1">
                  <pre className="text-[10px] sm:text-xs font-medium text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                    {outputText}
                    {isGenerating && (
                      <span className="inline-block w-1.5 h-3.5 bg-blue-600 ml-0.5 animate-pulse"></span>
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
