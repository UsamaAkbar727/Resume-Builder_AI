"use client";

import React, { useState } from "react";
import { Zap, Sparkles, Copy, ArrowLeft } from "lucide-react";

type Tone = "Professional" | "Executive" | "Technical" | "Entry";

interface ResumeOptimizerProps {
  resumeData?: any;
  setResumeData?: (data: any) => void;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function ResumeOptimizer({ resumeData, setResumeData, onNavigate, showToast }: ResumeOptimizerProps) {
  const [inputText, setInputText] = useState("I was responsible for scaling the checkout codebase and led the migration of systems to Kubernetes cluster.");
  const [tone, setTone] = useState<Tone>("Professional");
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState("");
  const [metricsSuggested, setMetricsSuggested] = useState<string[]>([]);
  const [actionVerbsSuggested, setActionVerbsSuggested] = useState<string[]>([]);

  const handleOptimize = () => {
    if (!inputText) return;
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      
      const passiveMapping: Record<string, string> = {
        "i was responsible for": "Architected",
        "i helped with": "Collaborated on",
        "i worked on": "Engineered",
        "i built": "Synthesized",
        "i managed": "Orchestrated",
        "led": "Spearheaded",
        "built": "Developed & shipped",
        "designed": "Formulated",
        "made": "Created",
        "improved": "Catalyzed",
        "changed": "Re-engineered"
      };

      let baseText = inputText.trim();
      if (baseText.endsWith(".")) {
        baseText = baseText.slice(0, -1);
      }

      let startVerb = "Synthesized";
      let processedText = baseText;
      let matchedPassive = false;

      Object.keys(passiveMapping).forEach(phrase => {
        if (processedText.toLowerCase().startsWith(phrase)) {
          startVerb = passiveMapping[phrase];
          processedText = processedText.slice(phrase.length).trim();
          if (processedText.length > 0) {
            processedText = processedText.charAt(0).toUpperCase() + processedText.slice(1);
          }
          matchedPassive = true;
        }
      });

      if (!matchedPassive) {
        const firstWord = baseText.split(" ")[0] || "";
        const lowerFirst = firstWord.toLowerCase();
        if (passiveMapping[lowerFirst]) {
          startVerb = passiveMapping[lowerFirst];
          processedText = baseText.slice(firstWord.length).trim();
        } else {
          startVerb = firstWord ? firstWord.charAt(0).toUpperCase() + firstWord.slice(1) : "Optimized";
          processedText = baseText.slice(firstWord.length).trim();
        }
      }

      let result = "";
      let verbs: string[] = [];
      let metrics: string[] = [];

      if (tone === "Executive") {
        result = `${startVerb} ${processedText.charAt(0).toLowerCase() + processedText.slice(1)}, driving a 35% performance enhancement and achieving a $120K annual cost reduction footprint.`;
        verbs = [startVerb, "Spearheaded", "Directed"];
        metrics = ["35% performance enhancement", "$120K annual cost reduction"];
      } else if (tone === "Technical") {
        result = `${startVerb} ${processedText.charAt(0).toLowerCase() + processedText.slice(1)}, optimizing system transaction pathways and reducing memory allocation overheads by 42%.`;
        verbs = [startVerb, "Refactored", "Containerized"];
        metrics = ["Reduce memory allocation by 42%", "Refactored transaction pathways"];
      } else if (tone === "Entry") {
        result = `Collaborated on team tasks to ${startVerb.toLowerCase()} ${processedText.charAt(0).toLowerCase() + processedText.slice(1)}, ensuring project delivery aligned with 100% test coverage benchmarks.`;
        verbs = ["Collaborated", startVerb, "Facilitated"];
        metrics = ["100% test coverage benchmarks", "Aligned team delivery objectives"];
      } else {
        result = `${startVerb} ${processedText.charAt(0).toLowerCase() + processedText.slice(1)}, resulting in a 28% reduction in page layout load times and boosting active customer engagement index.`;
        verbs = [startVerb, "Engineered", "Catalyzed"];
        metrics = ["28% reduction in page load latency", "Enhanced customer engagement index"];
      }

      setOptimizedText(result);
      setMetricsSuggested(metrics);
      setActionVerbsSuggested(verbs);
      if (showToast) showToast("Resume bullet point optimized successfully!", "success");
    }, 1000);
  };

  const handleApplyToResume = () => {
    if (!resumeData || !setResumeData || !optimizedText) return;
    const updatedExp = [...resumeData.experience];
    if (updatedExp[0]) {
      updatedExp[0].description = `${updatedExp[0].description}\n• ${optimizedText}`;
      setResumeData({ ...resumeData, experience: updatedExp });
      if (showToast) showToast("Optimized bullet applied to your Stripe work experience!", "success");
    }
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
        <h1 className="text-3xl font-extrabold text-[#111827]">AI Resume Optimizer</h1>
        <p className="text-sm text-[#6B7280]">Enhance bullet descriptions with action verbs and quantified impact metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Select Target Tone</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(["Professional", "Executive", "Technical", "Entry"] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      tone === t ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" : "border-[#E5E7EB] hover:bg-[#EEF2F7]"
                    }`}
                  >
                    {t === "Entry" ? "Entry Level" : t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Original Bullet Description</label>
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="clay-input w-full text-xs leading-relaxed"
                placeholder="e.g. Worked on payment codes and updated microservices."
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={optimizing}
              className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {optimizing ? "Optimizing Bullet..." : "Optimize Bullet with AI"}
            </button>
          </div>
        </div>

        {/* Right Column: Optimized Output Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="clay-card p-6 bg-white min-h-[380px] flex flex-col justify-between">
            {optimizedText ? (
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#16A34A] tracking-wider block mb-2">AI Optimized Suggestion</span>
                  <div className="p-4 rounded-xl bg-green-50/50 border border-green-200 text-xs md:text-sm text-[#111827] leading-relaxed font-medium">
                    {optimizedText}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]/50">
                  <div>
                    <h5 className="font-bold text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Action Verbs Highlighted</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {actionVerbsSuggested.map((v, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-[#2563EB] border border-[#2563EB]/20 px-2 py-0.5 rounded-md font-semibold">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Metrics Suggested</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {metricsSuggested.map((m, i) => (
                        <span key={i} className="text-[10px] bg-amber-50 text-[#F59E0B] border border-[#F59E0B]/20 px-2 py-0.5 rounded-md font-semibold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(optimizedText);
                      showToast?.("Copied to clipboard!", "success");
                    }}
                    className="clay-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </button>

                  {resumeData && (
                    <button
                      onClick={handleApplyToResume}
                      className="clay-btn-primary px-4 py-2 text-xs text-white font-semibold flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" /> Apply to Active Resume
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#6B7280] space-y-3 py-16">
                <Sparkles className="w-10 h-10 text-[#2563EB]" />
                <h4 className="font-bold text-sm text-[#111827]">Optimized results will display here</h4>
                <p className="text-xs max-w-sm">
                  Select your desired tone on the left and click optimize to generate high-impact resume bullet points.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
