"use client";

import React, { useState } from "react";
import { FileText, PenTool, Copy, Download, Sparkles, ArrowLeft } from "lucide-react";

interface CoverLetterProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function CoverLetterGenerator({ resumeData, onNavigate, showToast }: CoverLetterProps) {
  const [company, setCompany] = useState("Vercel");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [jobDesc, setJobDesc] = useState("Looking for a frontend expert with deep experience in React, Next.js, and Tailwind CSS to optimize our dashboard components...");
  const [tone, setTone] = useState("Professional");
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      const name = resumeData?.name || "Sarah Jenkins";
      const email = resumeData?.email || "sarah.jenkins@company.com";
      const location = resumeData?.location || "San Francisco, CA";
      const skills = resumeData?.skills || "React, Next.js 15, TypeScript, Tailwind CSS";
      
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

      if (tone === "Bold") {
        intro = `I don't just build interfaces—I engineer business solutions. When I saw the opening for a ${role} at ${company}, I knew my background in deploying high-volume, highly optimized system dashboards mapped perfectly with what you are looking for.`;
        corePara = `At my previous role with ${firstExp.company} as a ${firstExp.role}, I did exactly that: ${firstExp.description.replace(/\n/g, " ")}. Incorporating stacks like ${skills.split(",").slice(0, 4).join(", ")}, I thrive when optimizing complex, slow, or scale-constrained architectures.`;
        conclusion = `Let's skip the standard HR delays. I am ready to jump in and show you how my engineering record can streamline ${company}'s frontend performance. I look forward to connecting directly.`;
      } else if (tone === "Enthusiastic") {
        intro = `I am absolutely thrilled to apply for the ${role} position at ${company}! I have been following ${company}'s phenomenal milestones and open-source contributions for years, and the opportunity to join your engineering crew is incredibly exciting to me.`;
        corePara = `My engineering journey has centered around building responsive products with ${skills.split(",").slice(0, 4).join(", ")}. In my tenure as a ${firstExp.role} at ${firstExp.company}, I led projects like: ${firstExp.description.replace(/\n/g, " ")}. Tying my user-centric layout optimization directly to your requirements makes this role a perfect next chapter.`;
        conclusion = `I would love nothing more than to bring this passion and technical expertise to ${company}. Thank you so much for reviewing my application, and I cannot wait to speak with the hiring team!`;
      } else if (tone === "Creative") {
        intro = `Great software is a mix of logic and art. As a developer who loves crafting clean code and beautiful user interfaces, I was captivated by the ${role} opening at ${company}.`;
        corePara = `With a deep toolbox featuring ${skills.split(",").slice(0, 5).join(", ")}, my work as a ${firstExp.role} at ${firstExp.company} has always focused on blending design aesthetics with high performance. For example, ${firstExp.description.replace(/\n/g, " ")}. Your target goals for dashboard upgrades fit my design-meets-dev background like a glove.`;
        conclusion = `I am eager to bring a fresh creative perspective to your tech stack at ${company}. Let's chat soon about how my experience matches your team's ambitions.`;
      } else {
        intro = `I am writing to express my formal interest in the ${role} position at ${company}. With a strong background in developing scalable SaaS applications and a proven track record in frontend optimization, I am confident in my ability to add immediate value to your team.`;
        corePara = `During my tenure as a ${firstExp.role} at ${firstExp.company}, I was responsible for key performance milestones. Specifically, ${firstExp.description.replace(/\n/g, " ")}. Utilizing technologies such as ${skills.split(",").slice(0, 4).join(", ")}, I have consistently delivered clean, reusable components and minimized payload loading lags.`;
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
    }, 1000);
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
              className="clay-btn-primary w-full py-3 text-sm text-white font-semibold flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              {generating ? "Generating Cover Letter..." : "Generate Cover Letter"}
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
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(letter);
                        if (showToast) showToast("Copied to clipboard!", "success");
                        else alert("Copied to clipboard!");
                      }}
                      className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        if (showToast) showToast("Cover Letter downloaded as PDF!", "success");
                        else alert("Cover Letter downloaded as PDF!");
                      }}
                      className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Export PDF
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
                  Complete the target details and job description on the left to create a high-scoring customized cover letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
