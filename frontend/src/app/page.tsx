"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import ResumeDemo from "@/components/landing/ResumeDemo";
import ATSChecker from "@/components/landing/ATSChecker";
import Templates from "@/components/landing/Templates";
import CoverLetter from "@/components/landing/CoverLetter";
import KanbanBoard from "@/components/landing/KanbanBoard";
import InterviewPrep from "@/components/landing/InterviewPrep";
import PortfolioShowcase from "@/components/landing/PortfolioShowcase";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfc] text-zinc-900 relative overflow-hidden flex flex-col font-sans antialiased">
      {/* Premium Navbar */}
      <Navbar />

      {/* Main landing sections in required structure */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trusted Companies Logos */}
        <Logos />

        {/* 3. Statistics Section */}
        <Stats />

        {/* 4. Core Features Grid */}
        <Features />

        {/* 5. 5-Step Yellow & Black S-Curve Infographic Roadmap */}
        <HowItWorks />

        {/* Anchor point for Interactive Tools */}
        <div id="interactive-tools" className="scroll-mt-20">
          
          {/* 5. Resume Builder Demo */}
          <ResumeDemo />

          {/* 6. ATS Resume Checker */}
          <ATSChecker />

          {/* 7. Resume Templates Showcase */}
          <Templates />

          {/* 8. AI Cover Letter Generator */}
          <CoverLetter />

          {/* 9. Job Tracker Kanban Board */}
          <KanbanBoard />

          {/* 10. AI Interview Coach */}
          <InterviewPrep />

          {/* 11. Portfolio Builder */}
          <PortfolioShowcase />
          
        </div>

        {/* 12. Candidate Testimonials */}
        <Testimonials />

        {/* 13. Transparent Pricing */}
        <Pricing />

        {/* 14. Frequently Asked Questions */}
        <FAQ />

        {/* 15. Final Call To Action Banner */}
        <CTA />
      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}
