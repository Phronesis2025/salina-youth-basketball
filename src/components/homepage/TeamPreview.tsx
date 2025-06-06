"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";

interface Team {
  id: number;
  name: string;
  grade_level: string;
  image: string; // Team photo
  logo: string;
  coach: string;
}

export default function TeamPreview() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data, error } = await supabase
          .from("teams")
          .select("id, name, grade_level, image, logo, coaches");
        if (error) throw error;
        if (data && data.length > 0) {
          const shuffled = data.sort(() => 0.5 - Math.random()); // Simple shuffle
          const selectedTeams = shuffled.slice(0, 3); // Take first 3 after shuffling
          const mappedTeams: Team[] = selectedTeams.map((team) => ({
            id: team.id,
            name: team.name,
            grade_level: team.grade_level,
            image: team.image || "/images/placeholder-team-default.jpg", // Team photo
            logo: team.logo || "/images/placeholder-team-default.jpg",
            coach: team.coaches.join(" & ") || "TBD",
          }));
          setTeams(mappedTeams);
        } else {
          setTeams([]);
        }
      } catch (err: any) {
        setError("Failed to load teams. Please try again later.");
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#002C51] py-12" aria-label="Our Teams">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-base font-inter text-center">
            Loading teams...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#002C51] py-12" aria-label="Our Teams">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-base font-inter text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#002C51] py-12" aria-label="Our Teams">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          Our Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 perspective-[1000px]">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={cn(
                "bg-black rounded-[15px] shadow-md overflow-hidden w-[300px] mx-auto flex flex-col",
                "transform rotate-x-[10deg] rotate-y-[10deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative w-full h-[200px] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <Image
                  src={team.image}
                  alt={`${team.name} team photo`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
                <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-8 border-[#002C51] ">
                  <Image
                    src={team.logo}
                    alt={`${team.name} logo`}
                    fill
                    className="object-contain rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-team-default.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="pt-[60px] px-5 pb-5 flex flex-col flex-grow text-center shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                <h3 className="text-white text-3xl font-rubik font-bold uppercase mb-1">
                  {team.name}
                </h3>
                <p className="text-white text-sm font-inter font-bold mb-1">
                  {team.grade_level}
                </p>
                <p className="text-white text-xs font-inter font-normal mb-4">
                  Coach {team.coach}
                </p>
                <Button
                  asChild
                  variant="default"
                  className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-sm px-5 py-2.5 uppercase mx-auto mt-auto"
                >
                  <Link href={`/teams/${team.id}`} className="no-underline">
                    View Team
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
