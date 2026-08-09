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
import SectionWrap from "@/components/landing/SectionWrap";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-zinc-900 relative flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Premium Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero — soft blue bg + wave into warm cream */}
        <SectionWrap index={0}>
          <Hero />
        </SectionWrap>

        {/* 2. Logos — warm cream bg + angled into mint */}
        <SectionWrap index={1}>
          <Logos />
        </SectionWrap>

        {/* 3. Stats — mint bg + diagonal into lavender */}
        <SectionWrap index={2}>
          <Stats />
        </SectionWrap>

        {/* 4. Features — lavender bg + blob into amber */}
        <SectionWrap index={3}>
          <Features />
        </SectionWrap>

        {/* 5. HowItWorks — amber bg + layered into sky blue */}
        <SectionWrap index={4}>
          <HowItWorks />
        </SectionWrap>

        {/* Anchor point for Interactive Tools */}
        <div id="interactive-tools" className="scroll-mt-20">

          {/* 6. ResumeDemo — sky blue bg + rounded into pink blush */}
          <SectionWrap index={5}>
            <ResumeDemo />
          </SectionWrap>

          {/* 7. ATSChecker — pink blush bg + zigzag into fresh green */}
          <SectionWrap index={6}>
            <ATSChecker />
          </SectionWrap>

          {/* 8. Templates — fresh green bg + asymmetric into lemon */}
          <SectionWrap index={7}>
            <Templates />
          </SectionWrap>

          {/* 9. CoverLetter — lemon bg + curve into blue */}
          <SectionWrap index={8}>
            <CoverLetter />
          </SectionWrap>

          {/* 10. KanbanBoard — blue bg + mountain into purple */}
          <SectionWrap index={9}>
            <KanbanBoard />
          </SectionWrap>

          {/* 11. InterviewPrep — purple bg + wave into green */}
          <SectionWrap index={10}>
            <InterviewPrep />
          </SectionWrap>

          {/* 12. PortfolioShowcase — green bg + angled into gold */}
          <SectionWrap index={11}>
            <PortfolioShowcase />
          </SectionWrap>

        </div>

        {/* 13. Testimonials — gold bg + diagonal into blue */}
        <SectionWrap index={12}>
          <Testimonials />
        </SectionWrap>

        {/* 14. Pricing — blue bg + blob into neutral */}
        <SectionWrap index={13}>
          <Pricing />
        </SectionWrap>

        {/* 15. FAQ — neutral bg + layered into dark */}
        <SectionWrap index={14}>
          <FAQ />
        </SectionWrap>

        {/* 16. CTA — dark bg + rounded into footer */}
        <SectionWrap index={15}>
          <CTA />
        </SectionWrap>
      </main>

      {/* Premium Footer */}
      <div style={{ background: "#0f172a" }}>
        <Footer />
      </div>
    </div>
  );
}
