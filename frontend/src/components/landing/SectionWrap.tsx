"use client";

import React from "react";

// ─── Colour palette per section ──────────────────────────────────────────────
// Each entry: bg = this section's background, next = next section's background
// (used to colour the SVG divider so it blends seamlessly into the next section)

export const SECTION_COLORS: { bg: string; next: string }[] = [
  { bg: "#f0f4ff", next: "#fff9f0" },   // 1. Hero         — soft blue → warm cream
  { bg: "#fff9f0", next: "#edf9f4" },   // 2. Logos        — warm cream → mint
  { bg: "#edf9f4", next: "#f5f0ff" },   // 3. Stats        — mint → lavender
  { bg: "#f5f0ff", next: "#fff3e0" },   // 4. Features     — lavender → amber
  { bg: "#fff3e0", next: "#e8f4ff" },   // 5. HowItWorks   — amber → sky blue
  { bg: "#e8f4ff", next: "#fdf2f8" },   // 6. ResumeDemo   — sky blue → pink blush
  { bg: "#fdf2f8", next: "#f0fdf4" },   // 7. ATSChecker   — pink → fresh green
  { bg: "#f0fdf4", next: "#fefce8" },   // 8. Templates    — fresh green → lemon
  { bg: "#fefce8", next: "#f0f4ff" },   // 9. CoverLetter  — lemon → blue
  { bg: "#f0f4ff", next: "#fdf4ff" },   // 10. Kanban      — blue → purple
  { bg: "#fdf4ff", next: "#f0fff4" },   // 11. Interview   — purple → green
  { bg: "#f0fff4", next: "#fffbf0" },   // 12. Portfolio   — green → gold
  { bg: "#fffbf0", next: "#f0f4ff" },   // 13. Testimonials— gold → blue
  { bg: "#f0f4ff", next: "#fafafa" },   // 14. Pricing     — blue → neutral
  { bg: "#fafafa", next: "#1a1a2e" },   // 15. FAQ         — neutral → dark
  { bg: "#1a1a2e", next: "#0f172a" },   // 16. CTA         — dark → footer
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

// ─── SVG divider shapes ───────────────────────────────────────────────────────
function SvgDivider({ type, fill }: { type: DividerType; fill: string }) {
  const style: React.CSSProperties = {
    display: "block",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    marginBottom: -2,
  };

  switch (type) {
    case "wave":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
              fill={fill}
            />
          </svg>
        </div>
      );
    case "angled":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: 70 }}>
            <polygon points="0,70 1440,0 1440,70" fill={fill} />
          </svg>
        </div>
      );
    case "diagonal":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: 70 }}>
            <polygon points="0,0 1440,60 1440,70 0,70" fill={fill} />
          </svg>
        </div>
      );
    case "blob":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 90 }}>
            <path
              d="M0,90 L0,45 C240,0 480,90 720,45 C960,0 1200,70 1440,30 L1440,90 Z"
              fill={fill}
            />
          </svg>
        </div>
      );
    case "layered":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: 100 }}>
            <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill={fill} opacity="0.5" />
            <path d="M0,80 C400,40 900,100 1440,70 L1440,100 L0,100 Z" fill={fill} />
          </svg>
        </div>
      );
    case "rounded":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <ellipse cx="720" cy="80" rx="780" ry="80" fill={fill} />
          </svg>
        </div>
      );
    case "zigzag":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60 }}>
            <polyline
              points="0,0 120,60 240,0 360,60 480,0 600,60 720,0 840,60 960,0 1080,60 1200,0 1320,60 1440,0 1440,60 0,60"
              fill={fill}
            />
          </svg>
        </div>
      );
    case "asymmetric":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <path d="M0,80 L0,0 L900,60 L1440,10 L1440,80 Z" fill={fill} />
          </svg>
        </div>
      );
    case "curve":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <path d="M0,80 Q720,-20 1440,80 L1440,80 L0,80 Z" fill={fill} />
          </svg>
        </div>
      );
    case "mountain":
      return (
        <div style={style}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <path d="M0,80 L0,60 L360,10 L720,70 L1080,5 L1440,50 L1440,80 Z" fill={fill} />
          </svg>
        </div>
      );
  }
}

const DIVIDER_SEQUENCE: DividerType[] = [
  "wave",
  "angled",
  "diagonal",
  "blob",
  "layered",
  "rounded",
  "zigzag",
  "asymmetric",
  "curve",
  "mountain",
  "wave",
  "angled",
  "diagonal",
  "blob",
  "layered",
  "rounded",
];

interface SectionWrapProps {
  index: number;
  children: React.ReactNode;
}

export default function SectionWrap({ index, children }: SectionWrapProps) {
  const colors = SECTION_COLORS[index] ?? { bg: "#ffffff", next: "#ffffff" };
  const dividerType = DIVIDER_SEQUENCE[index] ?? "wave";

  return (
    <div data-section-wrap style={{ background: colors.bg, position: "relative" }}>
      {children}
      <SvgDivider type={dividerType} fill={colors.next} />
    </div>
  );
}
