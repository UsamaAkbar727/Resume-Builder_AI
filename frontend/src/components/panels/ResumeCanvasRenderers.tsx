"use client";

import React from "react";
import { ResumeTemplate } from "@/data/templatesData";

import Sb2novTemplate from "@/components/templates/Sb2novTemplate";
import AwesomeCVTemplate from "@/components/templates/AwesomeCVTemplate";
import AltaCVTemplate from "@/components/templates/AltaCVTemplate";
import ModernCVTemplate from "@/components/templates/ModernCVTemplate";
import ReactiveResumeTemplate from "@/components/templates/ReactiveResumeTemplate";
import NovoresumeTemplate from "@/components/templates/NovoresumeTemplate";
import FlowCVTemplate from "@/components/templates/FlowCVTemplate";
import ZetyTemplate from "@/components/templates/ZetyTemplate";
import RenderCVTemplate from "@/components/templates/RenderCVTemplate";
import JSONResumeTemplate from "@/components/templates/JSONResumeTemplate";

interface CanvasRendererProps {
  template: ResumeTemplate;
  resumeData: any;
  primaryColor: string;
  customFont: "sans" | "serif" | "mono";
}

export default function ResumeCanvasRenderers({
  template,
  resumeData,
  primaryColor,
  customFont,
}: CanvasRendererProps) {
  const fontClass = customFont === "serif" ? "font-serif" : customFont === "mono" ? "font-mono" : "font-sans";

  // Dispatch layout to specific template engine components
  switch (template.layoutStyle) {
    case "minimal_swiss":
      return <Sb2novTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "timeline_infographic":
      return <AwesomeCVTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "left_sidebar":
      return <AltaCVTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "academic_serif":
      return <ModernCVTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "corporate_split":
      return <ReactiveResumeTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "creative_visual":
      return <NovoresumeTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "header_banner":
      return <FlowCVTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "right_sidebar":
      return <ZetyTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "centered_executive":
      return <RenderCVTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;

    case "compact_dense":
    case "modern_pill":
    default:
      return <JSONResumeTemplate resumeData={resumeData} primaryColor={primaryColor} fontClass={fontClass} />;
  }
}
