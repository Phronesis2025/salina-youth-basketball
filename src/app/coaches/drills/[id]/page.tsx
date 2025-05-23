"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Drill {
  title: string;
  skills: string[];
  equipment: string[];
  time: string;
  instructions: string;
  additional_info: string;
  benefits: string;
  difficulty: string;
  category: string;
  week_number: number;
  suggested_image_type: string;
  image_name: string | null;
}

export default function DrillPage() {
  const [currentDrill, setCurrentDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

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
          .select("*")
          .eq("week_number", weekNumber)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setCurrentDrill(data);
        }
      } catch (err) {
        setError("Failed to load the current drill. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDrill();
  }, []);

  if (loading) {
    return (
      <main className="bg-[#002C51] min-h-screen py-12">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-center">Loading drill...</p>
        </div>
      </main>
    );
  }

  if (error || !currentDrill) {
    return (
      <main className="bg-[#002C51] min-h-screen py-12">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500 text-center">
            {error || "No drill found for this week."}
          </p>
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

  const imagePath =
    imageError || !currentDrill.image_name
      ? "/images/drill-placeholder.jpg"
      : `/images/${currentDrill.image_name}`;

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12" aria-label="Drill Overview">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold text-center uppercase mb-6">
            {currentDrill.title}
          </h1>
          <div className="relative h-64 sm:h-96 mb-6">
            <Image
              src={imagePath}
              alt={`Image for ${currentDrill.title} drill`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 600px"
              onError={() => setImageError(true)}
            />
          </div>
        </section>

        {/* Drill Details */}
        <article className="bg-gray-900/50 rounded-lg px-3 md:px-6 py-6 shadow-md border border-red-500/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Skills */}
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
                Skills
              </h2>
              <ul className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik list-disc pl-5">
                {currentDrill.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
                Equipment Needed
              </h2>
              <ul className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik list-disc pl-5">
                {currentDrill.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
                Time
              </h2>
              <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
                {currentDrill.time}
              </p>
            </div>
            <div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
                Difficulty
              </h2>
              <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
                {currentDrill.difficulty}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
              Instructions
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {currentDrill.instructions}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
              Additional Info
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {currentDrill.additional_info}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-2 whitespace-nowrap">
              Benefits
            </h2>
            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik whitespace-pre-wrap">
              {currentDrill.benefits}
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
