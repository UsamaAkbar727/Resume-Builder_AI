"use client";
import React from "react";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { ScrollReveal } from "./Animations";

const testimonials = [
  {
    name: "Marcus Aurelius", role: "Sr. Software Engineer", company: "Stripe",
    text: "The ATS checker is unmatched. I edited my resume's keyword density following the AI suggestions, and landed interviews at Stripe and Vercel within two weeks. Absolutely game-changing.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
    tag: "ATS Checker", tagColor: "badge-blue",
  },
  {
    name: "Sophia Martinez", role: "Product Designer", company: "Linear",
    text: "The Notion-style resume editor feels so premium. And the Kanban board helped me stay sane while managing 40+ active applications simultaneously. I wouldn't use anything else.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    tag: "Resume Builder", tagColor: "badge-purple",
  },
  {
    name: "David Chen", role: "Lead Developer", company: "Notion",
    text: "The AI Interview Coach flagged that I was using 'um' every 8 seconds. After two weeks of practice sessions, my filler word count dropped 80%. Secured my Notion offer. Unreal tool.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
    tag: "Interview Coach", tagColor: "badge-green",
  },
];

const companyColors: Record<string, string> = {
  Stripe: "#635BFF",
  Linear: "#5E6AD2",
  Notion: "#000000",
};

export default function Testimonials() {
  return (
    <section className="py-28 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header — left aligned */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal variant="fade-up" delay={0}>
            <div>
              <span className="eyebrow text-violet-600 block mb-3">Real Results</span>
              <h2 className="display-md text-gray-900">
                What candidates say<br />
                <span className="text-gradient-warm">after landing their dream role</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">4.9 / 5.0</p>
                <p className="text-xs text-gray-400">from 5,000+ reviews</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Cards — alternating sizes (masonry feel) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} variant="fade-up" delay={i * 100}>
              <div className={`card p-8 flex flex-col gap-6 h-full ${i === 1 ? "md:mt-8" : ""}`}>
                {/* Quote + stars */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className={`badge ${t.tagColor}`}>{t.tag}</span>
                  </div>
                  <Quote className="w-8 h-8 text-gray-100 fill-gray-100 mb-3" />
                  <p className="text-gray-600 text-[15px] leading-relaxed font-normal">
                    {t.text}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
                      <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                  </div>
                  <span
                    className="text-[11px] font-black px-2.5 py-1 rounded-lg text-white shrink-0"
                    style={{ background: companyColors[t.company] }}
                  >
                    {t.company}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
