"use client";

import React from "react";

// ─── Colour palette per section ──────────────────────────────────────────────
export const SECTION_COLORS: { bg: string; next: string }[] = [
  { bg: "#eef2ff", next: "#fffbeb" },   // 1. Hero         — soft indigo → warm cream
  { bg: "#fffbeb", next: "#ecfdf5" },   // 2. Logos        — warm cream → mint
  { bg: "#ecfdf5", next: "#f5f3ff" },   // 3. Stats        — mint → lavender
  { bg: "#f5f3ff", next: "#fff7ed" },   // 4. Features     — lavender → amber
  { bg: "#fff7ed", next: "#eff6ff" },   // 5. HowItWorks   — amber → sky blue
  { bg: "#eff6ff", next: "#fdf2f8" },   // 6. ResumeDemo   — sky blue → pink blush
  { bg: "#fdf2f8", next: "#f0fdf4" },   // 7. ATSChecker   — pink → fresh green
  { bg: "#f0fdf4", next: "#fefce8" },   // 8. Templates    — green → lemon
  { bg: "#fefce8", next: "#eef2ff" },   // 9. CoverLetter  — lemon → indigo
  { bg: "#eef2ff", next: "#faf5ff" },   // 10. Kanban      — indigo → purple
  { bg: "#faf5ff", next: "#f0fdfa" },   // 11. Interview   — purple → teal
  { bg: "#f0fdfa", next: "#fffbeb" },   // 12. Portfolio   — teal → gold
  { bg: "#fffbeb", next: "#eef2ff" },   // 13. Testimonials— gold → indigo
  { bg: "#eef2ff", next: "#f9fafb" },   // 14. Pricing     — indigo → neutral
  { bg: "#f9fafb", next: "#0f172a" },   // 15. FAQ         — neutral → dark
  { bg: "#111827", next: "#0f172a" },   // 16. CTA         — dark
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
  const wrapStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    marginBottom: -1,
    position: "relative",
    zIndex: 10,
    pointerEvents: "none",
  };

  const svgProps = (viewBox: string, h: number) => ({
    viewBox,
    preserveAspectRatio: "none" as const,
    style: { display: "block", width: "100%", height: h } as React.CSSProperties,
  });

  let inner: React.ReactNode;

  switch (type) {
    case "wave":
      inner = (
        <svg {...svgProps("0 0 1440 80", 80)}>
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill={fill}
          />
        </svg>
      );
      break;
    case "angled":
      inner = (
        <svg {...svgProps("0 0 1440 70", 70)}>
          <polygon points="0,70 1440,0 1440,70" fill={fill} />
        </svg>
      );
      break;
    case "diagonal":
      inner = (
        <svg {...svgProps("0 0 1440 70", 70)}>
          <polygon points="0,0 1440,60 1440,70 0,70" fill={fill} />
        </svg>
      );
      break;
    case "blob":
      inner = (
        <svg {...svgProps("0 0 1440 90", 90)}>
          <path
            d="M0,90 L0,45 C240,0 480,90 720,45 C960,0 1200,70 1440,30 L1440,90 Z"
            fill={fill}
          />
        </svg>
      );
      break;
    case "layered":
      inner = (
        <svg {...svgProps("0 0 1440 100", 100)}>
          <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill={fill} opacity={0.5} />
          <path d="M0,80 C400,40 900,100 1440,70 L1440,100 L0,100 Z" fill={fill} />
        </svg>
      );
      break;
    case "rounded":
      inner = (
        <svg {...svgProps("0 0 1440 80", 80)}>
          <ellipse cx="720" cy="80" rx="780" ry="80" fill={fill} />
        </svg>
      );
      break;
    case "zigzag":
      inner = (
        <svg {...svgProps("0 0 1440 60", 60)}>
          <polyline
            points="0,0 120,60 240,0 360,60 480,0 600,60 720,0 840,60 960,0 1080,60 1200,0 1320,60 1440,0 1440,60 0,60"
            fill={fill}
          />
        </svg>
      );
      break;
    case "asymmetric":
      inner = (
        <svg {...svgProps("0 0 1440 80", 80)}>
          <path d="M0,80 L0,0 L900,60 L1440,10 L1440,80 Z" fill={fill} />
        </svg>
      );
      break;
    case "curve":
      inner = (
        <svg {...svgProps("0 0 1440 80", 80)}>
          <path d="M0,80 Q720,-20 1440,80 L1440,80 L0,80 Z" fill={fill} />
        </svg>
      );
      break;
    case "mountain":
    default:
      inner = (
        <svg {...svgProps("0 0 1440 80", 80)}>
          <path d="M0,80 L0,60 L360,10 L720,70 L1080,5 L1440,50 L1440,80 Z" fill={fill} />
        </svg>
      );
      break;
  }

  return <div style={wrapStyle}>{inner}</div>;
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
  const colors = SECTION_COLORS[index] ?? { bg: "#f9fafb", next: "#ffffff" };
  const dividerType = DIVIDER_SEQUENCE[index] ?? "wave";

  return (
    <div
      style={{
        background: colors.bg,
        position: "relative",
      }}
    >
      {/* Transparent inner shell — ensures inner <section> bg doesn't override */}
      <div className="section-inner-shell">
        {children}
      </div>
      <SvgDivider type={dividerType} fill={colors.next} />
    </div>
  );
}
