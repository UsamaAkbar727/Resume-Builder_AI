"use client";

import React, { useState } from "react";
import { Globe, Smartphone, Monitor, ShieldCheck, Check, Link2 } from "lucide-react";
import { ScrollReveal } from "./Animations";

export default function PortfolioShowcase() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [domainInput, setDomainInput] = useState("jenkins.dev");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput) return;
    setIsConnecting(true);
    setIsConnected(false);

    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1200);
  };

  return (
    <section id="portfolio-builder" className="py-24 bg-[#fbfbfc] text-zinc-900 relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mockup Showcase Browser wrapper */}
          <div className="lg:col-span-7 flex flex-col items-center select-none w-full">
            
            {/* Viewport switchers & Domain toolbar */}
            <ScrollReveal variant="scale-in" delay={100} className="w-full flex justify-between items-center bg-white border border-zinc-200 p-3 rounded-2xl mb-6 shadow-xl shadow-zinc-200/25 gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === "desktop" ? "bg-white text-indigo-600 border border-zinc-200 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === "mobile" ? "bg-white text-indigo-600 border border-zinc-200 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>

              {/* Domain Input Form */}
              <form onSubmit={handleConnectDomain} className="flex gap-2 items-center flex-1 max-w-[280px] font-display">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="customdomain.com"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-750 hover:to-violet-750 text-white text-[10px] font-bold uppercase rounded-xl shadow-md shrink-0 cursor-pointer transition-colors"
                >
                  {isConnecting ? "Validating..." : isConnected ? "Active" : "Connect"}
                </button>
              </form>
            </ScrollReveal>

            {/* Browser Window Wrapper */}
            <ScrollReveal
              variant="scale-in"
              delay={200}
              className={`border border-zinc-200 rounded-3xl bg-white shadow-xl shadow-zinc-250/20 overflow-hidden transition-all duration-500 ${
                viewMode === "desktop" ? "w-full max-w-[620px]" : "w-[300px]"
              }`}
            >
              {/* Browser Address Bar Header */}
              <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2 flex items-center gap-4">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <div className="flex-1 bg-white border border-zinc-200 rounded-md py-1 px-3 text-[9px] font-semibold text-zinc-500 truncate text-center select-all">
                  https://{isConnected ? domainInput : "sarahjenkins.resumeflow.me"}
                </div>
              </div>

              {/* Portfolio Page mockup layout content */}
              <div className="p-5 sm:p-7 bg-zinc-50 text-zinc-700 min-h-[300px] flex flex-col justify-between text-left rounded-b-[22px]">
                {/* Hero header */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-zinc-900">S.J</span>
                    <span className="text-[8px] font-black text-indigo-600 uppercase tracking-wider font-display">Available for work</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-zinc-900 leading-tight mb-2 font-display">
                    Sarah Jenkins • Senior Developer
                  </h3>
                  <p className="text-[9px] text-zinc-500 leading-relaxed max-w-[280px]">
                    I build accessible software systems handling scales and payments. Experience leading product development at Notion and Stripe.
                  </p>
                </div>

                {/* Project items display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                    <h4 className="text-[9px] font-black text-zinc-900">Developer Portfolio Host</h4>
                    <p className="text-[8px] text-zinc-500 mt-1 leading-normal">
                      Dynamic React builder compiling resume profiles to CDN DNS targets.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                    <h4 className="text-[9px] font-black text-zinc-900">Checkout Optimizations</h4>
                    <p className="text-[8px] text-zinc-500 mt-1 leading-normal">
                      Decreased payment latency bottlenecks by 22% in Stripe microservices.
                    </p>
                  </div>
                </div>

                {/* Footer branding */}
                <div className="pt-3 border-t border-zinc-200/80 flex justify-between text-[7px] text-zinc-400 uppercase font-bold tracking-wider">
                  <span>© 2026 Sarah Jenkins</span>
                  <span>Made with ResumeFlow</span>
                </div>
              </div>

            </ScrollReveal>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 text-left font-display">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
                <Globe className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                PORTFOLIO BUILDER & HOSTING
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
                Instantly deploy a professional portfolio
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-semibold mb-6">
                Your resume data is an API. With one click, compile it into a stunning, host-ready personal portfolio website. Connect custom DNS domains and select responsive layouts.
              </p>
            </ScrollReveal>

            {/* Custom domain feedback alert */}
            {isConnected && (
              <ScrollReveal variant="fade-up" className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 mt-4 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-black text-emerald-700 uppercase tracking-wider font-display">Domain Configured!</h5>
                  <p className="text-xs text-zinc-600 leading-normal font-semibold">
                    DNS registers check out. Your developer portfolio is live at <a href={`https://${domainInput}`} target="_blank" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">{domainInput}</a>.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
