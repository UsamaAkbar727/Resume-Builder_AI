"use client";

import React from "react";
import { Star, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus Aurelius",
      role: "Senior Software Engineer",
      company: "Stripe",
      text: "The ATS checker is unmatched. I edited my resume keywords density following the suggestions, ran scans, and landed interviews at Stripe and Vercel. Highly recommended!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Sophia Martinez",
      role: "Product Designer",
      company: "Linear",
      text: "I loved the Notion-style template. It felt extremely polished and clean. The Kanban board helped me track 40+ job pipelines without going crazy. Super happy with it.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "David Chen",
      role: "Lead Developer",
      company: "Notion",
      text: "The Mock Interview Coach voice acoustics grader is a game-changer. It caught my pacing issues and filler word habits. Secured my offer with Notion. Unbelievable tool.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
              Candidate Success Reviews
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-3 mb-2">
              Loved by engineers and designers
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Read how candidates land roles at top product organizations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <ScrollReveal
              key={t.name}
              variant="fade-up"
              delay={idx * 100}
              className="bg-slate-50/50 border border-slate-100 hover:border-blue-500/10 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)]"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-0" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 italic leading-relaxed mb-8">
                  "{t.text}"
                </p>
              </div>

              {/* User Identity info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {t.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" title="Verified Customer" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    {t.role} @ <span className="text-slate-600">{t.company}</span>
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
