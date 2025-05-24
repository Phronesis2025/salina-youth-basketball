"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Dynamic overlay opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (overlayRef.current) {
        const scrollY = window.scrollY;
        // Increase opacity from 0.7 to max 0.8
        const newOpacity = 0.8 + Math.min(scrollY * 0.0001, 0.1);
        overlayRef.current.style.opacity = `${newOpacity}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Video Background - Fixed Position */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] will-change-transform"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        title="Promotional youth sports video"
      >
        <source src="/videos/hype-video.mp4" type="video/mp4" />
        <img
          src="/images/WCS Logo-transparentBG.png"
          alt="Salina Youth Basketball Club Logo"
          className="w-full h-full object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            console.error("Failed to load Hero fallback image");
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder-logo.png";
          }}
        />
      </video>

      {/* Dark Overlay - Fixed with Dynamic Opacity */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-[#01182b] opacity-85 z-[-1]"
      ></div>

      {/* Content - Scrolls Normally */}
      <div className="relative z-10 container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4 -mt-20 md:-mt-20">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Title */}
          <h1
            className="text-white text-[clamp(5.4rem,7vw,10.5rem)] font-extrabold leading-[0.8] tracking-normal mb-4 sm:mb-2 font-rubik"
            style={{ animationDelay: "0.2s" }}
          >
            World Class Sports
          </h1>
          <h2
            className="text-white text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-tight mb-4 sm:mb-6 font-rubik"
            style={{ animationDelay: "0.2s" }}
          >
            Basketball training for life
          </h2>

          {/* Subtitle */}
          <p
            className="text-white text-[clamp(1.125rem,1.5vw,1.5rem)] leading-7 mb-6 max-w-xl font-inter font-light"
            style={{ animationDelay: "0.4s" }}
          >
            Fostering character, confidence, and community through basketball
            excellence.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-row flex-wrap gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-blue-600 text-white font-medium text-base px-6 py-2.5 rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md font-rubik"
              )}
            >
              <Link href="/join" className="no-underline">
                Sign Up
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={cn(
                "bg-transparent border border-white text-white font-medium text-base px-6 py-2.5 rounded-md hover:bg-white hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-rubik"
              )}
            >
              <Link href="/schedules" className="no-underline">
                Schedules
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={cn(
                "bg-transparent border border-white text-white font-medium text-base px-6 py-2.5 rounded-md hover:bg-white hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-rubik"
              )}
            >
              <Link href="/tournaments" className="no-underline">
                Tournaments
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  );
}
