"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Schedule {
  id: number;
  date: string;
  teams: string;
  location: string;
  logo1?: string; // Logo for first team
  logo2?: string; // Logo for opponent (optional, using placeholder if missing)
}

export default function SchedulePreview() {
  const today = new Date("2025-05-15T12:33:00-05:00"); // May 15, 2025, 12:33 PM CDT

  const schedules: Schedule[] = [
    {
      id: 1,
      date: "2025-05-20",
      teams: "Thunderhawks vs Eagles",
      location: "Salina Arena",
      logo1: "/images/team-thunderhawks.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 2,
      date: "2025-05-22",
      teams: "Firebolts vs Tigers",
      location: "Downtown Arena",
      logo1: "/images/team-firebolts.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 3,
      date: "2025-05-25",
      teams: "Stingers vs Wolves",
      location: "Northside Court",
      logo1: "/images/team-stingers.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 4,
      date: "2025-05-21",
      teams: "Lightning vs Hawks",
      location: "Salina Arena",
      logo1: "/images/team-lightning.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 5,
      date: "2025-05-23",
      teams: "Vipers vs Panthers",
      location: "Hays Court",
      logo1: "/images/team-vipers.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 6,
      date: "2025-05-24",
      teams: "Raptors vs Ravens",
      location: "Northside Court",
      logo1: "/images/team-raptors.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
    {
      id: 7,
      date: "2025-05-10", // Past game for testing
      teams: "Thunderhawks vs Falcons",
      location: "Hays Court",
      logo1: "/images/team-thunderhawks.jpg",
      logo2: "/images/placeholder-team-default.jpg",
    },
  ];

  // Filter and sort upcoming games
  const upcomingGames = useMemo(() => {
    return schedules
      .filter((game) => new Date(game.date) > today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  // Format date (e.g., "Tue, May 20, 2025")
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <section className="bg-[#002C51] py-12" aria-label="Upcoming Games Preview">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Upcoming Games
        </h2>
        {upcomingGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {upcomingGames.map((schedule, index) => (
              <div
                key={schedule.id}
                className={cn(
                  "bg-gray-900 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "animate-fadeIn"
                )}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                role="article"
                aria-label={`Game: ${schedule.teams}`}
              >
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {schedule.logo1 && (
                        <div className="relative w-12 h-12">
                          <Image
                            src={schedule.logo1}
                            alt={`${schedule.teams.split(" vs ")[0]} logo`}
                            fill
                            className="object-contain"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/images/placeholder-team-default.jpg";
                            }}
                          />
                        </div>
                      )}
                      {schedule.logo2 && (
                        <div className="relative w-12 h-12">
                          <Image
                            src={schedule.logo2}
                            alt={`${schedule.teams.split(" vs ")[1]} logo`}
                            fill
                            className="object-contain"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/images/placeholder-team-default.jpg";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-rubik font-semibold mb-2 uppercase">
                    {schedule.teams}
                  </h3>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-blue-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-white text-base font-inter">
                      {formatDate(schedule.date)}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-5 h-5 text-blue-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-white text-base font-inter">
                      {schedule.location}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="default"
                    className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase w-full"
                  >
                    <Link href="/schedules" className="no-underline">
                      View Details
                    </Link>
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-white text-base font-inter text-center animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            No upcoming games scheduled.
          </p>
        )}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="default"
            className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/schedules" className="no-underline">
              Full Schedule
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
