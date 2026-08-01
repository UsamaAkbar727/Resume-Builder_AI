"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Trash2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "Interview" | "Deadline" | "Task";
  company?: string;
}

export default function CalendarView({ onNavigate, showToast }: { onNavigate?: (tab: string) => void; showToast?: (msg: string, type?: "success" | "info" | "warning") => void }) {
  const [events, setEvents] = useState<Event[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("resumeflow_events");
      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents));
        } catch (e) {
          console.error("Error loading events:", e);
        }
      } else {
        const defaultEvents = [
          { id: "1", title: "Systems Design Round", date: "2026-08-01", type: "Interview", company: "Stripe" },
          { id: "2", title: "Apply Deadline", date: "2026-08-30", type: "Deadline", company: "Stripe" },
          { id: "3", title: "Culture Screen Round", date: "2026-08-03", type: "Interview", company: "Notion" },
          { id: "4", title: "Submit take-home task", date: "2026-08-10", type: "Task", company: "Linear" }
        ];
        setEvents(defaultEvents);
        localStorage.setItem("resumeflow_events", JSON.stringify(defaultEvents));
      }
    }
  }, []);

  // Save to localStorage when events change
  useEffect(() => {
    if (typeof window !== "undefined" && events.length > 0) {
      localStorage.setItem("resumeflow_events", JSON.stringify(events));
    }
  }, [events]);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-08-05");
  const [newEventType, setNewEventType] = useState<"Interview" | "Deadline" | "Task">("Interview");

  const daysInMonth = 31;
  const startDayOffset = 6;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;
    const added: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: newEventDate,
      type: newEventType,
    };
    const updated = [...events, added];
    setEvents(updated);
    setNewEventTitle("");
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_events", JSON.stringify(updated));
    }
    if (showToast) {
      showToast("Event scheduled successfully!", "success");
    } else {
      alert("Event scheduled successfully!");
    }
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeflow_events", JSON.stringify(updated));
    }
    if (showToast) showToast("Event deleted from calendar.", "info");
  };

  const renderCells = () => {
    const cells = [];
    // empty offset cells
    for (let i = 0; i < startDayOffset; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[85px] bg-[#EEF2F7]/30 border border-[#E5E7EB]/40"></div>);
    }
    // days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `2026-08-${day < 10 ? `0${day}` : day}`;
      const dayEvents = events.filter((e) => e.date === dateString);

      cells.push(
        <div key={day} className="min-h-[85px] p-2 bg-white border border-[#E5E7EB]/50 hover:bg-[#F5F7FB] transition-colors relative flex flex-col justify-between text-left">
          <span className="text-xs font-bold text-[#6B7280]">{day}</span>
          <div className="space-y-1 mt-1 flex-1 overflow-y-auto">
            {dayEvents.map((ev) => (
              <div
                key={ev.id}
                title={`${ev.title} ${ev.company ? `(${ev.company})` : ""}`}
                className={`text-[8px] px-1 py-0.5 rounded font-bold uppercase truncate ${
                  ev.type === "Interview" ? "bg-blue-50 text-[#2563EB] border border-blue-200" :
                  ev.type === "Deadline" ? "bg-amber-50 text-[#F59E0B] border border-amber-200" :
                  "bg-green-50 text-[#16A34A] border border-green-200"
                }`}
              >
                {ev.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return cells;
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
        <h1 className="text-3xl font-extrabold text-[#111827]">Calendar & Schedule</h1>
        <p className="text-sm text-[#6B7280]">Review interview timelines, critical task lists, and application deadlines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: August 2026 Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center bg-white px-5 py-3.5 rounded-2xl border border-[#E5E7EB]/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9)]">
            <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">August 2026</h3>
            <span className="text-xs text-[#6B7280] font-semibold">{events.length} Scheduled Events</span>
          </div>

          <div className="grid grid-cols-7 text-center font-bold text-xs text-[#6B7280] uppercase tracking-wider pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
            {renderCells()}
          </div>
        </div>

        {/* Right: Add Event Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="clay-card p-6 bg-white space-y-4 text-left">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider">Schedule Event</h3>
            
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Systems Design Round"
                  className="clay-input w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="clay-input w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Type</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as any)}
                    className="clay-input w-full text-xs"
                  >
                    <option value="Interview">Interview</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Task">Task</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="clay-btn-primary w-full py-2.5 text-xs text-white font-semibold flex items-center justify-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Add Event
              </button>
            </form>
          </div>

          {/* Quick list details */}
          <div className="clay-card p-6 bg-white text-left space-y-4">
            <h3 className="font-bold text-xs text-[#6B7280] uppercase tracking-wider">Timeline List</h3>
            <div className="space-y-3.5 text-xs">
              {events.slice(0, 5).map((e) => (
                <div key={e.id} className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]/40 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h5 className="font-bold text-[#111827]">{e.title}</h5>
                    {e.company && <span className="text-[10px] text-[#6B7280]">{e.company}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-500 text-[10px]">{e.date}</span>
                    <button
                      onClick={() => handleDeleteEvent(e.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
