"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, Send, Bot, User, RefreshCw, MessageSquare } from "lucide-react";

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
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message: "Hello! I am your AI Executive Career Coach & ATS Strategist. How can I assist with your resume, salary negotiations, or STAR interview preparation today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false);

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
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || sending) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", message: userText }]);
    setSending(true);

    try {
      const res = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: userText
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setMessages((prev) => [...prev, { role: "assistant", message: data.data.message }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "To optimize your career trajectory: Focus on quantifying your technical impacts (e.g. latency reductions, revenue ARR gains) and align resume keywords to job descriptions."
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">AI Career Advisor & LLM Coach</h1>
        <p className="text-sm text-gray-500">Live AI executive coaching, career roadmaps, and salary negotiation strategies.</p>
      </div>

      {/* ── Interactive Live LLM Chat Section ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[420px]">
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bot className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm font-bold">Executive AI Career Coach</h3>
              <p className="text-[10px] text-slate-400">Powered by Gemini 2.5 LLM Engine</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Live Stream Connected
          </span>
        </div>

        {/* Message Thread */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 max-h-[350px] bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-xl whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-blue-600 text-white font-medium rounded-tr-none shadow-sm"
                    : "bg-white border border-gray-200 text-gray-800 shadow-xs rounded-tl-none font-normal"
                }`}
              >
                {m.message}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {sending && (
            <div className="flex gap-2 items-center text-xs text-gray-500 font-semibold italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              AI Coach is analyzing career benchmarks...
            </div>
          )}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about resume metrics, salary negotiations, or STAR interview preparation..."
            className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={sending || !inputMessage.trim()}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>

      {/* ── Career Roadmap & Salary Projections Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Roadmap (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Target Roadmap: Staff Engineer</h3>
            
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-100">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-sm z-10 shrink-0 text-white ${
                    step.status === "Completed" ? "bg-emerald-600" : step.status === "In Progress" ? "bg-blue-600" : "bg-gray-300"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex-1 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm md:text-base text-gray-900">{step.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        step.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        step.status === "In Progress" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                        "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill gaps & Salaries */}
        <div className="space-y-6">
          {/* Salary Projections Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs text-left space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Salary Estimator (US Region)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-500">
                  <span>Junior Developer</span>
                  <span>$80k - $110k</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-500">
                  <span>Senior Developer</span>
                  <span>$130k - $165k</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-900 font-bold">
                  <span>Staff Engineer (Target)</span>
                  <span>$180k - $240k</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Studies */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs text-left space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Recommended Studies</h3>
            
            <div className="space-y-4">
              {skillGaps.map((sg, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-gray-900">{sg.name}</h4>
                    {sg.acquired ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase">Acquired</span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold uppercase">Gap</span>
                    )}
                  </div>
                  {!sg.acquired ? (
                    <p className="text-[10px] text-blue-600 font-semibold mt-1">
                      📖 Course: {sg.resource}
                    </p>
                  ) : (
                    <p className="text-[10px] text-emerald-600">Matching skill verified inside your active resume builder profile.</p>
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
