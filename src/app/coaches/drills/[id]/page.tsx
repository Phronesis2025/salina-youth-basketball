"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DrillPage() {
  const drill = {
    title: "Lightning Pass Relay",
    skills: ["Passing", "Defensive stance & footwork"],
    equipment: ["cones", "markers"],
    time: "10 minutes",
    instructions:
      "Set up two parallel lines of 4 cones each, 10 feet apart, forming two lanes across half the court. Split players into two even teams, each lined up behind the first cone of their lane. The first player in each line starts in a defensive stance, holding a basketball. On the coach’s whistle, they slide sideways through the cones, staying low, and make a crisp chest pass to the next teammate at the end of the lane. The receiving player catches, assumes a defensive stance, and slides back through the cones to pass to the next player. Continue until all players complete the circuit. Run 4 rounds, switching to bounce passes for the final two rounds. The first team to finish each round earns a point. Encourage quick, accurate passes and low stances.",
    additional_info:
      "Use markers to outline lanes for clarity. For younger players (8–10), reduce cones to 3 per lane and shorten the distance to 8 feet. Coaches should monitor stance height and passing form, ensuring players don’t stand upright. For older players (12–14), add a time limit per round (e.g., 30 seconds) to increase urgency. Ensure teams are balanced in skill to keep the relay competitive. If space is limited, use one lane and alternate teams. Clear the court of extra balls to avoid distractions.",
    benefits:
      "This drill enhances passing accuracy and speed, teaching players to deliver precise chest and bounce passes under movement. It also strengthens defensive stance and lateral footwork, improving agility and balance when guarding opponents or navigating tight game situations.",
    difficulty: "Basic",
    category: "Drill",
    week_number: 1,
    suggested_image_type:
      "Action shot of players sliding through cones and passing",
  };

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12" aria-label="Drill Overview">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold text-center uppercase mb-6">
            {drill.title}
          </h1>
          <div className="relative h-64 sm:h-96 mb-6">
            <Image
              src="/images/drill-placeholder.png"
              alt="Placeholder for Lightning Pass Relay drill"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </section>

        {/* Drill Details */}
        <article className="bg-gray-900/50 rounded-lg p-6 sm:p-8 shadow-md border border-red-500/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Skills */}
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
                Skills
              </h2>
              <ul className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik list-disc pl-5">
                {drill.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
                Equipment Needed
              </h2>
              <ul className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik list-disc pl-5">
                {drill.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
                Time
              </h2>
              <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
                {drill.time}
              </p>
            </div>
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
                Difficulty
              </h2>
              <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
                {drill.difficulty}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
              Instructions
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {drill.instructions}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
              Additional Info
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {drill.additional_info}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2">
              Benefits
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {drill.benefits}
            </p>
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
