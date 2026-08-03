"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-[#060A14] relative z-10 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-grid opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal variant="scale-in" delay={100} duration={900}>
          {/* Outer gradient border */}
          <div className="p-[1px] rounded-[32px] bg-gradient-to-br from-blue-500/40 via-violet-500/20 to-blue-500/30 shadow-[0_0_80px_rgba(79,110,247,0.2)]">
            <div className="relative rounded-[31px] bg-[#080E20] text-white overflow-hidden">

              {/* Aurora animated blobs inside the card */}
              <div className="absolute top-[-40%] left-[-20%] w-[60%] h-[120%] bg-gradient-to-br from-blue-600/20 to-violet-600/10 rounded-full filter blur-[80px] animate-pulse-slow pointer-events-none" />
              <div className="absolute bottom-[-40%] right-[-15%] w-[55%] h-[120%] bg-gradient-to-tl from-indigo-600/15 to-cyan-600/8 rounded-full filter blur-[80px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "4s" }} />

              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

              <div className="relative z-10 px-10 py-16 sm:px-14 sm:py-20 md:px-20 md:py-24 flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-widest text-blue-300 uppercase mb-8 shimmer-badge">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Start optimizing today
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-7 leading-[1.06]">
                  Ready to maximize your{" "}
                  <span className="text-gradient">placement metrics?</span>
                </h2>

                {/* Sub */}
                <p className="text-sm sm:text-base text-[#7A8BA8] mb-12 max-w-lg font-normal leading-relaxed">
                  Join thousands of candidates drafting parser-ready resumes, logging due pipelines, and landing top product roles.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                  <Link
                    href="/auth?mode=register"
                    className="btn-glow px-10 py-4 text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto group"
                  >
                    <Zap className="w-4 h-4" />
                    Build Your Resume Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/auth"
                    className="btn-ghost px-10 py-4 text-sm font-semibold flex items-center justify-center w-full sm:w-auto"
                  >
                    Sign In to Workspace
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2 mt-10 text-xs text-[#3A4F6A]">
                  <span className="flex -space-x-1.5">
                    {["MA", "SM", "DC"].map((initials) => (
                      <span key={initials} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 border-2 border-[#080E20] flex items-center justify-center text-[7px] font-black text-blue-300">
                        {initials}
                      </span>
                    ))}
                  </span>
                  <span>Joined by 5,000+ engineers this month</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
