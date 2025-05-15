"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  logo: string; // New field for team logo
}

// Define the expected params type
type TeamParams = {
  [key: string]: string | string[];
  id: string;
};

export default function TeamSubPage() {
  const params = useParams<TeamParams>();
  const teamId = params && params.id ? parseInt(params.id, 10) : null;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      gallery: ["/images/team-thunderhawks.jpg"], // Placeholder; add more images if available
      logo: "/images/team-thunderhawks.jpg",
    },
    {
      id: 2,
      name: "Firebolts",
      ageGroup: "U-16",
      coach: "Coach Johnson",
      roster: ["Player A", "Player B", "Player C", "Player D", "Player E"],
      schedule: [
        { date: "2025-06-02", opponent: "Tigers", location: "Salina Arena" },
        { date: "2025-06-09", opponent: "Lions", location: "Hays Court" },
      ],
      coachBio:
        "Coach Johnson is a former college player with a passion for developing young athletes.",
      gallery: ["/images/team-firebolts.jpg"],
      logo: "/images/team-firebolts.jpg",
    },
    {
      id: 3,
      name: "Stingers",
      ageGroup: "U-12",
      coach: "Coach Davis",
      roster: ["Player X", "Player Y", "Player Z", "Player W", "Player V"],
      schedule: [
        { date: "2025-06-03", opponent: "Wolves", location: "Salina Arena" },
        { date: "2025-06-10", opponent: "Bears", location: "Hays Court" },
      ],
      coachBio:
        "Coach Davis specializes in strategic gameplay and has coached at the national level.",
      gallery: ["/images/team-stingers.jpg"],
      logo: "/images/team-stingers.jpg",
    },
    {
      id: 4,
      name: "Lightning",
      ageGroup: "U-10",
      coach: "Coach Brown",
      roster: ["Player L1", "Player L2", "Player L3", "Player L4", "Player L5"],
      schedule: [
        { date: "2025-06-04", opponent: "Hawks", location: "Salina Arena" },
        { date: "2025-06-11", opponent: "Cougars", location: "Hays Court" },
      ],
      coachBio:
        "Coach Brown is dedicated to fostering teamwork and skill development in young athletes.",
      gallery: ["/images/team-lightning.jpg"],
      logo: "/images/team-lightning.jpg",
    },
    {
      id: 5,
      name: "Vipers",
      ageGroup: "U-14",
      coach: "Coach Wilson",
      roster: ["Player V1", "Player V2", "Player V3", "Player V4", "Player V5"],
      schedule: [
        { date: "2025-06-05", opponent: "Panthers", location: "Salina Arena" },
        { date: "2025-06-12", opponent: "Jaguars", location: "Hays Court" },
      ],
      coachBio:
        "Coach Wilson has a track record of building competitive teams with strong fundamentals.",
      gallery: ["/images/team-vipers.jpg"],
      logo: "/images/team-vipers.jpg",
    },
    {
      id: 6,
      name: "Raptors",
      ageGroup: "U-16",
      coach: "Coach Taylor",
      roster: ["Player R1", "Player R2", "Player R3", "Player R4", "Player R5"],
      schedule: [
        { date: "2025-06-06", opponent: "Ravens", location: "Salina Arena" },
        { date: "2025-06-13", opponent: "Owls", location: "Hays Court" },
      ],
      coachBio:
        "Coach Taylor focuses on player development and strategic play, with years of coaching experience.",
      gallery: ["/images/team-raptors.jpg"],
      logo: "/images/team-raptors.jpg",
    },
  ];

  const defaultPlaceholder = "/images/placeholder-team-default.jpg";

  if (!teamId) {
    return (
      <main className="pt-20 sm:pt-24">
        <section
          className="bg-[#002C51] py-12 min-h-screen"
          aria-label="Team Not Found"
        >
          <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Team Not Found
            </h1>
            <div className="text-center">
              <Button
                asChild
                variant="default"
                className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                <Link href="/teams">Back to Team Hub</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const team = allTeams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <main className="pt-20 sm:pt-24">
        <section
          className="bg-[#002C51] py-12 min-h-screen"
          aria-label="Team Not Found"
        >
          <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Team Not Found
            </h1>
            <div className="text-center">
              <Button
                asChild
                variant="default"
                className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                <Link href="/teams">Back to Team Hub</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Use team logo for Hero
  const heroImage = team.logo || defaultPlaceholder;

  return (
    <main className="pt-20 sm:pt-24">
      <section
        className="bg-[#002C51] py-12 min-h-screen"
        aria-label={`${team.name} Team Details`}
      >
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div
            className="relative w-full h-96 sm:h-[28rem] mb-8 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <Image
              src={heroImage}
              alt={`${team.name} team logo`}
              fill
              priority
              className="object-cover object-top"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                console.error(`Failed to load Hero image: ${heroImage}`);
                const target = e.target as HTMLImageElement;
                target.src = defaultPlaceholder;
              }}
              onLoadingComplete={() =>
                console.log(`Hero image loaded: ${heroImage}`)
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-white text-[clamp(2.5rem,6vw,4xl)] font-bold font-rubik uppercase">
                {team.name} ({team.ageGroup})
              </h1>
              <Button
                asChild
                variant="default"
                className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mt-4"
              >
                <Link href="#schedule">View Schedule</Link>
              </Button>
            </div>
          </div>

          {/* Overview and Coach Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div
              className="bg-gray-900 p-6 rounded-lg shadow-md animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
                Team Overview
              </h2>
              <p className="text-white text-base font-inter mb-2">
                <strong>Coach:</strong> {team.coach}
              </p>
              <p className="text-white text-base font-inter">
                <strong>Age Group:</strong> {team.ageGroup}
              </p>
            </div>
            <div
              className="bg-gray-900 p-6 rounded-lg shadow-md animate-fadeIn"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
                Coach Bio
              </h2>
              <p className="text-white text-base font-inter">{team.coachBio}</p>
            </div>
          </div>

          {/* Roster */}
          <div className="mb-8">
            <h2
              className="text-white text-2xl font-rubik font-semibold mb-4 uppercase animate-fadeIn"
              style={{ animationDelay: "0.5s" }}
            >
              Roster
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {team.roster.map((player, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg shadow-md h-32 flex items-center justify-center animate-fadeIn"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <span className="text-white text-base font-inter">
                    {player}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-8" id="schedule">
            <h2
              className="text-white text-2xl font-rubik font-semibold mb-4 uppercase animate-fadeIn"
              style={{ animationDelay: "0.8s" }}
            >
              Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white text-base font-inter">
                <thead>
                  <tr className="bg-blue-600">
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Opponent</th>
                    <th className="p-4 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {team.schedule.map((game, index) => (
                    <tr
                      key={index}
                      className="bg-gray-900 animate-fadeIn"
                      style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                    >
                      <td className="p-4">{game.date}</td>
                      <td className="p-4">{game.opponent}</td>
                      <td className="p-4">{game.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {team.schedule.length === 0 && (
              <p className="text-white text-base font-inter text-center mt-4">
                No upcoming games scheduled.
              </p>
            )}
          </div>

          {/* Gallery */}
          <div className="mb-8">
            <h2
              className="text-white text-2xl font-rubik font-semibold mb-4 uppercase animate-fadeIn"
              style={{ animationDelay: "1.1s" }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {team.gallery.map((image, index) => (
                <button
                  key={index}
                  className="relative w-full h-48 overflow-hidden rounded-lg shadow-md group animate-fadeIn"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View gallery image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      console.error(`Failed to load Gallery image: ${image}`);
                      const target = e.target as HTMLImageElement;
                      target.src = defaultPlaceholder;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Back CTA */}
          <div className="text-center">
            <Button
              asChild
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase animate-fadeIn"
              style={{ animationDelay: "1.4s" }}
            >
              <Link href="/teams">Back to Team Hub</Link>
            </Button>
          </div>

          {/* Gallery Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn"
              onClick={() => setSelectedImage(null)}
              role="dialog"
              aria-label="Gallery image modal"
            >
              <div className="relative max-w-[90%] max-h-[90%]">
                <Image
                  src={selectedImage}
                  alt="Selected gallery image"
                  width={1200}
                  height={800}
                  className="object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    console.error(
                      `Failed to load Modal image: ${selectedImage}`
                    );
                    const target = e.target as HTMLImageElement;
                    target.src = defaultPlaceholder;
                  }}
                />
                <button
                  className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
