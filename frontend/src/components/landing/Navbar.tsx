"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Tools", href: "#interactive-tools" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" : "bg-white border-b border-zinc-100"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-700 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-md shadow-indigo-600/10">
            R
          </div>
          <span className="font-bold text-[15px] tracking-tight text-zinc-900 font-display">
            Resume<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Flow</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 font-display">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm font-semibold text-zinc-650 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-2 font-display">
          <Link href="/auth" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            Sign in
          </Link>
          <Link href="/auth?mode=register" className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-indigo-650/10 shadow-indigo-600/15 transition-all cursor-pointer">
            Get started free <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-zinc-200 text-zinc-650 text-zinc-600 hover:bg-zinc-100"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-5 py-4 space-y-1 font-display">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:text-indigo-600 rounded-xl hover:bg-zinc-50 transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 space-y-2 border-t border-zinc-200 mt-2">
            <Link href="/auth" onClick={() => setOpen(false)} className="block text-center py-2.5 text-sm font-semibold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl">Sign in</Link>
            <Link href="/auth?mode=register" onClick={() => setOpen(false)} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transition-all cursor-pointer w-full">Get started free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
