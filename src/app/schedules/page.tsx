// /app/schedules/page.tsx
"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Static event data (expanded to cover Boys/Girls, teams, Practice/Game)
const events = [
  // Boys Events
  {
    id: "1",
    title: "Lightning vs. Raptors (Game)",
    start: "2025-06-01T14:00:00",
    end: "2025-06-01T15:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "2",
    title: "Lightning Practice",
    start: "2025-06-03T18:00:00",
    end: "2025-06-03T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "3",
    title: "Thunder vs. Hawks (Game)",
    start: "2025-06-05T16:00:00",
    end: "2025-06-05T17:30:00",
    extendedProps: {
      team: "Thunder",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "4",
    title: "Thunder Practice",
    start: "2025-06-07T10:00:00",
    end: "2025-06-07T11:30:00",
    extendedProps: {
      team: "Thunder",
      gender: "Boys",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  // Girls Events
  {
    id: "5",
    title: "Raptors vs. Eagles (Game)",
    start: "2025-06-02T15:00:00",
    end: "2025-06-02T16:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "6",
    title: "Raptors Practice",
    start: "2025-06-04T17:00:00",
    end: "2025-06-04T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "7",
    title: "Sparks vs. Falcons (Game)",
    start: "2025-06-06T14:30:00",
    end: "2025-06-06T16:00:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "8",
    title: "Sparks Practice",
    start: "2025-06-08T09:00:00",
    end: "2025-06-08T10:30:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
];

// Static team list for filter (representative sample)
const teams = [
  { name: "Lightning", gender: "Boys" },
  { name: "Thunder", gender: "Boys" },
  { name: "Raptors", gender: "Girls" },
  { name: "Sparks", gender: "Girls" },
];

export default function SchedulesPage() {
  const [genderFilter, setGenderFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [typeFilter, setTypeFilter] = useState("All Events");
  const [filteredEvents, setFilteredEvents] = useState(events);

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

      {/* Filter Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Boys/Girls Filter */}
            <div className="w-full sm:w-48">
              <label className="block text-sm font-inter text-gray-300 mb-1">
                Gender
              </label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2526] text-white border-gray-600">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Team Name Filter */}
            <div className="w-full sm:w-48">
              <label className="block text-sm font-inter text-gray-300 mb-1">
                Team
              </label>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2526] text-white border-gray-600">
                  <SelectItem value="All Teams">All Teams</SelectItem>
                  {availableTeams.map((team) => (
                    <SelectItem key={team.name} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Practice/Game Filter */}
            <div className="w-full sm:w-48">
              <label className="block text-sm font-inter text-gray-300 mb-1">
                Event Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2526] text-white border-gray-600">
                  <SelectItem value="All Events">All Events</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Game">Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                right: "dayGridMonth,timeGridWeek", // Removed timeGridDay
              }}
              events={filteredEvents}
              selectable
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
              eventBackgroundColor="#D91E18"
              eventBorderColor="#D91E18"
              eventTextColor="#FFFFFF"
              height="auto"
              dayMaxEvents
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
      </section>
    </div>
  );
}
