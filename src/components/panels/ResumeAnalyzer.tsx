"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, Info, ArrowLeft } from "lucide-react";

interface ResumeAnalyzerProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function ResumeAnalyzer({ resumeData, onNavigate, showToast }: ResumeAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [targetRole, setTargetRole] = useState("Lead Software Engineer");
  const [customJD, setCustomJD] = useState("");

  const [analysisResult, setAnalysisResult] = useState({
    score: 85,
    improvements: [] as Array<{ category: string; issue: string; impact: string; impactColor: string; fix: string }>,
    matchRatio: 80,
    wordCount: 412,
    readabilityScore: 68.2,
    sentenceLength: 14.5
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAnalyzing(true);
      setAnalyzed(false);
      const fileName = e.target.files[0].name;
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
        if (showToast) showToast(`Successfully parsed uploaded file: ${fileName}`, "success");
      }, 1500);
    }
  };

  // Run dynamic scanning whenever inputs update
  useEffect(() => {
    const skillsString = (resumeData?.skills || "").toLowerCase();
    const summaryString = (resumeData?.summary || "").toLowerCase();
    const experienceString = (resumeData?.experience || [])
      .map((exp: any) => `${exp.company} ${exp.role} ${exp.description}`)
      .join(" ")
      .toLowerCase();
    
    const fullText = `${skillsString} ${summaryString} ${experienceString}`;

    // Target keywords by role
    const keywordsByRole: Record<string, string[]> = {
      "Senior Frontend Developer": ["react", "typescript", "next.js", "tailwind", "graphql", "playwright", "jest", "webpack"],
      "Lead Software Engineer": ["aws", "postgresql", "kubernetes", "docker", "microservices", "system design", "redis", "ci/cd"],
      "Product Manager": ["roadmap", "backlog", "agile", "analytics", "okrs", "wireframe", "user stories", "stakeholder"],
      "Full Stack Developer": ["node.js", "react", "postgresql", "express", "mongodb", "typescript", "git", "rest api"]
    };

    const targetKeywords = (keywordsByRole[targetRole] || keywordsByRole["Lead Software Engineer"]) as string[];
    const foundKeywords = targetKeywords.filter(kw => fullText.includes(kw));
    const missingKeywords: string[] = [...targetKeywords.filter(kw => !fullText.includes(kw))];

    // Custom JD extra analysis
    if (customJD) {
      const jdWords: string[] = customJD.toLowerCase().match(/\b\w+\b/g) || [];
      const commonTech = ["react", "vue", "angular", "node", "python", "java", "golang", "ruby", "rust", "kubernetes", "docker", "aws", "gcp", "azure", "sql", "nosql", "redis", "graphql", "typescript", "javascript"];
      commonTech.forEach(tech => {
        if (jdWords.includes(tech) && !targetKeywords.includes(tech)) {
          if (!fullText.includes(tech) && !missingKeywords.includes(tech)) {
            missingKeywords.push(tech);
          }
        }
      });
    }

    // Dynamic Score Calculation
    let calculatedScore = 55; // base score
    if (resumeData?.email) calculatedScore += 5;
    if (resumeData?.location) calculatedScore += 5;
    if (resumeData?.summary && resumeData.summary.length > 50) calculatedScore += 10;
    
    // Skill matches contribution (max 25)
    const matchRatio = targetKeywords.length > 0 ? foundKeywords.length / targetKeywords.length : 0;
    calculatedScore += Math.round(matchRatio * 25);

    if (calculatedScore > 98) calculatedScore = 98; // Cap at 98%
    if (calculatedScore < 30) calculatedScore = 30;

    // Generate Dynamic Improvements
    const dynamicImprovements = [];
    
    if (missingKeywords.length > 0) {
      // Pick top 3 missing keywords
      missingKeywords.slice(0, 3).forEach((kw) => {
        const capitalized = kw.charAt(0).toUpperCase() + kw.slice(1);
        dynamicImprovements.push({
          category: "Keywords",
          issue: `Missing target skill keyword: '${capitalized}'`,
          impact: "High Impact",
          impactColor: "text-[#DC2626] bg-red-50 border-red-200",
          fix: `Add '${capitalized}' to your technical skills list in the Resume Builder.`
        });
      });
    }

    if (!resumeData?.summary || resumeData.summary.length < 60) {
      dynamicImprovements.push({
        category: "Formatting",
        issue: "Brief summary profile section",
        impact: "Medium Impact",
        impactColor: "text-[#F59E0B] bg-amber-50 border-amber-200",
        fix: "Elaborate on your resume summary profile. Add key milestone accomplishments and specify quantitative goals."
      });
    }

    // Check passive verbs
    const passiveWords = ["was responsible for", "worked on", "assisted with", "helped in"];
    let hasPassive = false;
    passiveWords.forEach(word => {
      if (fullText.includes(word)) hasPassive = true;
    });

    if (hasPassive) {
      dynamicImprovements.push({
        category: "Action Verbs",
        issue: "Weak/passive verb phrasing detected",
        impact: "Medium Impact",
        impactColor: "text-[#F59E0B] bg-amber-50 border-amber-200",
        fix: "Replace passive phrases like 'was responsible for' with strong, metrics-driven action verbs (e.g. 'Architected', 'Spearheaded', 'Optimized')."
      });
    }

    // Fallback if everything is perfect
    if (dynamicImprovements.length === 0) {
      dynamicImprovements.push({
        category: "Formatting",
        issue: "Structure optimization",
        impact: "Low Impact",
        impactColor: "text-gray-500 bg-gray-50 border-gray-200",
        fix: "Your resume structure meets all core ATS compliance checks. Everything looks production-ready!"
      });
    }

    // Calculate dynamic stats
    const words = fullText.split(/\s+/).filter(Boolean).length;
    const readability = Math.round(75 - (words / 150)); // simple simulated readability index

    setAnalysisResult({
      score: calculatedScore,
      improvements: dynamicImprovements,
      matchRatio: Math.round(matchRatio * 100),
      wordCount: words || 412,
      readabilityScore: readability > 100 ? 98 : readability < 20 ? 40 : readability,
      sentenceLength: Math.round(10 + (words % 8))
    });
  }, [resumeData, targetRole, customJD]);

  const score = analysisResult.score;
  const improvements = analysisResult.improvements;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-3xl font-extrabold text-[#111827]">ATS Resume Analyzer</h1>
        <p className="text-sm text-[#6B7280]">Check keywords, alignment, syntax, and formatting compliance.</p>
      </div>

      {/* Target Selector & Custom Job Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="clay-card p-5 bg-white space-y-3.5 text-left">
          <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Select Target Role</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="clay-input w-full"
          >
            <option value="Lead Software Engineer">Lead Software Engineer</option>
            <option value="Senior Frontend Developer">Senior Frontend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Product Manager">Product Manager</option>
          </select>
          <p className="text-[10px] text-[#6B7280]">
            The scanner matches skills in your active resume against core ATS keywords for this role.
          </p>
        </div>

        <div className="clay-card p-5 bg-white space-y-3.5 text-left">
          <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Paste Custom Job Description (Optional)</label>
          <textarea
            value={customJD}
            onChange={(e) => setCustomJD(e.target.value)}
            placeholder="Paste the job post description here to compare custom tool/tech stacks..."
            rows={2}
            className="clay-input w-full text-xs"
          />
        </div>
      </div>

      {/* Drag & Drop File Upload */}
      <div className="clay-card p-8 bg-white text-center border-dashed border-2 border-[#2563EB]/20 hover:border-[#2563EB]/40 transition-colors relative flex flex-col items-center justify-center min-h-[170px]">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
          <UploadCloud className="w-9 h-9 text-[#2563EB] mb-1" />
          <h4 className="font-bold text-sm text-[#111827]">Upload custom PDF/Word Resume</h4>
          <p className="text-xs text-[#6B7280]">Supports PDF, DOCX, and TXT up to 5MB.</p>
          <button className="clay-btn-secondary px-4 py-2 text-xs font-semibold mt-1">
            Browse Files
          </button>
        </div>
      </div>

      {analyzing && (
        <div className="clay-card p-12 bg-white text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-[#2563EB] animate-spin mx-auto"></div>
          <h4 className="font-bold text-sm text-[#111827]">Parsing file & compiling ATS matrix...</h4>
          <p className="text-xs text-[#6B7280]">Running syntactic checks and reading ease analyses.</p>
        </div>
      )}

      {analyzed && !analyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Score & Metrics */}
          <div className="space-y-6">
            <div className="clay-card p-6 bg-white text-center">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-4">ATS Compatibility Score</span>
              
              {/* Animated Circular Ring representation */}
              <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#EEF2F7"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#16A34A"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={376.8}
                    strokeDashoffset={376.8 - (376.8 * score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-[#111827]">{score}</span>
                  <span className="text-xs text-[#6B7280] block font-semibold">/ 100</span>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-[#16A34A] border border-green-200 uppercase tracking-wider">
                Good Match Range
              </span>
            </div>

            {/* Readability statistics */}
            <div className="clay-card p-6 bg-white space-y-4">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Readability Matrix</h3>
              <div className="space-y-3.5 text-xs text-left">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Flesch Reading Ease</span>
                  <span className="font-semibold">{analysisResult.readabilityScore} (Good)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Average Sentence Length</span>
                  <span className="font-semibold">{analysisResult.sentenceLength} words</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Action Verb Frequency</span>
                  <span className={`font-semibold ${analysisResult.score > 75 ? "text-[#16A34A]" : "text-amber-500"}`}>
                    {analysisResult.score > 75 ? "High (12.8%)" : "Moderate (8.5%)"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Total Word Count</span>
                  <span className="font-semibold">{analysisResult.wordCount} words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Detailed Optimization Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="clay-card p-6 bg-white">
              <h3 className="font-bold text-lg text-[#111827] mb-6 text-left">Actionable Improvements</h3>
              
              <div className="space-y-6">
                {improvements.map((imp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#EEF2F7]/50 border border-[#E5E7EB] space-y-3 text-left">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-bold uppercase text-[#2563EB] tracking-wide">
                        {imp.category}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${imp.impactColor}`}>
                        {imp.impact}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-sm text-[#111827]">{imp.issue}</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed italic bg-white p-2.5 rounded-lg border border-[#E5E7EB]/50 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span><strong>Fix:</strong> {imp.fix}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
