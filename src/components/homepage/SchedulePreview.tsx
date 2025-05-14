"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Schedule {
  id: number;
  date: string;
  teams: string;
  location: string;
}

export default function SchedulePreview() {
  const schedules: Schedule[] = [
    {
      id: 1,
      date: "May 20, 2025",
      teams: "Thunderhawks vs. Eagles",
      location: "Salina Central Gym",
    },
    {
      id: 2,
      date: "May 22, 2025",
      teams: "Firebolts vs. Tigers",
      location: "Downtown Arena",
    },
    {
      id: 3,
      date: "May 25, 2025",
      teams: "Stingers vs. Wolves",
      location: "Northside Court",
    },
  ];

  return (
    <section className="py-16 bg-[#002C51]">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h2 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Upcoming Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={cn(
                "bg-[#01182B] rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden",
                "transform transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.12)]"
              )}
            >
              <div className="p-6">
                <h3 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-2 uppercase">
                  {schedule.teams}
                </h3>
                <p className="text-[#FFFFFF] text-sm font-inter mb-2">
                  {schedule.date}
                </p>
                <p className="text-[#FFFFFF] text-sm font-inter mb-4">
                  {schedule.location}
                </p>
                <Button
                  asChild
                  variant="default"
                  className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[2px] px-[4px] uppercase"
                >
                  <Link href="/schedules" className="no-underline">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="default"
            className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
          >
            <Link href="/schedules" className="no-underline">
              Full Schedule
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
