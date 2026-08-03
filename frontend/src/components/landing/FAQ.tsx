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
    <section id="faq" className="py-28 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left sticky heading */}
          <ScrollReveal variant="fade-right" delay={0}>
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow text-blue-600 block mb-3">FAQ</span>
              <h2 className="display-md text-gray-900 mb-5">
                Common<br />questions,<br />
                <span className="text-gradient-primary">answered.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-normal mb-6">
                Can&apos;t find what you need? Reach us at{" "}
                <a href="mailto:hello@resumeflow.ai" className="text-blue-600 font-semibold hover:underline">
                  hello@resumeflow.ai
                </a>
              </p>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>
          </ScrollReveal>

          {/* Right FAQ list */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = active === i;
              return (
                <ScrollReveal key={i} variant="fade-up" delay={i * 50}>
                  <div className={`card-flat overflow-hidden transition-all duration-300 ${isOpen ? "border-blue-200 bg-blue-50/30 shadow-sm" : ""}`}>
                    <button
                      onClick={() => setActive(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <span className={`text-sm font-semibold transition-colors duration-200 pr-4 ${isOpen ? "text-blue-700" : "text-gray-800"}`}>
                        {faq.q}
                      </span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-350 ease-in-out ${isOpen ? "max-h-52" : "max-h-0"}`}>
                      <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed font-normal">
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
