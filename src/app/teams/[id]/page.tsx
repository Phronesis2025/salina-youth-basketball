"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Player {
  name: string;
  position: string;
}

interface Game {
  date: string;
  opponent: string;
  location: string;
}

interface Team {
  id: number;
  name: string;
  ageGroup: string;
  coach: string;
  coachBio: string;
  image: string;
  roster: Player[];
  schedule: Game[];
  gallery: string[];
}

export default function TeamSubPage() {
  const { id } = useParams();
  const teamId = typeof id === "string" ? parseInt(id, 10) : null;

  const allTeams: Team[] = [
    {
      id: 1,
      name: "Thunderhawks",
      ageGroup: "U-14",
      coach: "Coach Smith",
      coachBio:
        "Coach Smith has over 10 years of experience coaching youth basketball, leading the Thunderhawks to multiple regional championships. He focuses on teamwork and skill development.",
      image: "/images/team-thunderhawks.jpg",
      roster: [
        { name: "Alex Johnson", position: "Point Guard" },
        { name: "Jordan Lee", position: "Shooting Guard" },
        { name: "Chris Brown", position: "Center" },
      ],
      schedule: [
        {
          date: "May 20, 2025",
          opponent: "Eagles",
          location: "Salina Central Gym",
        },
        {
          date: "May 27, 2025",
          opponent: "Hawks",
          location: "Northside Court",
        },
      ],
      gallery: [
        "/images/thunderhawks-game1.jpg",
        "/images/thunderhawks-training.jpg",
        "/images/thunderhawks-team.jpg",
      ],
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-16",
      coach: "Coach Johnson",
      coachBio:
        "Coach Johnson is a former collegiate player with a passion for mentoring young athletes. She emphasizes discipline and strategy in her coaching approach.",
      image: "/images/team-firebolts.jpg",
      roster: [
        { name: "Taylor Green", position: "Small Forward" },
        { name: "Sam Carter", position: "Power Forward" },
        { name: "Mike Davis", position: "Center" },
      ],
      schedule: [
        {
          date: "May 22, 2025",
          opponent: "Tigers",
          location: "Downtown Arena",
        },
        { date: "May 29, 2025", opponent: "Lions", location: "Southside Gym" },
      ],
      gallery: [
        "/images/firebolts-game1.jpg",
        "/images/firebolts-training.jpg",
        "/images/firebolts-team.jpg",
      ],
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-12",
      coach: "Coach Davis",
      coachBio:
        "Coach Davis focuses on building confidence and fundamentals in young players. He has been with the Stingers for 5 years, fostering a love for the game.",
      image: "/images/team-stingers.jpg",
      roster: [
        { name: "Liam Wilson", position: "Point Guard" },
        { name: "Noah Harris", position: "Shooting Guard" },
        { name: "Ethan Clark", position: "Center" },
      ],
      schedule: [
        {
          date: "May 25, 2025",
          opponent: "Wolves",
          location: "Northside Court",
        },
        { date: "June 1, 2025", opponent: "Bears", location: "Eastside Arena" },
      ],
      gallery: [
        "/images/stingers-game1.jpg",
        "/images/stingers-training.jpg",
        "/images/stingers-team.jpg",
      ],
    },
    {
      id: 4,
      name: "Lightning",
      ageGroup: "U-10",
      coach: "Coach Brown",
      coachBio:
        "Coach Brown specializes in introducing young kids to basketball, focusing on fun and basic skills. He has been coaching for 8 years.",
      image: "/images/team-lightning.jpg",
      roster: [
        { name: "Mason Turner", position: "Guard" },
        { name: "Lucas Moore", position: "Forward" },
        { name: "Oliver King", position: "Center" },
      ],
      schedule: [
        { date: "May 21, 2025", opponent: "Cubs", location: "Westside Gym" },
        { date: "May 28, 2025", opponent: "Foxes", location: "Central Court" },
      ],
      gallery: [
        "/images/lightning-game1.jpg",
        "/images/lightning-training.jpg",
        "/images/lightning-team.jpg",
      ],
    },
    {
      id: 5,
      name: "Vipers",
      ageGroup: "U-14",
      coach: "Coach Wilson",
      coachBio:
        "Coach Wilson brings a competitive edge to the Vipers, with a background in high school coaching. He focuses on strategy and teamwork.",
      image: "/images/team-vipers.jpg",
      roster: [
        { name: "Ethan Wright", position: "Point Guard" },
        { name: "Jacob Lewis", position: "Shooting Guard" },
        { name: "Logan Scott", position: "Center" },
      ],
      schedule: [
        { date: "May 23, 2025", opponent: "Sharks", location: "Southside Gym" },
        {
          date: "May 30, 2025",
          opponent: "Panthers",
          location: "Downtown Arena",
        },
      ],
      gallery: [
        "/images/vipers-game1.jpg",
        "/images/vipers-training.jpg",
        "/images/vipers-team.jpg",
      ],
    },
    {
      id: 6,
      name: "Raptors",
      ageGroup: "U-16",
      coach: "Coach Taylor",
      coachBio:
        "Coach Taylor has coached the Raptors for 3 years, emphasizing leadership and skill development. She played college basketball at Kansas State.",
      image: "/images/team-raptors.jpg",
      roster: [
        { name: "Ryan Harris", position: "Small Forward" },
        { name: "Dylan Clark", position: "Power Forward" },
        { name: "James Adams", position: "Center" },
      ],
      schedule: [
        { date: "May 24, 2025", opponent: "Bulls", location: "Eastside Arena" },
        {
          date: "May 31, 2025",
          opponent: "Knights",
          location: "Northside Court",
        },
      ],
      gallery: [
        "/images/raptors-game1.jpg",
        "/images/raptors-training.jpg",
        "/images/raptors-team.jpg",
      ],
    },
  ];

  const team = allTeams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <section className="py-16 bg-[#002C51] min-h-screen">
        <div className="container max-w-[75rem] mx-auto px-16 text-center">
          <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 uppercase">
            Team Not Found
          </h1>
          <p className="text-[#FFFFFF] text-sm font-inter mb-10">
            The team you’re looking for doesn’t exist or has been removed.
          </p>
          <Button
            asChild
            variant="default"
            className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
          >
            <Link href="/teams" className="no-underline">
              Back to Team Hub
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        {/* Team Overview */}
        <div className="mb-16 text-center">
          <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-4 uppercase">
            {team.name}
          </h1>
          <p className="text-[#FFFFFF] text-lg font-inter mb-4">
            {team.ageGroup} | Coach: {team.coach}
          </p>
          <img
            src={team.image}
            alt={team.name}
            className="w-full max-w-md mx-auto h-64 object-cover rounded-[1rem] mb-6"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "/images/placeholder-team-default.jpg")
            }
          />
        </div>

        {/* Coach Bio */}
        <div className="mb-16">
          <h2 className="text-[#FFFFFF] text-[clamp(1.5rem,3vw,2rem)] font-bold font-rubik mb-6 text-center uppercase">
            Meet the Coach
          </h2>
          <div className="bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-6">
            <p className="text-[#FFFFFF] text-sm font-inter">{team.coachBio}</p>
          </div>
        </div>

        {/* Roster */}
        <div className="mb-16">
          <h2 className="text-[#FFFFFF] text-[clamp(1.5rem,3vw,2rem)] font-bold font-rubik mb-6 text-center uppercase">
            Roster
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.roster.map((player, index) => (
              <div
                key={index}
                className={cn(
                  "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-4",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
                )}
              >
                <p className="text-[#FFFFFF] text-sm font-rubik font-semibold uppercase">
                  {player.name}
                </p>
                <p className="text-[#FFFFFF] text-sm font-inter">
                  {player.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-16">
          <h2 className="text-[#FFFFFF] text-[clamp(1.5rem,3vw,2rem)] font-bold font-rubik mb-6 text-center uppercase">
            Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.schedule.map((game, index) => (
              <div
                key={index}
                className={cn(
                  "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-4",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
                )}
              >
                <p className="text-[#FFFFFF] text-sm font-rubik font-semibold uppercase">
                  {game.date}
                </p>
                <p className="text-[#FFFFFF] text-sm font-inter">
                  {game.opponent}
                </p>
                <p className="text-[#FFFFFF] text-sm font-inter">
                  {game.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-[#FFFFFF] text-[clamp(1.5rem,3vw,2rem)] font-bold font-rubik mb-6 text-center uppercase">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.gallery.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
                )}
              >
                <img
                  src={image}
                  alt={`${team.name} gallery image ${index + 1}`}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "/images/placeholder-gallery-default.jpg")
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Back to Team Hub Button */}
        <div className="text-center">
          <Button
            asChild
            variant="default"
            className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
          >
            <Link href="/teams" className="no-underline">
              Back to Team Hub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
