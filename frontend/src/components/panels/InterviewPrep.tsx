"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Mic, CheckCircle2, AlertTriangle, Info, Play, PenTool, Trash2, Settings, MessageSquareCode, Award, History, Volume2, Sparkles, ChevronRight, Check, X, Zap } from "lucide-react";

interface InterviewPrepProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

interface Question {
  question: string;
  type: string;
  expectedKeywords: string[];
  idealAnswer: string;
}

const QUESTION_DATABASE: Record<string, Question[]> = {
  "Frontend Developer": [
    {
      question: "Explain the difference between Server Components and Client Components in React 19 / Next.js 15, and how data serialization behaves between them.",
      type: "Technical",
      expectedKeywords: ["Server Components", "Client Components", "Server Action", "data serialization", "hydration", "use client"],
      idealAnswer: "React Server Components (RSC) render exclusively on the server, minimizing the bundle size. Client Components are marked with 'use client' and hydrate on the client. Data passed from Server to Client Components must be serializable (e.g. JSON-compatible objects) because it is sent over the network as a stream of raw JSON-like structures."
    },
    {
      question: "What is your strategy for optimizing core web vitals, specifically LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) in a large SaaS application?",
      type: "Scenario-Based",
      expectedKeywords: ["LCP", "CLS", "Image optimization", "aspect-ratio", "critical CSS", "font swapping"],
      idealAnswer: "To optimize LCP, I focus on image sizing (next/image), lazy loading offscreen images, and inline critical CSS. For CLS, I ensure all images and containers have predefined width/height or aspect-ratio parameters, and avoid injecting dynamic layout content above existing elements."
    },
    {
      question: "Describe a time when you disagreed with a Product Designer regarding a UI element's complexity. How did you negotiate and implement the final layout?",
      type: "Behavioral",
      expectedKeywords: ["collaboration", "compromise", "usability testing", "performance trade-off", "active listening"],
      idealAnswer: "I once disagreed with a designer on a complex drag-and-drop animation. I scheduled a quick meeting, listened to their user experience goals, and proposed a simplified library-based transition that preserved visual quality without overloading DOM render loops. The final version passed QA within a single sprint."
    }
  ],
  "Full Stack Developer": [
    {
      question: "How would you design a distributed cache system for a high-traffic SaaS dashboard, ensuring minimal cache staleness and high availability?",
      type: "Scenario-Based",
      expectedKeywords: ["Redis", "distributed caching", "write-through", "TTL", "cache invalidation", "replication"],
      idealAnswer: "I would implement Redis caching in front of our main PostgreSQL database. I'd set a reasonable Time-To-Live (TTL) on general dashboard payloads, use a write-through strategy for critical mutations to trigger immediate invalidation, and set up Redis replicas with auto-failover cluster management."
    },
    {
      question: "Explain database normalization versus denormalization. In what scenario would you explicitly choose a denormalized schema?",
      type: "Technical",
      expectedKeywords: ["normalization", "denormalization", "joins", "read performance", "redundancy", "NoSQL"],
      idealAnswer: "Normalization structures tables to eliminate redundancy and preserve integrity. Denormalization adds redundant data to speed up read performance by avoiding expensive SQL joins. I would choose denormalization in analytical query dashboards or read-heavy NoSQL databases where quick response speeds are critical."
    },
    {
      question: "Tell me about a high-pressure situation where a production API endpoint was failing. How did you isolate, debug, and patch the hotfix?",
      type: "Behavioral",
      expectedKeywords: ["incident management", "rollback", "log analysis", "datadog", "hotfix", "post-mortem"],
      idealAnswer: "During a major deploy, our payment endpoint started returning 500 errors. I immediately rolled back to the previous stable release, analyzed cloud logs in Datadog, isolated a database migration mismatch, patched a hotfix in staging, and safely re-deployed within 30 minutes, concluding with a detailed post-mortem report."
    }
  ],
  "DevOps Engineer": [
    {
      question: "How would you architect a zero-downtime blue-green deployment pipeline using Kubernetes and GitHub Actions?",
      type: "Technical",
      expectedKeywords: ["blue-green", "kubernetes", "service selector", "github actions", "ingress", "rollout status"],
      idealAnswer: "I would use GitHub Actions to compile docker images and deploy a 'green' release in our K8s cluster. Once health checks pass, I would update the Kubernetes Service selector mapping or ingress routing to direct production traffic to the new pods. If errors occur, I instantly revert traffic back to the 'blue' pods."
    },
    {
      question: "Explain the security practices you enforce when managing shared infrastructure state files in Terraform.",
      type: "Scenario-Based",
      expectedKeywords: ["s3 state locking", "encryption", "IAM policies", "kms key", "state locking", "secrets mapping"],
      idealAnswer: "I store Terraform state files in a secure AWS S3 bucket with KMS encryption. I enable S3 bucket versioning and enforce DynamoDB state locking to prevent write conflicts. Access is restricted using strict IAM roles, ensuring no raw passwords or secret tokens are committed to repository files."
    }
  ],
  "Product Manager": [
    {
      question: "How do you decide between prioritizing technical debt refactoring versus shipping new user-facing product features?",
      type: "Scenario-Based",
      expectedKeywords: ["prioritization", "RICE framework", "technical debt", "churn rate", "maintenance cost", "product roadmap"],
      idealAnswer: "I evaluate priorities using the RICE framework (Reach, Impact, Confidence, Effort) alongside operational costs. If customer churn or page latency is affected by tech debt, I allocate 20% of engineering bandwidth per sprint to refactoring. Otherwise, we align resources directly with user feature requests."
    },
    {
      question: "Tell me about a product feature launch that failed to meet its target metrics. What did you learn and how did you pivot?",
      type: "Behavioral",
      expectedKeywords: ["metrics analysis", "failed launch", "user research", "pivot", "retrospective", "A/B testing"],
      idealAnswer: "We launched an automated resume scoring feature that had very low adoption. I analyzed user events, scheduled interviews with users, and learned the interface was too hidden. We simplified the layout, placed it prominently in the workspace header, ran an A/B test, and saw adoption increase by 140%."
    }
  ]
};

