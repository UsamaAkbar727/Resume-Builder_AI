"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface Doc {
  id: string;
  name: string;
  type: string;
  size: string;
  updated: string;
}

export default function DocumentsManager({ onNavigate, showToast }: { onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [docs, setDocs] = useState<Doc[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDocs = localStorage.getItem("resumeflow_docs");
      if (savedDocs) {
        try {
          setDocs(JSON.parse(savedDocs));
        } catch (e) {
          console.error("Error loading docs:", e);
        }
      } else {
        const defaultDocs = [
          { id: "1", name: "Sarah_Jenkins_Resume_Stripe_V2.pdf", type: "Resume", size: "340 KB", updated: "2026-07-28" },
          { id: "2", name: "Stripe_Reference_Letter.pdf", type: "Experience Letter", size: "1.2 MB", updated: "2026-06-15" },
          { id: "3", name: "AWS_Certified_Solutions_Architect.pdf", type: "Certificate", size: "480 KB", updated: "2026-05-10" },
          { id: "4", name: "Google_Offer_Letter_Signed.pdf", type: "Offer Letter", size: "2.1 MB", updated: "2026-07-02" }
        ];
        setDocs(defaultDocs);
        localStorage.setItem("resumeflow_docs", JSON.stringify(defaultDocs));
      }
    }
  }, []);

  // Save to localStorage when docs update
  useEffect(() => {
    if (typeof window !== "undefined" && docs.length > 0) {
      localStorage.setItem("resumeflow_docs", JSON.stringify(docs));
    }
  }, [docs]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let docType = "Other Document";
      const nameLower = file.name.toLowerCase();
      if (nameLower.includes("resume") || nameLower.endsWith(".pdf")) docType = "Resume";
      else if (nameLower.includes("letter")) docType = "Experience Letter";
      else if (nameLower.includes("cert")) docType = "Certificate";

      const newDoc: Doc = {
        id: Date.now().toString(),
        name: file.name,
        type: docType,
        size: file.size > 1024 * 1024 
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
          : `${Math.round(file.size / 1024)} KB`,
        updated: new Date().toISOString().split("T")[0]
      };
      setDocs(prev => [...prev, newDoc]);
      if (showToast) showToast(`Successfully uploaded document: ${file.name}`, "success");
    }
  };

  const handleDelete = (id: string) => {
    const updated = docs.filter(d => d.id !== id);
    setDocs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_docs", JSON.stringify(updated));
    }
    if (showToast) showToast("Document record deleted successfully.", "info");
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

      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Documents Workspace</h1>
          <p className="text-sm text-[#6B7280]">Manage resume revisions, offer sheets, corporate experience letters, and certifications.</p>
        </div>
        <label className="clay-btn-primary px-4 py-2.5 text-xs text-white cursor-pointer inline-flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all">
          <input type="file" onChange={handleFileUpload} className="hidden" />
          <span>+ Upload File</span>
        </label>
      </div>

      <div className="clay-card p-6 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-semibold uppercase tracking-wider">
                <th className="pb-3">File Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">File Size</th>
                <th className="pb-3">Modified</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#EEF2F7]/30 transition-colors">
                  <td className="py-3.5 font-semibold text-[#111827]">{doc.name}</td>
                  <td className="py-3.5">
                    <span className="bg-[#EEF2F7] text-[#111827] px-2 py-0.5 rounded text-[10px] font-semibold">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#6B7280]">{doc.size}</td>
                  <td className="py-3.5 text-[#6B7280]">{doc.updated}</td>
                  <td className="py-3.5 text-right space-x-3">
                    <button
                      onClick={() => {
                        const element = document.createElement("a");
                        const file = new Blob([`ResumeFlow AI Workspace\nDocument: ${doc.name}\nType: ${doc.type}\nFile Size: ${doc.size}\nLast Modified: ${doc.updated}`], {type: 'text/plain'});
                        element.href = URL.createObjectURL(file);
                        element.download = doc.name.endsWith(".pdf") ? doc.name.replace(".pdf", ".txt") : `${doc.name}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        if (showToast) showToast(`Downloading document details for: ${doc.name}`, "success");
                      }}
                      className="text-[#2563EB] hover:underline font-semibold text-xs"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-[#DC2626] hover:underline font-semibold text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
