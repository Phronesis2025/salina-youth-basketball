"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Team {
  id: number;
  name: string;
  ageGroup: string;
  coach: string;
  image: string;
}

export default function TeamHub() {
  const allTeams: Team[] = [
    {
      id: 1,
      name: "Thunderhawks",
      ageGroup: "U-14",
      coach: "Coach Smith",
      image: "/images/team-thunderhawks.jpg",
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-16",
      coach: "Coach Johnson",
      image: "/images/team-firebolts.jpg",
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-12",
      coach: "Coach Davis",
      image: "/images/team-stingers.jpg",
    },
    {
      id: 4,
      name: "Lightning",
      ageGroup: "U-10",
      coach: "Coach Brown",
      image: "/images/team-lightning.jpg",
    },
    {
      id: 5,
      name: "Vipers",
      ageGroup: "U-14",
      coach: "Coach Wilson",
      image: "/images/team-vipers.jpg",
    },
    {
      id: 6,
      name: "Raptors",
      ageGroup: "U-16",
      coach: "Coach Taylor",
      image: "/images/team-raptors.jpg",
    },
  ];

  const [ageFilter, setAgeFilter] = useState<string>("All");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const ageGroups = ["All", "U-10", "U-12", "U-14", "U-16"];

  const filteredTeams =
    ageFilter === "All"
      ? allTeams
      : allTeams.filter((team) => team.ageGroup === ageFilter);

  useEffect(() => {
    // Disable animation after initial render
    setIsInitialLoad(false);
  }, []);

  return (
    <section
      className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
      aria-label="Team Hub"
    >
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          Team Hub
        </h1>

        {/* Filter Buttons */}
        <div
          className="mb-8 flex justify-center flex-wrap gap-2"
          style={{ animationDelay: "0.3s" }}
          role="tablist"
          aria-label="Filter teams by age group"
        >
          {ageGroups.map((group) => (
            <button
              key={group}
              className={cn(
                "bg-blue-600 text-white font-medium font-inter rounded-md px-4 py-2 text-base uppercase",
                "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300",
                ageFilter === group && "bg-blue-700 scale-105"
              )}
              onClick={() => setAgeFilter(group)}
              role="tab"
              aria-selected={ageFilter === group}
              aria-controls="team-grid"
            >
              {group}
            </button>
          ))}
        </div>

        {/* Team Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          id="team-grid"
        >
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className={cn(
                  "bg-gray-900 rounded-lg shadow-md overflow-hidden w-full h-[28rem] flex flex-col min-h-0",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                )}
                style={{
                  animationDelay: isInitialLoad
                    ? `${0.4 + index * 0.1}s`
                    : undefined,
                }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={team.image}
                    alt={`${team.name} team`}
                    fill
                    priority={index === 0}
                    className="object-cover object-top"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-team-default.jpg";
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow min-h-0">
                  <h2 className="text-white text-2xl font-rubik font-semibold mb-2 uppercase line-clamp-2">
                    {team.name}
                  </h2>
                  <p className="text-white text-base font-inter mb-2">
                    Age Group: {team.ageGroup}
                  </p>
                  <p className="text-white text-base font-inter mb-4">
                    Coach: {team.coach}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mt-auto"
                  >
                    <Link href={`/teams/${team.id}`} className="no-underline">
                      View Team
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-base font-inter text-center col-span-full">
              No teams found for this age group.
            </p>
          )}
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="default"
            className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/" className="no-underline">
              Back to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
