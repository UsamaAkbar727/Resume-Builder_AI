"use client";

import React, { useState } from "react";

interface Doc {
  id: string;
  name: string;
  type: string;
  size: string;
  updated: string;
}

export default function DocumentsManager() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: "1", name: "Sarah_Jenkins_Resume_Stripe_V2.pdf", type: "Resume", size: "340 KB", updated: "2026-07-28" },
    { id: "2", name: "Stripe_Reference_Letter.pdf", type: "Experience Letter", size: "1.2 MB", updated: "2026-06-15" },
    { id: "3", name: "AWS_Certified_Solutions_Architect.pdf", type: "Certificate", size: "480 KB", updated: "2026-05-10" },
    { id: "4", name: "Google_Offer_Letter_Signed.pdf", type: "Offer Letter", size: "2.1 MB", updated: "2026-07-02" }
  ]);

  const handleUpload = () => {
    const name = prompt("Enter file name to simulate upload:");
    if (name) {
      const newDoc: Doc = {
        id: Date.now().toString(),
        name: name.endsWith(".pdf") ? name : `${name}.pdf`,
        type: "Certificate",
        size: "250 KB",
        updated: new Date().toISOString().split("T")[0]
      };
      setDocs([...docs, newDoc]);
    }
  };

  const handleDelete = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Documents Workspace</h1>
          <p className="text-sm text-[#6B7280]">Manage resume revisions, offer sheets, corporate experience letters, and certifications.</p>
        </div>
        <button onClick={handleUpload} className="clay-btn-primary px-4 py-2.5 text-xs text-white">
          + Upload File
        </button>
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
                      onClick={() => alert(`Downloading file: ${doc.name}!`)}
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
