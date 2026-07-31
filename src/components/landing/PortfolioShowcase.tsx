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
    <section id="portfolio-builder" className="py-24 bg-slate-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mockup Showcase Browser wrapper */}
          <div className="lg:col-span-7 flex flex-col items-center select-none w-full">
            
            {/* Viewport switchers & Domain toolbar */}
            <ScrollReveal variant="scale-in" delay={100} className="w-full flex justify-between items-center bg-white border border-slate-200 p-3 rounded-2xl mb-6 shadow-xs gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-50 border p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === "desktop" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === "mobile" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>

              {/* Domain Input Form */}
              <form onSubmit={handleConnectDomain} className="flex gap-2 items-center flex-1 max-w-[280px]">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="customdomain.com"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-slate-800 shadow-xs shrink-0 cursor-pointer"
                >
                  {isConnecting ? "Validating..." : isConnected ? "Active" : "Connect"}
                </button>
              </form>
            </ScrollReveal>

            {/* Browser Window Wrapper */}
            <ScrollReveal
              variant="scale-in"
              delay={200}
              className={`border border-slate-300 rounded-3xl bg-white shadow-2xl overflow-hidden transition-all duration-500 ${
                viewMode === "desktop" ? "w-full max-w-[620px]" : "w-[300px]"
              }`}
            >
              {/* Browser Address Bar Header */}
              <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-2 flex items-center gap-4">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <div className="flex-1 bg-white border border-slate-200/70 rounded-md py-1 px-3 text-[9px] font-medium text-slate-400 truncate text-center select-all">
                  https://{isConnected ? domainInput : "sarahjenkins.resumeflow.me"}
                </div>
              </div>

              {/* Portfolio Page mockup layout content */}
              <div className="p-5 sm:p-7 bg-[#FCFDFE] text-slate-800 min-h-[300px] flex flex-col justify-between text-left">
                {/* Hero header */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-slate-900">S.J</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Available for work</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight mb-2">
                    Sarah Jenkins • Senior Developer
                  </h3>
                  <p className="text-[9px] text-slate-500 leading-relaxed max-w-[280px]">
                    I build accessible software systems handling scales and payments. Experience leading product development at Notion and Stripe.
                  </p>
                </div>

                {/* Project items display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <h4 className="text-[9px] font-bold text-slate-900">Developer Portfolio Host</h4>
                    <p className="text-[8px] text-slate-400 mt-1 leading-normal">
                      Dynamic React builder compiling resume profiles to CDN DNS targets.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <h4 className="text-[9px] font-bold text-slate-900">Checkout Optimizations</h4>
                    <p className="text-[8px] text-slate-400 mt-1 leading-normal">
                      Decreased payment latency bottlenecks by 22% in Stripe microservices.
                    </p>
                  </div>
                </div>

                {/* Footer branding */}
                <div className="pt-3 border-t border-slate-100 flex justify-between text-[7px] text-slate-400 uppercase font-bold tracking-wider">
                  <span>© 2026 Sarah Jenkins</span>
                  <span>Made with ResumeFlow</span>
                </div>
              </div>

            </ScrollReveal>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 text-left">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-200 flex items-center justify-center text-rose-600 mb-6 shadow-xs">
                <Globe className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 leading-tight">
                Instantly deploy a professional portfolio
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium mb-6">
                Your resume data is an API. With one click, compile it into a stunning, host-ready personal portfolio website. Connect custom DNS domains and select responsive layouts.
              </p>
            </ScrollReveal>

            {/* Custom domain feedback alert */}
            {isConnected && (
              <ScrollReveal variant="fade-up" className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 mt-4 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Domain Configured!</h5>
                  <p className="text-xs text-emerald-700 leading-normal font-semibold">
                    DNS registers check out. Your developer portfolio is live at <a href={`https://${domainInput}`} target="_blank" className="underline">{domainInput}</a>.
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
