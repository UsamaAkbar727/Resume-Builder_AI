"use client";

import React, { useState } from "react";

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  salary: string;
  location: string;
  priority: "High" | "Medium" | "Low";
  notes?: string;
  deadline?: string;
}

interface TrackerProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

type Column = "Wishlist" | "Applied" | "Interview" | "Offer" | "Rejected";

export default function JobTracker({ jobs, setJobs }: TrackerProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [editingNotes, setEditingNotes] = useState("");

  const columns: Column[] = ["Wishlist", "Applied", "Interview", "Offer", "Rejected"];

  const handleMove = (jobId: string, targetStatus: Column) => {
    const updated = jobs.map((job) => {
      if (job.id === jobId) {
        const updatedJob = { ...job, status: targetStatus };
        if (selectedJob?.id === jobId) {
          setSelectedJob(updatedJob);
        }
        return updatedJob;
      }
      return job;
    });
    setJobs(updated);
  };

  const handleAddJob = () => {
    const newJob: Job = {
      id: Date.now().toString(),
      company: "Google",
      role: "Frontend Engineer",
      status: "Wishlist",
      salary: "$180,000",
      location: "Mountain View, CA",
      priority: "Medium",
      notes: "Referral submitted by engineering lead.",
      deadline: "2026-09-15"
    };
    setJobs([...jobs, newJob]);
  };

  const handleSaveNotes = () => {
    if (selectedJob) {
      const updated = jobs.map((j) => {
        if (j.id === selectedJob.id) {
          const updatedJob = { ...j, notes: editingNotes };
          setSelectedJob(updatedJob);
          return updatedJob;
        }
        return j;
      });
      setJobs(updated);
      alert("Notes updated successfully!");
    }
  };

  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter((j) => j.id !== jobId));
    setSelectedJob(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Job Search Tracker</h1>
          <p className="text-sm text-[#6B7280]">Organize your interviews, applications, and negotiations on a Kanban board.</p>
        </div>
        <button onClick={handleAddJob} className="clay-btn-primary px-4 py-2.5 text-xs text-white">
          + Add Custom Application
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {columns.map((col) => {
          const colJobs = jobs.filter((j) => j.status === col);
          return (
            <div key={col} className="space-y-4 bg-[#EEF2F7]/50 p-4 rounded-2xl border border-[#E5E7EB]/50 min-h-[480px]">
              <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-2">
                <span className="font-bold text-xs text-[#111827] uppercase tracking-wider">{col}</span>
                <span className="text-[10px] bg-[#EEF2F7] border border-[#E5E7EB] px-2 py-0.5 rounded-full font-bold text-[#6B7280]">
                  {colJobs.length}
                </span>
              </div>

              <div className="space-y-3">
                {colJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setEditingNotes(job.notes || "");
                    }}
                    className="clay-card p-4 bg-white hover:border-[#2563EB]/40 cursor-pointer space-y-3 text-left relative"
                  >
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-[#111827] truncate">{job.company}</h4>
                      <p className="text-[11px] text-[#6B7280] truncate">{job.role}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${
                        job.priority === "High" ? "bg-red-50 text-[#DC2626] border-red-200" :
                        job.priority === "Medium" ? "bg-amber-50 text-[#F59E0B] border-amber-200" :
                        "bg-green-50 text-[#16A34A] border-green-200"
                      }`}>
                        {job.priority} Priority
                      </span>
                      <span className="text-[10px] font-semibold text-[#111827]">{job.salary}</span>
                    </div>

                    {/* Move triggers helper */}
                    <div className="flex gap-1.5 border-t border-[#E5E7EB]/50 pt-2 text-[10px]" onClick={(e) => e.stopPropagation()}>
                      {columns.map((colName) => {
                        if (colName !== col) {
                          return (
                            <button
                              key={colName}
                              onClick={() => handleMove(job.id, colName)}
                              title={`Move to ${colName}`}
                              className="text-[#2563EB] hover:underline font-semibold"
                            >
                              {colName.charAt(0)}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Detail Drawer */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-start border-b border-[#E5E7EB] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">{selectedJob.company}</h3>
                  <p className="text-xs text-[#6B7280] font-medium">{selectedJob.role}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
                >
                  ✕ Close
                </button>
              </div>

              {/* Job Parameters */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7280] block mb-1">Location</span>
                  <span className="font-semibold">{selectedJob.location}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Salary Range</span>
                  <span className="font-semibold">{selectedJob.salary}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Board Stage</span>
                  <span className="font-semibold uppercase text-[#2563EB]">{selectedJob.status}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Application Deadline</span>
                  <span className="font-semibold">{selectedJob.deadline || "None"}</span>
                </div>
              </div>

              {/* Action columns */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#6B7280] block">Change Stage</span>
                <div className="flex flex-wrap gap-1.5">
                  {columns.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleMove(selectedJob.id, c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedJob.status === c ? "bg-[#2563EB] text-white border-[#2563EB]" : "border-[#E5E7EB] hover:bg-[#EEF2F7]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Editor */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#6B7280] block">Application Notes</label>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="clay-input w-full text-xs leading-relaxed"
                  placeholder="Record application details, interviewer feedback, or system parameters..."
                />
                <button onClick={handleSaveNotes} className="clay-btn-primary px-3 py-1.5 text-xs text-white">
                  Save Notes
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => handleDelete(selectedJob.id)}
                className="clay-btn-danger w-full py-2.5 text-xs text-white"
              >
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
