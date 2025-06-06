"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../src/components/ui/button";
import { cn } from "../../../src/lib/utils";
import { supabase } from "../../../src/lib/supabaseClient";

// Import events from shared data file
import { events } from "../../../src/lib/schedules/data";

interface Team {
  id: number;
  grade_level: string;
  name: string;
  coaches: string[];
  coach_bio: string;
  gallery: string[];
  image: string;
  logo: string;
  merch_image: string;
}

type TeamParams = {
  id: string;
};

export default function TeamSubPage() {
  const params = useParams<TeamParams>();
  const teamId = params && params.id ? parseInt(params.id, 10) : null;
  const [team, setTeam] = useState<Team | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultPlaceholder = "/images/placeholder-team-default.jpg";

  useEffect(() => {
    async function fetchTeam() {
      if (!teamId) {
        setError("Invalid team ID.");
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("teams")
          .select("*")
          .eq("id", teamId)
          .single();
        if (error) throw error;
        setTeam(data);
      } catch (err: any) {
        setError("Team not found.");
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [teamId]);

  if (loading) {
    return (
      <main className="pt-20 sm:pt-24">
        <section
          className="bg-[#002C51] py-12 min-h-screen"
          aria-label="Loading Team"
        >
          <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white text-base font-inter text-center">
              Loading team...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !teamId || !team) {
    return (
      <main className="pt-20 sm:pt-24">
        <section
          className="bg-[#002C51] py-12 min-h-screen"
          aria-label="Team Not Found"
        >
          <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase">
              Team Not Found
            </h1>
            <div className="text-center">
              <Button
                asChild
                variant="default"
                className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
              >
                <Link href="/teams">Back to Team Hub</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Current date for filtering upcoming events
  const today = new Date("2025-05-17T16:45:00-05:00"); // May 17, 2025, 04:45 PM CDT

  // Filter and sort events for this team
  const teamEvents = events
    .filter(
      (event) =>
        event.extendedProps.team === team.name ||
        event.extendedProps.team === "All Teams"
    )
    .filter((event) => new Date(event.start) > today)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  // Split events into practices and games
  const practices = teamEvents
    .filter((event) => event.extendedProps.type === "Practice")
    .slice(0, 7)
    .map((event) => ({
      date: event.start,
      opponent: "N/A",
      location: event.extendedProps.location,
    }));

  const games = teamEvents
    .filter((event) => event.extendedProps.type === "Game")
    .slice(0, 7)
    .map((event) => ({
      date: event.start,
      opponent: event.title
        .replace(`${team.name} vs. `, "")
        .replace(" (Game)", ""),
      location: event.extendedProps.location,
    }));

  // Use team image for Hero and merchandise
  const heroImage = team.image || defaultPlaceholder;
  const teamMerchImage = team.merch_image || defaultPlaceholder;

  // Format date (e.g., "MM/DD/YYYY")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <main className="pt-20 sm:pt-24">
      <section
        className="bg-[#002C51] py-12 min-h-screen"
        aria-label={`${team.name} Team Details`}
      >
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative w-full h-96 sm:h-[28rem] mb-8">
            <Image
              src={heroImage}
              alt={`${team.name} team logo`}
              fill
              priority
              className="object-cover object-center"
              onError={(e) => {
                console.error(`Failed to load Hero image: ${heroImage}`);
                const target = e.target as HTMLImageElement;
                target.src = defaultPlaceholder;
              }}
              onLoadingComplete={() =>
                console.log(`Hero image loaded: ${heroImage}`)
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center">
              <div className="relative w-[100px] h-[100px] rounded-full border-8 border-[#002C51] shadow-[0_5px_10px_rgba(0,0,0,0.5)] bg-black/50 mb-4">
                <Image
                  src={team.logo}
                  alt={`${team.name} logo`}
                  fill
                  className="object-contain rounded-full"
                  onError={(e) => {
                    console.error(`Failed to load Logo image: ${team.logo}`);
                    const target = e.target as HTMLImageElement;
                    target.src = defaultPlaceholder;
                  }}
                />
              </div>
              <h1 className="text-white text-[clamp(2.5rem,6vw,4xl)] font-bold font-rubik uppercase text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {team.name}
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
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
                Team Overview
              </h2>
              <p className="text-white text-base font-inter mb-2">
                <strong>Coach:</strong> {team.coaches.join(", ")}
              </p>
              <p className="text-white text-base font-inter">
                <strong>Grade Level:</strong> {team.grade_level}
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
                Coach Bio
              </h2>
              <p className="text-white text-base font-inter">
                {team.coach_bio}
              </p>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="mb-8" id="schedule">
            <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
              Upcoming Practices
            </h2>
            <div className="mb-8">
              <table className="w-full text-white text-base font-inter rounded-lg shadow-md border border-gray-700">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-blue-600 rounded-t-lg">
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Date
                    </th>
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Start Time
                    </th>
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {practices.length > 0 ? (
                    practices.map((practice, index) => (
                      <tr
                        key={index}
                        className={cn(
                          "block sm:table-row border-b border-gray-700 sm:border-0 mb-4 sm:mb-0",
                          index % 2 === 0 ? "bg-gray-900" : "bg-gray-800",
                          "hover:bg-gray-700 sm:hover:bg-gray-700 transition-colors duration-200"
                        )}
                      >
                        <td
                          data-label="Date"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {formatDate(practice.date)}
                        </td>
                        <td
                          data-label="Start Time"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {new Date(practice.date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td
                          data-label="Location"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {practice.location}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-gray-400 text-sm"
                      >
                        No upcoming practices scheduled.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
              Upcoming Games
            </h2>
            <div className="mb-8">
              <table className="w-full text-white text-base font-inter rounded-lg shadow-md border border-gray-700">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-blue-600 rounded-t-lg">
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Date
                    </th>
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Opponent
                    </th>
                    <th className="p-4 text-left font-rubik font-semibold uppercase text-sm">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.length > 0 ? (
                    games.map((game, index) => (
                      <tr
                        key={index}
                        className={cn(
                          "block sm:table-row border-b border-gray-700 sm:border-0 mb-4 sm:mb-0",
                          index % 2 === 0 ? "bg-gray-900" : "bg-gray-800",
                          "hover:bg-gray-700 sm:hover:bg-gray-700 transition-colors duration-200"
                        )}
                      >
                        <td
                          data-label="Date"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {formatDate(game.date)}
                        </td>
                        <td
                          data-label="Opponent"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {game.opponent}
                        </td>
                        <td
                          data-label="Location"
                          className="block sm:table-cell p-3 sm:p-4 text-sm text-left before:content-[attr(data-label)] before:font-rubik before:font-semibold before:uppercase before:mr-2 sm:before:content-none"
                        >
                          {game.location}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-gray-400 text-sm"
                      >
                        No upcoming games scheduled.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-8">
            <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {team.gallery.length > 0 ? (
                team.gallery.map((image, index) => (
                  <button
                    key={index}
                    className="relative w-full h-48 overflow-hidden rounded-lg shadow-md group"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View gallery image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`Failed to load Gallery image: ${image}`);
                        const target = e.target as HTMLImageElement;
                        target.src = defaultPlaceholder;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))
              ) : (
                <p className="text-white text-base font-inter text-center col-span-full">
                  No gallery images available.
                </p>
              )}
            </div>
          </div>

          {/* Team Apparel */}
          <div className="mb-8">
            <h2 className="text-white text-2xl font-rubik font-semibold mb-4 uppercase">
              Team Apparel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <Link
                href="/shop"
                className="relative w-full h-48 overflow-hidden rounded-lg shadow-md group"
                aria-label={`Purchase ${team.name} merchandise`}
              >
                <Image
                  src={teamMerchImage}
                  alt={`${team.name} merchandise`}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    console.error(
                      `Failed to load Merch image: ${teamMerchImage}`
                    );
                    const target = e.target as HTMLImageElement;
                    target.src = defaultPlaceholder;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <Button
                    variant="default"
                    className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mb-4"
                  >
                    Shop Now
                  </Button>
                </div>
              </Link>
            </div>
          </div>

          {/* Back CTA */}
          <div className="text-center">
            <Button
              asChild
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            >
              <Link href="/teams">Back to Team Hub</Link>
            </Button>
          </div>

          {/* Gallery Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
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
                  onError={(e) => {
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
