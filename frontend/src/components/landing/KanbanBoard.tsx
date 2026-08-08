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
      case "High": return "bg-red-50 text-red-600 border-red-100";
      case "Medium": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-200";
    }
  };

  const getLogoColor = (logo: string) => {
    switch (logo) {
      case "S": return "bg-blue-600 text-white";
      case "N": return "bg-zinc-800 text-white";
      case "V": return "bg-black text-white border border-zinc-200";
      case "L": return "bg-indigo-600 text-white";
      default: return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <section id="job-tracker-kanban" className="py-24 bg-[#fbfbfc] relative z-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Info Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 text-left order-last lg:order-first">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm mb-6">
              <Trello className="w-4 h-4 text-indigo-600" />
              JOB TRACKER KANBAN BOARD
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 font-display">
              Organize applications on a Kanban board
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-semibold font-display mb-6">
              Ditch messy spreadsheets. Drag and drop jobs through status columns, link specific resume versions to each application, set due reminders, and store interview notes.
            </p>
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-zinc-200/20">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-xs text-zinc-650 text-zinc-650 text-zinc-605 text-zinc-600 font-semibold font-display">
                Click on any job card in the board to advance it to the next pipeline stage.
              </p>
            </div>
          </div>

          {/* Interactive Kanban Board Screen */}
          <div className="lg:col-span-7 bg-zinc-100/70 border border-zinc-200/60 p-5 rounded-3xl overflow-x-auto shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] min-w-full lg:min-w-0">
            <div className="grid grid-cols-4 gap-4 min-w-[640px]">
              
              {columns.map((col) => {
                const colCards = cards.filter(c => c.status === col.id);

                return (
                  <div key={col.id} className="flex flex-col gap-3.5">
                    {/* Column Header */}
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                        <h4 className="text-xs font-black text-zinc-700 font-display">{col.label}</h4>
                      </div>
                      <span className="text-[10px] font-black text-zinc-750 text-zinc-700 bg-white border border-zinc-200 px-1.5 py-0.5 rounded-sm">
                        {colCards.length}
                      </span>
                    </div>

                    {/* Cards Container */}
                    <div className="bg-zinc-50/50 rounded-2xl p-2.5 flex-1 min-h-[220px] flex flex-col gap-2.5">
                      {colCards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => moveCard(card.id)}
                          className="bg-white border border-zinc-200 hover:border-indigo-500/40 p-3.5 rounded-xl text-left shadow-md cursor-pointer hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 select-none relative group"
                        >
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${getLogoColor(card.logo)}`}>
                                {card.logo}
                              </span>
                              <div>
                                <h5 className="text-[10px] font-black text-zinc-900 leading-none font-display">{card.company}</h5>
                                <p className="text-[8px] text-zinc-500 font-semibold mt-0.5">{card.role}</p>
                              </div>
                            </div>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm border shrink-0 ${getPriorityColor(card.priority)}`}>
                              {card.priority}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-405 text-zinc-400 pt-2 border-t border-zinc-100">
                            <span className="text-zinc-800 font-extrabold">{card.salary}</span>
                            <span className="flex items-center gap-0.5 text-zinc-450 text-zinc-400">
                              <Calendar className="w-2.5 h-2.5 text-zinc-400" /> {card.date}
                            </span>
                          </div>

                          {/* Hover action guide */}
                          <div className="absolute inset-0 bg-indigo-500/5 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="bg-indigo-600 text-[8px] font-black text-white px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md uppercase tracking-wider font-display">
                              Move <ChevronRight className="w-2.5 h-2.5 text-white" />
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Add card button placeholder */}
                      <button className="py-2 border border-dashed border-zinc-200 hover:border-indigo-500/40 text-zinc-550 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/50 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold transition-all bg-white cursor-pointer font-display">
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
