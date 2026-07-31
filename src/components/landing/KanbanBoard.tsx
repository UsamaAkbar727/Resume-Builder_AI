"use client";

import React, { useState } from "react";
import { Trello, Plus, Calendar, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { ScrollReveal } from "./Animations";

interface KanbanCard {
  id: string;
  company: string;
  role: string;
  status: "wishlist" | "applied" | "interview" | "offer";
  salary: string;
  logo: string;
  priority: "High" | "Medium" | "Low";
  date: string;
}

export default function KanbanBoard() {
  const [cards, setCards] = useState<KanbanCard[]>([
    {
      id: "1",
      company: "Stripe",
      role: "Senior Frontend Engineer",
      status: "interview",
      salary: "$195K",
      logo: "S",
      priority: "High",
      date: "Aug 01"
    },
    {
      id: "2",
      company: "Notion",
      role: "Product Engineer",
      status: "applied",
      salary: "$180K",
      logo: "N",
      priority: "High",
      date: "Aug 03"
    },
    {
      id: "3",
      company: "Linear",
      role: "Frontend Engineer",
      status: "wishlist",
      salary: "$170K",
      logo: "L",
      priority: "Medium",
      date: "Sep 05"
    },
    {
      id: "4",
      company: "Vercel",
      role: "Frameworks Engineer",
      status: "offer",
      salary: "$165K",
      logo: "V",
      priority: "High",
      date: "Aug 15"
    }
  ]);

  const columns = [
    { id: "wishlist", label: "Wishlist", count: 1 },
    { id: "applied", label: "Applied", count: 1 },
    { id: "interview", label: "Interview", count: 1 },
    { id: "offer", label: "Offer", count: 1 }
  ];

  const moveCard = (id: string) => {
    setCards(prev => prev.map(card => {
      if (card.id !== id) return card;
      
      let nextStatus: KanbanCard["status"] = "wishlist";
      if (card.status === "wishlist") nextStatus = "applied";
      else if (card.status === "applied") nextStatus = "interview";
      else if (card.status === "interview") nextStatus = "offer";
      else if (card.status === "offer") nextStatus = "wishlist";
      
      return { ...card, status: nextStatus };
    }));
  };

  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case "High": return "bg-red-500/10 text-red-600 border-red-150";
      case "Medium": return "bg-amber-500/10 text-amber-600 border-amber-150";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  const getLogoColor = (logo: string) => {
    switch (logo) {
      case "S": return "bg-blue-600 text-white";
      case "N": return "bg-slate-900 text-white";
      case "V": return "bg-black text-white";
      case "L": return "bg-indigo-600 text-white";
      default: return "bg-slate-100 text-slate-900";
    }
  };

  return (
    <section id="job-tracker-kanban" className="py-24 bg-slate-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Info Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 text-left order-last lg:order-first">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-600 mb-6 shadow-xs">
              <Trello className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 leading-tight">
              Organize applications on a Kanban board
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium mb-6">
              Ditch messy spreadsheets. Drag and drop jobs through status columns, link specific resume versions to each application, set due reminders, and store interview notes.
            </p>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-xs text-slate-500 font-medium">
                Click on any job card in the board to advance it to the next pipeline stage.
              </p>
            </div>
          </div>

          {/* Interactive Kanban Board Screen */}
          <div className="lg:col-span-7 bg-[#EDF2F7]/60 border border-slate-200/80 p-5 rounded-3xl overflow-x-auto shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] min-w-full lg:min-w-0">
            <div className="grid grid-cols-4 gap-4 min-w-[640px]">
              
              {columns.map((col) => {
                const colCards = cards.filter(c => c.status === col.id);

                return (
                  <div key={col.id} className="flex flex-col gap-3.5">
                    {/* Column Header */}
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <h4 className="text-xs font-bold text-slate-800">{col.label}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 border px-1.5 py-0.5 rounded-sm">
                        {colCards.length}
                      </span>
                    </div>

                    {/* Cards Container */}
                    <div className="bg-[#EEF2F6]/60 rounded-2xl p-2.5 flex-1 min-h-[220px] flex flex-col gap-2.5">
                      {colCards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => moveCard(card.id)}
                          className="bg-white border border-slate-200/85 hover:border-blue-500/30 p-3.5 rounded-xl text-left shadow-xs cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 select-none relative group"
                        >
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${getLogoColor(card.logo)}`}>
                                {card.logo}
                              </span>
                              <div>
                                <h5 className="text-[10px] font-black text-slate-900 leading-none">{card.company}</h5>
                                <p className="text-[8px] text-slate-400 font-semibold mt-0.5">{card.role}</p>
                              </div>
                            </div>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm border shrink-0 ${getPriorityColor(card.priority)}`}>
                              {card.priority}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-[8px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
                            <span className="text-slate-800">{card.salary}</span>
                            <span className="flex items-center gap-0.5">
                              <Calendar className="w-2.5 h-2.5 text-slate-400" /> {card.date}
                            </span>
                          </div>

                          {/* Hover action guide */}
                          <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="bg-slate-900/90 text-[8px] font-bold text-white px-2 py-1 rounded-md flex items-center gap-1 shadow-sm uppercase tracking-wider">
                              Move <ChevronRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Add card button placeholder */}
                      <button className="py-2 border border-dashed border-slate-350 hover:border-slate-400 rounded-xl text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 text-[10px] font-bold transition-all bg-white/40">
                        <Plus className="w-3.5 h-3.5" /> Add Job
                      </button>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
