"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CTA() {
  return (
    <section className="py-20 bg-[#F5F2EC] relative z-10 border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Banner Card */}
        <ScrollReveal variant="scale-in" delay={100}>
          <div className="bg-zinc-950 text-white rounded-[32px] p-8 sm:p-16 relative overflow-hidden shadow-2xl border border-zinc-850">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#E87A36]/10 filter blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#67B0A7]/10 filter blur-[85px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              {/* Content left */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/90 text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-400/40 shadow-xl mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  GET STARTED TODAY
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Ready to get <span className="text-amber-400">hired today?</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-medium">
                  Join over 10,000+ candidates who used ResumeFlow AI to bypass automated filters and secure interview loops at tier-1 tech firms.
                </p>
              </div>

              {/* Action right */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 items-center justify-end w-full">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer w-full sm:w-auto text-center"
                >
                  Create Account <ArrowRight className="w-4 h-4 text-black" />
                </Link>
                <Link
                  href="#templates"
                  className="px-8 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-850 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer w-full sm:w-auto text-center"
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
