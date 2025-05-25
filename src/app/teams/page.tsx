"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Team {
  id: number;
  grade_level: string;
  name: string;
  coaches: string[];
  image: string;
  logo: string;
  badge?: string;
}

export default function TeamHub() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [gradeFilter, setGradeFilter] = useState<string>("All");
  const [genderFilter, setGenderFilter] = useState<string>("All");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const gradeOptions = [
    "All",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
  ];
  const genderOptions = ["All", "Boys", "Girls"];

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data, error } = await supabase.from("teams").select("*");
        if (error) throw error;
        setTeams(data || []);
      } catch (err: any) {
        setError("Failed to load teams. Please try again later.");
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    }
    fetchTeams();
  }, []);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const parts = team.grade_level.trim().split(" ");
      let grade = "Unknown";
      let gender = "Unknown";
      if (parts.length >= 3) {
        grade = parts.slice(0, 2).join(" ");
        gender = parts[parts.length - 1];
      } else {
        console.warn(`Unexpected grade_level format: ${team.grade_level}`);
      }
      console.log(
        `Parsing team: ${team.name}, Grade: ${grade}, Gender: ${gender}`
      );
      const matchesGrade = gradeFilter === "All" || grade === gradeFilter;
      const matchesGender = genderFilter === "All" || gender === genderFilter;
      return matchesGrade && matchesGender;
    });
  }, [teams, gradeFilter, genderFilter]);

  if (loading) {
    return (
      <section
        className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
        aria-label="Team Hub"
      >
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
      <section
        className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
        aria-label="Team Hub"
      >
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-base font-inter text-center">{error}</p>
        </div>
      </section>
    );
  }

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

        {/* Filter Dropdowns */}
        <div
          className="mb-8 flex flex-col sm:flex-row justify-center gap-4"
          style={{ animationDelay: "0.3s" }}
          aria-label="Filter teams by grade and gender"
        >
          <div className="flex flex-col">
            <label
              htmlFor="grade-filter"
              className="text-white text-base font-rubik mb-2 uppercase"
            >
              Grade
            </label>
            <select
              id="grade-filter"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className={cn(
                "bg-gray-900 text-white font-inter text-base uppercase rounded-md px-4 py-2 border border-blue-600",
                "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              )}
              aria-label="Filter by grade level"
            >
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="gender-filter"
              className="text-white text-base font-rubik mb-2 uppercase"
            >
              Gender
            </label>
            <select
              id="gender-filter"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className={cn(
                "bg-gray-900 text-white font-inter text-base uppercase rounded-md px-4 py-2 border border-blue-600",
                "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              )}
              aria-label="Filter by gender"
            >
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Team Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 perspective-[1000px]"
          id="team-grid"
          aria-live="polite"
        >
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className={cn(
                  "bg-black rounded-[15px] shadow-md overflow-hidden w-[300px] mx-auto flex flex-col",
                  "transform rotate-x-[10deg] rotate-y-[10deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                )}
                style={{
                  animationDelay: isInitialLoad
                    ? `${0.4 + index * 0.1}s`
                    : undefined,
                }}
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
                  <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-8 border-[#002C51] shadow-[0_5px_10px_rgba(0,0,0,0.3)]">
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
                  <h2 className="text-white text-3xl font-rubik font-bold uppercase mb-1">
                    {team.name}
                  </h2>
                  <p className="text-white text-sm font-inter font-bold uppercase mb-1">
                    {team.grade_level}
                  </p>
                  <p className="text-white text-xs font-inter font-normal uppercase mb-4">
                    Coach {team.coaches.join(", ")}
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
            ))
          ) : (
            <p className="text-white text-base font-inter text-center col-span-full">
              No teams found for this grade and gender.
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
