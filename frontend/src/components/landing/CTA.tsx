"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CTA() {
  return (
    <section className="py-20 bg-[#06060c] relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Banner Card */}
        <ScrollReveal variant="scale-in" delay={100}>
          <div className="bg-zinc-900/60 text-white rounded-[32px] p-8 sm:p-16 relative overflow-hidden shadow-2xl border border-zinc-850">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 filter blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-violet-500/10 filter blur-[85px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              {/* Content left */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black uppercase tracking-widest border border-indigo-500/20 shadow-xl mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  GET STARTED TODAY
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-display">
                  Ready to get <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">hired today?</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-medium">
                  Join over 10,000+ candidates who used ResumeFlow AI to bypass automated filters and secure interview loops at tier-1 tech firms.
                </p>
              </div>

              {/* Action right */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 items-center justify-end w-full">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer w-full sm:w-auto text-center font-display"
                >
                  Create Account <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="#templates"
                  className="px-8 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer w-full sm:w-auto text-center font-display"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
