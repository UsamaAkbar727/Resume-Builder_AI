"use client";

import React, { useState } from "react";
import { FileText, PenTool, Copy, Download, Sparkles, ArrowLeft } from "lucide-react";

interface CoverLetterProps {
  resumeData?: any;
  jobs?: any[];
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function CoverLetterGenerator({ resumeData, jobs = [], onNavigate, showToast }: CoverLetterProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>("custom");
  const [company, setCompany] = useState("Vercel");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [jobDesc, setJobDesc] = useState("Looking for a frontend expert with deep experience in React, Next.js, and Tailwind CSS to optimize our dashboard components...");
  const [tone, setTone] = useState("Professional");
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter] = useState("");

  const handleSelectTrackedJob = (jobId: string) => {
    setSelectedJobId(jobId);
    if (jobId === "custom") return;
    const found = jobs.find(j => String(j.id) === String(jobId));
    if (found) {
      setCompany(found.company || "");
      setRole(found.role || "");
      if (found.notes) {
        setJobDesc(found.notes);
      }
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      const name = resumeData?.name || "Usama jutt";
      const email = resumeData?.email || "usama.jutt@company.com";
      const location = resumeData?.location || "San Francisco, CA";
      const skills = typeof resumeData?.skills === "string" 
        ? resumeData.skills 
        : (resumeData?.skills || ["React", "Next.js 15", "TypeScript", "Tailwind CSS"]).join(", ");
      
      const firstExp = resumeData?.experience?.[0] || {
        company: "Stripe",
        role: "Lead Software Engineer",
        description: "Scaled payment checkout page handling $2B+ in annual transaction volume. Led migration of microservices architectures to AWS EKS container hosts."
      };

      const dateString = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      let intro = "";
      let corePara = "";
      let conclusion = "";

      if (tone === "Bold" || tone === "Passionate") {
        intro = `I don't just build software—I engineer high-impact business solutions. When I saw the opening for a ${role} at ${company}, I knew my background in deploying high-volume, highly optimized systems mapped perfectly with what you are looking for.`;
        corePara = `At my previous role with ${firstExp.company} as a ${firstExp.role}, I did exactly that: ${firstExp.description.replace(/\n/g, " ")}. Incorporating stacks like ${skills.split(",").slice(0, 4).join(", ")}, I thrive when optimizing complex, scale-constrained architectures.`;
        conclusion = `Let's skip the standard HR delays. I am ready to jump in and show you how my engineering record can streamline ${company}'s performance. I look forward to connecting directly.`;
      } else if (tone === "Conversational") {
        intro = `Great software is a mix of logic, craft, and collaboration. As an engineer who loves clean architectures and intuitive interfaces, I was genuinely excited to discover the ${role} opening at ${company}.`;
        corePara = `With a toolbox featuring ${skills.split(",").slice(0, 5).join(", ")}, my work as a ${firstExp.role} at ${firstExp.company} has centered on blending design aesthetics with high performance. For example, ${firstExp.description.replace(/\n/g, " ")}. Your target goals at ${company} fit my background seamlessly.`;
        conclusion = `I would love to bring this passion and technical expertise to ${company}. Let's chat soon about how my experience matches your team's ambitions.`;
      } else if (tone === "Executive") {
        intro = `I am writing to submit my executive application for the ${role} opportunity at ${company}. Having directed engineering teams and delivered mission-critical product features, I bring strategic leadership and deep architectural discipline.`;
        corePara = `During my tenure as ${firstExp.role} at ${firstExp.company}, I established high-throughput systems: ${firstExp.description.replace(/\n/g, " ")}. Backed by technical proficiencies in ${skills.split(",").slice(0, 4).join(", ")}, I specialize in bridging high-level roadmaps with measurable team velocity.`;
        conclusion = `I look forward to discussing how my strategic execution and background can accelerate ${company}'s operational goals.`;
      } else {
        intro = `I am writing to express my formal interest in the ${role} position at ${company}. With a strong background in developing scalable SaaS applications and a proven track record in software optimization, I am confident in my ability to add immediate value to your team.`;
        corePara = `During my tenure as a ${firstExp.role} at ${firstExp.company}, I was responsible for key performance milestones: ${firstExp.description.replace(/\n/g, " ")}. Utilizing technologies such as ${skills.split(",").slice(0, 4).join(", ")}, I have consistently delivered clean, reliable code and minimized latency.`;
        conclusion = `I appreciate your time and consideration of my candidacy. I look forward to discussing how my experience can support ${company}'s upcoming engineering goals.`;
      }

      setLetter(`${name}
${location} | ${email}
${dateString}

Hiring Committee
${company}

RE: Application for ${role}

Dear ${company} Hiring Team,

${intro}

${corePara}

${conclusion}

Sincerely,

${name}`);
      if (showToast) showToast("Custom Cover Letter generated successfully!", "success");
    }, 800);
  };

  const handleExportFile = (format: "txt" | "doc" | "pdf") => {
    if (!letter) return;
    const safeCompany = company.replace(/[^a-zA-Z0-9_-]/g, "_");

    if (format === "pdf") {
      window.print();
      showToast?.("Print / Save as PDF dialog opened!", "success");
    } else if (format === "doc") {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Cover Letter - ${company}</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; padding: 20px;">
          <pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${letter}</pre>
        </body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: "application/msword" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Cover_Letter_${safeCompany}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast?.("Word document downloaded successfully!", "success");
    } else {
      const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Cover_Letter_${safeCompany}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast?.("Cover Letter downloaded as TXT!", "success");
    }
  };

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
        <h1 className="text-3xl font-extrabold text-[#111827]">AI Cover Letter Generator</h1>
        <p className="text-sm text-[#6B7280]">Create custom, job-specific cover letters matching your resume experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Setup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4">
            {jobs && jobs.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Auto-fill from Kanban Tracked Jobs
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => handleSelectTrackedJob(e.target.value)}
                  className="clay-input w-full text-xs font-medium"
                >
                  <option value="custom">-- Custom Company / Manual Entry --</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.company} - {j.role} ({j.status || "Tracked"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Target Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Select Tone Style</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="clay-input w-full text-xs"
              >
                <option value="Professional">Professional & Corporate</option>
                <option value="Executive">Executive & Leadership</option>
                <option value="Passionate">Passionate & Bold</option>
                <option value="Conversational">Conversational & Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Job Description (Paste)</label>
              <textarea
                rows={5}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="clay-input w-full text-xs leading-relaxed"
                placeholder="Paste key keywords and parameters of the role here..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <PenTool className="w-4 h-4" />
              {generating ? "Generating Cover Letter..." : "Generate Cover Letter with AI"}
            </button>
          </div>
        </div>

        {/* Right Column: Output Letter */}
        <div className="lg:col-span-7 space-y-6">
          <div className="clay-card p-6 bg-white min-h-[460px] flex flex-col justify-between">
            {letter ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-[#6B7280] border-b border-[#E5E7EB] pb-3">
                  <span>AI Generated Letter • {tone} Tone</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(letter);
                        showToast?.("Copied to clipboard!", "success");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                    <button
                      onClick={() => handleExportFile("doc")}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download className="w-3 h-3" /> Word (.doc)
                    </button>
                    <button
                      onClick={() => handleExportFile("pdf")}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download className="w-3 h-3" /> PDF / Print
                    </button>
                  </div>
                </div>

                <textarea
                  rows={14}
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  className="w-full text-xs md:text-sm text-[#111827] leading-relaxed font-sans bg-[#F5F7FB] p-4 rounded-xl border border-[#E5E7EB] focus:outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#6B7280] space-y-3 py-20">
                <FileText className="w-10 h-10 text-[#2563EB]" />
                <h4 className="font-bold text-sm text-[#111827]">Generated letter will display here</h4>
                <p className="text-xs max-w-sm">
                  Complete the target details or select a tracked job from your Kanban board to create a high-scoring customized cover letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

