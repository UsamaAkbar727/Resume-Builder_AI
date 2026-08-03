"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "./Animations";

const perks = [
  "No credit card required",
  "Free forever plan",
  "Cancel anytime",
  "ATS-tested templates",
];

export default function CTA() {
  return (
    <section className="py-24 bg-gray-50 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <ScrollReveal variant="scale-in" delay={0} duration={800}>
          <div className="relative rounded-[32px] bg-[#1A1A2E] text-white overflow-hidden">

            {/* Decorative blob lights inside */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center px-10 py-16 sm:px-14 sm:py-20 md:px-20">

              {/* Left */}
              <div>
                <span className="badge badge-blue mb-6 inline-flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                  </span>
                  Start building today — it&apos;s free
                </span>
                <h2 className="display-lg text-white mb-5 leading-tight">
                  Ready to land your<br />
                  <span className="text-gradient-cool">dream offer?</span>
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md font-normal">
                  Join 5,000+ engineers and designers who use ResumeFlow AI to build sharper resumes, track applications, and ace interviews.
                </p>
                <div className="flex flex-wrap gap-3">
                  {perks.map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — CTA buttons + mini stats */}
              <div className="flex flex-col gap-4 lg:items-end">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href="/auth?mode=register"
                    className="btn-blue px-8 py-4 text-sm w-full sm:w-auto justify-center"
                  >
                    Build my resume free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/auth"
                    className="btn-outline bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 px-8 py-4 text-sm w-full sm:w-auto justify-center"
                  >
                    Sign in
                  </Link>
                </div>

                {/* Mini stat pills */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3">
                    <span className="text-2xl font-black text-white">95<span className="text-sm">%</span></span>
                    <span className="text-[11px] text-white/40 font-medium leading-tight">ATS<br />pass rate</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3">
                    <span className="text-2xl font-black text-white">500K<span className="text-sm">+</span></span>
                    <span className="text-[11px] text-white/40 font-medium leading-tight">Resumes<br />built</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3">
                    <span className="text-2xl font-black text-white">4.9<span className="text-sm">★</span></span>
                    <span className="text-[11px] text-white/40 font-medium leading-tight">User<br />rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
