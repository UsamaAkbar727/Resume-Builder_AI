"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Star, Zap, Building2 } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");

  const pricing = {
    free: { monthly: 0, annually: 0 },
    pro: { monthly: 24, annually: 19 },
    enterprise: { monthly: 99, annually: 79 },
  };

  const freeFeatures = [
    { text: "1 Resume Draft Version", included: true },
    { text: "Basic ATS Keyword Scan", included: true },
    { text: "Kanban Tracker (10 jobs)", included: true },
    { text: "AI Tone & Summary Modifiers", included: false },
    { text: "AI Voice Coach Interview", included: false },
  ];

  const proFeatures = [
    "Unlimited Resume Versions",
    "Advanced ATS Score Scan",
    "Unlimited Kanban Pipeline",
    "AI Cover Letter Writer",
    "AI Voice Mock Simulator",
    "Export to PDF & DOCX",
  ];

  const enterpriseFeatures = [
    "Everything in Pro Plan",
    "Multi-user Shared Boards",
    "Dedicated Dashboard Stats",
    "Developer API Credentials",
    "Dedicated Account Manager",
  ];

  return (
    <section id="pricing" className="py-28 bg-[#060A14] relative z-10 border-t border-white/[0.05] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] orb orb-blue opacity-12 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] orb orb-violet opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] text-[11px] font-bold text-[#7A8BA8] uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Simple & Transparent Pricing
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4">
              Choose your{" "}
              <span className="text-gradient">growth plan</span>
            </h2>
            <p className="text-sm text-[#7A8BA8] font-normal mb-10">
              Save up to 20% with an annual subscription. Cancel anytime, no questions asked.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-white/[0.1] text-white shadow-sm border border-white/[0.1]"
                    : "text-[#7A8BA8] hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annually")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  billingCycle === "annually"
                    ? "bg-white/[0.1] text-white shadow-sm border border-white/[0.1]"
                    : "text-[#7A8BA8] hover:text-white"
                }`}
              >
                Annual
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  −20%
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">

          {/* Free Tier */}
          <ScrollReveal
            variant="fade-up"
            delay={150}
            className="luxury-card p-8 flex flex-col justify-between border border-white/[0.06] hover:border-white/[0.12]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#7A8BA8]" />
                </div>
                <h3 className="text-lg font-bold text-white">Free Sandbox</h3>
              </div>
              <p className="text-xs text-[#7A8BA8] font-medium mb-7 ml-10">Perfect to draft initial applications.</p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/[0.06]">
                <span className="text-5xl font-black text-white">$0</span>
                <span className="text-xs text-[#7A8BA8] font-bold">/month</span>
              </div>

              <ul className="space-y-4">
                {freeFeatures.map((f) => (
                  <li key={f.text} className={`flex items-center gap-3 text-xs font-semibold ${f.included ? "text-[#9AACCC]" : "text-[#3A4F6A] line-through"}`}>
                    {f.included ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#3A4F6A] text-[8px] shrink-0">✕</span>
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <Link href="/auth?mode=register" className="btn-ghost w-full py-3.5 text-xs font-bold tracking-wide uppercase flex justify-center rounded-xl">
                Start For Free
              </Link>
            </div>
          </ScrollReveal>

          {/* Pro Tier — Recommended */}
          <ScrollReveal
            variant="fade-up"
            delay={200}
            className="relative p-[1px] rounded-[26px] bg-gradient-to-br from-blue-500/50 via-violet-500/30 to-blue-500/50 shadow-[0_0_50px_rgba(79,110,247,0.2)] hover:shadow-[0_0_70px_rgba(79,110,247,0.3)] transition-shadow duration-500"
          >
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <span className="flex items-center gap-1 bg-gradient-to-r from-[#4F6EF7] to-[#6B4FD9] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_4px_15px_rgba(79,110,247,0.4)] border border-blue-400/30 whitespace-nowrap">
                <Zap className="w-3 h-3" /> Most Popular
              </span>
            </div>

            <div className="rounded-[25px] bg-[#0B1328] p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Premium Pro</h3>
                </div>
                <p className="text-xs text-[#7A8BA8] font-medium mb-7 ml-10">Complete suite to scale application metrics.</p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/[0.08]">
                  <span className="text-5xl font-black text-gradient-blue">
                    ${billingCycle === "annually" ? pricing.pro.annually : pricing.pro.monthly}
                  </span>
                  <span className="text-xs text-[#7A8BA8] font-bold">/month</span>
                  {billingCycle === "annually" && (
                    <span className="text-[10px] text-[#7A8BA8] ml-1 line-through">${pricing.pro.monthly}</span>
                  )}
                </div>

                <ul className="space-y-4">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-semibold text-[#C4D4F0]">
                      <span className="w-4 h-4 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-blue-400 stroke-[3]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8">
                <Link href="/auth?mode=register" className="btn-glow w-full py-3.5 text-xs font-bold tracking-wide uppercase flex justify-center rounded-xl">
                  Get Pro Access
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Enterprise Tier */}
          <ScrollReveal
            variant="fade-up"
            delay={250}
            className="luxury-card p-8 flex flex-col justify-between border border-white/[0.06] hover:border-white/[0.12]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#7A8BA8]" />
                </div>
                <h3 className="text-lg font-bold text-white">Team Enterprise</h3>
              </div>
              <p className="text-xs text-[#7A8BA8] font-medium mb-7 ml-10">Designed for cohorts, universities & agencies.</p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/[0.06]">
                <span className="text-5xl font-black text-white">
                  ${billingCycle === "annually" ? pricing.enterprise.annually : pricing.enterprise.monthly}
                </span>
                <span className="text-xs text-[#7A8BA8] font-bold">/month</span>
              </div>

              <ul className="space-y-4">
                {enterpriseFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-xs font-semibold text-[#9AACCC]">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <Link href="/auth?mode=register" className="btn-ghost w-full py-3.5 text-xs font-bold tracking-wide uppercase flex justify-center rounded-xl">
                Contact Sales
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
