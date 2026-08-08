"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CTA() {
  return (
    <section className="py-20 bg-[#fbfbfc] relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Banner Card */}
        <ScrollReveal variant="scale-in" delay={100}>
          <div className="bg-white rounded-[32px] p-8 sm:p-16 relative overflow-hidden shadow-xl shadow-zinc-200/25 border border-zinc-200">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/2 filter blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-violet-500/2 filter blur-[85px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              {/* Content left */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-55 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-650 text-indigo-600" />
                  GET STARTED TODAY
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
                  Ready to get <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">hired today?</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-550 text-zinc-500 leading-relaxed max-w-xl font-semibold font-display">
                  Join over 10,000+ candidates who used ResumeFlow AI to bypass automated filters and secure interview loops at tier-1 tech firms.
                </p>
              </div>

              {/* Action right */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 items-center justify-end w-full">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-705 hover:to-violet-750 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/15 transition-all cursor-pointer w-full sm:w-auto text-center font-display"
                >
                  Create Account <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="#templates"
                  className="px-8 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-705 text-zinc-705 text-zinc-700 hover:text-zinc-900 font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer w-full sm:w-auto text-center font-display"
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
