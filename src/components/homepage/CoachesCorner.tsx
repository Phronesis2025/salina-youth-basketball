"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CoachItem {
  id: number;
  title: string;
  description: string;
}

export default function CoachesCorner() {
  const coachItems: CoachItem[] = [
    {
      id: 1,
      title: "Drill of the Week",
      description: "AI-generated drills to improve skills.",
    },
    {
      id: 2,
      title: "Coaching Tips",
      description: "Best practices for youth coaching.",
    },
    {
      id: 3,
      title: "Updates",
      description: "Latest news for coaches.",
    },
  ];

  return (
    <section className="bg-[#002C51] py-12" aria-label="Coaches Corner">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-3xl font-rubik font-bold mb-4 text-center uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          Coaches Corner
        </h2>
        <p
          className="text-gray-300 text-lg font-inter mb-8 text-center"
          style={{ animationDelay: "0.3s" }}
        >
          Resources, updates, and AI-generated drills for our coaches.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coachItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "bg-gray-900 rounded-lg shadow-md overflow-hidden w-full h-[20rem] flex flex-col min-h-0",
                "transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              )}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="p-6 flex flex-col flex-grow min-h-0">
                <h3 className="text-white text-xl font-rubik font-semibold mb-2 uppercase line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-white text-base font-inter mb-4 line-clamp-3 flex-grow">
                  {item.description}
                </p>
                <Button
                  variant="default"
                  className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mt-auto"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