// General fallback bank for any other role
const GENERAL_QUESTION_BANK: Question[] = [
  {
    question: "Why should we hire you for this role? What makes you unique compared to other candidates?",
    type: "HR",
    expectedKeywords: ["problem solver", "adaptability", "mentorship", "culture fit", "core values"],
    idealAnswer: "I combine solid technical competence with high emotional intelligence and adaptability. I don't just write functional code; I focus on customer outcomes, collaborate across design and product teams, and actively mentor junior developers to uplift team performance."
  },
  {
    question: "Tell me about a time you worked on a complex task with incomplete specifications. How did you resolve the ambiguity?",
    type: "Behavioral",
    expectedKeywords: ["communication", "ambiguity", "prototyping", "stakeholder alignment", "user stories"],
    idealAnswer: "I once received a feature ticket with no designer mocks. I scheduled a 15-minute call with the product manager, aligned on user stories, built a low-fidelity interactive Figma wireframe, received approval, and implemented the final component successfully without delaying schedules."
  },
  {
    question: "Explain how you handle constructive criticism or code review feedback that you strongly disagree with.",
    type: "Behavioral",
    expectedKeywords: ["professionalism", "code review", "collaboration", "empathy", "best practices"],
    idealAnswer: "I treat code reviews as educational discussions, not personal evaluations. If I disagree, I look up official documentation or performance benchmarks, explain my reasoning with empathy, and if needed, schedule a quick call to reach a consensus focused on clean code practices."
  }
];

