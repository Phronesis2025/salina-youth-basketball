// /app/schedules/page.tsx
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Static event data (placeholder, based on 20-team dataset)
const events = [
  {
    id: "1",
    title: "Lightning vs. Raptors (Game)",
    start: "2025-06-01T14:00:00",
    end: "2025-06-01T15:30:00",
    extendedProps: { team: "Lightning", location: "Salina Community Center" },
  },
  {
    id: "2",
    title: "Thunder Practice",
    start: "2025-06-03T18:00:00",
    end: "2025-06-03T19:30:00",
    extendedProps: { team: "Thunder", location: "North Salina Gym" },
  },
  {
    id: "3",
    title: "Raptors vs. Hawks (Game)",
    start: "2025-06-05T16:00:00",
    end: "2025-06-05T17:30:00",
    extendedProps: { team: "Raptors", location: "Salina Community Center" },
  },
];

export default function SchedulesPage() {
  return (
    <div className="min-h-screen bg-[#1C2526] text-white font-rubik">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-inter font-bold text-center text-white mb-6">
            Team Schedules
          </h1>
          <p className="text-lg text-gray-300 text-center mb-8">
            View all games and practices for Salina Youth Basketball Club teams.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-[#D91E18] hover:bg-[#B91C16] text-white font-inter"
              )}
            >
              Back to Homepage
            </Link>
            <Link
              href="/teams"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[#D91E18] text-[#D91E18] hover:bg-[#D91E18] hover:text-white font-inter"
              )}
            >
              View Teams
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 rounded-lg shadow-lg p-6">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              selectable
              eventClick={(info) => {
                alert(
                  `${info.event.title}\n` +
                    `Team: ${info.event.extendedProps.team}\n` +
                    `Location: ${info.event.extendedProps.location}\n` +
                    `Time: ${info.event.start?.toLocaleString()}`
                );
              }}
              eventBackgroundColor="#D91E18"
              eventBorderColor="#D91E18"
              eventTextColor="#FFFFFF"
              height="auto"
              dayMaxEvents
              customButtons={{
                today: {
                  text: "Today",
                  click: function () {
                    // Reset to today
                    const calendarApi = (this as any).getCalendar();
                    calendarApi.today();
                  },
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
