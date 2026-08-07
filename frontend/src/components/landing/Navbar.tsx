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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.5)]" : "bg-zinc-950 border-b border-zinc-900/50"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black text-sm tracking-tight">
            R
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white">
            Resume<span className="text-amber-400">Flow</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/60 rounded-xl transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth" className="px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link href="/auth?mode=register" className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer">
            Get started free <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-zinc-850 text-zinc-400 hover:bg-zinc-900/60"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-zinc-850 bg-zinc-950 px-5 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-zinc-300 hover:text-amber-400 rounded-xl hover:bg-zinc-900/60 transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 space-y-2 border-t border-zinc-850 mt-2">
            <Link href="/auth" onClick={() => setOpen(false)} className="block text-center py-2.5 text-sm font-semibold text-zinc-350 bg-zinc-900/60 rounded-xl">Sign in</Link>
            <Link href="/auth?mode=register" onClick={() => setOpen(false)} className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer w-full">Get started free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
