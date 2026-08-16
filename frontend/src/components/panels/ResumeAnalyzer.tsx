"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowLeft, 
  Check, 
  X, 
  FileText, 
  Link2, 
  Mail, 
  MapPin, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  User,
  ShieldAlert,
  HelpCircle,
  FileCheck2,
  TrendingUp,
  Briefcase,
  Linkedin,
  Github,
  ChevronDown
} from "lucide-react";

interface ResumeAnalyzerProps {
  resumeData?: any;
  onNavigate?: (tab: string) => void;
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void;
}

// 12 Target Roles with custom skill/keyword matrices
const ROLES_DATABASE: Record<string, {
  technicalSkills: string[];
  softSkills: string[];
  description: string;
}> = {
  "Lead Software Engineer": {
    technicalSkills: ["aws", "postgresql", "kubernetes", "docker", "microservices", "system design", "redis", "ci/cd", "go", "python", "terraform", "scaling", "architecture", "grpc", "graphql", "sql"],
    softSkills: ["leadership", "mentorship", "agile", "scrum", "collaboration", "communication", "stakeholder management"],
    description: "Responsible for leading engineering teams, designing system architectures, and managing containerized cloud environments."
  },
  "Senior Frontend Developer": {
    technicalSkills: ["react", "typescript", "next.js", "tailwind", "graphql", "playwright", "jest", "webpack", "state management", "responsive design", "web performance", "accessibility", "ui/ux", "html5", "css3", "javascript"],
    softSkills: ["collaboration", "communication", "problem solving", "mentorship", "product focus"],
    description: "Focuses on building rich, interactive, fast user interfaces and responsive web applications with modern JS frameworks."
  },
  "Full Stack Developer": {
    technicalSkills: ["node.js", "react", "postgresql", "express", "mongodb", "typescript", "git", "rest api", "graphql", "docker", "prisma", "unit testing", "aws", "ci/cd", "system architecture"],
    softSkills: ["adaptability", "teamwork", "problem solving", "communication", "time management"],
    description: "Handles both client-side and server-side development, databases, and general application architectures."
  },
  "DevOps & Cloud Engineer": {
    technicalSkills: ["aws", "terraform", "kubernetes", "docker", "jenkins", "github actions", "ansible", "monitoring", "linux", "bash", "prometheus", "grafana", "cloud security", "ci/cd", "nginx", "yaml"],
    softSkills: ["incident response", "collaboration", "troubleshooting", "communication", "risk management"],
    description: "Maintains infrastructure automation, deployment pipelines, container orchestration, and cloud reliability/monitoring."
  },
  "Data Scientist / Data Analyst": {
    technicalSkills: ["python", "sql", "r", "pandas", "numpy", "scikit-learn", "tableau", "power bi", "statistics", "machine learning", "data cleaning", "data visualization", "excel", "a/b testing", "probability"],
    softSkills: ["analytical thinking", "presentation", "business acumen", "communication", "critical thinking"],
    description: "Extracts insights from complex data, builds predictive models, and translates findings into business strategies."
  },
  "Product Manager": {
    technicalSkills: ["roadmapping", "product strategy", "agile", "scrum", "backlog grooming", "analytics", "okrs", "wireframing", "user stories", "stakeholder management", "user research", "sql", "jira", "confluence"],
    softSkills: ["leadership", "empathy", "communication", "prioritization", "influence without authority"],
    description: "Defines product vision, strategy, roadmaps, and translates customer needs into actionable development backlogs."
  },
  "UI/UX Designer": {
    technicalSkills: ["figma", "adobe xd", "wireframing", "prototyping", "user research", "persona", "information architecture", "usability testing", "visual design", "design systems", "typography", "responsive ui", "user flows"],
    softSkills: ["empathy", "storytelling", "collaboration", "communication", "receptive to feedback"],
    description: "Designs user flows, visual mockups, interactive prototypes, and conducts user testing to deliver exceptional UX."
  },
  "QA & Test Automation Engineer": {
    technicalSkills: ["selenium", "cypress", "playwright", "jest", "qa automation", "test plans", "regression testing", "ci/cd", "api testing", "postman", "bug tracking", "jira", "typescript", "load testing"],
    softSkills: ["attention to detail", "analytical thinking", "communication", "problem solving", "patience"],
    description: "Develops automated test suites, writes test plans, identifies bugs, and ensures high software quality."
  },
  "Mobile Developer (iOS/Android)": {
    technicalSkills: ["swift", "swiftui", "kotlin", "flutter", "react native", "ios", "android", "xcode", "android studio", "app store connect", "firebase", "rest apis", "git", "mobile performance"],
    softSkills: ["problem solving", "collaboration", "creativity", "communication", "attention to detail"],
    description: "Creates native or cross-platform mobile apps for iOS and Android, focusing on mobile UX and hardware integration."
  },
  "Cybersecurity Analyst": {
    technicalSkills: ["information security", "threat analysis", "penetration testing", "network security", "siem", "firewalls", "cryptography", "incident response", "vulnerability assessment", "nist", "owasp", "wireshark", "linux"],
    softSkills: ["ethical mindset", "analytical thinking", "communication under pressure", "problem solving", "attention to detail"],
    description: "Monitors networks for security breaches, investigates threats, executes vulnerability assessments, and implements defense systems."
  },
  "Marketing Specialist": {
    technicalSkills: ["seo", "sem", "google analytics", "content strategy", "social media marketing", "email marketing", "copywriting", "lead generation", "crm", "hubspot", "campaign optimization", "ab testing"],
    softSkills: ["creativity", "communication", "analytical thinking", "adaptability", "collaboration"],
    description: "Drives user acquisition, plans and executes digital campaigns, optimizes content for search, and reports on growth analytics."
  }
};

