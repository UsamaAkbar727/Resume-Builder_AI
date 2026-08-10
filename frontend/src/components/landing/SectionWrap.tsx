"use client";

import React from "react";

// ─── Premium SaaS Background Palette ─────────────────────────────────────────
// Subtle, alternating backgrounds that create visual rhythm without thick dividers.
// Each index maps to a specific landing page section.
export const SECTION_COLORS: { bg: string }[] = [
  { bg: "#ffffff" },   //  0. Hero            — pure white (has its own radial glow)
  { bg: "#F8F7FF" },   //  1. Logos           — faint lavender white
  { bg: "#EEF2FF" },   //  2. Stats           — very light indigo
  { bg: "#F5F8FF" },   //  3. Features        — soft ice blue
  { bg: "#ffffff" },   //  4. HowItWorks      — white
  { bg: "#F8F7FF" },   //  5. ResumeDemo      — faint lavender white
  { bg: "#ffffff" },   //  6. ATSChecker      — white
  { bg: "#F5F8FF" },   //  7. Templates       — soft ice blue
  { bg: "#ffffff" },   //  8. CoverLetter     — white
  { bg: "#F8F7FF" },   //  9. KanbanBoard     — faint lavender white
  { bg: "#EEF2FF" },   // 10. InterviewPrep   — soft lavender
  { bg: "#ffffff" },   // 11. PortfolioShowcase — white
  { bg: "#F8F7FF" },   // 12. Testimonials    — faint lavender white
  { bg: "#EEF2FF" },   // 13. Pricing         — soft lavender
  { bg: "#FAFAFC" },   // 14. FAQ             — near-white
  { bg: "#100D24" },   // 15. CTA             — deep dark navy
];

// ─── SectionWrap ──────────────────────────────────────────────────────────────
interface SectionWrapProps {
  index: number;
  children: React.ReactNode;
}

export default function SectionWrap({ index, children }: SectionWrapProps) {
  const { bg } = SECTION_COLORS[index] ?? { bg: "#ffffff" };

  // ── Force the inner component's root element to have a transparent background
  // so the SectionWrap's coloured bg shows through.
  const transparentChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const existing = (child.props as { style?: React.CSSProperties }).style ?? {};
    return React.cloneElement(
      child as React.ReactElement<{ style?: React.CSSProperties }>,
      {
        style: {
          ...existing,
          background: "transparent",
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
        },
      }
    );
  });

  return (
    <div style={{ background: bg, position: "relative" }}>
      {transparentChildren}
    </div>
  );
}
