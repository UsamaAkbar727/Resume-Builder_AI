"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, ChevronDown, Check, Globe, Download, Settings2, Palette, Eye, Layout, FileCode } from "lucide-react";
import { downloadPortfolioHTML, PortfolioData } from "@/utils/portfolioExporter";

interface PortfolioBuilderProps {
  resumeData?: any;
  userProfile?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

const PROFESSIONS = [
  { id: "software-dev", label: "Software Developer", layout: "tech", accent: "#2563EB", font: "sans" },
  { id: "fullstack-dev", label: "Full Stack Developer", layout: "tech", accent: "#2563EB", font: "sans" },
  { id: "frontend-dev", label: "Frontend Developer", layout: "tech", accent: "#2563EB", font: "sans" },
  { id: "backend-dev", label: "Backend Developer", layout: "tech", accent: "#3B82F6", font: "mono" },
  { id: "uiux-designer", label: "UI/UX Designer", layout: "creative", accent: "#8B5CF6", font: "sans" },
  { id: "graphic-designer", label: "Graphic Designer", layout: "creative", accent: "#EC4899", font: "sans" },
  { id: "product-designer", label: "Product Designer", layout: "creative", accent: "#8B5CF6", font: "sans" },
  { id: "mobile-dev", label: "Mobile App Developer", layout: "tech", accent: "#10B981", font: "sans" },
  { id: "data-analyst", label: "Data Analyst", layout: "corporate", accent: "#3B82F6", font: "sans" },
  { id: "ai-engineer", label: "AI Engineer", layout: "tech", accent: "#6366F1", font: "mono" },
  { id: "devops-engineer", label: "DevOps Engineer", layout: "tech", accent: "#10B981", font: "mono" },
  { id: "digital-marketer", label: "Digital Marketer", layout: "freelancer", accent: "#F59E0B", font: "sans" },
  { id: "content-writer", label: "Content Writer", layout: "freelancer", accent: "#64748B", font: "serif" },
  { id: "photographer", label: "Photographer", layout: "creative", accent: "#111827", font: "sans" },
  { id: "video-editor", label: "Video Editor", layout: "creative", accent: "#EF4444", font: "sans" },
  { id: "teacher", label: "Teacher", layout: "corporate", accent: "#059669", font: "sans" },
  { id: "student", label: "Student", layout: "tech", accent: "#3B82F6", font: "sans" },
  { id: "doctor", label: "Doctor", layout: "corporate", accent: "#0D9488", font: "sans" },
  { id: "lawyer", label: "Lawyer", layout: "corporate", accent: "#0F172A", font: "serif" },
  { id: "accountant", label: "Accountant", layout: "corporate", accent: "#334155", font: "sans" },
  { id: "architect", label: "Architect", layout: "creative", accent: "#1E293B", font: "sans" },
  { id: "business-consultant", label: "Business Consultant", layout: "corporate", accent: "#1E3A8A", font: "sans" },
  { id: "freelancer", label: "Freelancer", layout: "freelancer", accent: "#8B5CF6", font: "sans" },
  { id: "agency", label: "Agency", layout: "freelancer", accent: "#EF4444", font: "sans" },
  { id: "startup-founder", label: "Startup Founder", layout: "corporate", accent: "#6366F1", font: "sans" }
];

const ACCENT_COLORS = [
  { name: "Blue", hex: "#2563EB" },
  { name: "Green", hex: "#10B981" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Rose", hex: "#F43F5E" },
  { name: "Orange", hex: "#F59E0B" }
];

export default function PortfolioBuilder({ resumeData, userProfile, onNavigate, showToast }: PortfolioBuilderProps) {
  const [selectedProfession, setSelectedProfession] = useState("software-dev");
  const [layout, setLayout] = useState("tech"); // tech, creative, corporate, freelancer
  const [accentColor, setAccentColor] = useState("#2563EB");
  const [fontFamily, setFontFamily] = useState("sans"); // sans, serif, mono
  const [spacing, setSpacing] = useState("comfortable"); // compact, comfortable, spacious
  const [animations, setAnimations] = useState("fade"); // fade, slide, none
  const [previewTheme, setPreviewTheme] = useState("dark"); // light, dark

  // Custom Domain & settings
  const [domain, setDomain] = useState("sjenkins.dev");
  const [deploying, setDeploying] = useState(false);
  const [professionDropdownOpen, setProfessionDropdownOpen] = useState(false);

  // Sections toggle
  const [visibleSections, setVisibleSections] = useState({
    summary: true,
    experience: true,
    projects: true,
    skills: true,
    contact: true
  });

  // When profession changes, auto-set layout and styling config
  useEffect(() => {
    const prof = PROFESSIONS.find(p => p.id === selectedProfession);
    if (prof) {
      setLayout(prof.layout);
      setAccentColor(prof.accent);
      setFontFamily(prof.font);
    }
  }, [selectedProfession]);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      showToast?.(`Portfolio successfully published to https://${domain}!`, "success");
    }, 2000);
  };

  const getSpacingClass = () => {
    if (spacing === "compact") return "space-y-4 py-4";
    if (spacing === "spacious") return "space-y-12 py-10";
    return "space-y-8 py-6";
  };

  const getFontFamilyClass = () => {
    if (fontFamily === "mono") return "font-mono";
    if (fontFamily === "serif") return "font-serif";
    return "font-sans";
  };

  const activeProfessionLabel = PROFESSIONS.find(p => p.id === selectedProfession)?.label || "Software Developer";

  // HTML Web Page Builder / Compiler
  const handleDownloadHTML = () => {
    const name = resumeData?.name || "Usama jutt";
    const title = resumeData?.title || activeProfessionLabel;
    const email = resumeData?.email || "hello@domain.com";
    const location = resumeData?.location || "New York, NY";
    const summaryText = resumeData?.summary || "Professional portfolio showcasing projects, professional skills, and work history.";
    const skillList = (resumeData?.skills || "React, TypeScript, Next.js, Node.js").split(",").map((s: string) => s.trim());
    const experiences = resumeData?.experience || [
      { company: "Company Inc", role: title, duration: "2024 - Present", description: "Led complex technical projects, designed architectures, and optimized application performance." }
    ];
    const projects = resumeData?.projects || [
      { name: "Personal Work App", tech: "React, Node.js", description: "Built fully interactive dashboard tool syncing kanban states client-side." }
    ];

    // Compile CSS Styling values
    const accentHex = accentColor;
    const fontImport = fontFamily === "serif" 
      ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');` 
      : fontFamily === "mono"
      ? `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');`
      : `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;

    const bodyFont = fontFamily === "serif" ? "'Playfair Display', serif" : fontFamily === "mono" ? "'Fira Code', monospace" : "'Plus Jakarta Sans', sans-serif";

    // Generate Layout specific sections
    let previewHTML = "";

    if (layout === "tech") {
      previewHTML = `
        <header class="flex justify-between items-center mb-16 pb-6 border-b border-gray-200 dark:border-gray-800">
          <span class="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white uppercase">\${name.split(" ").map((n) => n[0]).join("") + ".DEV"}</span>
          <div class="flex gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
            \${visibleSections.experience ? \`<a href="#experience" class="hover:text-primary transition-colors">Experience</a>\` : ""}
            \${visibleSections.projects ? \`<a href="#projects" class="hover:text-primary transition-colors">Projects</a>\` : ""}
            \${visibleSections.skills ? \`<a href="#skills" class="hover:text-primary transition-colors">Skills</a>\` : ""}
            \${visibleSections.contact ? \`<a href="#contact" class="hover:text-primary transition-colors">Contact</a>\` : ""}
          </div>
        </header>

        <section class="mb-16">
          <span class="text-xs font-bold text-primary uppercase tracking-widest block mb-3">Welcome to my space</span>
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Hi, I'm <span class="text-primary">\${name}</span>
          </h1>
          <h2 class="text-lg font-bold text-gray-600 dark:text-gray-300 mb-6">\${title}</h2>
          \${visibleSections.summary ? \`<p class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-light text-base mb-8">\${summaryText}</p>\` : ""}
        </section>

        \${visibleSections.experience ? \`
        <section id="experience" class="mb-16">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-primary pl-3">Work Experience</h3>
          <div class="space-y-8">
            \${experiences.map((exp) => \`
              <div class="relative pl-6 border-l border-gray-200 dark:border-gray-800">
                <div class="absolute w-2.5 h-2.5 bg-primary rounded-full -left-[5.5px] top-1.5"></div>
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">\${exp.role}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold">\${exp.company}</p>
                  </div>
                  <span class="text-xs text-gray-400 dark:text-gray-500 font-medium">\${exp.duration || ""}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">\${exp.description}</p>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}

        \${visibleSections.projects ? \`
        <section id="projects" class="mb-16">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-primary pl-3">Personal Projects</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            \${projects.map((proj) => \`
              <div class="p-6 bg-gray-50 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-800 rounded-2xl">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">\${proj.name}</h4>
                <span class="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mb-4 font-mono">\${proj.tech}</span>
                <p class="text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">\${proj.description}</p>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}

        \${visibleSections.skills ? \`
        <section id="skills" class="mb-16">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-primary pl-3">Technical Stack</h3>
          <div class="flex flex-wrap gap-2">
            \${skillList.map((skill) => \`
              <span class="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800">\${skill}</span>
            \`).join("")}
          </div>
        </section>\` : ""}
      `;
    } else if (layout === "creative") {
      previewHTML = `
        <header class="flex justify-between items-center mb-16 pb-6">
          <span class="font-bold text-sm tracking-widest text-gray-900 dark:text-white uppercase">\${name.split(" ").map((n) => n[0]).join("") + ".STUDIO"}</span>
          <div class="flex gap-6 text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">
            \${visibleSections.projects ? \`<a href="#projects" class="hover:text-primary">Works</a>\` : ""}
            \${visibleSections.experience ? \`<a href="#experience" class="hover:text-primary">Info</a>\` : ""}
          </div>
        </header>

        <section class="text-center mb-20">
          <h1 class="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-8">
            Designing solutions, crafting <span class="text-primary">experiences</span>.
          </h1>
          <p class="text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xl mx-auto mb-10">\${summaryText}</p>
          <div class="flex justify-center gap-4">
            <a href="#contact" class="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">Get in Touch</a>
            \${visibleSections.projects ? \`<a href="#projects" class="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-850">Explore Works</a>\` : ""}
          </div>
        </section>

        \${visibleSections.projects ? \`
        <section id="projects" class="mb-20">
          <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mb-12">Selected Creations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            \${projects.map((proj) => \`
              <div class="group cursor-pointer">
                <div class="aspect-video bg-gradient-to-tr from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 rounded-3xl mb-4 border border-gray-200/50 dark:border-gray-800 flex items-center justify-center transition-all group-hover:scale-[1.01] group-hover:shadow-md">
                  <span class="text-xs font-bold text-primary uppercase font-mono tracking-widest">\${proj.tech}</span>
                </div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">\${proj.name}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 leading-normal font-light">\${proj.description}</p>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}

        \${visibleSections.experience ? \`
        <section id="experience" class="mb-16">
          <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mb-10">Career Timeline</h3>
          <div class="max-w-xl mx-auto space-y-6">
            \${experiences.map((exp) => \`
              <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-800 flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-sm text-gray-900 dark:text-white">\${exp.role}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">\${exp.company}</p>
                </div>
                <span class="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">\${exp.duration}</span>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}
      `;
    } else if (layout === "corporate") {
      previewHTML = `
        <header class="flex justify-between items-center mb-16 pb-4 border-b border-gray-200 dark:border-gray-800">
          <span class="font-bold text-base text-gray-900 dark:text-white tracking-tight">\${name}</span>
          <div class="flex gap-6 text-xs font-bold text-gray-500 dark:text-gray-400">
            <a href="#about" class="hover:text-primary">About</a>
            <a href="#resume" class="hover:text-primary">Resume</a>
            <a href="#contact" class="hover:text-primary">Contact</a>
          </div>
        </header>

        <section id="about" class="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-4">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">\${name}</h1>
            <p class="text-xs font-semibold text-primary uppercase tracking-wider">\${title}</p>
            \${visibleSections.summary ? \`<p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">\${summaryText}</p>\` : ""}
          </div>
          <div class="md:col-span-1 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 space-y-3.5 text-xs">
            <h4 class="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">Contact Info</h4>
            <div class="space-y-1.5 text-gray-500 dark:text-gray-400">
              <p>Email: <span class="font-bold text-gray-800 dark:text-gray-200">\${email}</span></p>
              <p>Location: <span class="font-bold text-gray-800 dark:text-gray-200">\${location}</span></p>
            </div>
          </div>
        </section>

        \${visibleSections.experience ? \`
        <section id="resume" class="mb-16">
          <h3 class="text-base font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-8">Professional Timeline</h3>
          <div class="space-y-6">
            \${experiences.map((exp) => \`
              <div class="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-800/40">
                <span class="text-xs font-bold text-gray-400 dark:text-gray-500 w-32 shrink-0">\${exp.duration}</span>
                <div class="space-y-1.5">
                  <h4 class="font-bold text-sm text-gray-900 dark:text-white">\${exp.role}</h4>
                  <p class="text-xs font-semibold text-primary">\${exp.company}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">\${exp.description}</p>
                </div>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}
      `;
    } else {
      // Freelancer
      previewHTML = `
        <header class="flex justify-between items-center mb-16">
          <span class="font-bold text-base text-gray-900 dark:text-white">\${name}</span>
          <a href="#contact" class="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary/20 transition-colors">Work With Me</a>
        </header>

        <section class="mb-16 text-center max-w-2xl mx-auto space-y-6">
          <span class="inline-block text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">Independent Contractor</span>
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            I help clients achieve business goals with <span class="text-primary">\${title}</span> services.
          </h1>
          \${visibleSections.summary ? \`<p class="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">\${summaryText}</p>\` : ""}
        </section>

        \${visibleSections.projects ? \`
        <section id="services" class="mb-16">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white text-center mb-10">What I Do</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            \${projects.map((proj) => \`
              <div class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-lg transition-shadow text-center">
                <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span class="text-xs font-bold font-mono">P</span>
                </div>
                <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-2">\${proj.name}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">\${proj.description}</p>
              </div>
            \`).join("")}
          </div>
        </section>\` : ""}
      `;
    }

    const htmlString = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${name} | \${title} Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    \${fontImport}
    body {
      font-family: \${bodyFont};
    }
    .text-primary { color: \${accentHex}; }
    .bg-primary { background-color: \${accentHex}; }
    .border-primary { border-color: \${accentHex}; }
    .bg-primary\\/10 { background-color: \${accentHex}1a; }
    .text-primary\\/20 { background-color: \${accentHex}33; }
    .shadow-primary\\/20 { box-shadow: 0 10px 15px -3px \${accentHex}33; }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '\${accentHex}'
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
  <!-- Theme Switcher floating button -->
  <div class="fixed bottom-6 right-6 z-50">
    <button id="theme-toggle" class="p-3 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-xl cursor-pointer hover:scale-105 transition-transform flex items-center justify-center">
      <svg id="sun-icon" class="w-5 h-5 text-amber-500 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
      <svg id="moon-icon" class="w-5 h-5 text-indigo-500 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
    </button>
  </div>

  <main class="max-w-4xl mx-auto px-6 py-12 \${spacing === "compact" ? "space-y-4" : spacing === "spacious" ? "space-y-16" : "space-y-10"} \${animations === "fade" ? "animate-fade" : animations === "slide" ? "animate-slide" : ""}">
    \${previewHTML}

    <!-- Simple footer -->
    \${visibleSections.contact ? \`
    <footer id="contact" class="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400 space-y-4">
      <p class="font-semibold text-gray-700 dark:text-gray-300">Let's build something together</p>
      <p class="text-sm font-bold text-primary">\${email} — \${location}</p>
      <p class="pt-4 text-[10px] text-gray-400">Published via ResumeFlow AI Website Generator. &copy; \${new Date().getFullYear()} \${name}</p>
    </footer>\` : ""}
  </main>

  <script>
    const toggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Load initial theme mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      sunIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      moonIcon.classList.remove('hidden');
    }

    toggleBtn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      }
    });
  </script>
</body>
</html>`;

    // Download Blob execution
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `\${name.toLowerCase().replace(/\\s+/g, "_")}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast?.("Portfolio HTML code compiled and downloaded successfully!", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-all bg-white border border-[#E5E7EB] hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E5E7EB] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Portfolio Website Builder</h1>
          <p className="text-sm text-[#6B7280]">Select your profession, filter design layouts, customize style preferences, and export full pages.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadHTML}
            className="clay-btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-[#2563EB]" /> Export HTML
          </button>
          <button
            onClick={handleDeploy}
            disabled={deploying}
            className="clay-btn-primary px-4 py-2.5 text-xs text-white cursor-pointer"
          >
            {deploying ? "Publishing Site..." : "🚀 Publish Website"}
          </button>
        </div>
      </div>

      {/* Grid Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Settings Customizer */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Profession Selection */}
          <div className="clay-card p-6 bg-white space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-2.5">
              <Globe className="w-4.5 h-4.5 text-[#2563EB]" />
              <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">Profession & Domain</h3>
            </div>

            {/* Profession Dropdown selector */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Target Profession</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfessionDropdownOpen(!professionDropdownOpen)}
                  className="clay-input w-full text-xs font-semibold text-[#111827] flex justify-between items-center bg-white cursor-pointer"
                >
                  <span className="truncate pr-2">{activeProfessionLabel}</span>
                  <ChevronDown className="w-4 h-4 text-[#6B7280] shrink-0" />
                </button>
                {professionDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfessionDropdownOpen(false)} />
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto text-xs py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      {PROFESSIONS.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedProfession(p.id);
                            setProfessionDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 transition-colors font-medium flex items-center justify-between cursor-pointer ${
                            selectedProfession === p.id 
                              ? "bg-blue-50 text-[#2563EB] font-bold" 
                              : "text-[#111827] hover:bg-[#EEF2F7]/50"
                          }`}
                        >
                          <span>{p.label}</span>
                          {selectedProfession === p.id && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Custom domain configuration */}
            <div className="space-y-1.5 text-left pt-1">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Custom Domain mapping</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="clay-input w-full text-xs"
              />
              <p className="text-[10px] text-[#6B7280]">
                Mapping host CNAME to: <code className="bg-[#EEF2F7] dark:bg-slate-900/80 px-1 py-0.5 rounded text-[#2563EB] font-mono font-bold">domains.resumeflow-ai.com</code>
              </p>
            </div>
          </div>

          {/* Design Layout Adjuster Settings */}
          <div className="clay-card p-6 bg-white space-y-5 text-left">
            <div className="flex items-center gap-2 border-b border-[#E5E7EB]/50 pb-2.5">
              <Palette className="w-4.5 h-4.5 text-[#2563EB]" />
              <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">Design & Layout Settings</h3>
            </div>

            {/* Layout picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Page Template Style</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "tech", label: "Minimalist Tech" },
                  { id: "creative", label: "Creative Canvas" },
                  { id: "corporate", label: "Executive Admin" },
                  { id: "freelancer", label: "Independent Service" }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    className={`py-2 px-3 border rounded-xl font-semibold text-center transition-all cursor-pointer ${
                      layout === l.id 
                        ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB] shadow-xs" 
                        : "border-[#E5E7EB] hover:bg-[#EEF2F7]/50 text-gray-600"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color picker */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Accent Theme Color</label>
              <div className="flex gap-2">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => setAccentColor(c.hex)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${
                      accentColor === c.hex ? "scale-110 border-[#111827] dark:border-white shadow-sm" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Typography selection */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Accent Typography</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: "sans", label: "Modern Sans" },
                  { id: "serif", label: "Classic Serif" },
                  { id: "mono", label: "Developer Mono" }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFontFamily(f.id)}
                    className={`py-2 px-2.5 border rounded-xl font-semibold text-center transition-all cursor-pointer ${
                      fontFamily === f.id 
                        ? "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]" 
                        : "border-[#E5E7EB] hover:bg-[#EEF2F7]/50 text-gray-600"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sections Toggle */}
            <div className="space-y-2 pt-1.5 border-t border-[#E5E7EB]/50">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Visible Page Sections</label>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {Object.keys(visibleSections).map(sect => (
                  <label key={sect} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={(visibleSections as any)[sect]}
                      onChange={(e) => setVisibleSections({ ...visibleSections, [sect]: e.target.checked })}
                      className="rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span className="capitalize font-medium">{sect}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Spacing & Spacing padding details */}
            <div className="grid grid-cols-2 gap-4 pt-1.5 border-t border-[#E5E7EB]/50 text-xs">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Layout Padding</label>
                <select
                  value={spacing}
                  onChange={(e) => setSpacing(e.target.value)}
                  className="clay-input py-1.5 px-2.5 text-xs w-full cursor-pointer"
                >
                  <option value="compact">Compact (Narrow)</option>
                  <option value="comfortable">Comfortable (Standard)</option>
                  <option value="spacious">Spacious (Spacious)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Page Animations</label>
                <select
                  value={animations}
                  onChange={(e) => setAnimations(e.target.value)}
                  className="clay-input py-1.5 px-2.5 text-xs w-full cursor-pointer"
                >
                  <option value="fade">Smooth Fade In</option>
                  <option value="slide">Slide Transition</option>
                  <option value="none">Instant (No Animation)</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column Layout Preview Mockup */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#6B7280]" />
              Live Workspace Preview
            </span>
            <div className="flex bg-[#F1F5F9] dark:bg-slate-900 border border-[#E5E7EB] p-0.5 rounded-lg text-[10px]">
              <button
                onClick={() => setPreviewTheme("light")}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  previewTheme === "light" ? "bg-white text-gray-800 shadow-xs" : "text-gray-400"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setPreviewTheme("dark")}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  previewTheme === "dark" ? "bg-slate-800 text-white shadow-xs" : "text-gray-400"
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="clay-card overflow-hidden bg-white border border-[#E5E7EB] shadow-lg rounded-2xl">
            {/* Browser top header */}
            <div className="bg-[#EEF2F7] dark:bg-slate-900/60 border-b border-[#E5E7EB] px-4 py-2 flex items-center justify-between text-xs text-[#6B7280] select-none">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <span className="font-mono text-[10px] bg-white dark:bg-slate-950 border px-4 py-0.5 rounded-md text-[#111827] dark:text-gray-300 font-semibold truncate max-w-[200px] sm:max-w-md">
                https://{domain}
              </span>
              <div className="w-8"></div>
            </div>

            {/* Interactive Preview Canvas */}
            <div
              className={`p-8 min-h-[460px] text-left transition-all ${getFontFamilyClass()} ${
                previewTheme === "dark" ? "bg-gray-950 text-white" : "bg-white text-gray-900"
              }`}
            >
              {/* Compiler Tech layout layout rendering */}
              {layout === "tech" && (
                <div className={getSpacingClass()}>
                  <header className="flex justify-between items-center border-b border-gray-500/20 pb-4">
                    <span className="font-extrabold text-xs uppercase" style={{ color: accentColor }}>
                      {(resumeData?.name || "Usama jutt").split(" ").map((n: string) => n[0]).join("") + ".DEV"}
                    </span>
                    <div className="flex gap-4 text-[10px] font-bold text-gray-500">
                      {visibleSections.experience && <span>Experience</span>}
                      {visibleSections.projects && <span>Projects</span>}
                      {visibleSections.skills && <span>Skills</span>}
                    </div>
                  </header>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: accentColor }}>Welcome page</span>
                    <h2 className="text-3xl font-black tracking-tight leading-none">
                      Hi, I'm <span style={{ color: accentColor }}>{resumeData?.name || "Usama jutt"}</span>
                    </h2>
                    <h3 className="text-xs font-bold text-gray-400">{resumeData?.title || activeProfessionLabel}</h3>
                    {visibleSections.summary && (
                      <p className={`text-xs font-light leading-relaxed max-w-md ${previewTheme === "dark" ? "text-gray-300" : "text-[#6B7280]"}`}>
                        {resumeData?.summary || "Senior developer building premium systems with modern tools."}
                      </p>
                    )}
                  </div>

                  {visibleSections.experience && (
                    <div className="pt-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 border-l-2 pl-2" style={{ borderLeftColor: accentColor }}>Experience Timeline</h4>
                      <div className="space-y-4">
                        {(resumeData?.experience || []).slice(0, 2).map((exp: any, i: number) => (
                          <div key={i} className="pl-4 border-l border-gray-500/10 relative">
                            <div className="absolute w-1.5 h-1.5 rounded-full -left-[3.5px] top-1" style={{ backgroundColor: accentColor }}></div>
                            <div className="flex justify-between text-[11px] font-bold mb-0.5">
                              <span>{exp.role}</span>
                              <span className="text-gray-400 font-mono font-medium">{exp.duration}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-semibold">{exp.company}</p>
                            <p className="text-[10px] text-gray-400 font-light mt-1 line-clamp-2 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {visibleSections.skills && (
                    <div className="pt-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest mb-3 border-l-2 pl-2" style={{ borderLeftColor: accentColor }}>Tool Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(resumeData?.skills || "React, Next.js, Node.js").split(",").slice(0, 8).map((s: string) => (
                          <span key={s} className="px-2.5 py-1 text-[9px] font-bold rounded-lg border border-gray-500/10 bg-gray-500/5">{s.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Creative Layout rendering */}
              {layout === "creative" && (
                <div className={`text-center flex flex-col justify-between min-h-[380px] ${getSpacingClass()}`}>
                  <header className="flex justify-between items-center border-b border-gray-500/10 pb-4">
                    <span className="font-extrabold text-[10px] tracking-widest uppercase">{(resumeData?.name || "Usama jutt").split(" ").map((n: string) => n[0]).join("") + ".STUDIO"}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Selected Works</span>
                  </header>

                  <div className="space-y-6 max-w-md mx-auto py-6">
                    <h2 className="text-4xl font-black tracking-tight leading-none">
                      Aesthetic layouts, premium <span style={{ color: accentColor }}>visuals</span>.
                    </h2>
                    {visibleSections.summary && (
                      <p className="text-xs font-light text-gray-400 leading-relaxed mx-auto max-w-sm">{resumeData?.summary || "Crafting high-quality pixel layouts and user experiences."}</p>
                    )}
                    <button className="px-5 py-2.5 rounded-full text-[10px] font-bold text-white tracking-wider uppercase cursor-pointer" style={{ backgroundColor: accentColor }}>
                      Get In Touch
                    </button>
                  </div>

                  {visibleSections.projects && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {(resumeData?.projects || []).slice(0, 2).map((proj: any, i: number) => (
                        <div key={i} className="text-left group cursor-pointer">
                          <div className="aspect-video rounded-2xl bg-gray-500/5 border border-gray-500/10 flex items-center justify-center mb-2">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: accentColor }}>{proj.tech.split(",")[0]}</span>
                          </div>
                          <h5 className="text-xs font-bold truncate">{proj.name}</h5>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Corporate Layout rendering */}
              {layout === "corporate" && (
                <div className={getSpacingClass()}>
                  <header className="flex justify-between items-center border-b border-gray-500/10 pb-4 text-xs font-bold">
                    <span>{resumeData?.name || "Usama jutt"}</span>
                    <span className="text-[10px] text-gray-400">{activeProfessionLabel}</span>
                  </header>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                      <h2 className="text-3xl font-extrabold tracking-tight">{resumeData?.name || "Usama jutt"}</h2>
                      <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: accentColor }}>{resumeData?.title || activeProfessionLabel}</span>
                      {visibleSections.summary && (
                        <p className="text-xs leading-relaxed text-gray-400 font-light">{resumeData?.summary || "Experienced corporate executive managing tech platforms."}</p>
                      )}
                    </div>
                    
                    <div className="col-span-1 p-4 rounded-2xl bg-gray-500/5 border border-gray-500/10 text-[10px] space-y-2.5">
                      <h5 className="font-extrabold uppercase tracking-wider text-[9px]">Details</h5>
                      <p className="text-gray-400">Email: <span className="font-bold text-gray-300 block">{resumeData?.email || "usama@stripe.com"}</span></p>
                      <p className="text-gray-400">Location: <span className="font-bold text-gray-300 block">{resumeData?.location || "San Francisco, CA"}</span></p>
                    </div>
                  </div>

                  {visibleSections.experience && (
                    <div className="pt-4 border-t border-gray-500/10">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4">Professional Timeline</h4>
                      <div className="space-y-4">
                        {(resumeData?.experience || []).slice(0, 2).map((exp: any, i: number) => (
                          <div key={i} className="flex gap-4 text-xs">
                            <span className="w-24 text-[10px] font-bold text-gray-500 shrink-0">{exp.duration}</span>
                            <div className="space-y-1">
                              <h5 className="font-bold">{exp.role}</h5>
                              <p className="text-[10px] font-bold" style={{ color: accentColor }}>{exp.company}</p>
                              <p className="text-[10px] text-gray-400 font-light leading-relaxed">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Freelancer Layout rendering */}
              {layout === "freelancer" && (
                <div className={`text-center space-y-8 ${getSpacingClass()}`}>
                  <header className="flex justify-between items-center border-b border-gray-500/10 pb-4">
                    <span className="font-bold text-xs">{resumeData?.name || "Usama jutt"}</span>
                    <button className="px-3.5 py-1.5 rounded-full text-[9px] font-bold text-white cursor-pointer" style={{ backgroundColor: accentColor }}>Hire Me</button>
                  </header>

                  <div className="space-y-4 py-4 max-w-sm mx-auto">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gray-500/10 text-gray-400">Freelance Services</span>
                    <h2 className="text-3xl font-black leading-tight">
                      I deliver custom results in <span style={{ color: accentColor }}>{resumeData?.title || activeProfessionLabel}</span>.
                    </h2>
                    {visibleSections.summary && (
                      <p className="text-xs font-light text-gray-400 leading-relaxed">{resumeData?.summary || "Available for contracted system optimization and application mutations."}</p>
                    )}
                  </div>

                  {visibleSections.projects && (
                    <div className="pt-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-center mb-6">Service Offerings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {(resumeData?.projects || []).slice(0, 2).map((proj: any, i: number) => (
                          <div key={i} className="p-4 rounded-2xl bg-gray-500/5 border border-gray-500/10 text-left">
                            <h5 className="font-bold text-xs mb-1.5">{proj.name}</h5>
                            <p className="text-[10px] text-gray-400 font-light leading-relaxed line-clamp-3">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
