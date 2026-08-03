"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");

  const pricing = {
    free: { monthly: 0, annually: 0 },
    pro: { monthly: 24, annually: 19 },
    enterprise: { monthly: 99, annually: 79 },
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Toggle details */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
              Simple & Transparent Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-3 mb-4">
              Choose the plan that fit your goals
            </h2>
            <p className="text-sm text-slate-500 font-medium mb-8">
              Save up to 20% by purchasing an annual subscription. Cancel anytime.
            </p>

            {/* Toggle Switcher */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annually")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === "annually"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Free Tier */}
          <ScrollReveal
            variant="fade-up"
            delay={150}
            className="bg-white border border-slate-200 p-8 rounded-3xl text-left flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Free Sandbox</h3>
              <p className="text-xs text-slate-400 font-semibold mb-6">Perfect to draft initial applications.</p>
              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-400 font-bold">/month</span>
              </div>

              <ul className="space-y-4 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> 1 Resume Draft Version
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Basic ATS Keyword scan
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Kanban Tracker (10 jobs limit)
                </li>
                <li className="flex items-center gap-2.5 text-slate-350 line-through decoration-slate-200">
                  ✕ AI Tone & Summary Modifiers
                </li>
                <li className="flex items-center gap-2.5 text-slate-350 line-through decoration-slate-200">
                  ✕ AI Voice Coach Interview rounds
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/auth?mode=register"
                className="clay-btn-secondary w-full py-3 text-xs font-bold text-slate-700 tracking-wide uppercase shadow-xs hover:bg-slate-50 border border-slate-200 rounded-xl flex justify-center"
              >
                Start For Free
              </Link>
            </div>
          </ScrollReveal>

          {/* Pro Tier (Recommended, with highlight borders and shadows) */}
          <ScrollReveal
            variant="fade-up"
            delay={200}
            className="bg-white border-2 border-blue-600/70 p-8 rounded-3xl text-left flex flex-col justify-between shadow-[0_20px_50px_-12px_rgba(37,99,235,0.15)] relative transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Highly Recommended Badge */}
            <span className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_4px_12px_rgba(37,99,235,0.25)] flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-current" /> Recommended
            </span>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Premium Pro</h3>
              <p className="text-xs text-slate-400 font-semibold mb-6">Complete suite to scale application metrics.</p>
              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${billingCycle === "annually" ? pricing.pro.annually : pricing.pro.monthly}
                </span>
                <span className="text-xs text-slate-400 font-bold">/month</span>
              </div>

              <ul className="space-y-4 text-xs font-semibold text-slate-650">
                <li className="flex items-center gap-2.5 text-emerald-600 font-bold">
                  <Check className="w-4 h-4 stroke-[3]" /> Unlimited Resume Versions
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Advanced ATS Score scan
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Unlimited Kanban Tracker pipeline
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> AI Cover Letter Writer Letter
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> AI Voice Mock Simulator
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Export to PDF, DOCX format
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/auth?mode=register"
                className="clay-btn-primary w-full py-3.5 text-xs text-white font-bold tracking-wide uppercase shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.01] transition-all rounded-xl flex justify-center"
              >
                Get Pro Access
              </Link>
            </div>
          </ScrollReveal>

          {/* Enterprise Tier */}
          <ScrollReveal
            variant="fade-up"
            delay={250}
            className="bg-white border border-slate-200 p-8 rounded-3xl text-left flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Team Enterprise</h3>
              <p className="text-xs text-slate-400 font-semibold mb-6">Designed for cohorts, universities, & agencies.</p>
              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${billingCycle === "annually" ? pricing.enterprise.annually : pricing.enterprise.monthly}
                </span>
                <span className="text-xs text-slate-400 font-bold">/month</span>
              </div>

              <ul className="space-y-4 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Everything in Pro Plan
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Multi-user shared boards workspace
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Dedicated dashboard statistics review
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Developer APIs access credentials
                </li>
                <li className="flex items-center gap-2.5 text-emerald-600">
                  <Check className="w-4 h-4 stroke-[3]" /> Dedicated account manager support
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/auth?mode=register"
                className="clay-btn-secondary w-full py-3 text-xs font-bold text-slate-700 tracking-wide uppercase shadow-xs hover:bg-slate-50 border border-slate-200 rounded-xl flex justify-center"
              >
                Contact Sales
              </Link>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
