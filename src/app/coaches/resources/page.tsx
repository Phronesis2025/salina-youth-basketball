"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      title: "U12 Playbook",
      description:
        "A comprehensive playbook with offensive and defensive plays tailored for U12 teams.",
      link: "/resources/u12-playbook.pdf",
    },
    {
      title: "Dribbling Drill Sheet",
      description:
        "A printable sheet with 10 dribbling drills to improve ball-handling skills for all age groups.",
      link: "/resources/dribbling-drill-sheet.pdf",
    },
    {
      title: "Coaching Guide: Motivating Young Players",
      description:
        "A guide for coaches on motivating and inspiring young athletes to perform their best.",
      link: "/resources/coaching-guide-motivating-players.pdf",
    },
    {
      title: "Tournament Checklist",
      description:
        "A checklist for coaches to prepare for tournaments, including equipment and travel tips.",
      link: "/resources/tournament-checklist.pdf",
    },
  ];

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center" aria-label="Resource Archive">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Resource Archive
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Download playbooks, drill sheets, and guides to support your
            coaching journey.
          </p>
        </section>

        {/* Resources List */}
        <section className="mb-12" aria-label="Coaching Resources">
          <div className="bg-gray-900/50 rounded-lg px-3 md:px-6 py-6 shadow-md border border-red-500/50">
            <div className="space-y-6">
              {resources.map((resource, index) => (
                <div
                  key={resource.title}
                  className="bg-gray-900/50 rounded-lg p-4 transition-all duration-300 hover:shadow-red-500/50"
                >
                  <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
                    {resource.title}
                  </h2>
                  <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik mb-4">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    className="inline-block bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-center">
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
