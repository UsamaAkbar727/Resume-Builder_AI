"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "./Animations";

const faqs = [
  {
    q: "How does the AI Resume Analyzer score my resume?",
    a: "Our parser runs keyword coverage overlays, reads structural density, evaluates section tags, and tests readability ratings exactly like corporate applicant tracking systems (Greenhouse, Workday, etc.), showing precise bullet improvements.",
  },
  {
    q: "Can I export my resume back to PDF and DOCX format?",
    a: "Yes. All resumes compile to printer-ready, margins-tested PDF documents that preserve styling boundaries and compile clean raw text data for tracking parser bots.",
  },
  {
    q: "What is the AI Voice Mock Interview tool?",
    a: "It is an interactive audio practice sandbox. The browser reads situational mock queries, activates your microphone to record response files, and grades verbal speech pace, pronunciation acoustics, and filler word flags.",
  },
  {
    q: "Does it support custom domains for the portfolio website?",
    a: "Yes. Pro and Enterprise members can host personal portfolio portals synced directly to their resume data, using custom domains with simple DNS configs.",
  },
  {
    q: "Is my data secure and private?",
    a: "Absolutely. All data is encrypted at rest and in transit using AES-256 encryption. We never sell or share your data with third parties. You can delete your account and all associated data at any time.",
  },
];

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#060A14] relative z-10 border-t border-white/[0.05] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] orb orb-violet opacity-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] text-[11px] font-bold text-[#7A8BA8] uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4">
              Everything you need{" "}
              <span className="text-gradient">to know</span>
            </h2>
            <p className="text-sm text-[#7A8BA8] font-normal">
              Fast answers regarding optimization, voice graders, and hosting capabilities.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 60}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-blue-500/25 bg-[#0B1328] shadow-[0_0_25px_rgba(79,110,247,0.08)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-500/15 border border-blue-500/25"
                          : "bg-white/[0.04] border border-white/[0.07]"
                      }`}>
                        <HelpCircle className={`w-3.5 h-3.5 transition-colors duration-300 ${isOpen ? "text-blue-400" : "text-[#7A8BA8]"}`} />
                      </span>
                      <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-white" : "text-[#C4D4F0] group-hover:text-white"}`}>
                        {faq.q}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 ml-4 transition-all duration-300 ${
                        isOpen ? "rotate-180 text-blue-400" : "text-[#7A8BA8]"
                      }`}
                    />
                  </button>

                  {/* Smooth expand */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isOpen ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    {/* Left accent bar */}
                    <div className="px-5 pb-5 flex gap-4">
                      <div className="w-px bg-gradient-to-b from-blue-500/50 to-transparent ml-3 shrink-0" />
                      <p className="text-sm text-[#7A8BA8] font-normal leading-relaxed pl-2">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
