"use client";

import { cn } from "@/lib/utils";

interface Value {
  id: number;
  title: string;
  description: string;
}

export default function ValuesSection() {
  const values: Value[] = [
    {
      id: 1,
      title: "Teamwork",
      description:
        "We believe in the power of collaboration and supporting each other on and off the court.",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We strive for greatness in every game, practice, and interaction, pushing our limits to achieve success.",
    },
    {
      id: 3,
      title: "Inspiration",
      description:
        "We aim to inspire young athletes to dream big, work hard, and make a positive impact in their communities.",
    },
  ];

  return (
    <section className="py-16 bg-[#002C51]">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h2 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className={cn(
                "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden",
                "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
              )}
            >
              <div className="p-6">
                <h3 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-2 uppercase">
                  {value.title}
                </h3>
                <p className="text-[#FFFFFF] text-sm font-inter">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
