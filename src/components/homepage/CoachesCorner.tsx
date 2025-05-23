"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Drill {
  title: string;
  description: string;
  week_number: number;
}

export default function CoachesCorner() {
  const [currentDrill, setCurrentDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentDrill = async () => {
      try {
        // Calculate the current week and map to week_number (1 to 26)
        const currentWeek =
          Math.floor(
            (new Date().getTime() -
              new Date(new Date().getFullYear(), 0, 1).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          ) + 1;
        const weekNumber = ((currentWeek - 1) % 26) + 1;

        // Fetch the drill for the current week
        const { data, error } = await supabase
          .from("drills")
          .select("title, instructions")
          .eq("week_number", weekNumber)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          const description =
            data.instructions.length > 100
              ? data.instructions.substring(0, 100) + "..."
              : data.instructions;
          setCurrentDrill({
            title: data.title,
            description,
            week_number: weekNumber,
          });
        }
      } catch (err) {
        setError("Failed to load the current drill. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDrill();
  }, []);

  const accordionItems = [
    {
      title: "Coach Highlight",
      description: "Meet our Coach of the Month and learn about their impact.",
    },
    {
      title: "AI-Generated Drills",
      description:
        currentDrill?.description ||
        "Discover weekly drills to boost your team's skills.",
    },
    {
      title: "Rules & Policies",
      description: "Understand our league's rules for fair play and safety.",
    },
    {
      title: "Video Archive",
      description: "Watch tutorials to enhance your coaching techniques.",
    },
  ];

  return (
    <section className="bg-[#002C51] py-12" aria-label="Coaches Corner">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase mb-4 border-b-2 border-red-500 pb-2 mx-auto w-fit">
            Coaches Corner
          </h2>
        </div>

        {/* Split Layout: Image and Accordion with Subtitle */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* Image - Left Side on Desktop */}
          <div className="w-full md:w-1/2">
            <div className="relative h-64 sm:h-96">
              <Image
                src="/images/coaches-placeholder.png"
                alt="Coaches Corner - A coach instructing young basketball players"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side on Desktop: Subtitle and Accordion */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 text-center">
              Access AI-generated drills, resources, and updates to empower your
              coaching journey.
            </p>
            {loading && (
              <p className="text-white text-center">Loading drill...</p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Accordion type="single" collapsible className="space-y-1">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`item-${index}`}
                  className="bg-gray-900/90 border border-red-500/90 rounded-lg transition-all duration-300 hover:shadow-red-500/50 hover:scale-[1.02] data-[state=open]:bg-red-500/10"
                >
                  <AccordionTrigger className="text-white text-[clamp(1rem,2vw,1.25rem)] font-inter font-semibold uppercase px-6 py-3 hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik px-6 py-3">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center">
          <Link href="/coaches">
            <Button
              variant="default"
              className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase"
            >
              Visit Coaches Corner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
