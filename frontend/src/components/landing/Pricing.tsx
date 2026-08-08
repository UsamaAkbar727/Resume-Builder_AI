"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./Animations";

type Cycle = "monthly" | "annually";

const plans = [
  {
    id: "free",
    name: "Free",
    desc: "Start building your first resume",
    monthly: 0, annually: 0,
    cta: "Start for free", ctaVariant: "outline",
    features: [
      { text: "1 resume version", ok: true },
      { text: "Basic ATS keyword scan", ok: true },
      { text: "Kanban tracker (10 jobs)", ok: true },
      { text: "AI tone modifiers", ok: false },
      { text: "Voice interview coach", ok: false },
      { text: "PDF & DOCX export", ok: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Everything you need to land the offer",
    monthly: 24, annually: 19,
    cta: "Get Pro access", ctaVariant: "primary",
    badge: "Most popular",
    features: [
      { text: "Unlimited resume versions", ok: true },
      { text: "Advanced ATS score scan", ok: true },
      { text: "Unlimited Kanban pipeline", ok: true },
      { text: "AI Cover Letter writer", ok: true },
      { text: "Voice mock interview coach", ok: true },
      { text: "PDF & DOCX export", ok: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "For cohorts, universities & agencies",
    monthly: 99, annually: 79,
    cta: "Contact sales", ctaVariant: "outline",
    features: [
      { text: "Everything in Pro", ok: true },
      { text: "Multi-user shared boards", ok: true },
      { text: "Dedicated dashboard stats", ok: true },
      { text: "Developer API access", ok: true },
      { text: "Dedicated account manager", ok: true },
      { text: "SLA & priority support", ok: true },
    ],
  },
];

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("annually");

  return (
    <section id="pricing" className="py-28 bg-[#06060c] text-white relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <ScrollReveal variant="fade-up" delay={0}>
          <div className="text-center mb-14 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black uppercase tracking-widest border border-indigo-500/20 shadow-xl mb-6 mx-auto w-fit">
              <Zap className="w-4 h-4 text-indigo-400" />
              TRANSPARENT PRICING
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-display">
              Simple, transparent<br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">pricing that scales.</span>
            </h2>
            <p className="text-zinc-400 mb-8 text-base font-medium">No hidden fees. Cancel anytime.</p>

            {/* Toggle */}
            <div className="inline-flex items-center bg-zinc-950 border border-zinc-850 rounded-2xl p-1.5 shadow-md">
              {(["monthly", "annually"] as Cycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${cycle === c ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 font-bold" : "text-zinc-400 hover:text-white"}`}
                >
                  {c === "monthly" ? "Monthly" : "Annual"}
                  {c === "annually" && (
                    <span className="text-[10px] font-black bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 px-2 py-0.5 rounded-full font-display">−20%</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => {
            const isPro = plan.id === "pro";
            const price = cycle === "annually" ? plan.annually : plan.monthly;
            return (
              <ScrollReveal key={plan.id} variant="fade-up" delay={i * 80}>
                <div className={`relative flex flex-col h-full rounded-3xl p-8 border transition-all duration-300 ${isPro ? "bg-[#0a0a14] border-indigo-500 shadow-[0_24px_60px_rgba(99,102,241,0.15)] scale-[1.03] z-20" : "bg-zinc-900/60 border-zinc-850 hover:border-indigo-500/30 shadow-md"}`}>

                  {isPro && plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border border-indigo-500 font-display">
                        <Zap className="w-3 h-3 text-white fill-white animate-pulse" /> {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="text-base font-black mb-1 text-white font-display">{plan.name}</h3>
                  <p className="text-xs font-medium mb-6 text-zinc-400">{plan.desc}</p>

                  {/* Price */}
                  <div className={`flex items-baseline gap-1 mb-6 pb-6 border-b ${isPro ? "border-zinc-800" : "border-zinc-850"}`}>
                    <span className="text-5xl font-black tracking-tight text-white font-display">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-zinc-500">/mo</span>
                    {cycle === "annually" && plan.monthly > 0 && (
                      <span className="text-xs line-through ml-1 text-zinc-600">${plan.monthly}</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className={`flex items-center gap-2.5 text-sm font-medium ${f.ok ? "text-zinc-200" : "text-zinc-600 line-through"}`}>
                        {f.ok ? (
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                            <Check className="w-3 h-3 stroke-[3] text-indigo-400" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center shrink-0">
                            <span className="text-zinc-600 text-[10px]">✕</span>
                          </span>
                        )}
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isPro ? (
                    <Link href="/auth?mode=register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition-all cursor-pointer w-full font-display">
                      {plan.cta} <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  ) : (
                    <Link href="/auth?mode=register" className="px-8 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/40 text-zinc-350 hover:text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer w-full font-display">
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
