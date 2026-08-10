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
    <section id="faq" className="py-28 bg-[#FAFAFC] text-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left sticky heading */}
          <ScrollReveal variant="fade-right" delay={0}>
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6 w-fit">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 mb-5 tracking-tight leading-tight font-display">
                Common<br />questions,<br />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">answered.</span>
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed font-semibold font-display mb-6">
                Can&apos;t find what you need? Reach us at{" "}
                <a href="mailto:usamaakbarjaatt@gmail.com" className="text-zinc-900 hover:text-indigo-650 hover:text-indigo-600 font-bold transition-colors">
                  usamaakbarjaatt@gmail.com
                </a>
              </p>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
            </div>
          </ScrollReveal>

          {/* Right FAQ list */}
          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = active === i;
              return (
                <ScrollReveal key={i} variant="fade-up" delay={i * 50}>
                  <div className={`bg-white border border-zinc-200 rounded-3xl overflow-hidden transition-all duration-300 shadow-md shadow-zinc-200/15 ${isOpen ? "border-indigo-600 bg-indigo-50/20 shadow-lg shadow-zinc-200/20 scale-[1.01]" : ""}`}>
                    <button
                      onClick={() => setActive(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer animate-fade-in"
                    >
                      <span className={`text-sm transition-colors duration-200 pr-4 font-display ${isOpen ? "text-indigo-650 text-indigo-650 text-indigo-600 font-extrabold" : "text-zinc-900 font-bold"}`}>
                        {faq.q}
                      </span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-indigo-600 text-white" : "bg-zinc-550 bg-zinc-50 text-zinc-500 border border-zinc-200"}`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-350 ease-in-out ${isOpen ? "max-h-52" : "max-h-0"}`}>
                      <p className="px-5 pb-5 text-sm text-zinc-550 text-zinc-500 leading-relaxed font-semibold font-display">
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
