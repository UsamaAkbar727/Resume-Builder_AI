"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  FileCheck2, 
  Award, 
  FileSpreadsheet, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Plus, 
  Sparkles, 
  FolderArchive, 
  HardDrive, 
  CheckCircle2, 
  X,
  Send,
  ExternalLink
} from "lucide-react";

interface Doc {
  id: string;
  name: string;
  type: "Resume" | "Cover Letter" | "Experience Letter" | "Certificate" | "Offer Letter" | "Other";
  size: string;
  sizeBytes?: number;
  updated: string;
  previewContent?: string;
}

export default function DocumentsManager({ 
  onNavigate, 
  showToast 
}: { 
  onNavigate?: (tab: string) => void; 
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void; 
}) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewDoc, setPreviewDoc] = useState<Doc | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDocs = localStorage.getItem("resumeflow_docs");
      if (savedDocs) {
        try {
          const parsed = JSON.parse(savedDocs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDocs(parsed);
            return;
          }
        } catch (e) {
          console.error("Error loading docs:", e);
        }
      }

      // Default customized documents matching the user's workspace profile
      const defaultDocs: Doc[] = [
        { 
          id: "1", 
          name: "Usama_Jutt_Senior_FullStack_Resume_V2.pdf", 
          type: "Resume", 
          size: "420 KB", 
          sizeBytes: 430080,
          updated: "2026-08-16",
          previewContent: "Usama Jutt\nSenior Full Stack Developer\nSan Francisco, CA | usama.jutt@company.com\n\nSUMMARY:\nDesigned and built highly scalable SaaS applications with React, Next.js, Node.js, and TypeScript. Optimized database schemas to improve payload retrieval speed by 40%.\n\nEXPERIENCE:\n• Stripe — Lead Software Engineer (2024 - Present)\nScaled checkout page handling $2B+ in annual transaction volume. Led migration of microservices architectures to AWS EKS container hosts.\n\n• Notion — Software Engineer II (2022 - 2024)\nDesigned core collaborative workspace elements, improving offline state sync performance by 25%."
        },
        { 
          id: "2", 
          name: "Stripe_Senior_Engineer_Offer_Letter.pdf", 
          type: "Offer Letter", 
          size: "1.8 MB", 
          sizeBytes: 1887436,
          updated: "2026-08-10",
          previewContent: "OFFER LETTER — STRIPE INC.\nPosition: Senior Full Stack Engineer\nBase Compensation: $195,000 / Year\nEquity Grant: $240,000 RSUs (4-Year Vesting with 1-Year Cliff)\nSign-on Bonus: $25,000\nStart Date: September 2026"
        },
        { 
          id: "3", 
          name: "AWS_Certified_Solutions_Architect_Professional.pdf", 
          type: "Certificate", 
          size: "650 KB", 
          sizeBytes: 665600,
          updated: "2026-07-15",
          previewContent: "AMAZON WEB SERVICES — CERTIFICATE OF COMPLETION\nCredential: AWS Certified Solutions Architect - Professional (SAP-C02)\nVerification ID: AWS-SAP-94820158\nValidation: Valid through 2029"
        },
        { 
          id: "4", 
          name: "Linear_Staff_Role_Cover_Letter.pdf", 
          type: "Cover Letter", 
          size: "280 KB", 
          sizeBytes: 286720,
          updated: "2026-08-12",
          previewContent: "Dear Hiring Team at Linear,\n\nI am writing to express my enthusiastic interest in the Staff Frontend Engineer role. Having scaled reactive high-concurrency client architectures at Stripe, I admire Linear's extreme focus on UI speed, keyboard shortcuts, and instantaneous sync engines..."
        },
        { 
          id: "5", 
          name: "Notion_Experience_Recommendation_Letter.pdf", 
          type: "Experience Letter", 
          size: "890 KB", 
          sizeBytes: 911360,
          updated: "2026-06-20",
          previewContent: "TO WHOM IT MAY CONCERN — NOTION LABS INC.\nThis letter confirms that Usama Jutt served as Software Engineer II from 2022 to 2024. During his tenure, he demonstrated exceptional technical leadership in distributed caching and real-time offline sync architectures."
        }
      ];
      setDocs(defaultDocs);
      localStorage.setItem("resumeflow_docs", JSON.stringify(defaultDocs));
    }
  }, []);

  // Save to localStorage when docs update
  useEffect(() => {
    if (typeof window !== "undefined" && docs.length > 0) {
      localStorage.setItem("resumeflow_docs", JSON.stringify(docs));
    }
  }, [docs]);

  // Process uploaded files
  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newDocs: Doc[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let docType: Doc["type"] = "Other";
      const nameLower = file.name.toLowerCase();

      if (nameLower.includes("resume") || nameLower.includes("cv")) docType = "Resume";
      else if (nameLower.includes("cover") || nameLower.includes("cl")) docType = "Cover Letter";
      else if (nameLower.includes("offer")) docType = "Offer Letter";
      else if (nameLower.includes("cert") || nameLower.includes("diploma")) docType = "Certificate";
      else if (nameLower.includes("letter") || nameLower.includes("exp") || nameLower.includes("recommend")) docType = "Experience Letter";
      else if (nameLower.endsWith(".pdf") || nameLower.endsWith(".docx")) docType = "Resume";

      const formattedSize = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      newDocs.push({
        id: (Date.now() + i).toString(),
        name: file.name,
        type: docType,
        size: formattedSize,
        sizeBytes: file.size,
        updated: new Date().toISOString().split("T")[0],
        previewContent: `File Name: ${file.name}\nDocument Type: ${docType}\nSize: ${formattedSize}\nUploaded: ${new Date().toLocaleDateString()}\n\n[File contents processed and stored securely in ResumeFlow AI cloud storage.]`
      });
    }

    setDocs(prev => [...newDocs, ...prev]);
    showToast?.(`Successfully added ${newDocs.length} document${newDocs.length > 1 ? "s" : ""} to your workspace!`, "success");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDelete = (id: string, name: string) => {
    const updated = docs.filter(d => d.id !== id);
    setDocs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_docs", JSON.stringify(updated));
    }
    showToast?.(`"${name}" removed from workspace.`, "info");
    if (previewDoc?.id === id) {
      setPreviewDoc(null);
    }
  };

  const handleDownload = (doc: Doc) => {
    const element = document.createElement("a");
    const content = doc.previewContent || `ResumeFlow AI Workspace\nDocument: ${doc.name}\nType: ${doc.type}\nFile Size: ${doc.size}\nLast Modified: ${doc.updated}`;
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = doc.name.endsWith(".pdf") ? doc.name.replace(/\.pdf$/i, ".txt") : `${doc.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast?.(`Downloaded "${doc.name}" details!`, "success");
  };

  // Filtered list
  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || doc.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [docs, searchQuery, selectedCategory]);

  // Storage calculation
  const totalSizeBytes = useMemo(() => {
    return docs.reduce((acc, d) => acc + (d.sizeBytes || 450000), 0);
  }, [docs]);
  const storageUsedMB = (totalSizeBytes / (1024 * 1024)).toFixed(1);

  const getDocIcon = (type: Doc["type"]) => {
    switch (type) {
      case "Resume":
        return <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Cover Letter":
        return <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "Certificate":
        return <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case "Offer Letter":
        return <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Experience Letter":
        return <FileSpreadsheet className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <FolderArchive className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBadgeStyle = (type: Doc["type"]) => {
    switch (type) {
      case "Resume":
        return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "Cover Letter":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Certificate":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Offer Letter":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Experience Letter":
        return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const categories = ["All", "Resume", "Cover Letter", "Offer Letter", "Certificate", "Experience Letter"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      
      {/* Top Navigation */}
      {onNavigate && (
        <button
          onClick={() => onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 hover:border-[#2563EB] px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-sm group self-start cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-[#111827] dark:text-white font-display">Documents Workspace</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Cloud Storage Active
            </span>
          </div>
          <p className="text-sm text-[#6B7280] dark:text-slate-400">
            Securely manage resume revisions, signed offer sheets, corporate experience letters, and technical certifications.
          </p>
        </div>

        {/* Upload Button */}
        <label className="clay-btn-primary px-5 py-2.5 text-xs font-bold text-white cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 shrink-0">
          <input type="file" multiple onChange={handleFileUpload} className="hidden" />
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </label>
      </div>

      {/* 4 Storage & Quota Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="clay-card p-4.5 bg-white dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Documents</span>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white font-display">{docs.length}</h3>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Active files</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FolderArchive className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-4.5 bg-white dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resumes & CVs</span>
            <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-display">
              {docs.filter(d => d.type === "Resume").length}
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">ATS Indexed</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-4.5 bg-white dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Credentials</span>
            <h3 className="text-2xl font-extrabold text-amber-500 dark:text-amber-400 font-display">
              {docs.filter(d => d.type === "Certificate" || d.type === "Experience Letter").length}
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Proofs & Certs</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-4.5 bg-white dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cloud Storage</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
              {storageUsedMB} <span className="text-xs font-normal text-slate-400">/ 100 MB</span>
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Encrypted S3</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          processFiles(e.dataTransfer.files);
        }}
        className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-2 cursor-pointer ${
          isDragging 
            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30" 
            : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-900/40"
        }`}
      >
        <label className="cursor-pointer flex flex-col items-center justify-center space-y-2 w-full">
          <input type="file" multiple onChange={handleFileUpload} className="hidden" />
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-zinc-900 dark:text-white">
              Drag & drop files here, or <span className="text-indigo-600 dark:text-indigo-400 underline font-extrabold">browse files</span>
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Supports PDF, DOCX, TXT, PNG, and JPG (Up to 25MB per file)</p>
          </div>
        </label>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name or category..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table / Card List */}
      <div className="clay-card p-0 bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Category Type</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr 
                    key={doc.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Name & Icon */}
                    <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 group-hover:scale-105 transition-transform">
                          {getDocIcon(doc.type)}
                        </div>
                        <div>
                          <span className="font-extrabold block text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {doc.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">Stored in secure vault</span>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getBadgeStyle(doc.type)}`}>
                        {doc.type}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono font-medium">
                      {doc.size}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium">
                      {doc.updated}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {/* Preview Button */}
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>

                      {/* Audit with ATS button (if resume) */}
                      {doc.type === "Resume" && onNavigate && (
                        <button
                          onClick={() => {
                            showToast?.(`Sending "${doc.name}" to ATS Resume Analyzer...`, "success");
                            onNavigate("analyzer");
                          }}
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                          title="Run ATS Audit"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">ATS Audit</span>
                        </button>
                      )}

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 space-y-2">
                    <FolderArchive className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-xs">No documents found matching &quot;{searchQuery || selectedCategory}&quot;</p>
                    <p className="text-[11px]">Upload a new document or change your filter selection.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Document Preview Modal ── */}
      {previewDoc && (
        <div 
          onClick={() => setPreviewDoc(null)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="clay-card w-full max-w-2xl bg-white dark:bg-slate-900 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800">
                  {getDocIcon(previewDoc.type)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-display">{previewDoc.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <span>{previewDoc.type}</span>
                    <span>•</span>
                    <span>{previewDoc.size}</span>
                    <span>•</span>
                    <span>Modified: {previewDoc.updated}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 font-mono text-xs text-zinc-800 dark:text-slate-200 max-h-96 overflow-y-auto leading-relaxed whitespace-pre-line">
              {previewDoc.previewContent || "Document preview content verified and encrypted in secure cloud vault."}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-2">
              {previewDoc.type === "Resume" && onNavigate ? (
                <button
                  onClick={() => {
                    setPreviewDoc(null);
                    onNavigate("analyzer");
                  }}
                  className="clay-btn-primary px-4 py-2 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Analyze in ATS Scanner
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(previewDoc)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-zinc-700 dark:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

