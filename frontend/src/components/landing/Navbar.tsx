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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E5E7EB]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#1A1A2E] flex items-center justify-center text-white font-black text-sm tracking-tight">
            R
          </div>
          <span className="font-bold text-[15px] tracking-tight text-gray-900">
            Resume<span className="text-blue-600">Flow</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Sign in
          </Link>
          <Link href="/auth?mode=register" className="btn-primary text-sm px-5 py-2.5">
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
            <Link href="/auth" onClick={() => setOpen(false)} className="block text-center py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl">Sign in</Link>
            <Link href="/auth?mode=register" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Get started free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
