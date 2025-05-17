"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import Head from "next/head"; // Import Head for adding <link> tags
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Import events and teams from shared data file
import { events, teams } from "@/lib/schedules/data";

export default function SchedulesPage() {
  const [genderFilter, setGenderFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [typeFilter, setTypeFilter] = useState("All Events");
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Use the current date dynamically
  const today = new Date();

  // Update filtered events when any filter changes
  useEffect(() => {
    let filtered = events;

    if (genderFilter !== "All") {
      filtered = filtered.filter(
        (event) => event.extendedProps.gender === genderFilter
      );
    }

    if (teamFilter !== "All Teams") {
      filtered = filtered.filter(
        (event) => event.extendedProps.team === teamFilter
      );
    }

    if (typeFilter !== "All Events") {
      filtered = filtered.filter(
        (event) => event.extendedProps.type === typeFilter
      );
    }

    setFilteredEvents(filtered);
  }, [genderFilter, teamFilter, typeFilter]);

  // Filter available teams based on gender selection
  const availableTeams =
    genderFilter === "All"
      ? teams
      : teams.filter((team) => team.gender === genderFilter);

  // Get events for today (current date)
  const todayEvents = filteredEvents.filter((event) => {
    const eventStart = new Date(event.start);
    return (
      eventStart.getFullYear() === today.getFullYear() &&
      eventStart.getMonth() === today.getMonth() &&
      eventStart.getDate() === today.getDate()
    );
  });

  // Detect if the user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/core@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/daygrid@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/timegrid@6.1.15/main.css"
        />
      </Head>
      <section
        className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
        aria-label="Schedules"
      >
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-[clamp(2.25rem,5vw,3rem)] font-rubik font-bold mb-8 text-center uppercase">
            Team Schedules
          </h1>

          {/* Today's Events Card */}
          <div className="mb-8 bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-white text-2xl font-rubik font-semibold mb-4">
              Today’s Events (
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              )
            </h2>
            {todayEvents.length > 0 ? (
              <ul className="space-y-4">
                {todayEvents.map((event) => (
                  <li key={event.id} className="text-white font-inter">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-300">
                      Team: {event.extendedProps.team}
                    </p>
                    <p className="text-sm text-gray-300">
                      Gender: {event.extendedProps.gender}
                    </p>
                    <p className="text-sm text-gray-300">
                      Type: {event.extendedProps.type}
                    </p>
                    <p className="text-sm text-gray-300">
                      Location: {event.extendedProps.location}
                    </p>
                    <p className="text-sm text-gray-300">
                      Time:{" "}
                      {new Date(event.start).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      –{" "}
                      {new Date(event.end).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white font-inter">
                No events scheduled for today.
              </p>
            )}
          </div>

          {/* Filter Section */}
          <div
            className="mb-8 flex justify-center flex-wrap gap-2"
            role="tablist"
            aria-label="Filter schedules"
          >
            {/* Boys/Girls Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Gender
              </label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Team Name Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Team
              </label>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All Teams">All Teams</SelectItem>
                  {availableTeams.map((team) => (
                    <SelectItem key={team.name} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Practice/Game/Tournament Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Event Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All Events">All Events</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Game">Game</SelectItem>
                  <SelectItem value="Tournament">Tournament</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden w-full">
            <div className="p-6">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                events={filteredEvents}
                selectable
                eventMinHeight={30}
                dayMaxEventRows={2}
                eventDisplay="block"
                displayEventTime={false} // Hide time in Month view
                eventContent={(arg) => {
                  if (isMobile && arg.view.type === "dayGridMonth") {
                    return <div style={{ height: "100%", width: "100%" }} />;
                  }
                  return (
                    <div className="flex items-center">
                      <span className="whitespace-normal text-wrap">
                        {arg.event.title}
                      </span>
                    </div>
                  );
                }}
                eventDidMount={(info) => {
                  const type = info.event.extendedProps.type;
                  let bgColor;
                  if (type === "Game")
                    bgColor = "#EF4444"; // Red
                  else if (type === "Practice")
                    bgColor = "#3B82F6"; // Blue
                  else if (type === "Tournament") bgColor = "#A855F7"; // Purple
                  info.el.style.backgroundColor = bgColor || "#000000"; // Fallback to black if undefined
                  info.el.style.borderColor = bgColor || "#000000"; // Fallback to black if undefined
                }}
                eventClick={(info) => {
                  alert(
                    `${info.event.title}\n` +
                      `Team: ${info.event.extendedProps.team}\n` +
                      `Gender: ${info.event.extendedProps.gender}\n` +
                      `Type: ${info.event.extendedProps.type}\n` +
                      `Location: ${info.event.extendedProps.location}\n` +
                      `Time: ${info.event.start?.toLocaleString()}`
                  );
                }}
                eventTextColor="#FFFFFF"
                height="auto"
                dayMaxEvents
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                customButtons={{
                  today: {
                    text: "Today",
                    click: function () {
                      const calendarApi = (this as any).getCalendar();
                      calendarApi.today();
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 text-center">
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-blue-600 text-white font-medium font-inter rounded-md text-base px-6 py-3 uppercase",
                "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              )}
            >
              <Link href="/" className="no-underline">
                Back to Homepage
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={cn(
                "ml-4 bg-transparent border-blue-600 text-blue-600 font-medium font-inter rounded-md text-base px-6 py-3 uppercase",
                "hover:bg-blue-700 hover:text-white hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              )}
            >
              <Link href="/teams" className="no-underline">
                View Teams
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
