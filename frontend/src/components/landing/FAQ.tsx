"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "./Animations";

const faqs = [
  { q: "How does the AI Resume Analyzer score my resume?", a: "Our parser runs keyword coverage overlays, reads structural density, evaluates section tags, and tests readability ratings exactly like corporate ATS systems (Greenhouse, Workday), showing precise bullet-by-bullet improvements." },
  { q: "Can I export my resume to PDF and DOCX?", a: "Yes. All resumes compile to printer-ready, margins-tested PDF documents that preserve your styling, and clean raw text DOCX files optimized for parsing bots." },
  { q: "What is the AI Voice Mock Interview tool?", a: "An interactive audio practice sandbox. It reads situational mock queries, activates your microphone, records responses, and grades verbal speech pace, pronunciation acoustics, and filler word flags in real time." },
  { q: "Does it support custom domains for the portfolio?", a: "Yes. Pro and Enterprise members can deploy personal portfolio websites synced to their resume data, using custom domains with a simple DNS CNAME record setup." },
  { q: "Is my data secure?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell or share your data with third parties, and you can permanently delete your account and all data at any time." },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#F5F2EC] text-stone-900 relative z-10 border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left sticky heading */}
          <ScrollReveal variant="fade-right" delay={0}>
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-300 text-xs font-black uppercase tracking-widest border border-stone-850 shadow-md mb-6 w-fit">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-stone-900 mb-5 tracking-tight leading-tight">
                Common<br />questions,<br />
                <span className="text-[#E87A36]">answered.</span>
              </h2>
              <p className="text-stone-550 text-stone-500 text-sm leading-relaxed font-medium mb-6">
                Can&apos;t find what you need? Reach us at{" "}
                <a href="mailto:hello@resumeflow.ai" className="text-stone-900 font-black hover:underline">
                  hello@resumeflow.ai
                </a>
              </p>
              <div className="w-12 h-1 rounded-full bg-[#E87A36]" />
            </div>
          </ScrollReveal>

          {/* Right FAQ list */}
          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = active === i;
              return (
                <ScrollReveal key={i} variant="fade-up" delay={i * 50}>
                  <div className={`bg-white border border-stone-250 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm ${isOpen ? "border-[#67B0A7] bg-[#67B0A7]/5 shadow-md scale-[1.01]" : ""}`}>
                    <button
                      onClick={() => setActive(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <span className={`text-sm transition-colors duration-200 pr-4 ${isOpen ? "text-[#67B0A7] font-black" : "text-stone-800 font-black"}`}>
                        {faq.q}
                      </span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-[#67B0A7] text-white" : "bg-stone-100 text-stone-500 border border-stone-200"}`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-350 ease-in-out ${isOpen ? "max-h-52" : "max-h-0"}`}>
                      <p className="px-5 pb-5 text-sm text-stone-605 text-stone-600 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
