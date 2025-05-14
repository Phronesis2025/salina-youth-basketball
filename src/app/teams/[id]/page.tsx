"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Import Image component

// Define the Team type
interface Team {
  id: number;
  name: string;
  ageGroup: string;
  coach: string;
  roster: string[];
  schedule: Array<{ date: string; opponent: string; location: string }>;
  coachBio: string;
  gallery: string[];
}

// Define the expected params type
type TeamParams = {
  [key: string]: string | string[];
  id: string;
};

export default function TeamSubPage() {
  // Use typed useParams
  const params = useParams<TeamParams>();
  const teamId = params && params.id ? parseInt(params.id, 10) : null;

  const allTeams: Team[] = [
    {
      id: 1,
      name: "Thunderhawks",
      ageGroup: "U-14",
      coach: "Coach Smith",
      roster: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"],
      schedule: [
        { date: "2025-06-01", opponent: "Eagles", location: "Salina Arena" },
        { date: "2025-06-08", opponent: "Falcons", location: "Hays Court" },
      ],
      coachBio:
        "Coach Smith has 10 years of experience coaching youth basketball and has led multiple teams to regional championships.",
      gallery: ["/images/team1-1.jpg", "/images/team1-2.jpg"],
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-12",
      coach: "Coach Johnson",
      roster: ["Player A", "Player B", "Player C", "Player D", "Player E"],
      schedule: [
        { date: "2025-06-02", opponent: "Tigers", location: "Salina Arena" },
        { date: "2025-06-09", opponent: "Lions", location: "Hays Court" },
      ],
      coachBio:
        "Coach Johnson is a former college player with a passion for developing young athletes.",
      gallery: ["/images/team2-1.jpg", "/images/team2-2.jpg"],
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-16",
      coach: "Coach Lee",
      roster: ["Player X", "Player Y", "Player Z", "Player W", "Player V"],
      schedule: [
        { date: "2025-06-03", opponent: "Wolves", location: "Salina Arena" },
        { date: "2025-06-10", opponent: "Bears", location: "Hays Court" },
      ],
      coachBio:
        "Coach Lee specializes in strategic gameplay and has coached at the national level.",
      gallery: ["/images/team3-1.jpg", "/images/team3-2.jpg"],
    },
  ];

  if (!teamId) {
    return (
      <section className="py-16 bg-[#002C51] min-h-screen">
        <div className="container max-w-[75rem] mx-auto px-16">
          <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
            Team Not Found
          </h1>
          <div className="text-center">
            <Link
              href="/teams"
              className="text-[#FFFFFF] text-sm font-inter hover:text-[#E6ECEF]"
            >
              Back to Team Hub
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const team = allTeams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <section className="py-16 bg-[#002C51] min-h-screen">
        <div className="container max-w-[75rem] mx-auto px-16">
          <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
            Team Not Found
          </h1>
          <div className="text-center">
            <Link
              href="/teams"
              className="text-[#FFFFFF] text-sm font-inter hover:text-[#E6ECEF]"
            >
              Back to Team Hub
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          {team.name} ({team.ageGroup})
        </h1>

        <div className="bg-[#01182B] p-6 rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team Overview */}
            <div>
              <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-4 uppercase">
                Team Overview
              </h2>
              <p className="text-[#FFFFFF] text-sm font-inter mb-2">
                <strong>Coach:</strong> {team.coach}
              </p>
              <p className="text-[#FFFFFF] text-sm font-inter mb-2">
                <strong>Age Group:</strong> {team.ageGroup}
              </p>
            </div>

            {/* Coach Bio */}
            <div>
              <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-4 uppercase">
                Coach Bio
              </h2>
              <p className="text-[#FFFFFF] text-sm font-inter">
                {team.coachBio}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-4 uppercase">
              Roster
            </h2>
            <ul className="list-disc list-inside text-[#FFFFFF] text-sm font-inter">
              {team.roster.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-4 uppercase">
              Schedule
            </h2>
            <ul className="space-y-2 text-[#FFFFFF] text-sm font-inter">
              {team.schedule.map((game, index) => (
                <li key={index}>
                  {game.date}: {team.name} vs {game.opponent} at {game.location}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-4 uppercase">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.gallery.map((image, index) => (
                <div key={index} className="relative w-full h-48">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-[0.5rem]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/teams"
              className="text-[#FFFFFF] text-sm font-inter hover:text-[#E6ECEF]"
            >
              Back to Team Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
