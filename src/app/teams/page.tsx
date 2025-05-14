"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const ageGroups = ["All", "U-10", "U-12", "U-14", "U-16"];

  const filteredTeams =
    ageFilter === "All"
      ? allTeams
      : allTeams.filter((team) => team.ageGroup === ageFilter);

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Team Hub
        </h1>

        {/* Filter Dropdown */}
        <div className="mb-10 flex justify-center">
          <div className="relative inline-block">
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase cursor-pointer appearance-none focus:outline-none"
            >
              {ageGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-[#0A0F15]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <div
                key={team.id}
                className={cn(
                  "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
                )}
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
                <div className="p-6">
                  <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-2 uppercase">
                    {team.name}
                  </h2>
                  <p className="text-[#FFFFFF] text-sm font-inter mb-2">
                    Age Group: {team.ageGroup}
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-inter mb-4">
                    Coach: {team.coach}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[2px] px-[4px] uppercase"
                  >
                    <Link href={`/teams/${team.id}`} className="no-underline">
                      View Team
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#FFFFFF] text-center col-span-full font-inter">
              No teams found for this age group.
            </p>
          )}
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="default"
            className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
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
