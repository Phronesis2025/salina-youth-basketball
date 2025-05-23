"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CoachesPage() {
  const sections = [
    {
      title: "Coach Highlight",
      description:
        "Meet our Coach of the Month, Coach Jane Smith, and learn about her dedication to our teams.",
      link: "/coaches/highlight",
    },
    {
      title: "AI-Generated Drills",
      description:
        "Explore weekly basketball drills, like the Lightning Pass Relay, to boost your team’s skills.",
      link: "/coaches/drills/1",
    },
    {
      title: "Rules & Policies",
      description:
        "Understand our league’s rules and policies to ensure fair play and safety for all.",
      link: "/coaches/rules",
    },
    {
      title: "Video Tutorial Library",
      description:
        "Watch tutorials on drills and techniques to enhance your coaching and player development.",
      link: "/coaches/videos",
    },
    {
      title: "Resource Archive",
      description:
        "Download playbooks, drill sheets, and guides to support your coaching journey.",
      link: "/coaches/resources",
    },
  ];

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          className="mb-12 text-center"
          aria-label="Coaches Page Welcome"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase mb-4">
            Coaches Corner
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Your hub for coaching resources, AI-generated drills, and league
            updates to lead your team to success.
          </p>
          <div className="relative h-64 sm:h-96 mb-8">
            <Image
              src="/images/coaches-hero.png"
              alt="Coaches Corner hero image"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </section>

        {/* Sections Grid */}
        <section className="mb-12" aria-label="Coaching Resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sections.map((section, index) => (
              <Card
                key={section.title}
                className={cn(
                  "bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
                )}
                aria-label={`Section: ${section.title}`}
              >
                <CardHeader>
                  <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase whitespace-nowrap">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik mb-4">
                    {section.description}
                  </p>
                  <Link href={section.link}>
                    <Button
                      variant="default"
                      className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
                    >
                      Explore {section.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex justify-center" aria-label="Navigation">
          <Link href="/">
            <Button
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            >
              Back to Homepage
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
