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
    <section id="pricing" className="py-28 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <ScrollReveal variant="fade-up" delay={0}>
          <div className="text-center mb-14">
            <span className="eyebrow text-blue-600 block mb-3">Pricing</span>
            <h2 className="display-lg text-gray-900 mb-4">
              Simple, transparent<br />
              <span className="text-gradient-primary">pricing that scales.</span>
            </h2>
            <p className="text-gray-500 mb-8 text-base font-normal">No hidden fees. Cancel anytime.</p>

            {/* Toggle */}
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
              {(["monthly", "annually"] as Cycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${cycle === c ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {c === "monthly" ? "Monthly" : "Annual"}
                  {c === "annually" && (
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">−20%</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const isPro = plan.id === "pro";
            const price = cycle === "annually" ? plan.annually : plan.monthly;
            return (
              <ScrollReveal key={plan.id} variant="fade-up" delay={i * 80}>
                <div className={`relative flex flex-col h-full rounded-3xl p-8 transition-all duration-300 ${isPro ? "bg-[#1A1A2E] text-white shadow-[0_24px_60px_rgba(26,26,46,0.2)] scale-[1.02]" : "bg-white border border-gray-100 shadow-sm hover:shadow-md"}`}>

                  {isPro && plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                        <Zap className="w-3 h-3" /> {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className={`text-base font-bold mb-1 ${isPro ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <p className={`text-xs font-medium mb-6 ${isPro ? "text-white/50" : "text-gray-400"}`}>{plan.desc}</p>

                  {/* Price */}
                  <div className={`flex items-baseline gap-1 mb-6 pb-6 border-b ${isPro ? "border-white/10" : "border-gray-100"}`}>
                    <span className={`text-5xl font-black tracking-tight ${isPro ? "text-white" : "text-gray-900"}`}>
                      ${price}
                    </span>
                    <span className={`text-sm font-medium ${isPro ? "text-white/50" : "text-gray-400"}`}>/mo</span>
                    {cycle === "annually" && plan.monthly > 0 && (
                      <span className={`text-xs line-through ml-1 ${isPro ? "text-white/30" : "text-gray-300"}`}>${plan.monthly}</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className={`flex items-center gap-2.5 text-sm font-medium ${f.ok ? (isPro ? "text-white/80" : "text-gray-600") : "text-gray-300 line-through"}`}>
                        {f.ok ? (
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPro ? "bg-white/10" : "bg-emerald-50"}`}>
                            <Check className={`w-3 h-3 stroke-[3] ${isPro ? "text-emerald-400" : "text-emerald-500"}`} />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <span className="text-gray-300 text-[10px]">✕</span>
                          </span>
                        )}
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isPro ? (
                    <Link href="/auth?mode=register" className="btn-blue w-full justify-center py-3.5 text-sm">
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link href="/auth?mode=register" className="btn-outline w-full justify-center py-3.5 text-sm">
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
