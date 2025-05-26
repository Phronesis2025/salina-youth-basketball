"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

interface Player {
  id: string;
  name: string;
  age: number;
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    type: string;
    location: string;
    description: string;
  };
}

export default function CoachesPage() {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      console.log("User Data:", { userData, userError });

      if (userError || !userData.user) {
        setError("Unable to authenticate user");
        return;
      }

      const userId = userData.user.id;
      console.log("User ID:", userId);

      // Fetch coach data via API route to bypass RLS
      const coachResponse = await fetch("/api/get-coach-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const coachResult = await coachResponse.json();
      console.log("Coach API Result:", coachResult);

      if (!coachResponse.ok || !coachResult.teamId) {
        setError(coachResult.error || "Coach data not found");
        return;
      }

      setTeamId(coachResult.teamId);

      // Fetch players via API route to bypass RLS
      const playersResponse = await fetch("/api/get-team-players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: coachResult.teamId }),
      });

      const playersResult = await playersResponse.json();
      console.log("Players API Result:", playersResult);

      if (!playersResponse.ok) {
        setError(playersResult.error || "Error fetching players");
        return;
      }

      setPlayers(playersResult.players || []);

      // Fetch schedule via API route to bypass RLS
      const schedulesResponse = await fetch("/api/get-team-schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: coachResult.teamId }),
      });

      const schedulesResult = await schedulesResponse.json();
      console.log("Schedules API Result:", schedulesResult);

      if (!schedulesResponse.ok) {
        setError(schedulesResult.error || "Error fetching schedule");
        return;
      }

      const formattedEvents = schedulesResult.schedules.map((event: any) => ({
        id: event.id,
        title: event.title,
        start: event.date,
        extendedProps: {
          type: event.type,
          location: event.location,
          description: event.description,
        },
      }));

      setEvents(formattedEvents);
    };

    fetchCoachData();
  }, []);

  const subPages = [
    { title: "AI-Generated Drills", link: "/coaches/drills/current" },
    { title: "Video Tutorial Library", link: "/coaches/videos" },
    { title: "Rules & Policies", link: "/coaches/rules" },
    { title: "Resource Archive", link: "/coaches/resources" },
  ];

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section
          className="mb-12 text-center"
          aria-label="Coach Dashboard Welcome"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Locker Room Dashboard
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Manage your team, view schedules, and access coaching resources.
          </p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-gray-900 border border-red-500/50 rounded-lg">
            <p className="text-red-500 text-sm font-rubik">{error}</p>
          </div>
        )}

        {/* Roster Section */}
        <section className="mb-12" aria-label="Team Roster">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Team Roster
              </CardTitle>
              <p className="text-gray-300 text-sm font-rubik">
                Total Players: {players.length}
              </p>
            </CardHeader>
            <CardContent>
              {players.length > 0 ? (
                <ul className="space-y-2">
                  {players.map((player) => (
                    <li
                      key={player.id}
                      className="text-gray-300 text-sm font-rubik border-b border-gray-700 pb-2"
                    >
                      {player.name} (Age: {player.age})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm font-rubik">
                  No players found.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Schedule Section */}
        <section className="mb-12" aria-label="Team Schedule">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FullCalendar
                plugins={[listPlugin]}
                initialView="listWeek"
                events={events}
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "",
                }}
                eventContent={(eventInfo) => (
                  <div className="flex flex-col p-2">
                    <p className="text-white font-rubik text-sm">
                      <span
                        className={cn(
                          "inline-block w-3 h-3 mr-2 rounded-full",
                          eventInfo.event.extendedProps.type === "practice" &&
                            "bg-blue-500",
                          eventInfo.event.extendedProps.type === "game" &&
                            "bg-red-500",
                          eventInfo.event.extendedProps.type === "tournament" &&
                            "bg-purple-500",
                          eventInfo.event.extendedProps.type === "event" &&
                            "bg-green-500"
                        )}
                      />
                      {eventInfo.event.title}
                    </p>
                    <p className="text-gray-300 text-xs font-rubik">
                      {eventInfo.event.extendedProps.location}
                    </p>
                    <p className="text-gray-300 text-xs font-rubik">
                      {eventInfo.event.extendedProps.description}
                    </p>
                  </div>
                )}
                eventClassNames="bg-gray-800 border-none"
                height="auto"
                contentHeight="auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Sub-Page Navigation */}
        <section className="mb-12" aria-label="Coaching Resources">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="resources">
              <AccordionTrigger className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Coaching Resources
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {subPages.map((page) => (
                    <Link key={page.title} href={page.link}>
                      <Button
                        variant="default"
                        className="w-full bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
                      >
                        {page.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Navigation */}
        <section className="flex justify-center" aria-label="Navigation">
          <Link href="/">
            <Button
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            >
              Back to Homepage
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
