"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Team {
  id: number;
  name: string;
  ageGroup: string;
  image: string;
}

export default function TeamPreview() {
  const teams: Team[] = [
    {
      id: 1,
      name: "Thunderhawks",
      ageGroup: "U-14",
      image: "/images/team-thunderhawks.jpg",
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-16",
      image: "/images/team-firebolts.jpg",
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-12",
      image: "/images/team-stingers.jpg",
    },
  ];

  return (
    <section className="py-16 bg-[#002C51]">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h2 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Our Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teams.map((team) => (
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
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "/images/placeholder-team-default.jpg")
                }
              />
              <div className="p-6">
                <h3 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-2 uppercase">
                  {team.name}
                </h3>
                <p className="text-[#FFFFFF] text-sm font-inter mb-4">
                  {team.ageGroup}
                </p>
                <Button
                  asChild
                  variant="default"
                  className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[2px] px-[4px] uppercase"
                >
                  <Link href={`/teams/${team.id}`} className="no-underline">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="default"
            className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
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