const COMMON_TECH_KEYWORDS = [
  "react", "vue", "angular", "node", "python", "java", "golang", "ruby", "rust", 
  "kubernetes", "docker", "aws", "gcp", "azure", "sql", "nosql", "redis", "graphql", 
  "typescript", "javascript", "c++", "c#", "php", "laravel", "django", "spring", 
  "flask", "express", "postgresql", "mysql", "mongodb", "oracle", "mariadb", "sqlite", 
  "terraform", "ansible", "jenkins", "git", "github", "gitlab", "jira", "agile", 
  "scrum", "kanban", "ci/cd", "rest api", "soap", "microservices", "serverless", 
  "html", "css", "sass", "tailwind", "bootstrap", "webpack", "vite", "next.js", 
  "nuxt", "gatsby", "redux", "mobx", "zustand", "prisma", "sequelize", "mongoose", 
  "selenium", "cypress", "playwright", "jest", "mocha", "chai", "tableau", "power bi", 
  "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras", "spark", 
  "hadoop", "kafka", "elasticsearch", "logstash", "kibana", "swift", "swiftui", 
  "kotlin", "flutter", "react native", "figma", "adobe xd", "sketch", "photoshop", 
  "seo", "sem", "google analytics", "hubspot", "salesforce"
];

const ACTION_VERBS = [
  "architected", "spearheaded", "optimized", "designed", "developed", 
  "implemented", "deployed", "led", "automated", "analyzed", 
  "increased", "decreased", "improved", "created", "built", 
  "orchestrated", "managed", "engineered", "formulated", "streamlined",
  "pioneered", "scaled", "collaborated"
];

const PASSIVE_PHRASES = [
  "was responsible for", "responsible for", "worked on", "assisted with", 
  "helped in", "helped to", "duties included", "duties were", 
  "part of a team that", "participated in", "assisted in"
];

// Helper to count syllables client-side
const countSyllables = (word: string): number => {
  const w = word.toLowerCase().trim();
  if (w.length <= 3) return 1;
  const replaced = w.replace(/(?:es|ed|e)$/, '')
                    .replace(/^y/, '');
  const vowels = replaced.match(/[aeiouy]{1,2}/g);
  return vowels ? vowels.length : 1;
};

