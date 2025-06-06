"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import Link from "next/link";

interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
}

export default function Schedules() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/get-all-schedules", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }

        const result = await response.json();
        setEvents(result.schedules || []);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    extendedProps: {
      type: event.type,
      location: event.location,
      description: event.description,
    },
  }));

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    alert(
      `Event: ${event.title}\nType: ${event.extendedProps.type}\nLocation: ${event.extendedProps.location}\nDescription: ${event.extendedProps.description}`
    );
  };

  return (
    <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section
          className="mb-12 text-center"
          aria-label="Schedules Page Welcome"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Schedules
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            View the upcoming games, practices, and events for all teams.
          </p>
        </section>

        {/* Calendar Section */}
        <section className="mb-12" aria-label="Schedules Calendar">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Team Schedules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                eventContent={(eventInfo) => (
                  <div className="flex flex-col p-1">
                    <p className="text-white font-rubik text-xs">
                      {eventInfo.event.title}
                    </p>
                    <p className="text-gray-300 text-xs font-rubik">
                      {eventInfo.event.extendedProps.location}
                    </p>
                  </div>
                )}
                eventClassNames="bg-gray-800 border-none cursor-pointer"
                height="auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <section className="flex justify-center" aria-label="Navigation">
          <Link href="/">
            <button className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase">
              Back to Homepage
            </button>
          </Link>
        </section>
      </div>
      <style jsx global>{`
        .fc-header-toolbar {
          background-color: #002c51 !important; /* Navy */
          color: #ffffff !important;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }
        .fc-button {
          background-color: #374151 !important;
          color: #ffffff !important;
          border: none !important;
          font-family: "Inter", sans-serif !important;
        }
        .fc-button:hover {
          background-color: #f11a20 !important; /* Red accent on hover */
          color: #ffffff !important;
        }
        .fc-toolbar-title {
          color: #ffffff !important;
          font-family: "Rubik", sans-serif !important;
        }
        .fc-daygrid-day {
          background-color: #002c51 !important;
        }
        .fc-daygrid-day:hover {
          background-color: #1f2937 !important; /* Match bg-gray-800 */
        }
        .fc-daygrid-day-top {
          color: #ffffff !important;
        }
        .fc-col-header-cell {
          background-color: #002c51 !important;
          color: #ffffff !important;
          font-family: "Rubik", sans-serif !important;
        }
        .fc-timegrid-slot {
          background-color: #002c51 !important;
        }
        .fc-timegrid-slot-label {
          color: #ffffff !important;
        }
        .fc-timegrid-axis {
          background-color: #002c51 !important;
          color: #ffffff !important;
        }
        .fc-scrollgrid {
          background-color: #002c51 !important;
        }
        .fc-daygrid-event:hover {
          background-color: #1f2937 !important; /* Match bg-gray-800 */
        }
        .fc-daygrid-event:hover .fc-daygrid-event-dot {
          border-color: #f11a20 !important; /* Red accent on hover */
        }
      `}</style>
    </main>
  );
}
