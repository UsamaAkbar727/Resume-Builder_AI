"use client";

import React from "react";
import { ScrollReveal } from "./Animations";

export default function Logos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal variant="fade" delay={100} duration={800}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Trusted by candidates landing offers at leading tech companies
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200} duration={800}>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16 opacity-45 grayscale hover:opacity-75 transition-opacity duration-300">
            {/* Google */}
            <svg className="h-6 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.626 5.626 0 018.32 13a5.625 5.625 0 015.671-5.6 5.347 5.347 0 013.771 1.5l3.14-3.14A9.9 9.9 0 0013.99 3c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.768 0 9.58-4.053 9.58-9.75 0-.66-.06-1.29-.17-1.965H12.24z"/>
            </svg>

            {/* Meta */}
            <svg className="h-5 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M22.675 12c0-5.895-4.78-10.675-10.675-10.675S1.325 6.105 1.325 12c0 5.316 3.882 9.722 8.97 10.53V15.34H7.5V12h2.795v-2.5c0-2.753 1.678-4.275 4.15-4.275 1.183 0 2.2.088 2.5.127V8.25H15c-1.336 0-1.6.634-1.6 1.57V12h3.205l-.417 3.34h-2.788V22.5c5.053-.842 8.913-5.23 8.913-10.5M12 0C5.372 0 0 5.373 0 12c0 5.3 3.438 9.8 8.207 11.385.075-.157.14-.323.14-.492v-3.793H6.467v-3.34h1.88v-2.502c0-1.859 1.135-2.88 2.793-2.88.795 0 1.48.06 1.68.087v1.947H11.66c-.902 0-1.077.43-1.077 1.058V15.75h2.158l-.281 3.34h-1.877v4.305c.42.062.85.093 1.284.093 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0"/>
            </svg>

            {/* Stripe */}
            <svg className="h-6 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M13.922 8.577c0-.853.714-1.332 1.95-1.332 1.61 0 3.123.473 4.254 1.109l.863-3.692C19.78 4.015 17.848 3.5 15.688 3.5c-4.218 0-7.013 2.196-7.013 5.864 0 5.922 8.125 4.966 8.125 7.513 0 1.047-.936 1.528-2.222 1.528-1.928 0-3.722-.646-5.013-1.388l-.895 3.738C10.024 21.576 12.288 22 14.54 22c4.464 0 7.377-2.146 7.377-6.027 0-6.19-8.995-5.11-8.995-7.396M4.09 9.53h4.04V5.987H4.09V9.53zm0 8.483h4.04v-6.985H4.09v6.985z"/>
            </svg>

            {/* Vercel */}
            <svg className="h-5.5 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M24 22.525H0L12 1.475l12 21.05z"/>
            </svg>

            {/* Notion */}
            <svg className="h-6.5 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M4.568 2.052C3.12 2.196 2.052 3.12 2.052 4.568v14.864c0 1.448 1.068 2.376 2.516 2.516h14.864c1.448 0 2.376-1.068 2.516-2.516V4.568c0-1.448-1.068-2.376-2.516-2.516H4.568zm11.758 13.99c.307 0 .506-.118.506-.464V8.406l-3.21 4.512-2.122-3.155v5.81c0 .346.2.464.507.464h.708V17h-3.483v-.947h.708c.307 0 .507-.118.507-.464V9.663l-.707-.06V8.625h2.155l2.06 3.18 2.805-4.18H18.7v1.037l-.708.06v5.918c0 .346.2.464.507.464h.708V17H15.62v-.947h.707z"/>
            </svg>

            {/* Figma */}
            <svg className="h-6.5 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C9.238 2 7 4.239 7 7c0 1.706.853 3.212 2.155 4.12A5.004 5.004 0 007 15c0 2.761 2.238 5 5 5s5-2.239 5-5a5.004 5.004 0 00-2.155-3.88A4.996 4.996 0 0017 7c0-2.761-2.238-5-5-5zm-2.5 5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm0 8a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"/>
            </svg>

            {/* Linear (Clean triangle prism placeholder) */}
            <svg className="h-6 w-auto text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.8L18.4 19H5.6L12 6.8z"/>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
