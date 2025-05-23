"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function RulesPage() {
  const rules = [
    {
      title: "Game Rules",
      content:
        "All games follow standard youth basketball rules with modifications for age groups. Games consist of four 8-minute quarters for U12 and U14 teams, with a 5-minute halftime. Each player must play at least 50% of the game to ensure fair participation. No zone defense is allowed for U10 and below to encourage skill development. Fouls are strictly enforced, with a maximum of 5 personal fouls per player before fouling out.",
    },
    {
      title: "Player Eligibility",
      content:
        "Players must be registered with the Salina Youth Basketball Club and meet age requirements: U10 (ages 8–10), U12 (ages 10–12), U14 (ages 12–14) as of September 1st of the current season. Proof of age (e.g., birth certificate) is required upon registration. Players may only participate on one team per season to ensure fairness and commitment.",
    },
    {
      title: "Safety Policies",
      content:
        "All players must wear appropriate athletic shoes and uniforms during practices and games. Jewelry, watches, and other accessories are prohibited on the court to prevent injuries. Coaches are required to have a first aid kit at all events, and at least one coach per team must be CPR-certified. Games will be paused in case of severe weather (e.g., lightning within 10 miles) until conditions are safe.",
    },
    {
      title: "Code of Conduct",
      content:
        "Players, coaches, and parents must adhere to a strict code of conduct. Unsportsmanlike behavior, including taunting, arguing with referees, or disrespecting opponents, will result in immediate ejection from the game. A zero-tolerance policy applies to bullying, harassment, or violence, with potential suspension from the league. All participants are expected to uphold the values of respect, teamwork, and integrity.",
    },
  ];

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center" aria-label="Rules and Policies">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Rules & Policies
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Understand our league’s rules and policies to ensure fair play,
            safety, and a positive experience for all.
          </p>
        </section>

        {/* Rules Accordion */}
        <section className="mb-12" aria-label="League Rules">
          <div className="bg-gray-900/50 rounded-lg px-3 md:px-6 py-6 shadow-md border border-red-500/50">
            <Accordion type="single" collapsible className="space-y-4">
              {rules.map((rule, index) => (
                <AccordionItem
                  key={rule.title}
                  value={`rule-${index}`}
                  className="bg-gray-900/50 rounded-lg transition-all duration-300 hover:shadow-red-500/50"
                >
                  <AccordionTrigger className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase px-6 py-4 hover:no-underline">
                    {rule.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik px-6 py-2">
                    {rule.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
