"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowLeft, 
  Users, 
  CreditCard, 
  DollarSign, 
  Zap, 
  Plus, 
  Search, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Activity,
  FileText,
  KeyRound,
  Sparkles
} from "lucide-react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  role: "Admin" | "Staff" | "User";
  joined: string;
  aiUsage: string; // Token count display
  tokensCount: number;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "auth" | "billing" | "system" | "ai";
}

export default function AdminPanel({ 
  onNavigate, 
  showToast 
}: { 
  onNavigate?: (tab: string) => void; 
  showToast?: (msg: string, type?: "success" | "info" | "warning") => void 
}) {
  // Load current logged-in user
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string }>({
    name: "Usama jutt",
    email: "usama@stripe.com",
  });

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  
  // Modal states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPlan, setNewUserPlan] = useState<"Free" | "Pro" | "Enterprise">("Pro");
  const [newUserRole, setNewUserRole] = useState<"Admin" | "Staff" | "User">("User");

  const [selectedAuditUser, setSelectedAuditUser] = useState<AdminUser | null>(null);

  // Initialize data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      let activeName = "Usama jutt";
      let activeEmail = "usama@stripe.com";

      const savedUser = localStorage.getItem("resumeflow_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name && parsed.name !== "Sarah Jenkins") activeName = parsed.name;
          if (parsed.email && parsed.email !== "sarah@stripe.com") activeEmail = parsed.email;
        } catch (e) {}
      }
      setCurrentUser({ name: activeName, email: activeEmail });

      const savedAdminUsers = localStorage.getItem("resumeflow_admin_users");
      if (savedAdminUsers) {
        try {
          const parsed = JSON.parse(savedAdminUsers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setUsers(parsed);
            return;
          }
        } catch (e) {}
      }

      // Seed with real logged-in user as primary admin
      const initialUsers: AdminUser[] = [
        {
          id: "usr-admin-1",
          name: activeName,
          email: activeEmail,
          plan: "Enterprise",
          role: "Admin",
          joined: "2026-08-01",
          aiUsage: "248.5k",
          tokensCount: 248500
        },
        {
          id: "usr-2",
          name: "Hamza Tariq",
          email: "hamza.t@techsol.io",
          plan: "Pro",
          role: "User",
          joined: "2026-08-05",
          aiUsage: "84.2k",
          tokensCount: 84200
        },
        {
          id: "usr-3",
          name: "Ayesha Malik",
          email: "ayesha.malik@fintech.co",
          plan: "Pro",
          role: "User",
          joined: "2026-08-11",
          aiUsage: "112.9k",
          tokensCount: 112900
        },
        {
          id: "usr-4",
          name: "Bilal Ahmed",
          email: "bilal.ahmed@cloudscale.net",
          plan: "Free",
          role: "User",
          joined: "2026-08-14",
          aiUsage: "14.1k",
          tokensCount: 14100
        }
      ];

      setUsers(initialUsers);
      localStorage.setItem("resumeflow_admin_users", JSON.stringify(initialUsers));
    }
  }, []);

  // Save changes to localStorage
  const saveUsers = (updated: AdminUser[]) => {
    setUsers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_admin_users", JSON.stringify(updated));
    }
  };

  // Real Calculated Dynamic KPIs
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeSubscribers = users.filter(u => u.plan !== "Free").length;
    
    // Compute Monthly ARR: Pro ($19/mo) + Enterprise ($49/mo)
    const monthlyRevenue = users.reduce((acc, curr) => {
      if (curr.plan === "Enterprise") return acc + 49;
      if (curr.plan === "Pro") return acc + 19;
      return acc;
    }, 0);

    const totalTokens = users.reduce((acc, curr) => acc + (curr.tokensCount || 0), 0);
    const formattedTokens = totalTokens > 1000000 
      ? `${(totalTokens / 1000000).toFixed(1)}M` 
      : `${(totalTokens / 1000).toFixed(1)}k`;

    const estimatedApiCost = ((totalTokens / 1000000) * 3.5).toFixed(2);

    return {
      totalUsers,
      activeSubscribers,
      monthlyRevenue,
      formattedTokens,
      estimatedApiCost
    };
  }, [users]);

  // Filtered User list
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlan = filterPlan === "All" || u.plan === filterPlan;
      return matchesSearch && matchesPlan;
    });
  }, [users, searchQuery, filterPlan]);

  // Actions
  const handleTogglePlan = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextPlan: "Free" | "Pro" | "Enterprise" = 
          u.plan === "Free" ? "Pro" : u.plan === "Pro" ? "Enterprise" : "Free";
        return { ...u, plan: nextPlan };
      }
      return u;
    });
    saveUsers(updated);
    showToast?.("User subscription tier updated!", "success");
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (userId === "usr-admin-1" || userName === currentUser.name) {
      showToast?.("Cannot delete active primary administrator.", "warning");
      return;
    }
    const updated = users.filter(u => u.id !== userId);
    saveUsers(updated);
    showToast?.(`Removed user ${userName} from directory.`, "info");
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast?.("Name and email are required.", "warning");
      return;
    }

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      plan: newUserPlan,
      role: newUserRole,
      joined: new Date().toISOString().split("T")[0],
      aiUsage: "0.0k",
      tokensCount: 0
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    setIsAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPlan("Pro");
    setNewUserRole("User");
    showToast?.(`User ${newUser.name} created successfully!`, "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {/* Back button */}
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
      <div className="border-b border-[#E5E7EB] dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-[#111827] dark:text-white font-display">SaaS Admin Operations</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Live Workspace Directory
            </span>
          </div>
          <p className="text-sm text-[#6B7280] dark:text-slate-400">
            Real-time subscriber management, tier allocations, and Gemini token analytics for <strong>{currentUser.name}</strong> ({currentUser.email}).
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="clay-btn-primary px-4 py-2 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Add User Account
        </button>
      </div>

      {/* 4 Real-World KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Real Users */}
        <div className="clay-card p-5 bg-white dark:bg-slate-900 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider block">Total Members</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-extrabold text-[#111827] dark:text-white font-display">{stats.totalUsers}</h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                Live Active
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-slate-400 font-medium">
              Registered in current tenant
            </p>
          </div>
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Active Subscriptions */}
        <div className="clay-card p-5 bg-white dark:bg-slate-900 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider block">Paid Subscribers</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-extrabold text-[#2563EB] dark:text-blue-400 font-display">{stats.activeSubscribers}</h3>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round((stats.activeSubscribers / Math.max(stats.totalUsers, 1)) * 100)}% Rate
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-slate-400 font-medium">
              Pro & Enterprise tiers
            </p>
          </div>
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-[#2563EB] dark:text-blue-400 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Monthly Revenue */}
        <div className="clay-card p-5 bg-white dark:bg-slate-900 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider block">Monthly Run Rate</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">${stats.monthlyRevenue}</h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">/ mo</span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-slate-400 font-medium">
              Annualized: ${(stats.monthlyRevenue * 12).toLocaleString()} ARR
            </p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: AI Tokens Used */}
        <div className="clay-card p-5 bg-white dark:bg-slate-900 dark:border-slate-800 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider block">AI Inference Tokens</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-extrabold text-amber-500 dark:text-amber-400 font-display">{stats.formattedTokens}</h3>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-slate-400 font-medium">
              API Cost: ~${stats.estimatedApiCost}
            </p>
          </div>
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/60 rounded-xl flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Directory Table with Search & Filter */}
      <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 text-left shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB]/60 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-base text-[#111827] dark:text-white uppercase tracking-wider">User Directory</h3>
            <span className="text-xs text-[#6B7280] dark:text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-[#F5F7FB] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700">
              {filteredUsers.length} of {users.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#6B7280] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="clay-input pl-8 pr-3 py-1.5 text-xs w-48 sm:w-56"
              />
            </div>

            {/* Plan Filter */}
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="clay-input py-1.5 px-3 text-xs cursor-pointer"
            >
              <option value="All">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Free">Free</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-slate-800 text-[#6B7280] dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3">User & Identity</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Subscription</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">AI Token Usage</th>
                <th className="pb-3 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isCurrent = u.email === currentUser.email || u.id === "usr-admin-1";
                return (
                  <tr key={u.id} className="hover:bg-[#EEF2F7]/30 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-semibold text-[#111827] dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo-200 dark:border-indigo-800">
                        {u.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{u.name}</span>
                        {isCurrent && (
                          <span className="ml-2 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            You (Admin)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 text-[#6B7280] dark:text-slate-400 font-mono text-xs">{u.email}</td>
                    <td className="py-3.5">
                      <span className="text-[11px] font-bold text-zinc-600 dark:text-slate-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => handleTogglePlan(u.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-transform hover:scale-105 cursor-pointer ${
                          u.plan === "Enterprise" ? "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800" :
                          u.plan === "Pro" ? "bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800" :
                          "bg-gray-100 dark:bg-slate-800 text-[#6B7280] dark:text-slate-300"
                        }`}
                        title="Click to cycle plan (Free -> Pro -> Enterprise)"
                      >
                        {u.plan} ▾
                      </button>
                    </td>
                    <td className="py-3.5 text-[#6B7280] dark:text-slate-400 text-xs">{u.joined}</td>
                    <td className="py-3.5 font-mono text-[#6B7280] dark:text-slate-400 text-xs">{u.aiUsage}</td>
                    <td className="py-3.5 text-right space-x-3">
                      <button
                        onClick={() => setSelectedAuditUser(u)}
                        className="text-[#2563EB] dark:text-blue-400 hover:underline font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Audit Logs</span>
                      </button>
                      {!isCurrent && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-400 dark:text-slate-500">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No users match the search filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Member */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 max-w-md w-full text-left space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-[#111827] dark:text-white uppercase tracking-wider">
                Add Team Member
              </h3>
              <button 
                onClick={() => setIsAddUserOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zain Ali"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. zain@company.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="clay-input w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Plan Tier
                  </label>
                  <select
                    value={newUserPlan}
                    onChange={(e: any) => setNewUserPlan(e.target.value)}
                    className="clay-input w-full text-xs cursor-pointer"
                  >
                    <option value="Free">Free</option>
                    <option value="Pro">Pro ($19/mo)</option>
                    <option value="Enterprise">Enterprise ($49/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Role
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e: any) => setNewUserRole(e.target.value)}
                    className="clay-input w-full text-xs cursor-pointer"
                  >
                    <option value="User">User</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="clay-btn-primary flex-1 py-2.5 text-xs text-white font-bold cursor-pointer"
                >
                  Create Member
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="clay-btn-secondary px-4 py-2.5 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Audit Logs */}
      {selectedAuditUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="clay-card p-6 bg-white dark:bg-slate-900 dark:border-slate-800 max-w-lg w-full text-left space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#111827] dark:text-white uppercase tracking-wider">
                  Audit Logs: {selectedAuditUser.name}
                </h3>
                <p className="text-[11px] text-[#6B7280] dark:text-slate-400 font-mono">{selectedAuditUser.email}</p>
              </div>
              <button 
                onClick={() => setSelectedAuditUser(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              <div className="p-3 bg-[#F5F7FB] dark:bg-slate-950 rounded-xl border border-[#E5E7EB] dark:border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#111827] dark:text-white">
                  <span>Logged in with 2-Factor Authentication</span>
                  <span className="text-[10px] text-gray-400">10m ago</span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Sanctum session token verified with TOTP OTP.</p>
              </div>

              <div className="p-3 bg-[#F5F7FB] dark:bg-slate-950 rounded-xl border border-[#E5E7EB] dark:border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#111827] dark:text-white">
                  <span>ATS Resume Optimization Analyzed</span>
                  <span className="text-[10px] text-gray-400">1h ago</span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Scored 94% compatibility against Senior Full-Stack role.</p>
              </div>

              <div className="p-3 bg-[#F5F7FB] dark:bg-slate-950 rounded-xl border border-[#E5E7EB] dark:border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#111827] dark:text-white">
                  <span>Subscription Plan Active: {selectedAuditUser.plan}</span>
                  <span className="text-[10px] text-gray-400">Joined {selectedAuditUser.joined}</span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400">Entitlements assigned for AI Career Advisor & Job Importer.</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAuditUser(null)}
              className="clay-btn-secondary w-full py-2 text-xs font-semibold cursor-pointer"
            >
              Close Logs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
