"use client";

import React, { useState } from "react";
import { ArrowLeft, Volume2, Mic, CheckCircle2, AlertTriangle, Info, Play, PenTool, Trash2 } from "lucide-react";

interface InterviewPrepProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

type QuestionType = "Technical" | "HR" | "Coding";

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  expectedKeywords: string[];
  sampleVoiceAnswer: string;
}

export default function InterviewPrep({ resumeData, onNavigate, showToast }: InterviewPrepProps) {
  const [activeType, setActiveType] = useState<QuestionType>("Technical");
  const [recording, setRecording] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [feedbackData, setFeedbackData] = useState<any>(null);

  const questions: Question[] = [
    {
      id: "1",
      type: "Technical",
      question: "Explain the difference between Server Actions and API Routes in Next.js 15, and when you would choose one over the other.",
      expectedKeywords: ["Server Actions", "RPC", "POST request", "formAction", "API routes", "static caching"],
      sampleVoiceAnswer: "Server Actions in Next.js 15 utilize direct RPC connections to execute code directly on the server without creating explicit API routes, which is great for form submissions and mutating server states. API routes are better when building general REST API endpoints for external clients."
    },
    {
      id: "2",
      type: "Technical",
      question: "How does React 19 handle ref passing, and what is the role of forwardRef in the new architecture?",
      expectedKeywords: ["ref prop", "forwardRef deprecation", "React.forwardRef", "functional components"],
      sampleVoiceAnswer: "In React 19, ref is passed directly as a standard prop to functional components. This deprecates the need for React.forwardRef, simplifying component signatures and rendering patterns."
    },
    {
      id: "3",
      type: "HR",
      question: "Tell me about a time you had a technical disagreement with a team member. How did you resolve it, and what was the outcome?",
      expectedKeywords: ["collaboration", "active listening", "compromise", "data-driven decisions", "retrospective"],
      sampleVoiceAnswer: "We had a disagreement regarding database normalization. I scheduled a call, practiced active listening, and we set up a data-driven performance test. This led to a consensus retrospective decision."
    },
    {
      id: "4",
      type: "Coding",
      question: "Write a function that merges overlapping intervals. E.g. input [[1,3],[2,6],[8,10]] yields [[1,6],[8,10]]. What is the time complexity?",
      expectedKeywords: ["sorting", "interval merging", "O(N log N)", "O(1) auxiliary space"],
      sampleVoiceAnswer: "We first sort the intervals. Then we merge overlapping ranges in a single pass. The time complexity is O(N log N) due to sorting, using O(1) auxiliary space."
    }
  ];

  const filteredQuestions = questions.filter((q) => q.type === activeType);
  const currentQuestion = filteredQuestions[activeQuestionIdx] || filteredQuestions[0] || questions[0];

  const runEvaluation = (text: string) => {
    const cleanText = text.toLowerCase();
    const expected = currentQuestion.expectedKeywords;
    const matched = expected.filter((kw: string) => cleanText.includes(kw.toLowerCase()));
    const missing = expected.filter((kw: string) => !cleanText.includes(kw.toLowerCase()));
    
    const coverage = expected.length > 0 ? matched.length / expected.length : 0;
    const computedScore = Math.round(55 + (coverage * 40) + (cleanText.length > 100 ? 3 : 0));

    const strengths = [];
    const improvements = [];

    if (matched.length > 0) {
      strengths.push(`Addressed expected keywords: ${matched.slice(0, 3).join(", ").toUpperCase()}`);
      strengths.push("Direct response targeting syntax characteristics");
    } else {
      improvements.push("Reference the question terms directly to set high relevance");
    }

    if (missing.length > 0) {
      improvements.push(`Include: ${missing.slice(0, 2).join(", ").toUpperCase()} to improve score`);
    }

    if (cleanText.length < 50) {
      improvements.push("Expand on details using STAR sequence (Situation, Task, Action, Result)");
    } else {
      strengths.push("Adequate duration and engineering terminology used");
    }

    return {
      score: computedScore > 98 ? 98 : computedScore,
      speechRate: cleanText.length > 150 ? "135 WPM (Optimal)" : "110 WPM (Slightly Slow)",
      fillerWords: cleanText.includes("basically") || cleanText.includes("like") ? 4 : 1,
      grammarCompliance: "96%",
      strengths,
      improvements
    };
  };

  const handleStartRecord = () => {
    setRecording(true);
    setFeedbackData(null);
    setAnswerInput("");
    setTimeout(() => {
      setRecording(false);
      const simulatedText = currentQuestion.sampleVoiceAnswer;
      setAnswerInput(simulatedText);
      
      const evalData = runEvaluation(simulatedText);
      setFeedbackData(evalData);
      
      if (showToast) showToast("Audio transcribed and analyzed successfully!", "success");
    }, 3000);
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput) return;
    const evalData = runEvaluation(answerInput);
    setFeedbackData(evalData);
    if (showToast) showToast("Written response analyzed successfully!", "success");
  };

  const handleNext = () => {
    setFeedbackData(null);
    setAnswerInput("");
    setActiveQuestionIdx((prev) => (prev + 1) % filteredQuestions.length);
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

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">AI Voice Mock Interview</h1>
        <p className="text-sm text-[#6B7280]">Practice answering HR, Technical, and Coding questions with immediate feedback assessments.</p>
      </div>

      {/* Switcher categories */}
      <div className="flex gap-3">
        {(["Technical", "HR", "Coding"] as QuestionType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveType(type);
              setActiveQuestionIdx(0);
              setFeedbackData(null);
              setAnswerInput("");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
              activeType === type ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white border-[#E5E7EB] hover:bg-[#EEF2F7]"
            }`}
          >
            {type} Questions
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Question Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="clay-card p-6 bg-white space-y-6 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#2563EB] tracking-wider block mb-2">
                Question {activeQuestionIdx + 1} of {filteredQuestions.length}
              </span>
              <h3 className="font-extrabold text-base md:text-lg text-[#111827] leading-relaxed">
                "{currentQuestion.question}"
              </h3>
            </div>

            <div className="p-3.5 bg-[#EEF2F7] rounded-xl text-xs text-[#6B7280]">
              <strong>Expected Target Keywords:</strong>{" "}
              {currentQuestion.expectedKeywords.join(", ")}
            </div>

            {/* Answer Input Option Tabs */}
            <div className="border-t border-[#E5E7EB] pt-4">
              <div className="flex border border-[#E5E7EB] rounded-xl overflow-hidden mb-4">
                <button
                  type="button"
                  onClick={() => { setInputMode("voice"); setFeedbackData(null); setAnswerInput(""); }}
                  className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inputMode === "voice" ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white text-gray-500 hover:text-[#111827]"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" /> Answer Verbally
                </button>
                <button
                  type="button"
                  onClick={() => { setInputMode("text"); setFeedbackData(null); setAnswerInput(""); }}
                  className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inputMode === "text" ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white text-gray-500 hover:text-[#111827]"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" /> Type Answer
                </button>
              </div>

              {inputMode === "text" ? (
                <form onSubmit={handleSubmitText} className="space-y-4">
                  <textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="Type your technical or HR answer here..."
                    rows={4}
                    className="clay-input w-full text-xs"
                  />
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (showToast) showToast("Playing simulated question audio...", "info");
                      }}
                      type="button"
                      className="clay-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                    </button>
                    <div className="flex gap-2">
                      <button type="submit" className="clay-btn-primary px-5 py-2.5 text-xs text-white font-bold cursor-pointer">
                        Analyze Answer
                      </button>
                      <button type="button" onClick={handleNext} className="clay-btn-secondary px-4 py-2.5 text-xs font-semibold cursor-pointer">
                        Next Question
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex gap-3 items-center justify-between">
                  <button
                    onClick={() => {
                      if (showToast) showToast("Playing simulated question audio...", "info");
                    }}
                    className="clay-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={handleStartRecord}
                      disabled={recording}
                      className={`px-5 py-2.5 text-xs text-white font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer ${
                        recording ? "bg-red-500 animate-pulse" : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" /> {recording ? "Recording (Speak Now)" : "Answer Aloud"}
                    </button>
                    <button onClick={handleNext} className="clay-btn-secondary px-4 py-2.5 text-xs font-semibold cursor-pointer">
                      Next Question →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Feedback Matrix */}
        <div className="lg:col-span-6 space-y-6">
          {recording && (
            <div className="clay-card p-12 bg-white text-center space-y-4 min-h-[340px] flex flex-col justify-center">
              {/* Simulated Waveform animation */}
              <div className="flex justify-center items-center gap-1 h-8 mb-4">
                {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#DC2626] rounded-full animate-bounce"
                    style={{
                      height: `${h * 4}px`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></span>
                ))}
              </div>
              <h4 className="font-bold text-sm text-[#111827]">Analyzing speech acoustics...</h4>
              <p className="text-xs text-[#6B7280]">Evaluating pacing, fillers, and semantic accuracy markers.</p>
            </div>
          )}

          {!recording && feedbackData && (
            <div className="clay-card p-6 bg-white space-y-5 animate-in fade-in duration-300 text-left">
              <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
                <h4 className="font-bold text-sm text-[#111827] uppercase tracking-wider">AI Response Scorecard</h4>
                <span className="text-xl font-extrabold text-[#16A34A]">{feedbackData.score} / 100</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#F5F7FB] border border-[#E5E7EB] rounded-xl">
                  <span className="text-[10px] text-[#6B7280] block">Speech Pace</span>
                  <span className="font-bold text-xs">{feedbackData.speechRate}</span>
                </div>
                <div className="p-3 bg-[#F5F7FB] border border-[#E5E7EB] rounded-xl">
                  <span className="text-[10px] text-[#6B7280] block">Filler Words</span>
                  <span className="font-bold text-xs text-[#DC2626]">{feedbackData.fillerWords} count</span>
                </div>
                <div className="p-3 bg-[#F5F7FB] border border-[#E5E7EB] rounded-xl">
                  <span className="text-[10px] text-[#6B7280] block">Grammar Accuracy</span>
                  <span className="font-bold text-xs text-[#16A34A]">{feedbackData.grammarCompliance}</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-[#E5E7EB]/60 text-xs">
                <div>
                  <h5 className="font-bold text-[#16A34A] mb-1.5">✓ Key Strengths</h5>
                  <ul className="list-disc pl-4 space-y-1 text-[#6B7280]">
                    {feedbackData.strengths.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-[#DC2626] mb-1.5">✗ Suggested Improvements</h5>
                  <ul className="list-disc pl-4 space-y-1 text-[#6B7280]">
                    {feedbackData.improvements.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!recording && !feedbackData && (
            <div className="clay-card p-12 bg-white text-center text-[#6B7280] min-h-[340px] flex flex-col justify-center items-center space-y-3">
              <Mic className="w-10 h-10 text-[#2563EB]" />
              <h4 className="font-bold text-sm text-[#111827]">Read question and start answer recording</h4>
              <p className="text-xs max-w-sm">
                Practicing verbally helps you master systems design and engineering vocabulary under real screen conditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
