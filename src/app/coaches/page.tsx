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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAge, setNewPlayerAge] = useState("");
  const [deletePlayer, setDeletePlayer] = useState<Player | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      console.log("User Data:", { userData, userError });

      if (userError || !userData.user) {
        setError("Unable to authenticate user");
        return;
      }

      const userId = userData.user.id;
      console.log("User ID:", userId);

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

      // Fetch players
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

      // Fetch schedule
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

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!teamId) {
      setError("Team ID not found");
      return;
    }

    const age = parseInt(newPlayerAge);
    if (isNaN(age) || age < 8 || age > 14) {
      setError("Age must be a number between 8 and 14");
      return;
    }

    if (!newPlayerName.trim()) {
      setError("Name is required");
      return;
    }

    const response = await fetch("/api/coaches/roster-add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId, name: newPlayerName.trim(), age }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Error adding player");
      return;
    }

    setPlayers([...players, result.player]);
    setNewPlayerName("");
    setNewPlayerAge("");
    setSuccessMessage("Player added successfully");
  };

  const handleRemovePlayer = async () => {
    if (!deletePlayer || !teamId) return;

    setError(null);
    setSuccessMessage(null);

    const response = await fetch("/api/coaches/roster-remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: deletePlayer.id, teamId }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Error removing player");
      return;
    }

    setPlayers(players.filter((p) => p.id !== deletePlayer.id));
    setDeletePlayer(null);
    setSuccessMessage("Player removed successfully");
  };

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

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-8 p-4 bg-gray-900 border border-red-500/50 rounded-lg">
            <p className="text-red-500 text-sm font-rubik">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-8 p-4 bg-gray-900 border border-green-500/50 rounded-lg">
            <p className="text-green-500 text-sm font-rubik">
              {successMessage}
            </p>
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
              {/* Add Player Form */}
              <form onSubmit={handleAddPlayer} className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <Label
                      htmlFor="player-name"
                      className="text-white font-rubik"
                    >
                      Player Name
                    </Label>
                    <Input
                      id="player-name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      placeholder="Enter player name"
                    />
                  </div>
                  <div className="w-full sm:w-24">
                    <Label
                      htmlFor="player-age"
                      className="text-white font-rubik"
                    >
                      Age
                    </Label>
                    <Input
                      id="player-age"
                      type="number"
                      value={newPlayerAge}
                      onChange={(e) => setNewPlayerAge(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      placeholder="8-14"
                      min="8"
                      max="14"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12"
                >
                  Add Player
                </Button>
              </form>

              {/* Player List */}
              {players.length > 0 ? (
                <ul className="space-y-2">
                  {players.map((player) => (
                    <li
                      key={player.id}
                      className="flex justify-between items-center text-gray-300 text-sm font-rubik border-b border-gray-700 pb-2"
                    >
                      <span>
                        {player.name} (Age: {player.age})
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeletePlayer(player)}
                            className="bg-red-600 hover:bg-red-700 text-white font-inter uppercase"
                          >
                            Remove
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 text-white border border-red-500/50">
                          <DialogHeader>
                            <DialogTitle>Confirm Removal</DialogTitle>
                            <DialogDescription className="text-gray-300">
                              Are you sure you want to remove{" "}
                              {deletePlayer?.name} from the roster? This action
                              cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setDeletePlayer(null)}
                              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleRemovePlayer}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
