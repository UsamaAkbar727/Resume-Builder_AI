"use client";

import React, { useState, useEffect } from "react";
import { Mic, SearchCode, Sparkles, Check, Play, Square, Volume2 } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function InterviewPrep() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timer, setTimer] = useState(0);

  // Simulated question set
  const questions = [
    "Tell me about a time you solved a database query latency issue.",
    "Why do you want to join our engineering team?",
    "Explain how server-side rendering impacts core web vitals."
  ];
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
      setHasRecorded(false);
    }
  };

  // Simulated waveforms Heights
  const waveHeights = [4, 8, 12, 6, 8, 16, 24, 18, 10, 14, 20, 28, 16, 12, 22, 14, 8, 4, 10, 16, 8, 4];

  return (
    <section id="ai-interview-coach" className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-5 text-left">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-6 shadow-xs">
                <Mic className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 leading-tight">
                Simulate voice screenings with AI coach
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium mb-6">
                Ace phone screens and tech rounds. Speak your answers aloud. Our voice engine records response files, maps transcript density, and outputs detailed feedback.
              </p>
              <ul className="space-y-3.5 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Filler word counts tracking ("like", "um", "uh")
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Speech pacing diagnostics (Words / minute)
                </li>
                <li className="flex items-center gap-3 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Core technical vocabulary coverage checker
                </li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Interactive Screen side */}
          <div className="lg:col-span-7 bg-[#EEF2F6]/60 border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]">
            <ScrollReveal variant="scale-in" delay={200} className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-md flex flex-col justify-between min-h-[380px]">
              
              {/* Question toggle segment */}
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Voice Coach Active</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    Question {activeQuestion + 1} of 3
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                  <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Prompt</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    "{questions[activeQuestion]}"
                  </p>
                </div>
              </div>

              {/* Waves waveform animation */}
              <div className="flex-1 flex flex-col justify-center items-center py-4 bg-slate-50/50 rounded-xl border border-slate-100 mb-6 min-h-[100px]">
                {isRecording ? (
                  <div className="flex justify-center items-center gap-1.5 h-16 w-full px-8">
                    {waveHeights.map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-blue-600 rounded-full animate-bounce shrink-0"
                        style={{
                          height: `${Math.max(4, h * Math.sin(timer + i))}px`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: "0.8s"
                        }}
                      ></span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-xs text-slate-400 font-semibold flex flex-col items-center gap-2">
                    <Volume2 className="w-8 h-8 text-slate-300" />
                    <span>Microphone Idle. Click record below to speak answer.</span>
                  </div>
                )}
              </div>

              {/* Control triggers & live analytics stats */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleRecord}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRecording
                        ? "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/10"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" /> Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" /> Start Recording
                      </>
                    )}
                  </button>

                  {isRecording && (
                    <span className="text-xs font-bold text-slate-800 tracking-mono animate-pulse">
                      {formatTimer(timer)}
                    </span>
                  )}
                </div>

                {/* Question switchers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveQuestion(prev => (prev === 0 ? questions.length - 1 : prev - 1))}
                    disabled={isRecording}
                    className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg text-xs font-bold disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setActiveQuestion(prev => (prev === questions.length - 1 ? 0 : prev + 1))}
                    disabled={isRecording}
                    className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg text-xs font-bold disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Feedback report overlay after recording */}
              {hasRecorded && (
                <div className="mt-4 p-4.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-wider mb-0.5">Mock Grade Scorecard</h5>
                    <p className="text-[11px] text-emerald-700 font-semibold leading-relaxed">
                      Pacing: <span className="font-bold">136 WPM (Perfect)</span> • Fillers: <span className="font-bold">1.5% (Very Low)</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-emerald-600 bg-white border border-emerald-250 px-2 py-1 rounded-lg">
                      88%
                    </span>
                  </div>
                </div>
              )}

            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
