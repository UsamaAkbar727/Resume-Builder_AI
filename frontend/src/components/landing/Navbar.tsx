"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Tools", href: "#interactive-tools" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? "bg-[#060A14]/85 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-xl bg-blue-500/30 blur-md group-hover:bg-blue-400/50 transition-all duration-500 animate-glow-pulse" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F6EF7] to-[#6B4FD9] flex items-center justify-center text-white font-black text-lg shadow-[0_4px_15px_rgba(79,110,247,0.35)] group-hover:shadow-[0_6px_25px_rgba(79,110,247,0.55)] transition-all duration-300 group-hover:scale-105">
              R
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            ResumeFlow <span className="text-gradient-blue">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-[#7A8BA8] hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-violet-400 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-sm font-medium text-[#7A8BA8] hover:text-white transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/auth?mode=register"
            className="btn-glow px-5 py-2.5 text-sm flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-[#7A8BA8] hover:text-white hover:bg-white/10 transition-all"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#060A14]/95 backdrop-blur-xl border-b border-white/[0.07] p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#7A8BA8] hover:text-white transition-colors py-1.5 border-b border-white/[0.04] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-[#7A8BA8] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-glow w-full py-2.5 text-sm flex items-center justify-center gap-1.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
