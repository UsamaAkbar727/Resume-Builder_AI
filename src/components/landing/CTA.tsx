"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-slate-50 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="scale-in" delay={100} duration={850}>
          {/* Main Card with Deep Blue Gradient Background */}
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-750 via-slate-900 to-indigo-900 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-white/10 text-center">
            
            {/* Glowing shapes inside card */}
            <div className="absolute top-[-30%] left-[-20%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-30%] right-[-20%] w-[45vw] h-[45vw] bg-indigo-600/15 rounded-full filter blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-6 border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Start optimizing today
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Ready to maximize your placement metrics?
              </h2>

              {/* Sub */}
              <p className="text-sm sm:text-base text-blue-100/80 mb-10 max-w-xl font-normal leading-relaxed">
                Join thousands of candidates drafting parser-ready resumes, logging due pipelines, and landing top product roles.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <Link
                  href="/auth?mode=register"
                  className="px-8 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Build Your Resume Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/auth"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-colors w-full sm:w-auto text-center"
                >
                  Sign In to Workspace
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
