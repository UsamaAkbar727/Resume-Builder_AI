"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";
import { ScrollReveal } from "./Animations";

const testimonials = [
  {
    name: "Marcus Aurelius",
    role: "Senior Software Engineer",
    company: "Stripe",
    text: "The ATS checker is unmatched. I edited my resume keywords following the suggestions, ran scans, and landed interviews at Stripe and Vercel. Highly recommended!",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
    accentColor: "from-blue-500/30 to-violet-500/20",
    borderHover: "hover:border-blue-500/25",
    badgeColor: "text-blue-300 bg-blue-500/[0.08] border-blue-500/20",
  },
  {
    name: "Sophia Martinez",
    role: "Product Designer",
    company: "Linear",
    text: "I loved the Notion-style template. It felt extremely polished and clean. The Kanban board helped me track 40+ job pipelines without going crazy. Super happy!",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    accentColor: "from-violet-500/30 to-pink-500/20",
    borderHover: "hover:border-violet-500/25",
    badgeColor: "text-violet-300 bg-violet-500/[0.08] border-violet-500/20",
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    company: "Notion",
    text: "The Mock Interview Coach voice acoustics grader is a game-changer. It caught my pacing issues and filler word habits. Secured my offer at Notion. Unbelievable tool.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    accentColor: "from-emerald-500/25 to-cyan-500/15",
    borderHover: "hover:border-emerald-500/25",
    badgeColor: "text-emerald-300 bg-emerald-500/[0.08] border-emerald-500/20",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#060A14] relative z-10 border-t border-white/[0.05] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] orb orb-violet opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] orb orb-blue opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] text-[11px] font-bold text-[#7A8BA8] uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Candidate Success Reviews
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4">
              Loved by engineers{" "}
              <span className="text-gradient">& designers</span>
            </h2>
            <p className="text-sm text-[#7A8BA8] font-normal">
              Read how candidates land roles at top product organizations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <ScrollReveal
              key={t.name}
              variant="fade-up"
              delay={idx * 120}
              className={`luxury-card p-8 flex flex-col justify-between border border-white/[0.06] ${t.borderHover} group relative overflow-hidden`}
            >
              {/* Top gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div>
                {/* Quote icon */}
                <div className="mb-5">
                  <Quote className="w-8 h-8 text-white/[0.06] fill-white/[0.04]" />
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                <p className="text-sm text-[#9AACCC] leading-relaxed mb-8 italic font-normal">
                  &quot;{t.text}&quot;
                </p>
              </div>

              {/* User Identity */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/[0.06]">
                {/* Avatar with gradient ring */}
                <div className={`relative p-[2px] rounded-full bg-gradient-to-br ${t.accentColor}`}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#060A14]"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {t.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-[10px] text-[#7A8BA8] font-semibold mt-0.5">
                    {t.role} @{" "}
                    <span className={`font-black px-1.5 py-0.5 rounded-md border text-[9px] ${t.badgeColor}`}>
                      {t.company}
                    </span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
