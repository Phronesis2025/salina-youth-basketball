"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#002C51]">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hype-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[black] opacity-[70%]"></div>

      {/* Content */}
      <div className="relative z-10 container max-w-[75rem] mx-auto px-5 py-24 md:py-32">
        <div className="flex flex-col items-start max-w-3xl animate-fadeIn">
          {/* Title */}
          <h1 className="text-[#FFFFFF] text-[clamp(4rem,5vw,4rem)] font-bold leading-[1.15] mb-4 font-rubik">
            World Class Sports
          </h1>

          {/* Subtitle */}
          <p className="text-[#FFFFFF] text-[clamp(1.5rem,2vw,15rem)] mb-[8px] max-w-xl font-inter">
            Empowering Youth to Dominate and Inspire
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row flex-wrap gap-[16px]">
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-[#FFFFFF] text-[#0A0F15] font-medium text-base px-[16px] py-[8px] rounded-[0.25rem] hover:bg-[#E6ECEF] transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] font-rubik"
              )}
            >
              <Link href="/signup" className="no-underline">
                Sign Up
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-[#FFFFFF] text-[#0A0F15] font-medium text-base px-[16px] py-[8px] rounded-[0.25rem] hover:bg-[#E6ECEF] transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] font-rubik"
              )}
            >
              <Link href="/schedules" className="no-underline">
                Schedules
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-[#FFFFFF] text-[#0A0F15] font-medium text-base px-[16px] py-[8px] rounded-[0.25rem] hover:bg-[#E6ECEF] transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] font-rubik"
              )}
            >
              <Link href="/tournaments" className="no-underline">
                Tournaments
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tailwind Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