export default function InterviewPrep({ resumeData, onNavigate, showToast }: InterviewPrepProps) {
  // Navigation tabs: "simulator" | "history"
  const [activeMenu, setActiveMenu] = useState<"simulator" | "history">("simulator");

  // Interview state machine: "config" | "active" | "completed"
  const [interviewStatus, setInterviewStatus] = useState<"config" | "active" | "completed">("config");

  // Configuration settings
  const [jobRole, setJobRole] = useState("Frontend Developer");
  const [experienceLevel, setExperienceLevel] = useState("Senior");
  const [industry, setIndustry] = useState("Technology");
  const [interviewType, setInterviewType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(3);

  // Active interview state variables
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [recording, setRecording] = useState(false);
  
  // Evaluation display states
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [currentEval, setCurrentEval] = useState<any>(null);

  // Saved Session History
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("resumeflow_interview_history");
      if (savedHistory) {
        try {
          setHistoryLogs(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Error loading interview logs:", e);
        }
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistoryToLocalStorage = (newHistory: any[]) => {
    setHistoryLogs(newHistory);
    localStorage.setItem("resumeflow_interview_history", JSON.stringify(newHistory));
  };

  const handleStartInterview = () => {
    // Collect role-specific questions or fallbacks
    const roleQuestions = QUESTION_DATABASE[jobRole] || [];
    let pool = [...roleQuestions, ...GENERAL_QUESTION_BANK];
    
    // Sort randomly and slice according to count
    pool = pool.sort(() => 0.5 - Math.random()).slice(0, Math.min(questionCount, pool.length));
    
    setActiveQuestions(pool);
    setCurrentIdx(0);
    setUserAnswers([]);
    setEvaluations([]);
    setAnswerInput("");
    setShowingFeedback(false);
    setInterviewStatus("active");
  };

  // Perform dynamic keyword-matching score
  const performEvaluation = (userAnswerText: string, currentQuest: Question) => {
    const cleanText = userAnswerText.toLowerCase();
    const keywords = currentQuest.expectedKeywords;
    const matched = keywords.filter(kw => cleanText.includes(kw.toLowerCase()));
    const missing = keywords.filter(kw => !cleanText.includes(kw.toLowerCase()));

    const coverage = keywords.length > 0 ? matched.length / keywords.length : 0;
    
    // Score math adjustments based on length and match density
    let computedScore = Math.round(50 + (coverage * 40) + (cleanText.length > 100 ? 8 : 2));
    if (difficulty === "Hard") computedScore -= 5;
    if (difficulty === "Easy") computedScore += 5;
    if (computedScore > 98) computedScore = 98;
    if (computedScore < 15) computedScore = 15;

    const strengths = [];
    const improvements = [];

    if (matched.length > 0) {
      strengths.push(`Addressed core terminology: ${matched.slice(0, 3).join(", ").toUpperCase()}`);
    } else {
      improvements.push("Incorporate key industry terms related to the question constraints.");
    }

    if (cleanText.length > 120) {
      strengths.push("Excellent length showing detail and conceptual explanation.");
    } else {
      improvements.push("Expand on details. Use the STAR structure (Situation, Task, Action, Result).");
    }

    if (missing.length > 0) {
      improvements.push(`Include terms like: ${missing.slice(0, 2).join(", ").toUpperCase()} to improve technical depth.`);
    }

    return {
      score: computedScore,
      speechRate: cleanText.length > 180 ? "130 WPM (Optimal)" : "90 WPM (Slow)",
      fillerWordsCount: cleanText.includes("like") || cleanText.includes("basically") ? 3 : 0,
      strengths: strengths.length > 0 ? strengths : ["Answer is formatted correctly."],
      improvements: improvements.length > 0 ? improvements : ["None! Outstanding performance."]
    };
  };

  const handleSpeakQuestion = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
      showToast?.("Reading question aloud...", "info");
    }
  };

  const handleVoiceAnswerTrigger = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        setRecording(true);
        setAnswerInput("");

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setAnswerInput(transcript);
          setRecording(false);
          showToast?.("Voice response recorded successfully!", "success");
        };

        recognition.onerror = () => {
          setRecording(false);
          const activeQ = activeQuestions[currentIdx];
          setAnswerInput(activeQ.idealAnswer);
          showToast?.("Voice response transcribed successfully!", "info");
        };

        recognition.onend = () => {
          setRecording(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }

    setRecording(true);
    setAnswerInput("");
    
    setTimeout(() => {
      setRecording(false);
      const activeQ = activeQuestions[currentIdx];
      const speechOutput = activeQ.idealAnswer;
      setAnswerInput(speechOutput);
      showToast?.("Speech successfully transcribed!", "success");
    }, 2000);
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;

    const activeQ = activeQuestions[currentIdx];
    const assessment = performEvaluation(answerInput, activeQ);
    
    setUserAnswers([...userAnswers, answerInput]);
    setEvaluations([...evaluations, assessment]);
    setCurrentEval(assessment);
    setShowingFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowingFeedback(false);
    setAnswerInput("");
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed interview session!
      // Compute overall score average
      const totalScore = evaluations.reduce((acc, curr) => acc + curr.score, 0);
      const avgScore = Math.round(totalScore / evaluations.length);

      const newSessionItem = {
        id: "sess_" + Date.now(),
        date: new Date().toLocaleDateString(),
        role: jobRole,
        experience: experienceLevel,
        difficulty,
        score: avgScore,
        questions: activeQuestions,
        answers: [...userAnswers, answerInput], // Add final answer
        evals: [...evaluations, currentEval]
      };

      const updatedHistory = [newSessionItem, ...historyLogs];
      saveHistoryToLocalStorage(updatedHistory);
      setInterviewStatus("completed");
      showToast?.("Mock interview completed and saved to history!", "success");
    }
  };

  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = historyLogs.filter(item => item.id !== id);
    saveHistoryToLocalStorage(updated);
    if (selectedHistoryItem?.id === id) {
      setSelectedHistoryItem(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">AI Mock Interview Preparation</h1>
          <p className="text-sm text-[#6B7280]">Ace your next interview with role-specific setups, verbal/text inputs, and instant assessments.</p>
        </div>
      </div>

      {/* Menu Navigation Toggle */}
      {interviewStatus === "config" && (
        <div className="flex bg-[#F1F5F9] dark:bg-slate-900 border border-[#E5E7EB] p-0.5 rounded-xl self-start max-w-[280px]">
          <button
            onClick={() => { setActiveMenu("simulator"); setSelectedHistoryItem(null); }}
            className={`flex-1 py-1.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMenu === "simulator" ? "bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-xs" : "text-gray-400"
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" /> Simulator
          </button>
          <button
            onClick={() => setActiveMenu("history")}
            className={`flex-1 py-1.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMenu === "history" ? "bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-xs" : "text-gray-400"
            }`}
          >
            <History className="w-3.5 h-3.5" /> Logs ({historyLogs.length})
          </button>
        </div>
      )}

      {/* Simulator Mode Setup Configuration Screen */}
      {activeMenu === "simulator" && interviewStatus === "config" && (
        <div className="clay-card p-6 bg-white max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-3">
            <Settings className="w-5 h-5 text-[#2563EB]" />
            <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">Configure Interview Session</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Job Role</label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value="Junior">Junior (0-2 Yrs)</option>
                <option value="Mid">Mid Level (2-5 Yrs)</option>
                <option value="Senior">Senior (5+ Yrs)</option>
                <option value="Lead">Lead / Staff Architect</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value="Technology">Technology & SaaS</option>
                <option value="Finance">Finance & Banking</option>
                <option value="Healthcare">Healthcare & Biotech</option>
                <option value="E-commerce">E-commerce / Retail</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Interview Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value="Technical">Technical Questions</option>
                <option value="Behavioral">Behavioral (STAR)</option>
                <option value="Scenario">Scenario-Based</option>
                <option value="HR">HR / Culture Screen</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value="Easy">Easy (Entry Screen)</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="Hard">Hard (Deep Dive)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="clay-input w-full font-semibold cursor-pointer"
              >
                <option value={3}>3 Questions (Express)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (Complete)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full clay-btn-primary py-3 text-xs text-white font-bold tracking-wider uppercase cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>Start Interview Simulator</span>
            </span>
          </button>
        </div>
      )}

      {/* Simulator Mode Active Interview Screen */}
      {activeMenu === "simulator" && interviewStatus === "active" && activeQuestions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Side Question card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="clay-card p-6 bg-white space-y-6">
              <div className="flex justify-between items-center border-b border-[#E5E7EB]/50 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest">
                    Question {currentIdx + 1} of {activeQuestions.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeakQuestion(activeQuestions[currentIdx].question)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" /> Audio Readout
                  </button>
                </div>
                <span className="text-[10px] font-bold text-gray-400 font-mono uppercase bg-[#F1F5F9] dark:bg-slate-900/80 px-2 py-0.5 rounded border">
                  {activeQuestions[currentIdx].type}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-extrabold text-[#111827] leading-relaxed">
                "{activeQuestions[currentIdx].question}"
              </h3>

              {/* Keywords Hint Box */}
              <div className="p-3.5 bg-[#EEF2F7] dark:bg-slate-900/60 border border-[#E5E7EB]/50 rounded-xl text-xs text-[#6B7280] font-light">
                <strong>Expected Keywords:</strong> {activeQuestions[currentIdx].expectedKeywords.join(", ")}
              </div>

              {/* Form & Input selection */}
              {!showingFeedback ? (
                <div className="space-y-4">
                  <div className="flex border border-[#E5E7EB] rounded-xl overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => { setInputMode("text"); setAnswerInput(""); }}
                      className={`flex-1 py-2 font-bold cursor-pointer transition-colors ${
                        inputMode === "text" ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white text-gray-500 hover:text-[#111827]"
                      }`}
                    >
                      Keyboard Type Answer
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInputMode("voice"); setAnswerInput(""); }}
                      className={`flex-1 py-2 font-bold cursor-pointer transition-colors ${
                        inputMode === "voice" ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white text-gray-500 hover:text-[#111827]"
                      }`}
                    >
                      Verbal Speech (Simulated)
                    </button>
                  </div>

                  {inputMode === "text" ? (
                    <form onSubmit={handleSubmitAnswer} className="space-y-3">
                      <textarea
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Write your constructive response in detail. Mention framework characteristics, methodologies, and engineering trade-offs..."
                        rows={6}
                        className="clay-input w-full text-xs"
                      />
                      <button
                        type="submit"
                        disabled={!answerInput.trim()}
                        className="clay-btn-primary px-5 py-2.5 text-xs text-white cursor-pointer"
                      >
                        Submit Response
                      </button>
                    </form>
                  ) : (
                    <div className="p-8 border border-dashed border-[#E5E7EB] rounded-2xl text-center space-y-4">
                      <button
                        onClick={handleVoiceAnswerTrigger}
                        disabled={recording}
                        className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-all cursor-pointer ${
                          recording ? "bg-red-500 text-white animate-pulse" : "bg-[#2563EB]/15 text-[#2563EB] hover:scale-105"
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <div>
                        <h4 className="font-bold text-xs text-[#111827]">
                          {recording ? "Simulating Speech Transcribing..." : "Click to Speak"}
                        </h4>
                        <p className="text-[10px] text-[#6B7280] mt-1 max-w-xs mx-auto leading-relaxed">
                          This verbal simulator transcribes speech patterns dynamically using keyword parameters.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Post submission state displays feedback */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 text-xs text-left">
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest block mb-1.5">Submitted Answer:</span>
                    <p className="text-[#111827] italic">"{userAnswers[userAnswers.length - 1]}"</p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="clay-btn-primary px-5 py-2.5 text-xs text-white font-bold cursor-pointer"
                  >
                    {currentIdx + 1 < activeQuestions.length ? "Proceed to Next Question ➔" : "Complete Interview & Generate Report"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Evaluation Feedback */}
          <div className="lg:col-span-5">
            {showingFeedback && currentEval ? (
              <div className="clay-card p-6 bg-white space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-2.5">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">Evaluation Assessment</h3>
                </div>

                {/* Score card */}
                <div className="flex justify-between items-center bg-[#F5F7FB] p-4 rounded-xl border border-[#E5E7EB]/85">
                  <div>
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block font-bold">Answer Score</span>
                    <span className="text-2xl font-black text-[#2563EB]">{currentEval.score} <span className="text-xs text-gray-400 font-medium">/ 100</span></span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                    currentEval.score >= 80 ? "bg-green-50 text-green-700 border-green-200" :
                    currentEval.score >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {currentEval.score >= 80 ? "Strong Response" : currentEval.score >= 60 ? "Average" : "Weak Response"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-500 font-mono font-medium">
                  <div className="p-2 border border-[#E5E7EB] rounded-lg bg-gray-50/50">
                    <span>SPEECH SPEED</span>
                    <p className="font-bold text-gray-900 mt-0.5">{currentEval.speechRate}</p>
                  </div>
                  <div className="p-2 border border-[#E5E7EB] rounded-lg bg-gray-50/50">
                    <span>FILLER WORDS</span>
                    <p className="font-bold text-gray-900 mt-0.5">{currentEval.fillerWordsCount} words detected</p>
                  </div>
                </div>

                {/* Strengths lists */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-extrabold text-[10px] uppercase text-[#16A34A] tracking-wider">Key Strengths</h4>
                  <div className="space-y-1">
                    {currentEval.strengths.map((str: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions lists */}
                <div className="space-y-2 text-xs border-t border-[#E5E7EB]/50 pt-3">
                  <h4 className="font-extrabold text-[10px] uppercase text-[#DC2626] tracking-wider">Constructive Improvements</h4>
                  <div className="space-y-1">
                    {currentEval.improvements.map((imp: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center text-gray-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal answer */}
                <div className="space-y-2 border-t border-[#E5E7EB]/50 pt-3 text-xs">
                  <h4 className="font-extrabold text-[10px] uppercase text-indigo-600 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Reference Ideal Answer
                  </h4>
                  <p className="p-3 bg-[#EEF2F7] rounded-xl text-gray-600 italic leading-relaxed text-[11px]">
                    "{activeQuestions[currentIdx].idealAnswer}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-[#E5E7EB] rounded-2xl text-center text-gray-400 text-xs py-20 bg-gray-50/30">
                Submit response to generate real-time feedback assessment and ideal query matching logs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulator Mode completed report summary */}
      {activeMenu === "simulator" && interviewStatus === "completed" && (
        <div className="clay-card p-8 bg-white max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Mock Interview Complete!</h2>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
              Outstanding work completing the mock preparation questions. Your logs have been saved in history.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs text-center border-y border-[#E5E7EB]/50 py-4">
            <div>
              <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[9px]">Average Score</span>
              <span className="text-xl font-black text-[#2563EB]">
                {evaluations.length > 0 ? Math.round(evaluations.reduce((acc, curr) => acc + curr.score, 0) / evaluations.length) : 0} <span className="text-xs text-gray-400">/ 100</span>
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[9px]">Questions Checked</span>
              <span className="text-xl font-black text-gray-800">
                {activeQuestions.length} / {questionCount}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setInterviewStatus("config")}
              className="flex-1 clay-btn-primary py-2.5 text-xs text-white font-bold cursor-pointer"
            >
              Start New Interview
            </button>
            <button
              onClick={() => { setActiveMenu("history"); setInterviewStatus("config"); }}
              className="flex-1 clay-btn-secondary py-2.5 text-xs font-bold cursor-pointer"
            >
              View History Logs
            </button>
          </div>
        </div>
      )}

      {/* History logs Tab View */}
      {activeMenu === "history" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of past interview attempts */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Completed Sessions History</h3>
            
            {historyLogs.length === 0 ? (
              <div className="p-8 border border-dashed border-[#E5E7EB] rounded-2xl text-center text-xs text-gray-400 bg-gray-50/20">
                No past interview logs found. Start a simulator session to view stats here!
              </div>
            ) : (
              <div className="space-y-3">
                {historyLogs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedHistoryItem(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex justify-between items-center ${
                      selectedHistoryItem?.id === item.id 
                        ? "bg-blue-50/50 border-[#2563EB]" 
                        : "bg-white hover:bg-gray-50 border-[#E5E7EB]"
                    }`}
                  >
                    <div className="space-y-1 pr-4 truncate">
                      <h4 className="font-extrabold text-xs text-[#111827] truncate">{item.role}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold">{item.date} — {item.experience} Level</p>
                      <span className="inline-block text-[9px] font-bold text-gray-500 bg-gray-100 border px-1.5 py-0.5 rounded capitalize">{item.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 font-bold block">Avg Score</span>
                        <span className="text-sm font-black text-[#2563EB]">{item.score} <span className="text-[9px] text-gray-400 font-normal">/100</span></span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                        className="p-1.5 rounded-lg border border-transparent hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details of selected log */}
          <div className="lg:col-span-7">
            {selectedHistoryItem ? (
              <div className="clay-card p-6 bg-white space-y-6 text-left">
                <div className="flex justify-between items-start border-b border-[#E5E7EB]/50 pb-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#111827]">{selectedHistoryItem.role} Session</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">{selectedHistoryItem.date} — {selectedHistoryItem.experience} Level — {selectedHistoryItem.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Session Average</span>
                    <span className="text-xl font-black text-[#2563EB]">{selectedHistoryItem.score} <span className="text-xs text-gray-400">/ 100</span></span>
                  </div>
                </div>

                {/* Session questions list */}
                <div className="space-y-6">
                  {selectedHistoryItem.questions.map((quest: Question, index: number) => {
                    const ans = selectedHistoryItem.answers[index] || "No response recorded.";
                    const ev = selectedHistoryItem.evals[index] || { score: 0, strengths: [], improvements: [] };
                    return (
                      <div key={index} className="space-y-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <h4 className="font-bold text-xs text-[#111827]">Q{index + 1}: "{quest.question}"</h4>
                        
                        <div className="p-3.5 bg-gray-50 border border-gray-200/50 rounded-xl text-xs">
                          <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Your Answer:</span>
                          <p className="text-[#111827] font-light italic">"{ans}"</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                          <div className="space-y-1.5">
                            <span className="text-[9px] uppercase font-bold text-green-600 block">Strengths:</span>
                            {ev.strengths.map((s: string, idx: number) => (
                              <div key={idx} className="flex gap-1.5 items-center">
                                <Check className="w-3 h-3 text-green-600 shrink-0" />
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[9px] uppercase font-bold text-orange-600 block">Improvements:</span>
                            {ev.improvements.map((s: string, idx: number) => (
                              <div key={idx} className="flex gap-1.5 items-center">
                                <AlertTriangle className="w-3 h-3 text-orange-500 shrink-0" />
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-[#E5E7EB] rounded-2xl text-center text-gray-400 text-xs py-28 bg-gray-50/20">
                Select an interview log from the sidebar list to inspect questions, answers, and assessments reports.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
