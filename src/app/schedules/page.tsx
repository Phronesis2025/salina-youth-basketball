// /app/schedules/page.tsx
"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Static event data (5 teams, June–July 2025)
const events = [
  // Boys: Lightning
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
    title: "Lightning vs. Hawks (Game)",
    start: "2025-07-05T16:00:00",
    end: "2025-07-05T17:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "South Salina Court",
    },
  },
  // Boys: Thunder
  {
    id: "4",
    title: "Thunder vs. Eagles (Game)",
    start: "2025-06-07T10:00:00",
    end: "2025-06-07T11:30:00",
    extendedProps: {
      team: "Thunder",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "5",
    title: "Thunder Practice",
    start: "2025-06-10T17:00:00",
    end: "2025-06-10T18:30:00",
    extendedProps: {
      team: "Thunder",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "6",
    title: "Thunder Practice",
    start: "2025-07-12T18:00:00",
    end: "2025-07-12T19:30:00",
    extendedProps: {
      team: "Thunder",
      gender: "Boys",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  // Boys: Hawks
  {
    id: "7",
    title: "Hawks vs. Falcons (Game)",
    start: "2025-06-14T15:00:00",
    end: "2025-06-14T16:30:00",
    extendedProps: {
      team: "Hawks",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "8",
    title: "Hawks Practice",
    start: "2025-06-17T16:00:00",
    end: "2025-06-17T17:30:00",
    extendedProps: {
      team: "Hawks",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "9",
    title: "Hawks vs. Thunder (Game)",
    start: "2025-07-19T14:00:00",
    end: "2025-07-19T15:30:00",
    extendedProps: {
      team: "Hawks",
      gender: "Boys",
      type: "Game",
      location: "South Salina Court",
    },
  },
  // Girls: Raptors
  {
    id: "10",
    title: "Raptors vs. Sparks (Game)",
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
    id: "11",
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
    id: "12",
    title: "Raptors Practice",
    start: "2025-07-06T18:00:00",
    end: "2025-07-06T19:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "13",
    title: "Raptors vs. Eagles (Game)",
    start: "2025-07-20T16:00:00",
    end: "2025-07-20T17:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  // Girls: Sparks
  {
    id: "14",
    title: "Sparks vs. Falcons (Game)",
    start: "2025-06-08T14:30:00",
    end: "2025-06-08T16:00:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "15",
    title: "Sparks Practice",
    start: "2025-06-11T18:00:00",
    end: "2025-06-11T19:30:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "16",
    title: "Sparks Practice",
    start: "2025-07-13T17:00:00",
    end: "2025-07-13T18:30:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "17",
    title: "Sparks vs. Raptors (Game)",
    start: "2025-07-26T15:00:00",
    end: "2025-07-26T16:30:00",
    extendedProps: {
      team: "Sparks",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
];

// Static team list (5 teams: 3 Boys, 2 Girls)
const teams = [
  { name: "Lightning", gender: "Boys" },
  { name: "Thunder", gender: "Boys" },
  { name: "Hawks", gender: "Boys" },
  { name: "Raptors", gender: "Girls" },
  { name: "Sparks", gender: "Girls" },
];

export default function SchedulesPage() {
  const [genderFilter, setGenderFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [typeFilter, setTypeFilter] = useState("All Events");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  // Disable animation after initial render
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Filter available teams based on gender selection
  const availableTeams =
    genderFilter === "All"
      ? teams
      : teams.filter((team) => team.gender === genderFilter);

  return (
    <section
      className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
      aria-label="Schedules"
    >
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-rubik font-bold mb-8 text-center uppercase animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Team Schedules
        </h1>

        {/* Filter Section */}
        <div
          className="mb-8 flex justify-center flex-wrap gap-2 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
          role="tablist"
          aria-label="Filter schedules"
        >
          {/* Boys/Girls Filter */}
          <div className="min-w-0 flex-1">
            <label className="block text-sm font-inter text-gray-300 mb-1">
              Gender
            </label>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger
                className={cn(
                  "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                  "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
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
            <label className="block text-sm font-inter text-gray-300 mb-1">
              Team
            </label>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger
                className={cn(
                  "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                  "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
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
          {/* Practice/Game Filter */}
          <div className="min-w-0 flex-1">
            <label className="block text-sm font-inter text-gray-300 mb-1">
              Event Type
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger
                className={cn(
                  "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                  "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                )}
              >
                <SelectValue placeholder="Select Event Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#002C51] text-white border-gray-600">
                <SelectItem value="All Events">All Events</SelectItem>
                <SelectItem value="Practice">Practice</SelectItem>
                <SelectItem value="Game">Game</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calendar Section */}
        <div
          className={cn(
            "bg-gray-900 rounded-lg shadow-md overflow-hidden w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
            isInitialLoad && "animate-fadeIn"
          )}
          style={{ animationDelay: "0.4s" }}
        >
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
              eventContent={(arg) => {
                const isGame = arg.event.extendedProps.type === "Game";
                const circleColor = isGame ? "bg-red-600" : "bg-blue-500";
                return (
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "inline-block w-2 h-2 rounded-full mr-2",
                        circleColor
                      )}
                      style={{
                        backgroundColor: isGame ? "#DC2626" : "#3B82F6",
                      }}
                    />
                    <span className="whitespace-normal text-wrap">
                      {arg.event.title}
                    </span>
                  </div>
                );
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

        {/* Navigation Buttons */}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="default"
            className={cn(
              "bg-blue-600 text-white font-medium font-inter rounded-md text-base px-6 py-3 uppercase",
              "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 animate-fadeIn"
            )}
            style={{ animationDelay: "0.4s" }}
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
              "hover:bg-blue-700 hover:text-white hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 animate-fadeIn"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/teams" className="no-underline">
              View Teams
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
