"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CoachHighlightPage() {
  const coach = {
    name: "Coach Jane Smith",
    image: "/images/coach-placeholder.png",
    bio: "Coach Jane Smith has been with the Salina Youth Basketball Club for over 5 years, leading the U12 Thunderhawks to multiple regional championships. With a background in youth sports education, she is passionate about fostering teamwork and resilience in her players. Jane’s dedication to player development has made her a beloved figure in our community.",
    philosophy:
      "I believe in building a strong foundation of skills while creating a fun, supportive environment. My goal is to help every player grow not just as an athlete, but as a teammate and leader, ready to face challenges both on and off the court.",
    achievements:
      "Led the U12 Thunderhawks to the 2024 Central Kansas Championship. Named Coach of the Year in 2023 by the Kansas Youth Basketball Association. Achieved a 90% player retention rate over 3 seasons, reflecting her ability to inspire and motivate young athletes.",
    quote:
      "Basketball is more than a game—it’s a way to teach life skills like discipline, teamwork, and perseverance.",
  };

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center" aria-label="Coach Highlight">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase mb-6">
            Coach of the Month: {coach.name}
          </h1>
          <div className="relative h-64 sm:h-96 mb-6 mx-auto max-w-md">
            <Image
              src={coach.image}
              alt={`Portrait of ${coach.name}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </section>

        {/* Coach Details */}
        <article className="bg-gray-900/50 rounded-lg px-3 md:px-6 py-6 shadow-md border border-red-500/50">
          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-rubik font-semibold uppercase mb-2 whitespace-nowrap">
              Bio
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
              {coach.bio}
            </p>
          </div>

          {/* Coaching Philosophy */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-rubik font-semibold uppercase mb-2 whitespace-nowrap">
              Coaching Philosophy
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
              {coach.philosophy}
            </p>
          </div>

          {/* Team Achievements */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-rubik font-semibold uppercase mb-2 whitespace-nowrap">
              Team Achievements
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
              {coach.achievements}
            </p>
          </div>

          {/* Quote */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-rubik font-semibold uppercase mb-2 whitespace-nowrap">
              Quote
            </h2>
            <blockquote className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik italic border-l-4 border-red-500 pl-4">
              “{coach.quote}”
            </blockquote>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Link href="/coaches">
            <Button
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            >
              Back to Coaches Corner
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
