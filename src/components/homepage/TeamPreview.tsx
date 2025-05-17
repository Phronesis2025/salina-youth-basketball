"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Team {
  id: number;
  name: string;
  ageGroup: string;
  image: string;
  badge?: string;
  coach: string; // Added for slide-in coach name
}

export default function TeamPreview() {
  const teams: Team[] = [
    {
      id: 1,
      name: "Thunderhawks",
      ageGroup: "U-14",
      image: "/images/team-thunderhawks.jpg",
      badge: "2025 Champions",
      coach: "Jane Doe",
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-16",
      image: "/images/team-firebolts.jpg",
      badge: "Undefeated 2024",
      coach: "John Smith",
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-12",
      image: "/images/team-stingers.jpg",
      badge: "Rising Stars",
      coach: "Emily Brown",
    },
  ];

  return (
    <section className="bg-[#002C51] py-12" aria-label="Our Teams">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          Our Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={cn(
                "group bg-gray-900 rounded-lg shadow-md overflow-hidden w-full h-[28rem] flex flex-col min-h-0", // Added 'group' for hover
                "transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={team.image}
                  alt={`${team.name} team`}
                  fill
                  priority={index === 0}
                  className="object-cover object-top transition-transform duration-300 hover:scale-110"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-grow min-h-0">
                {team.badge && (
                  <span className="inline-block bg-blue-600 text-white text-xs font-inter uppercase px-2 py-1 rounded mb-2">
                    {team.badge}
                  </span>
                )}
                <h3 className="text-white text-2xl font-rubik font-semibold mb-2 uppercase line-clamp-2">
                  {team.name}
                </h3>
                <p className="text-white text-base font-inter mb-2">
                  {team.ageGroup}
                </p>
                <p className="text-white text-base font-inter mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Coach: {team.coach}
                </p>
                <Button
                  asChild
                  variant="default"
                  className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mt-auto"
                >
                  <Link href={`/teams/${team.id}`} className="no-underline">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="default"
            className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
          >
            <Link href="/teams" className="no-underline">
              View All Teams
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
