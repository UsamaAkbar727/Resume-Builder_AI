"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { ScrollReveal } from "./Animations";

const proof = [
  "No credit card required",
  "10,000+ hired candidates",
  "ATS-optimised templates",
];

export default function CTA() {
  return (
    <section className="py-24 bg-[#100D24] relative z-10 overflow-hidden">

      {/* Decorative glows */}
      <div className="cta-dark-glow-1" />
      <div className="cta-dark-glow-2" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 footer-grid opacity-100 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">

        <ScrollReveal variant="fade-up" delay={0}>
          <div className="text-center space-y-6">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] text-indigo-300 text-xs font-black uppercase tracking-widest border border-white/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              GET STARTED TODAY
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display">
              Ready to get{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                hired today?
              </span>
            </h2>

            {/* Sub-copy */}
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mx-auto font-display">
              Join over 10,000+ candidates who used ResumeFlow AI to bypass automated filters and secure interview loops at tier-1 tech firms.
            </p>

            {/* Social proof pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {proof.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-indigo-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/auth?mode=register"
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm flex items-center gap-2 shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] transition-all cursor-pointer font-display"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#templates"
                className="px-9 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer font-display"
              >
                View Gallery
              </Link>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
