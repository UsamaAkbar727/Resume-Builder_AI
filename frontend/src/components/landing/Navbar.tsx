"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Interactive Tools", href: "#interactive-tools" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-[0_4px_12px_rgba(37,99,235,0.25)] group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">
            ResumeFlow <span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth?mode=register"
            className="clay-btn-primary px-5 py-2.5 text-sm flex items-center gap-1.5"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg border border-gray-200/80 bg-white/50 backdrop-blur-sm text-gray-600 hover:text-gray-900"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-scale-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors py-1.5"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-gray-100 my-1" />
          <div className="flex flex-col gap-2.5">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-gray-700 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              onClick={() => setMobileMenuOpen(false)}
              className="clay-btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-1.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
