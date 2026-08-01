"use client";

import React from "react";
import { TrendingUp, Zap, Sparkles, ArrowLeft } from "lucide-react";

export default function AnalyticsView({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const scoreHistory = [
    { month: "May", score: 72 },
    { month: "Jun", score: 78 },
    { month: "Jul", score: 85 }
  ];

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
        <h1 className="text-3xl font-extrabold text-[#111827]">Job Search Analytics</h1>
        <p className="text-sm text-[#6B7280]">Analyze application pipelines, success conversion rates, and ATS score history.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Interview Conversion</span>
            <h3 className="text-3xl font-extrabold text-[#2563EB]">38.5%</h3>
            <span className="text-[10px] text-[#16A34A] font-medium block mt-2">✓ 8% higher than average</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Average Response Lag</span>
            <h3 className="text-3xl font-extrabold text-[#F59E0B]">4.2 Days</h3>
            <span className="text-[10px] text-[#6B7280] block mt-2">Stripe answered in 2 days</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#F59E0B]">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-6 bg-white text-left flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Token AI Utilized</span>
            <h3 className="text-3xl font-extrabold text-[#16A34A]">48.2k</h3>
            <span className="text-[10px] text-[#6B7280] block mt-2">Pro limit: Unlimited tokens</span>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#16A34A]">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Application Trends (Area SVG) */}
        <div className="clay-card p-6 bg-white text-left space-y-4">
          <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Weekly Applications Trend</h3>
          
          <div className="h-56 relative w-full border-b border-l border-[#E5E7EB] pt-4">
            {/* Area path */}
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Fill */}
              <path
                d="M0,80 Q50,60 100,45 T200,30 T300,10 L300,100 L0,100 Z"
                fill="url(#areaGrad)"
              />
              {/* Stroke */}
              <path
                d="M0,80 Q50,60 100,45 T200,30 T300,10"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
              />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-[#6B7280] font-semibold">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Chart 2: ATS History progression (Bar SVG) */}
        <div className="clay-card p-6 bg-white text-left space-y-4">
          <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">ATS Score Progression</h3>
          
          <div className="h-56 flex items-end justify-around gap-4 pt-8">
            {scoreHistory.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-bold text-[#111827]">{item.score}%</div>
                <div
                  className="w-12 bg-gradient-to-t from-[#2563EB] to-[#1D4ED8] rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.2)] transition-all duration-1000"
                  style={{ height: `${item.score * 1.5}px` }}
                ></div>
                <span className="text-xs text-[#6B7280] font-semibold">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Map grid */}
        <div className="clay-card p-6 bg-white text-left space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Search Activity Grid</h3>
          <div className="flex flex-wrap gap-1.5 justify-center py-4">
            {Array.from({ length: 48 }).map((_, i) => {
              const weights = [
                "bg-[#EEF2F7] border-[#E5E7EB]/50",
                "bg-blue-100 border-blue-200",
                "bg-blue-300 border-blue-400",
                "bg-[#2563EB] border-[#2563EB]"
              ];
              const randomWeight = weights[Math.floor(Math.random() * weights.length)];
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-md border ${randomWeight} transition-all hover:scale-110 cursor-pointer`}
                  title={`Activity weight: ${i}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#6B7280] px-10">
            <span>Less Active</span>
            <div className="flex gap-1">
              <span className="w-3 h-3 bg-[#EEF2F7] border rounded"></span>
              <span className="w-3 h-3 bg-blue-100 border rounded"></span>
              <span className="w-3 h-3 bg-blue-300 border rounded"></span>
              <span className="w-3 h-3 bg-[#2563EB] border rounded"></span>
            </div>
            <span>Highly Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
