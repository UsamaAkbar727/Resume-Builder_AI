"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Sparkles, Send, Bot, User, RefreshCw, MessageSquare, Zap, Target, DollarSign, BookOpen, Layers } from "lucide-react";

interface CareerAdvisorProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

interface Message {
  role: "user" | "assistant";
  message: string;
}

export default function CareerAdvisor({ resumeData, onNavigate, showToast }: CareerAdvisorProps) {
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [sessionId] = useState<string>(() => "session_" + Math.random().toString(36).substring(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message: "Hello! I am your AI Executive Career Coach & ATS Strategist. How can I assist with your resume, salary negotiations, or STAR interview preparation today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  useEffect(() => {
    const userSkills = (resumeData?.skills || "")
      .toLowerCase()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    const targetDatabase = [
      { name: "Kubernetes & Orchestration", search: "kubernetes", level: "Beginner", target: "Advanced", resource: "Certified Kubernetes Administrator (CKA)" },
      { name: "GraphQL & Schemas", search: "graphql", level: "Intermediate", target: "Advanced", resource: "Apollo Graph Developer Certification" },
      { name: "Playwright Integration Testing", search: "playwright", level: "Beginner", target: "Intermediate", resource: "E2E Testing with Playwright" },
      { name: "AWS Services & EKS", search: "aws", level: "Intermediate", target: "Advanced", resource: "AWS Certified Solutions Architect" },
      { name: "Redis Systems Caching", search: "redis", level: "Beginner", target: "Intermediate", resource: "Redis Systems Caching RU101" }
    ];

    const gaps = targetDatabase.map((item) => {
      const acquired = userSkills.some((sk: string) => sk.includes(item.search) || item.search.includes(sk));
      return { ...item, acquired };
    });

    setSkillGaps(gaps);

    const step1Complete = userSkills.includes("next.js") || userSkills.includes("react") || userSkills.includes("typescript");
    const step2Complete = userSkills.includes("postgresql") || userSkills.includes("graphql") || userSkills.includes("node.js");
    const step3Complete = userSkills.includes("kubernetes") || userSkills.includes("aws");

    setSteps([
      {
        title: "Consolidate Client Layout Architectures",
        desc: "Build highly interactive client interfaces. Master Next.js 15 routing, React 19 server hooks, and Tailwind CSS design libraries.",
        status: step1Complete ? "Completed" : "In Progress",
      },
      {
        title: "Integrate Advanced Data Pipelines",
        desc: "Design and implement database schema normalization. Focus on GraphQL Apollo stitch layers and PostgreSQL search queries.",
        status: step2Complete ? "Completed" : (step1Complete ? "In Progress" : "Todo"),
      },
      {
        title: "Deploy Orchestration Infrastructure",
        desc: "Transition applications to microservices. Implement Docker files and Kubernetes cluster definitions inside AWS cloud servers.",
        status: step3Complete ? "Completed" : (step2Complete ? "In Progress" : "Todo"),
      }
    ]);
  }, [resumeData]);

  // Handle chat submission
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || sending) return;

    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", message: text }]);
    setSending(true);

    try {
      const res = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: text
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setMessages((prev) => [...prev, { role: "assistant", message: data.data.message }]);
      } else {
        throw new Error(data.error || "Advisor service error");
      }
    } catch (err) {
      console.error("Advisor send error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "### 💡 Career Strategy Recommendation\n\nTo optimize your trajectory for top tech roles:\n\n1. **Quantify Achievements**: Ensure your resume highlights measurable impact (e.g. *\"Scaled checkout API to handle $2B+ volume with 99.99% uptime\"*).\n2. **Salary Negotiation**: Always benchmark base pay and request accelerated 6-month equity reviews.\n3. **STAR Method**: Use Situation, Task, Action, and Quantified Result in technical behavioral interviews."
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  const starterPrompts = [
    { label: "💰 Salary Negotiation Script", prompt: "How do I counter-offer for a Senior Full Stack Engineer role to get $195k base?" },
    { label: "📄 Resume ATS Audit", prompt: "How should I rewrite my bullet points using the Google XYZ formula for ATS scanners?" },
    { label: "🎯 STAR Method Prep", prompt: "How do I answer 'Tell me about a time you had a technical disagreement with a teammate'?" },
    { label: "🏗️ System Design Blueprint", prompt: "Walk me through how to design a distributed rate limiter for 10M RPM." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-gray-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display">AI Career Advisor & LLM Coach</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Live executive career coaching, STAR interview frameworks, salary negotiation scripts, and roadmaps.</p>
      </div>

      {/* ── Interactive Live LLM Chat Section ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[460px]">
        
        {/* Top Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white">Executive AI Career Coach</h3>
              <p className="text-[10px] text-slate-400">LLM Career Intelligence Engine Active</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Coach Online
          </span>
        </div>

        {/* Quick Starter Prompts Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-gray-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">Quick Prompts:</span>
          {starterPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p.prompt)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 max-h-[380px] bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-2xl whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white font-medium rounded-tr-none shadow-md"
                    : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700/80 text-gray-800 dark:text-slate-100 shadow-sm rounded-tl-none font-normal"
                }`}
              >
                {m.message}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {sending && (
            <div className="flex gap-2 items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              AI Coach is analyzing career benchmarks & drafting advice...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about resume metrics, salary negotiations, or STAR interview preparation..."
            className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={sending || !inputMessage.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>

      {/* ── Career Roadmap & Salary Projections Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Roadmap (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 font-display">Target Roadmap: Staff Engineer</h3>
            
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-100 dark:before:bg-slate-800">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-sm z-10 shrink-0 text-white ${
                    step.status === "Completed" ? "bg-emerald-600" : step.status === "In Progress" ? "bg-indigo-600" : "bg-gray-300 dark:bg-slate-700"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 flex-1 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm md:text-base text-gray-900 dark:text-white">{step.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        step.status === "Completed" ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" :
                        step.status === "In Progress" ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800" :
                        "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700"
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill gaps & Salaries */}
        <div className="space-y-6">
          {/* Salary Projections Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-xs text-left space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider font-display">Salary Estimator (US Region)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-slate-400">
                  <span>Junior Developer</span>
                  <span>$80k - $110k</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full">
                  <div className="bg-gray-300 dark:bg-slate-600 h-1.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-slate-400">
                  <span>Senior Developer</span>
                  <span>$130k - $165k</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full">
                  <div className="bg-gray-300 dark:bg-slate-600 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-900 dark:text-white font-bold">
                  <span>Staff Engineer (Target)</span>
                  <span>$180k - $240k</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Studies */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-xs text-left space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider font-display">Recommended Studies</h3>
            
            <div className="space-y-4">
              {skillGaps.map((sg, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-gray-100 dark:border-slate-800 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{sg.name}</h4>
                    {sg.acquired ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold uppercase">Acquired</span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-bold uppercase">Gap</span>
                    )}
                  </div>
                  {!sg.acquired ? (
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                      📖 Course: {sg.resource}
                    </p>
                  ) : (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Matching skill verified inside your active resume profile.</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

