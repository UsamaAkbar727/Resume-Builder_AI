"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: string;
  joined: string;
  aiUsage: string; // Token counts
}

export default function AdminPanel({ onNavigate, showToast }: { onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [users, setUsers] = useState<UserRow[]>([
    { id: "1", name: "Sarah Jenkins", email: "sarah@stripe.com", plan: "Pro", joined: "2026-07-10", aiUsage: "48.2k" },
    { id: "2", name: "Michael Chen", email: "m.chen@google.com", plan: "Pro", joined: "2026-07-15", aiUsage: "125.4k" },
    { id: "3", name: "Elena Rostova", email: "elena@yandex.com", plan: "Free", joined: "2026-07-20", aiUsage: "2.1k" },
    { id: "4", name: "David Kim", email: "david.kim@netflix.com", plan: "Enterprise", joined: "2026-07-01", aiUsage: "310.8k" }
  ]);

  const handleAdjustPlan = (userId: string, newPlan: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlan } : u));
    showToast?.("User subscription tier updated!", "success");
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
        <h1 className="text-3xl font-extrabold text-[#111827]">SaaS Admin Operations</h1>
        <p className="text-sm text-[#6B7280]">Review platform usage metrics, user subscriptions status, and Gemini tokens consumption.</p>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <div className="clay-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Total Users</span>
          <h3 className="text-2xl font-extrabold text-[#111827]">1,482</h3>
          <span className="text-[9px] text-[#16A34A] block mt-1">+12% this week</span>
        </div>
        <div className="clay-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Active Subscriptions</span>
          <h3 className="text-2xl font-extrabold text-[#2563EB]">842</h3>
          <span className="text-[9px] text-[#2563EB] block mt-1">Annual retention: 94%</span>
        </div>
        <div className="clay-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Monthly ARR</span>
          <h3 className="text-2xl font-extrabold text-[#16A34A]">$24,910</h3>
          <span className="text-[9px] text-[#16A34A] block mt-1">Target: $30k ARR</span>
        </div>
        <div className="clay-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">AI Tokens Used</span>
          <h3 className="text-2xl font-extrabold text-[#F59E0B]">42.8M</h3>
          <span className="text-[9px] text-[#6B7280] block mt-1">API Cost: $128.40</span>
        </div>
      </div>

      {/* User administration list */}
      <div className="clay-card p-6 bg-white text-left">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-base text-[#111827] uppercase tracking-wider">User Directory</h3>
          <span className="text-xs text-[#6B7280] font-semibold">{users.length} Users Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-semibold uppercase tracking-wider">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Subscription</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">AI Token Usage</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#EEF2F7]/30 transition-colors">
                  <td className="py-3.5 font-semibold text-[#111827]">{u.name}</td>
                  <td className="py-3.5 text-[#6B7280]">{u.email}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      u.plan === "Enterprise" ? "bg-purple-50 text-purple-600 border border-purple-200" :
                      u.plan === "Pro" ? "bg-blue-50 text-[#2563EB] border border-blue-200" :
                      "bg-gray-100 text-[#6B7280]"
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#6B7280]">{u.joined}</td>
                  <td className="py-3.5 font-mono text-[#6B7280]">{u.aiUsage}</td>
                  <td className="py-3.5 text-right space-x-3">
                    <button
                      onClick={() => handleAdjustPlan(u.id, u.plan === "Pro" ? "Free" : "Pro")}
                      className="text-[#2563EB] hover:underline font-semibold text-xs"
                    >
                      Toggle Pro
                    </button>
                    <button
                      onClick={() => showToast?.(`Detailed platform usage logs retrieved for user ID ${u.id}!`, "info")}
                      className="text-gray-500 hover:underline font-semibold text-xs cursor-pointer"
                    >
                      Audit Logs
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
