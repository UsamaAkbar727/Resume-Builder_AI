"use client";

import React from "react";

// ─── Blue-family colour palette ───────────────────────────────────────────────
// Distinct, clearly visible blues that pair beautifully with white content.
// bg = this section's background  |  next = next section's bg (fills the SVG divider)
export const SECTION_COLORS: { bg: string; next: string }[] = [
  { bg: "#dbeafe", next: "#e0e7ff" },   // 1.  Hero           — blue-100   → indigo-100
  { bg: "#e0e7ff", next: "#ede9fe" },   // 2.  Logos          — indigo-100 → violet-100
  { bg: "#ede9fe", next: "#e0f2fe" },   // 3.  Stats          — violet-100 → sky-100
  { bg: "#e0f2fe", next: "#cffafe" },   // 4.  Features       — sky-100    → cyan-100
  { bg: "#cffafe", next: "#dbeafe" },   // 5.  HowItWorks     — cyan-100   → blue-100
  { bg: "#dbeafe", next: "#c7d2fe" },   // 6.  ResumeDemo     — blue-100   → indigo-200
  { bg: "#c7d2fe", next: "#ddd6fe" },   // 7.  ATSChecker     — indigo-200 → violet-200
  { bg: "#ddd6fe", next: "#bae6fd" },   // 8.  Templates      — violet-200 → sky-200
  { bg: "#bae6fd", next: "#a5f3fc" },   // 9.  CoverLetter    — sky-200    → cyan-200
  { bg: "#a5f3fc", next: "#bfdbfe" },   // 10. KanbanBoard    — cyan-200   → blue-200
  { bg: "#bfdbfe", next: "#c7d2fe" },   // 11. InterviewPrep  — blue-200   → indigo-200
  { bg: "#c7d2fe", next: "#dbeafe" },   // 12. Portfolio      — indigo-200 → blue-100
  { bg: "#dbeafe", next: "#e0e7ff" },   // 13. Testimonials   — blue-100   → indigo-100
  { bg: "#e0e7ff", next: "#ede9fe" },   // 14. Pricing        — indigo-100 → violet-100
  { bg: "#ede9fe", next: "#1e3a5f" },   // 15. FAQ            — violet-100 → dark navy
  { bg: "#1e3a5f", next: "#0f172a" },   // 16. CTA            — dark navy  → footer
];

type DividerType =
  | "wave"
  | "angled"
  | "diagonal"
  | "blob"
  | "layered"
  | "rounded"
  | "zigzag"
  | "asymmetric"
  | "curve"
  | "mountain";

const DIVIDER_SEQUENCE: DividerType[] = [
  "wave",       // 1.  Hero
  "angled",     // 2.  Logos
  "diagonal",   // 3.  Stats
  "blob",       // 4.  Features
  "layered",    // 5.  HowItWorks
  "rounded",    // 6.  ResumeDemo
  "zigzag",     // 7.  ATSChecker
  "asymmetric", // 8.  Templates
  "curve",      // 9.  CoverLetter
  "mountain",   // 10. KanbanBoard
  "wave",       // 11. InterviewPrep
  "angled",     // 12. Portfolio
  "diagonal",   // 13. Testimonials
  "blob",       // 14. Pricing
  "layered",    // 15. FAQ
  "rounded",    // 16. CTA
];

// ─── SVG Divider ─────────────────────────────────────────────────────────────
function SvgDivider({ type, fill }: { type: DividerType; fill: string }) {
  const wrap: React.CSSProperties = {
    display: "block",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    marginBottom: -2,
    position: "relative",
    zIndex: 10,
    pointerEvents: "none",
  };

  const p = (viewBox: string, h: number) => ({
    viewBox,
    preserveAspectRatio: "none" as const,
    style: { display: "block", width: "100%", height: h } as React.CSSProperties,
  });

  const shapes: Record<DividerType, React.ReactNode> = {
    wave: (
      <svg {...p("0 0 1440 80", 80)}>
        <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    ),
    angled: (
      <svg {...p("0 0 1440 70", 70)}>
        <polygon points="0,70 1440,0 1440,70" fill={fill} />
      </svg>
    ),
    diagonal: (
      <svg {...p("0 0 1440 70", 70)}>
        <polygon points="0,0 1440,60 1440,70 0,70" fill={fill} />
      </svg>
    ),
    blob: (
      <svg {...p("0 0 1440 90", 90)}>
        <path d="M0,90 L0,45 C240,0 480,90 720,45 C960,0 1200,70 1440,30 L1440,90 Z" fill={fill} />
      </svg>
    ),
    layered: (
      <svg {...p("0 0 1440 100", 100)}>
        <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill={fill} opacity={0.45} />
        <path d="M0,80 C400,40 900,100 1440,70 L1440,100 L0,100 Z" fill={fill} />
      </svg>
    ),
    rounded: (
      <svg {...p("0 0 1440 80", 80)}>
        <ellipse cx="720" cy="80" rx="780" ry="80" fill={fill} />
      </svg>
    ),
    zigzag: (
      <svg {...p("0 0 1440 60", 60)}>
        <polyline
          points="0,0 120,60 240,0 360,60 480,0 600,60 720,0 840,60 960,0 1080,60 1200,0 1320,60 1440,0 1440,60 0,60"
          fill={fill}
        />
      </svg>
    ),
    asymmetric: (
      <svg {...p("0 0 1440 80", 80)}>
        <path d="M0,80 L0,0 L900,60 L1440,10 L1440,80 Z" fill={fill} />
      </svg>
    ),
    curve: (
      <svg {...p("0 0 1440 80", 80)}>
        <path d="M0,80 Q720,-20 1440,80 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    ),
    mountain: (
      <svg {...p("0 0 1440 80", 80)}>
        <path d="M0,80 L0,60 L360,10 L720,70 L1080,5 L1440,50 L1440,80 Z" fill={fill} />
      </svg>
    ),
  };

  return <div style={wrap}>{shapes[type]}</div>;
}

// ─── SectionWrap ──────────────────────────────────────────────────────────────
interface SectionWrapProps {
  index: number;
  children: React.ReactNode;
}

export default function SectionWrap({ index, children }: SectionWrapProps) {
  const { bg, next } = SECTION_COLORS[index] ?? { bg: "#dbeafe", next: "#e0e7ff" };
  const dividerType = DIVIDER_SEQUENCE[index] ?? "wave";

  // ── Force the inner component's root element to have a transparent background
  // so the SectionWrap's coloured bg is visible.  React.cloneElement injects
  // inline style which beats Tailwind utility classes (no !important needed).
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
      <SvgDivider type={dividerType} fill={next} />
    </div>
  );
}
