"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI Resume Analyzer score my resume?",
      a: "Our parser runs keyword coverage overlays, reads structural density, evaluates section tags, and tests readability ratings exactly like corporate applicant tracking systems (Greenhouse, Workday, etc.), showing precise bullet improvements."
    },
    {
      q: "Can I export my resume back to PDF and DOCX format?",
      a: "Yes. All resumes compile to printer-ready, margins-tested PDF documents that preserve styling boundaries and compile clean raw text data for tracking parser bots."
    },
    {
      q: "What is the AI Voice Mock Interview tool?",
      a: "It is an interactive audio practice sandbox. The browser reads situational mock queries, activates your microphone to record response files, and grades verbal speech pace, pronunciation acoustics, and filler word flags."
    },
    {
      q: "Does it support custom domains for the portfolio website?",
      a: "Yes. Pro and Enterprise members can host personal portfolio portals synced directly to their resume data, using custom domains with simple DNS configs."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-3 mb-2">
              Everything you need to know
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Find fast answers regarding resume optimization, voice graders, and hosting capabilities.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 50}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl hover:border-slate-350 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-800 focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                
                {/* Smooth transition container */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[200px] border-t border-slate-200/50" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <p className="p-5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed bg-white rounded-b-2xl">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