// Dynamic helper to inject scripts from CDN
const loadScript = (src: string, globalName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load script on server-side"));
      return;
    }
    if ((window as any)[globalName]) {
      resolve((window as any)[globalName]);
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      const handleLoad = () => resolve((window as any)[globalName]);
      existing.addEventListener('load', handleLoad);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve((window as any)[globalName]);
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

export default function ResumeAnalyzer({ resumeData, onNavigate, showToast }: ResumeAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "sections" | "skills" | "improvements" | "formatting">("overview");
  
  // Settings & inputs
  const [targetRole, setTargetRole] = useState("Lead Software Engineer");
  const [customJD, setCustomJD] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  
  // Active (from Builder) vs Uploaded Resume File
  const [analysisMode, setAnalysisMode] = useState<"active" | "uploaded">("active");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedResumeText, setUploadedResumeText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingParser, setLoadingParser] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis result state
  const [result, setResult] = useState<{
    score: number;
    wordCount: number;
    sentencesCount: number;
    readabilityScore: number;
    avgSentenceLength: number;
    actionVerbCount: number;
    actionVerbFrequency: number;
    foundActionVerbs: string[];
    foundPassivePhrases: string[];
    sections: {
      summary: boolean;
      experience: boolean;
      skills: boolean;
      education: boolean;
      projects: boolean;
      contact: boolean;
    };
    contactDetails: {
      email: boolean;
      phone: boolean;
      location: boolean;
      linkedin: boolean;
      github: boolean;
    };
    matchedTechnicalSkills: string[];
    missingTechnicalSkills: string[];
    matchedSoftSkills: string[];
    missingSoftSkills: string[];
    matchedJdKeywords: string[];
    missingJdKeywords: string[];
    improvements: Array<{
      category: string;
      severity: "High" | "Medium" | "Low";
      issue: string;
      fix: string;
    }>;
  }>({
    score: 70,
    wordCount: 0,
    sentencesCount: 0,
    readabilityScore: 0,
    avgSentenceLength: 0,
    actionVerbCount: 0,
    actionVerbFrequency: 0,
    foundActionVerbs: [],
    foundPassivePhrases: [],
    sections: { summary: false, experience: false, skills: false, education: false, projects: false, contact: false },
    contactDetails: { email: false, phone: false, location: false, linkedin: false, github: false },
    matchedTechnicalSkills: [],
    missingTechnicalSkills: [],
    matchedSoftSkills: [],
    missingSoftSkills: [],
    matchedJdKeywords: [],
    missingJdKeywords: [],
    improvements: []
  });

  // Handle PDF parsing
  const parsePdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const pdfjs = await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
      "pdfjsLib"
    );
    if (!pdfjs) throw new Error("Could not initialize PDF parsing libraries.");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    
    const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  };

  // Handle DOCX parsing
  const parseDocx = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const mammoth = await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
      "mammoth"
    );
    if (!mammoth) throw new Error("Could not initialize Word document parsing libraries.");
    
    const res = await mammoth.extractRawText({ arrayBuffer });
    return res.value;
  };

  // Process uploaded files
  const processFile = async (file: File) => {
    setLoadingParser(true);
    setAnalyzing(true);
    setAnalyzed(false);
    setUploadedFileName(file.name);
    
    try {
      let extractedText = "";
      
      if (file.name.endsWith(".txt")) {
        extractedText = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || "");
          reader.onerror = (err) => reject(err);
          reader.readAsText(file);
        });
      } else if (file.name.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        extractedText = await parsePdf(arrayBuffer);
      } else if (file.name.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        extractedText = await parseDocx(arrayBuffer);
      } else {
        throw new Error("Unsupported file type. Please upload a PDF, DOCX, or TXT file.");
      }
      
      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error("Could not extract text content from the file. Ensure the file is not empty or image-only.");
      }

      setUploadedResumeText(extractedText);
      setAnalysisMode("uploaded");
      
      if (showToast) showToast(`Successfully parsed: ${file.name}`, "success");
    } catch (error: any) {
      console.error(error);
      if (showToast) showToast(error.message || "Failed to parse the file.", "warning");
      setUploadedFileName("");
      setUploadedResumeText("");
      setAnalysisMode("active");
    } finally {
      setLoadingParser(false);
      setAnalyzing(false);
      setAnalyzed(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Re-run dynamic analysis when dependencies change
  useEffect(() => {
    // 1. Gather raw text and metadata based on analysis mode
    let targetText = "";
    
    const sectionsStatus = {
      summary: false,
      experience: false,
      skills: false,
      education: false,
      projects: false,
      contact: false
    };

    const contactStatus = {
      email: false,
      phone: false,
      location: false,
      linkedin: false,
      github: false
    };

    if (analysisMode === "active" && resumeData) {
      const name = resumeData.name || "";
      const title = resumeData.title || "";
      const email = resumeData.email || "";
      const location = resumeData.location || "";
      const summary = resumeData.summary || "";
      const skills = resumeData.skills || "";
      const expText = (resumeData.experience || [])
        .map((exp: any) => `${exp.company} ${exp.role} ${exp.description}`)
        .join(" ");
      const projText = (resumeData.projects || [])
        .map((proj: any) => `${proj.name} ${proj.tech} ${proj.description}`)
        .join(" ");

      targetText = `${name} ${title} ${email} ${location} ${summary} ${skills} ${expText} ${projText}`;

      // Section presence in builder data
      sectionsStatus.summary = !!summary && summary.trim().length > 10;
      sectionsStatus.experience = Array.isArray(resumeData.experience) && resumeData.experience.length > 0;
      sectionsStatus.skills = !!skills && skills.trim().length > 5;
      sectionsStatus.projects = Array.isArray(resumeData.projects) && resumeData.projects.length > 0;
      sectionsStatus.contact = !!email && !!location;

      // Contact details
      contactStatus.email = !!email;
      contactStatus.location = !!location;
      
      // Look for contact items in text fields
      const lowerFull = targetText.toLowerCase();
      contactStatus.phone = /(\+?\d{1,4}[-.\s]??)?(\(?\d{3}\)?[-.\s]??\d{3}[-.\s]??\d{4})/.test(targetText);
      contactStatus.linkedin = /linkedin\.com\/in\//.test(lowerFull);
      contactStatus.github = /github\.com\//.test(lowerFull);

      // Educations check in text (no formal block in builder)
      sectionsStatus.education = /\b(education|university|college|degree|bachelor|master|phd|diploma)\b/i.test(targetText);
    } else {
      // Uploaded Mode
      targetText = uploadedResumeText;
      if (!targetText || targetText.trim().length === 0) {
        return;
      }
      const lower = targetText.toLowerCase();

      // Section check via regex
      sectionsStatus.summary = /\b(summary|objective|profile|about me|professional summary)\b/i.test(targetText);
      sectionsStatus.experience = /\b(experience|work history|employment|professional background|work experience)\b/i.test(targetText);
      sectionsStatus.skills = /\b(skills|technical skills|key skills|competencies|expertise|technologies)\b/i.test(targetText);
      sectionsStatus.education = /\b(education|academic|university|degree|credential|college)\b/i.test(targetText);
      sectionsStatus.projects = /\b(projects|personal projects|academic projects|key projects)\b/i.test(targetText);
      
      // Contact
      contactStatus.email = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(targetText);
      contactStatus.phone = /(\+?\d{1,4}[-.\s]??)?(\(?\d{3}\)?[-.\s]??\d{3}[-.\s]??\d{4})/.test(targetText);
      contactStatus.linkedin = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/.test(lower);
      contactStatus.github = /github\.com\/[a-zA-Z0-9_-]+/.test(lower);
      contactStatus.location = /\b[A-Za-z\s]+,\s[A-Z]{2}\b|\b(london|new york|berlin|tokyo|paris|toronto|sydney|san francisco|chicago|seattle|austin|boston|denver)\b/i.test(targetText);

      sectionsStatus.contact = contactStatus.email && contactStatus.location;
    }

    if (!targetText || targetText.trim().length === 0) {
      return;
    }

    const textLower = targetText.toLowerCase();

    // 2. Readability Statistics
    const words = targetText.split(/\s+/).filter(Boolean).length;
    const sentences = targetText.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
    
    // Syllables check
    const totalSyllables = targetText.split(/\s+/).filter(Boolean).reduce((acc, word) => acc + countSyllables(word), 0);
    const avgSentLength = words / sentences;
    const avgSyllablesPerWord = totalSyllables / words;
    
    let readability = 206.835 - 1.015 * avgSentLength - 84.6 * avgSyllablesPerWord;
    if (readability > 100) readability = 100;
    if (readability < 0) readability = 0;
    const readabilityScore = Math.round(readability * 10) / 10;

    // 3. Verbs Frequency
    const foundVerbs = ACTION_VERBS.filter(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'i');
      return regex.test(targetText);
    });
    
    const foundPassives = PASSIVE_PHRASES.filter(phrase => {
      return textLower.includes(phrase);
    });

    const actionVerbCount = foundVerbs.length;
    const actionVerbFrequency = Math.round((actionVerbCount / Math.max(words, 100)) * 1000) / 10;

    // 4. Role Skill Matching
    const currentRoleData = ROLES_DATABASE[targetRole] || ROLES_DATABASE["Lead Software Engineer"];
    const matchedTech = currentRoleData.technicalSkills.filter(skill => {
      // Escape for special chars (like next.js or c++)
      const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?:\\b|\\s)${escaped}(?:\\b|\\s|,)`, 'i');
      return regex.test(targetText);
    });
    const missingTech = currentRoleData.technicalSkills.filter(skill => !matchedTech.includes(skill));

    const matchedSoft = currentRoleData.softSkills.filter(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'i');
      return regex.test(targetText);
    });
    const missingSoft = currentRoleData.softSkills.filter(skill => !matchedSoft.includes(skill));

    // 5. Custom JD Scanning
    const matchedJd: string[] = [];
    const missingJd: string[] = [];
    if (customJD) {
      const jdWords: string[] = (customJD.toLowerCase().match(/\b\w+([.-]\w+)*\b/g) || []) as string[];
      const uniqJdTech = Array.from(new Set(COMMON_TECH_KEYWORDS.filter(tech => jdWords.includes(tech))));
      
      uniqJdTech.forEach(tech => {
        const escaped = tech.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(?:\\b|\\s)${escaped}(?:\\b|\\s|,)`, 'i');
        if (regex.test(targetText)) {
          matchedJd.push(tech);
        } else {
          missingJd.push(tech);
        }
      });
    }

    // 6. ATS Score Calculation
    let calculatedScore = 0;
    const improvements: Array<{ category: string; severity: "High" | "Medium" | "Low"; issue: string; fix: string }> = [];

    // Section weighting: (Max 25 pts)
    if (sectionsStatus.summary) calculatedScore += 5; else {
      improvements.push({
        category: "Sections",
        severity: "Medium",
        issue: "Summary or Objective section not clearly identifiable",
        fix: "Add a 'Professional Summary' or 'Objective' heading near the top of your resume and write a brief overview of your background."
      });
    }

    if (sectionsStatus.experience) calculatedScore += 5; else {
      improvements.push({
        category: "Sections",
        severity: "High",
        issue: "Missing Professional Experience section",
        fix: "An ATS scans specifically for job titles and durations. Create a section titled 'Work Experience' or 'Professional Experience'."
      });
    }

    if (sectionsStatus.skills) calculatedScore += 5; else {
      improvements.push({
        category: "Sections",
        severity: "High",
        issue: "Technical Skills listing not found",
        fix: "Create a dedicated 'Technical Skills' section list so ATS parsers can quickly index your capabilities."
      });
    }

    if (sectionsStatus.education) calculatedScore += 5; else {
      improvements.push({
        category: "Sections",
        severity: "Medium",
        issue: "Education details missing or keywords not found",
        fix: "Include an 'Education' section specifying your college degrees, major, institution, and graduation dates."
      });
    }

    if (sectionsStatus.projects) calculatedScore += 5; else {
      improvements.push({
        category: "Sections",
        severity: "Low",
        issue: "Projects highlight section missing",
        fix: "Add a 'Projects' section displaying your practical work, tool stacks utilized, and metrics achieved."
      });
    }

    // Contact details: (Max 15 pts)
    let contactPoints = 0;
    if (contactStatus.email) contactPoints += 4; else {
      improvements.push({
        category: "Contact Info",
        severity: "High",
        issue: "Email address not found in resume header",
        fix: "Include a professional email address (e.g., name@domain.com) clearly in your header."
      });
    }

    if (contactStatus.phone) contactPoints += 4; else {
      improvements.push({
        category: "Contact Info",
        severity: "High",
        issue: "Phone contact number is missing",
        fix: "Include your mobile phone number in the contact header so recruiters can schedule screens."
      });
    }

    if (contactStatus.location) contactPoints += 3; else {
      improvements.push({
        category: "Contact Info",
        severity: "Medium",
        issue: "Physical location (City, State) not specified",
        fix: "Specify your current city and state (e.g., San Francisco, CA) to confirm geographic match."
      });
    }

    if (contactStatus.linkedin || contactStatus.github) contactPoints += 4; else {
      improvements.push({
        category: "Contact Info",
        severity: "Medium",
        issue: "Professional links (LinkedIn or GitHub) missing",
        fix: "Add your LinkedIn custom URL or GitHub profile link in your contact section to provide secondary portfolio proofs."
      });
    }
    calculatedScore += contactPoints;

    // Technical Skill Matching: (Max 35 pts)
    const totalTech = currentRoleData.technicalSkills.length;
    const matchedRatio = matchedTech.length / Math.max(totalTech, 1);
    calculatedScore += Math.round(matchedRatio * 30);
    
    // Add soft skill bonus (max 5 pts)
    const softRatio = matchedSoft.length / Math.max(currentRoleData.softSkills.length, 1);
    calculatedScore += Math.round(softRatio * 5);

    // Skill improvements listing
    if (missingTech.length > 0) {
      const top3Missing = missingTech.slice(0, 3).map(s => `'${s.charAt(0).toUpperCase() + s.slice(1)}'`).join(", ");
      improvements.push({
        category: "Keywords",
        severity: "High",
        issue: `Missing core skill keywords for ${targetRole}: ${top3Missing}`,
        fix: `Add these high-value technical keywords (${top3Missing}) to your Skills section or detail your experience using them.`
      });
    }

    // Action verbs and Formatting: (Max 25 pts)
    // 1. Action verbs frequency (10 pts)
    if (actionVerbCount >= 5) {
      calculatedScore += 10;
    } else if (actionVerbCount >= 2) {
      calculatedScore += 5;
      improvements.push({
        category: "Action Verbs",
        severity: "Medium",
        issue: "Low density of strong action verbs",
        fix: `Use strong action verbs like 'Spearheaded', 'Optimized', 'Architected' instead of basic descriptors to start experience points.`
      });
    } else {
      improvements.push({
        category: "Action Verbs",
        severity: "High",
        issue: "Critical lack of action-oriented phrasing",
        fix: "Rewrite bullet points starting each one with a distinct verb showing measurable accomplishments."
      });
    }

    // 2. Passive Phrasing penalties (5 pts)
    if (foundPassives.length === 0) {
      calculatedScore += 5;
    } else {
      calculatedScore += Math.max(0, 5 - foundPassives.length);
      improvements.push({
        category: "Action Verbs",
        severity: "Medium",
        issue: `Passive phrases detected: "${foundPassives.slice(0, 2).join('", "')}"`,
        fix: "Replace passive expressions ('was responsible for scaling') with active, direct phrasing ('Scaled payment checkout pipelines')."
      });
    }

    // 3. Word count layout checking (10 pts)
    if (words >= 350 && words <= 850) {
      calculatedScore += 10;
    } else if ((words >= 200 && words < 350) || (words > 850 && words <= 1200)) {
      calculatedScore += 5;
      improvements.push({
        category: "Formatting",
        severity: "Low",
        issue: `Resume word count is sub-optimal (${words} words)`,
        fix: words < 350 
          ? "Elaborate more on your project outcomes, tools utilized, and specific task deliverables to hit the sweet spot of 450-700 words."
          : "Your resume is slightly verbose. Consider condensing bullet points and removing redundant adjectives to maintain readability."
      });
    } else {
      improvements.push({
        category: "Formatting",
        severity: "Medium",
        issue: `Critical word count issues detected (${words} words)`,
        fix: words < 200
          ? "Your resume is extremely short. Ensure you have detailed descriptions under each job and projects."
          : "Your resume exceeds 1200 words. Cut older experience or focus solely on relevant highlights; ATS filters prioritize succinct files."
      });
    }

    // Custom JD Match score modifier
    if (customJD && missingJd.length > 0) {
      // Subtract small penalty or add improvement card
      const missingShow = missingJd.slice(0, 4).map(s => `'${s}'`).join(", ");
      improvements.push({
        category: "Job Description Match",
        severity: "High",
        issue: `Missing custom JD tech requirements: ${missingShow}`,
        fix: `Review the job posting details and incorporate these technical terms: ${missingShow} directly in your summary or resume details.`
      });
    }

    // Cap score at 99%, floor at 20%
    if (calculatedScore > 99) calculatedScore = 99;
    if (calculatedScore < 20) calculatedScore = 20;

    // Sort improvements so high priority are at the top
    const sortedImprovements = [...improvements].sort((a, b) => {
      const priority = { High: 3, Medium: 2, Low: 1 };
      return priority[b.severity] - priority[a.severity];
    });

    setResult({
      score: calculatedScore,
      wordCount: words,
      sentencesCount: sentences,
      readabilityScore,
      avgSentenceLength: Math.round(avgSentLength * 10) / 10,
      actionVerbCount,
      actionVerbFrequency,
      foundActionVerbs: foundVerbs,
      foundPassivePhrases: foundPassives,
      sections: sectionsStatus,
      contactDetails: contactStatus,
      matchedTechnicalSkills: matchedTech,
      missingTechnicalSkills: missingTech,
      matchedSoftSkills: matchedSoft,
      missingSoftSkills: missingSoft,
      matchedJdKeywords: matchedJd,
      missingJdKeywords: missingJd,
      improvements: sortedImprovements
    });
  }, [resumeData, targetRole, customJD, uploadedResumeText, analysisMode]);

  const score = result.score;
  const improvements = result.improvements;

  // Render score colors
  const getScoreColor = (val: number) => {
    if (val >= 80) return "#16A34A"; // green
    if (val >= 60) return "#F59E0B"; // amber
    return "#DC2626"; // red
  };

  const getScoreBg = (val: number) => {
    if (val >= 80) return "bg-green-50 text-[#16A34A] border-green-200";
    if (val >= 60) return "bg-amber-50 text-[#F59E0B] border-amber-200";
    return "bg-red-50 text-[#DC2626] border-red-200";
  };

  const getScoreRatingText = (val: number) => {
    if (val >= 80) return "Strong ATS Match";
    if (val >= 60) return "Moderate Match";
    return "Weak ATS Compliance";
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

      {/* Hero Header */}
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">ATS Resume Analyzer</h1>
          <p className="text-sm text-[#6B7280]">Analyze formatting, keyword counts, sections check, and active phrasing in real-time.</p>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl border border-[#E5E7EB] self-start md:self-center">
          <button
            onClick={() => setAnalysisMode("active")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              analysisMode === "active"
                ? "bg-white text-[#2563EB] shadow-xs"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            Active Builder Resume
          </button>
          <button
            onClick={() => setAnalysisMode("uploaded")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              analysisMode === "uploaded"
                ? "bg-white text-[#2563EB] shadow-xs"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            Upload Resume File
          </button>
        </div>
      </div>

      {/* Configurations & Upload Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Parameters: Left 1 Col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
              <Briefcase className="w-4 h-4 text-[#2563EB]" />
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Analysis Profile</h3>
            </div>
            
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Target Job Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="clay-input w-full text-xs font-semibold text-[#111827] flex justify-between items-center bg-white cursor-pointer"
                >
                  <span className="truncate pr-2">{targetRole}</span>
                  <ChevronDown className="w-4 h-4 text-[#6B7280] shrink-0" />
                </button>
                {roleDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto text-xs py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      {Object.keys(ROLES_DATABASE).map(role => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setTargetRole(role);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 transition-colors font-medium flex items-center justify-between cursor-pointer ${
                            targetRole === role 
                              ? "bg-blue-50 text-[#2563EB] font-bold" 
                              : "text-[#111827] hover:bg-[#EEF2F7]/50"
                          }`}
                        >
                          <span>{role}</span>
                          {targetRole === role && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <p className="text-[10px] text-[#6B7280] leading-relaxed mt-1">
                {ROLES_DATABASE[targetRole]?.description}
              </p>
            </div>

            <div className="space-y-1.5 text-left pt-2">
              <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Custom Job Description (Optional)</label>
              <textarea
                value={customJD}
                onChange={(e) => setCustomJD(e.target.value)}
                placeholder="Paste the target job description here to compare customized tools and tech stack requirements in real-time..."
                rows={5}
                className="clay-input w-full text-xs"
              />
            </div>
          </div>
        </div>

        {/* Selected Data / File Drop Area: Right 2 Cols */}
        <div className="lg:col-span-2">
          {analysisMode === "active" ? (
            <div className="clay-card p-6 bg-white h-full flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                    <div>
                      <h3 className="font-extrabold text-sm text-[#111827]">Active Builder Workspace Data</h3>
                      <p className="text-[10px] text-[#6B7280]">Connected to your AI Resume Builder inputs</p>
                    </div>
                  </div>
                  {onNavigate && (
                    <button 
                      onClick={() => onNavigate("builder")}
                      className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 transition-all"
                    >
                      Open Builder <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {resumeData ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p className="text-[#6B7280]"><strong>Full Name:</strong> <span className="text-[#111827] font-semibold">{resumeData.name || "Not Specified"}</span></p>
                      <p className="text-[#6B7280]"><strong>Headline Title:</strong> <span className="text-[#111827] font-semibold">{resumeData.title || "Not Specified"}</span></p>
                      <p className="text-[#6B7280]"><strong>Email Address:</strong> <span className="text-[#111827] font-semibold">{resumeData.email || "Not Specified"}</span></p>
                      <p className="text-[#6B7280]"><strong>Location City:</strong> <span className="text-[#111827] font-semibold">{resumeData.location || "Not Specified"}</span></p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#6B7280]"><strong>Tech Skills Count:</strong> <span className="text-[#111827] font-semibold">{(resumeData.skills || "").split(",").filter(Boolean).length} skills</span></p>
                      <p className="text-[#6B7280]"><strong>Experience Blocks:</strong> <span className="text-[#111827] font-semibold">{(resumeData.experience || []).length} items</span></p>
                      <p className="text-[#6B7280]"><strong>Projects Highlights:</strong> <span className="text-[#111827] font-semibold">{(resumeData.projects || []).length} items</span></p>
                      <p className="text-[#6B7280]"><strong>Summary Size:</strong> <span className="text-[#111827] font-semibold">{(resumeData.summary || "").length} characters</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-[#6B7280] border border-dashed border-[#E5E7EB] rounded-xl bg-gray-50/50">
                    No active resume data found in the builder workspace. Go write one or upload a file!
                  </div>
                )}
              </div>

              <div className="bg-[#EEF2F7]/50 rounded-xl p-3.5 border border-[#E5E7EB] flex items-start gap-2.5 text-xs text-[#6B7280] text-left mt-6">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <p>
                  Any updates made inside the <strong>AI Resume Builder</strong> panel are immediately analyzed in real-time here. Toggle to <strong>Upload Resume File</strong> to scan external PDF or Word documents.
                </p>
              </div>
            </div>
          ) : (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`clay-card p-6 bg-white h-full flex flex-col justify-between border-2 border-dashed transition-all ${
                isDragOver ? "border-[#2563EB] bg-blue-50/10" : "border-[#2563EB]/20"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4.5 h-4.5 text-[#2563EB]" />
                    <div>
                      <h3 className="font-extrabold text-sm text-[#111827]">Upload Custom Resume Document</h3>
                      <p className="text-[10px] text-[#6B7280]">Extract and scan plain text in real-time</p>
                    </div>
                  </div>
                  {uploadedFileName && (
                    <button 
                      onClick={() => {
                        setUploadedFileName("");
                        setUploadedResumeText("");
                        if (showToast) showToast("File removed.", "info");
                      }}
                      className="text-xs font-bold text-[#DC2626] hover:underline"
                    >
                      Reset Upload
                    </button>
                  )}
                </div>

                {uploadedFileName ? (
                  <div className="p-4 rounded-xl border border-green-200 bg-green-50/30 flex items-center justify-between text-xs text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">
                        {uploadedFileName.split('.').pop()?.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111827] truncate max-w-[250px] sm:max-w-md">{uploadedFileName}</h4>
                        <p className="text-[10px] text-green-700 font-medium">Text successfully extracted & matching ATS</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-bold text-green-700 bg-green-100/60 px-2.5 py-0.5 rounded-full text-[10px]">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <UploadCloud className="w-12 h-12 text-[#2563EB] mb-2 animate-bounce" />
                    <h4 className="font-bold text-sm text-[#111827] mb-1">Drag and drop your file here</h4>
                    <p className="text-xs text-[#6B7280] mb-3">Supports PDF, DOCX, and TXT (Max 5MB)</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="clay-btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                    >
                      Browse Files
                    </button>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt"
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {loadingParser ? (
                <div className="flex items-center gap-2 justify-center py-2.5 text-xs text-[#2563EB] font-bold">
                  <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
                  <span>Extracting document metadata...</span>
                </div>
              ) : (
                <div className="bg-indigo-50/30 rounded-xl p-3.5 border border-[#E5E7EB] flex items-start gap-2.5 text-xs text-[#6B7280] text-left mt-6">
                  <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p>
                    No document data is stored permanently. Text is processed and analyzed entirely within your browser client session for complete data privacy.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Analysis Output Layout */}
      {analyzed && !analyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Col 1: Score Circle & Reading Ease Matrix */}
          <div className="space-y-6">
            
            {/* Score circle card */}
            <div className="clay-card p-6 bg-white text-center relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span title="ATS compliance algorithm evaluates sections, keyword density, soft skills and verb styling.">
                  <HelpCircle className="w-4 h-4 text-[#6B7280] hover:text-[#111827] cursor-pointer" />
                </span>
              </div>
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-4">ATS Compatibility Score</span>
              
              {/* Radial score circle */}
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
                    stroke={getScoreColor(score)}
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

              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${getScoreBg(score)}`}>
                {getScoreRatingText(score)}
              </span>
            </div>

            {/* Readability Metrics */}
            <div className="clay-card p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Readability Matrix</h3>
              </div>
              <div className="space-y-3 text-xs text-left">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Flesch Reading Ease</span>
                  <span className="font-bold text-[#111827]">
                    {result.readabilityScore} 
                    <span className="text-[10px] text-[#6B7280] font-normal ml-1">
                      ({result.readabilityScore >= 70 ? "Easy" : result.readabilityScore >= 50 ? "Average" : "Difficult"})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Average Sentence Length</span>
                  <span className="font-bold text-[#111827]">
                    {result.avgSentenceLength} words
                    <span className="text-[10px] text-[#6B7280] font-normal ml-1">
                      ({result.avgSentenceLength <= 18 && result.avgSentenceLength >= 11 ? "Ideal" : "Improve"})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40">
                  <span className="text-[#6B7280]">Action Verb Frequency</span>
                  <span className="font-bold text-[#111827]">
                    {result.actionVerbFrequency}%
                    <span className="text-[10px] text-[#6B7280] font-normal ml-1">
                      ({result.actionVerbCount} found)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Total Word Count</span>
                  <span className="font-bold text-[#111827]">
                    {result.wordCount} words
                    <span className="text-[10px] text-[#6B7280] font-normal ml-1">
                      ({result.wordCount >= 350 && result.wordCount <= 850 ? "Ideal" : "Sub-optimal"})
                    </span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Col 2 & 3: Detailed Interactive Tabs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs Selector Card */}
            <div className="clay-card bg-white overflow-hidden text-left">
              
              {/* Tab headers */}
              <div className="flex flex-wrap border-b border-[#E5E7EB] dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 text-xs font-semibold text-[#6B7280] dark:text-slate-400">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === "overview" ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white font-bold" : "border-transparent hover:text-[#111827] dark:hover:text-slate-200"
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab("sections")}
                  className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === "sections" ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white font-bold" : "border-transparent hover:text-[#111827] dark:hover:text-slate-200"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Sections Audit
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === "skills" ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white font-bold" : "border-transparent hover:text-[#111827] dark:hover:text-slate-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Skills Match
                </button>
                <button
                  onClick={() => setActiveTab("improvements")}
                  className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === "improvements" ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white font-bold" : "border-transparent hover:text-[#111827] dark:hover:text-slate-200"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Recommendations ({improvements.length})
                </button>
                <button
                  onClick={() => setActiveTab("formatting")}
                  className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === "formatting" ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white font-bold" : "border-transparent hover:text-[#111827] dark:hover:text-slate-200"
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Formatting & Verbs
                </button>
              </div>

              {/* Tab contents */}
              <div className="p-6">
                
                {/* 1. Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-[#111827]">ATS Analysis Summary</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Scanning your resume for the <strong className="text-[#2563EB] font-bold">{targetRole}</strong> profile reveals that your resume is 
                        <strong> {score >= 80 ? "fully ready for ATS filters" : score >= 60 ? "moderately prepared but has missing keywords" : "critically lacking required keywords and sections"}</strong>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Section checklist indicators */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-[#E5E7EB] space-y-3">
                        <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Required Sections</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(result.sections).map(([sect, passed]) => (
                            <div key={sect} className="flex items-center gap-1.5">
                              {passed ? (
                                <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              )}
                              <span className={`capitalize ${passed ? "text-[#111827] font-medium" : "text-[#6B7280]"}`}>{sect}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Score metrics highlights */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-[#E5E7EB] space-y-3 text-xs">
                        <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Scoring Breakdown</h4>
                        <div className="space-y-1.5 text-[#6B7280]">
                          <div className="flex justify-between">
                            <span>Required Sections (25%):</span>
                            <span className="font-bold text-[#111827]">
                              {Object.values(result.sections).filter(Boolean).length * 5} / 25
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contact Header (15%):</span>
                            <span className="font-bold text-[#111827]">
                              {Object.values(result.contactDetails).filter(Boolean).length * 3} / 15
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Role Skills Match (35%):</span>
                            <span className="font-bold text-[#111827]">
                              {Math.round((result.matchedTechnicalSkills.length / Math.max(ROLES_DATABASE[targetRole]?.technicalSkills.length || 1, 1)) * 30)} / 30
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Verbs & Formatting (25%):</span>
                            <span className="font-bold text-[#111827]">
                              {(result.wordCount >= 350 && result.wordCount <= 850 ? 10 : 5) + (result.actionVerbCount >= 5 ? 10 : 5) + (result.foundPassivePhrases.length === 0 ? 5 : 2)} / 25
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/20 text-xs text-[#2563EB] leading-relaxed flex items-start gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <p>
                        <strong>Quick Fix:</strong> Incorporate the missing technical and soft skills keywords under the <strong>Skills Match</strong> tab, and convert any passive phrasing highlighted under the <strong>Formatting & Verbs</strong> tab to gain immediate score boosts.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Sections Audit Tab */}
                {activeTab === "sections" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-[#111827]">Document Layout & Sections Check</h3>
                      <p className="text-xs text-[#6B7280]">ATS algorithms must segment your resume text into specific layout sections to index correctly.</p>
                    </div>

                    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden text-xs">
                      
                      {/* Section rows */}
                      <div className="divide-y divide-[#E5E7EB]">
                        {Object.entries(result.sections).map(([sect, passed]) => (
                          <div key={sect} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-gray-50/30">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${passed ? "bg-green-500" : "bg-red-500"}`}></span>
                              <span className="font-extrabold capitalize text-[#111827]">{sect} Section</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                                passed ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                              }`}>
                                {passed ? "Detected (OK)" : "Missing / Needs Verification"}
                              </span>
                              <p className="text-[11px] text-[#6B7280] max-w-sm text-left">
                                {sect === "summary" && "Introduces professional highlights and key technologies."}
                                {sect === "experience" && "Shows job history, titles, dates, and quantitative bullets."}
                                {sect === "skills" && "Enables search engines to index core tools and methodologies."}
                                {sect === "education" && "Indicates academic history, graduation details, and credential matching."}
                                {sect === "projects" && "Displays execution skills, tech implementations and real-world outcomes."}
                                {sect === "contact" && "Contains links, location, phone, and professional email."}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Contact Details Header audit */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Contact Info Completeness</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {Object.entries(result.contactDetails).map(([key, ok]) => (
                          <div key={key} className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 ${
                            ok ? "bg-green-50/20 border-green-200 text-[#16A34A]" : "bg-red-50/10 border-red-100 text-gray-400"
                          }`}>
                            {key === "email" && <Mail className="w-4.5 h-4.5" />}
                            {key === "phone" && <Phone className="w-4.5 h-4.5" />}
                            {key === "location" && <MapPin className="w-4.5 h-4.5" />}
                            {key === "linkedin" && <Linkedin className="w-4.5 h-4.5" />}
                            {key === "github" && <Github className="w-4.5 h-4.5" />}
                            <span className="text-[10px] capitalize font-bold text-[#111827]">{key}</span>
                            <span className="text-[9px] font-medium">
                              {ok ? "Complete" : "Missing"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Skills Match Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-[#111827]">{targetRole} Keywords Match</h3>
                      <p className="text-xs text-[#6B7280]">ATS algorithms filter candidates based on keyword frequency and skill matches.</p>
                    </div>

                    {/* Technical Skills grid */}
                    <div className="space-y-3.5 text-left">
                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-[#2563EB] rounded-xs inline-block"></span>
                        Technical Keywords Database
                      </h4>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        {/* Matched skills */}
                        {result.matchedTechnicalSkills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 font-medium flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            {skill}
                          </span>
                        ))}
                        {/* Missing skills */}
                        {result.missingTechnicalSkills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 font-medium flex items-center gap-1 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors">
                            <X className="w-3.5 h-3.5 text-gray-400" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills grid */}
                    <div className="space-y-3.5 text-left pt-2">
                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-indigo-500 rounded-xs inline-block"></span>
                        Professional / Soft Skills
                      </h4>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        {/* Matched */}
                        {result.matchedSoftSkills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 font-medium flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            {skill}
                          </span>
                        ))}
                        {/* Missing */}
                        {result.missingSoftSkills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 font-medium flex items-center gap-1 hover:bg-red-50/50">
                            <X className="w-3.5 h-3.5 text-gray-400" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Custom JD Matching analysis */}
                    {customJD && (
                      <div className="p-4 rounded-xl bg-indigo-50/20 border border-indigo-100 text-left space-y-3">
                        <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-indigo-500" />
                          Custom Job Post Tech Requirements
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5 text-xs">
                          {result.matchedJdKeywords.map(kw => (
                            <span key={kw} className="px-2.5 py-0.5 rounded-full bg-green-100/60 text-green-800 text-[11px] font-semibold">
                              {kw} (Found)
                            </span>
                          ))}
                          {result.missingJdKeywords.map(kw => (
                            <span key={kw} className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] border border-red-200 font-semibold">
                              {kw} (Missing)
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 4. Actionable Recommendations Tab */}
                {activeTab === "improvements" && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-[#111827]">Required Improvements ({improvements.length})</h3>
                      <p className="text-xs text-[#6B7280]">Complete these items step-by-step to maximize your score and bypass screen boundaries.</p>
                    </div>

                    {improvements.length > 0 ? (
                      <div className="space-y-4">
                        {improvements.map((imp, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-[#E5E7EB] hover:border-gray-300 transition-all space-y-2">
                            <div className="flex justify-between items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-extrabold uppercase text-[#2563EB] tracking-wide">
                                {imp.category}
                              </span>
                              <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                imp.severity === "High" ? "bg-red-50 text-red-700 border-red-200" :
                                imp.severity === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-gray-50 text-gray-600 border-gray-200"
                              }`}>
                                {imp.severity} Impact
                              </span>
                            </div>

                            <h4 className="font-extrabold text-sm text-[#111827]">{imp.issue}</h4>
                            <p className="text-xs text-[#6B7280] leading-relaxed bg-white p-2.5 rounded-lg border border-[#E5E7EB]/50 flex items-start gap-2 italic">
                              <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                              <span><strong>Recommendation:</strong> {imp.fix}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center text-green-700 bg-green-50/20 border border-green-200 rounded-xl space-y-2">
                        <CheckCircle2 className="w-8 h-8 mx-auto text-green-600" />
                        <h4 className="font-bold text-sm">Perfect ATS compliance!</h4>
                        <p className="text-xs text-green-800">Your resume meets all our automated structural and skill requirements.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Formatting & Verbs Inspector Tab */}
                {activeTab === "formatting" && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-[#111827]">Verb Styling & Active Phrasing</h3>
                      <p className="text-xs text-[#6B7280]">Recruiters and ATS scanners look for action-oriented descriptions of measurable impact.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Active Verbs list */}
                      <div className="p-4 rounded-xl border border-green-200 bg-green-50/20 space-y-3 text-xs">
                        <h4 className="font-bold text-[#111827] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Found Action Verbs ({result.foundActionVerbs.length})
                        </h4>
                        
                        {result.foundActionVerbs.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {result.foundActionVerbs.map(verb => (
                              <span key={verb} className="px-2 py-0.5 rounded-md bg-white border border-green-300 font-semibold text-green-800 capitalize">
                                {verb}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#6B7280] italic">No standard strong action verbs found. Try using words like "Developed", "Executed", "Optimized".</p>
                        )}
                      </div>

                      {/* Passive phrasing warning list */}
                      <div className="p-4 rounded-xl border border-red-200 bg-red-50/10 space-y-3 text-xs">
                        <h4 className="font-bold text-[#111827] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                          <ShieldAlert className="w-4 h-4 text-red-500" />
                          Found Weak / Passive Phrasing ({result.foundPassivePhrases.length})
                        </h4>
                        
                        {result.foundPassivePhrases.length > 0 ? (
                          <div className="space-y-1 text-[#6B7280] text-[11px]">
                            {result.foundPassivePhrases.map((phrase, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <X className="w-3.5 h-3.5 text-red-500" />
                                <span className="font-semibold text-red-700">"{phrase}"</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-green-700 italic">No passive phrases detected! Your phrasing is active and impactful.</p>
                        )}
                      </div>

                    </div>

                    {/* General formatting notes */}
                    <div className="p-4 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs text-[#6B7280] leading-relaxed">
                      <h4 className="font-bold text-[#111827] mb-2 uppercase tracking-wider text-[10px]">ATS Layout Compliance Checklist</h4>
                      <ul className="list-disc pl-5 space-y-1 text-[11px]">
                        <li>Avoid multi-column tables or complex nested grids (sometimes scrambles reading orders).</li>
                        <li>Do not embed images, logos or graphs (ATS parsers read these as blank blocks).</li>
                        <li>Ensure headers and footers contain no critical text (some parser versions skip headers entirely).</li>
                        <li>Always export in standard PDF or DOCX format. Keep the fonts standard (e.g. Inter, Arial, Calibri).</li>
                      </ul>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
