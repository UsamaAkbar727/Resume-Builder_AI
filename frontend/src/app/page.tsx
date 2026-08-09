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
        <section className="section-wave">
          <Hero />
        </section>

        {/* 2. Trusted Companies Logos */}
        <section className="section-angled">
          <Logos />
        </section>

        {/* 3. Statistics Section */}
        <section className="section-diagonal">
          <Stats />
        </section>

        {/* 4. Core Features Grid */}
        <section className="section-layered">
          <Features />
        </section>

        {/* 5. 5-Step Yellow & Black S-Curve Infographic Roadmap */}
        <section className="section-blob">
          <HowItWorks />
        </section>

        {/* Anchor point for Interactive Tools */}
        <div id="interactive-tools" className="scroll-mt-20">
          
          {/* 5. Resume Builder Demo */}
          <section className="section-gradient-fade">
            <ResumeDemo />
          </section>

          {/* 6. ATS Resume Checker */}
          <section className="section-dotted">
            <ATSChecker />
          </section>

          {/* 7. Resume Templates Showcase */}
          <section className="section-floating">
            <Templates />
          </section>

          {/* 8. AI Cover Letter Generator */}
          <section className="section-rounded-end">
            <CoverLetter />
          </section>

          {/* 9. Job Tracker Kanban Board */}
          <section className="section-asymmetric">
            <KanbanBoard />
          </section>

          {/* 10. AI Interview Coach */}
          <section className="section-wave">
            <InterviewPrep />
          </section>

          {/* 11. Portfolio Builder */}
          <section className="section-angled">
            <PortfolioShowcase />
          </section>
          
        </div>

        {/* 12. Candidate Testimonials */}
        <section className="section-diagonal">
          <Testimonials />
        </section>

        {/* 13. Transparent Pricing */}
        <section className="section-layered">
          <Pricing />
        </section>

        {/* 14. Frequently Asked Questions */}
        <section className="section-blob">
          <FAQ />
        </section>

        {/* 15. Final Call To Action Banner */}
        <section className="section-gradient-fade">
          <CTA />
        </section>
      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}
