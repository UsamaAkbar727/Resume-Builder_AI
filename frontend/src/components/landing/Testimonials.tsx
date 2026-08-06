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
  {
    name: "Elena Rostova", role: "Frontend Engineer", company: "Vercel",
    text: "The responsive developer portfolio saved me hours of code. I customized it in the templates dashboard, connected my domain, and got hired by Vercel. My portfolio stood out immediately.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80",
    tag: "Portfolio Builder", tagColor: "badge-red",
  },
];

const companyColors: Record<string, string> = {
  Stripe: "#635BFF",
  Linear: "#5E6AD2",
  Notion: "#000000",
  Vercel: "#000000",
};

const stepThemes = [
  { num: "01", stepLabel: "STEP", color: "bg-[#047857]", darkColor: "bg-[#064e3b]", textCol: "text-[#047857]" }, // Green
  { num: "02", stepLabel: "STEP", color: "bg-[#D97706]", darkColor: "bg-[#78350f]", textCol: "text-[#D97706]" }, // Orange
  { num: "03", stepLabel: "STEP", color: "bg-[#2563EB]", darkColor: "bg-[#1e3a8a]", textCol: "text-[#2563EB]" }, // Blue
  { num: "04", stepLabel: "STEP", color: "bg-[#DC2626]", darkColor: "bg-[#7f1d1d]", textCol: "text-[#DC2626]" }, // Red
];

export default function Testimonials() {
  const renderCard = (t: typeof testimonials[0]) => {
    return (
      <div className="bg-white border border-stone-250 p-6 sm:p-8 rounded-3xl flex flex-col gap-4 shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-md mx-auto text-left relative z-10">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-0.5">
              {[...Array(t.stars)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600">
              {t.tag}
            </span>
          </div>
          <Quote className="w-6 h-6 text-stone-100 fill-stone-100 mb-2" />
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.text}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-stone-150 mt-auto">
          <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-stone-200" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-xs font-black text-stone-900 truncate">{t.name}</p>
              <BadgeCheck className="w-3.5 h-3.5 text-[#67B0A7] shrink-0" />
            </div>
            <p className="text-[10px] text-stone-500 font-semibold">{t.role}</p>
          </div>
          <span
            className="text-[9px] font-black px-2 py-0.5 rounded text-white shrink-0"
            style={{ background: companyColors[t.company] || "#000" }}
          >
            {t.company}
          </span>
        </div>
      </div>
    );
  };

  const renderInfo = (t: typeof testimonials[0], theme: typeof stepThemes[0], isRight: boolean) => {
    return (
      <div className={`max-w-xs py-4 ${isRight ? "text-left pl-8" : "text-right pr-8 ml-auto"}`}>
        <span
          className="text-[9px] font-black uppercase px-2.5 py-1 rounded border inline-block"
          style={{
            color: theme.textCol.replace("text-[", "").replace("]", ""),
            backgroundColor: `${theme.textCol.replace("text-[", "").replace("]", "")}10`,
            borderColor: `${theme.textCol.replace("text-[", "").replace("]", "")}30`
          }}
        >
          {t.company} Offer Loop
        </span>
        <h4 className="text-sm font-black text-stone-900 mt-2.5">{t.name}</h4>
        <p className="text-[11px] text-stone-500 mt-1 leading-normal font-medium">
          Secured {t.role} role at {t.company} using our AI {t.tag} engine.
        </p>
      </div>
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2EC] text-stone-900 relative z-10 border-t border-stone-200/90 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header — left aligned */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <ScrollReveal variant="fade-up" delay={0}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-300 text-xs font-black uppercase tracking-widest border border-stone-850 shadow-md mb-6 w-fit">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                CANDIDATE TESTIMONIALS
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                What candidates say<br />
                <span className="text-[#E87A36]">after landing their dream role</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="flex items-center gap-3 shrink-0 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <div>
                <p className="text-sm font-black text-stone-900">4.9 / 5.0</p>
                <p className="text-xs text-stone-500">from 5,000+ reviews</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── VERTICAL FOLDED RIBBON INFOGRAPHIC TIMELINE ── */}
        <div className="relative my-8 space-y-16">
          
          {/* Vertical Center Connecting Shadow Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-stone-300/40 -translate-x-1/2 hidden md:block z-0" />

          {testimonials.map((t, i) => {
            const isOdd = i % 2 === 0;
            const theme = stepThemes[i];

            return (
              <ScrollReveal key={t.name} variant="fade-up" delay={i * 100}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0 items-center relative">
                  
                  {/* Left Column (Odd: Card, Even: Info) */}
                  <div className={`order-2 md:order-1 ${isOdd ? "block" : "hidden md:block"}`}>
                    {isOdd ? renderCard(t) : renderInfo(t, theme, false)}
                  </div>

                  {/* Center Folded Ribbon Column */}
                  <div className="order-1 md:order-2 flex justify-center z-10">
                    <div className="relative flex flex-col items-center justify-center select-none shrink-0">
                      
                      {/* Tilted vertical main ribbon container */}
                      <div className={`w-14 h-24 ${theme.color} text-white flex flex-col items-center justify-center font-black relative shadow-2xl z-20 ${
                        isOdd ? "transform -skew-y-12" : "transform skew-y-12"
                      }`}>
                        
                        {/* Upright text inside skewed ribbon */}
                        <div className={`flex flex-col items-center ${isOdd ? "transform skew-y-12" : "transform -skew-y-12"}`}>
                          <span className="text-xl font-black leading-none">{theme.num}</span>
                          <span className="text-[7.5px] font-black uppercase tracking-wider mt-1">{theme.stepLabel}</span>
                        </div>

                        {/* Ribbon Fold-back dark 3D triangles */}
                        {isOdd ? (
                          <>
                            {/* Fold back at bottom-left */}
                            <div className={`absolute bottom-[-6px] left-0 w-3 h-1.5 ${theme.darkColor} transform skew-y-12 origin-top-left`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                            {/* Fold back at top-right */}
                            <div className={`absolute top-[-6px] right-0 w-3 h-1.5 ${theme.darkColor} transform skew-y-12 origin-bottom-right`} style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                          </>
                        ) : (
                          <>
                            {/* Fold back at bottom-right */}
                            <div className={`absolute bottom-[-6px] right-0 w-3 h-1.5 ${theme.darkColor} transform -skew-y-12 origin-top-right`} style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                            {/* Fold back at top-left */}
                            <div className={`absolute top-[-6px] left-0 w-3 h-1.5 ${theme.darkColor} transform -skew-y-12 origin-bottom-left`} style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Odd: Info, Even: Card) */}
                  <div className={`order-3 ${isOdd ? "hidden md:block" : "block"}`}>
                    {isOdd ? renderInfo(t, theme, true) : renderCard(t)}
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
