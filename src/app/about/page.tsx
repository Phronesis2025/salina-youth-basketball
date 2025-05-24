"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <Image
            src="/images/WCS Logo-transparentBG.png"
            alt="World Class Sports Logo"
            width={200}
            height={80}
            className="mx-auto mb-6 w-[200px] sm:w-[300px] object-contain"
            priority
            aria-label="World Class Sports Logo"
          />
          <h1 className="text-white text-[clamp(2rem,4vw,3rem)] font-rubik font-bold uppercase">
            About Us
          </h1>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gray-900 border-red-500/50 hover:scale-[1.02] transition-transform mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white font-inter text-base">
              At World Class Sports Kansas, our mission is to empower youth
              through basketball by fostering character, confidence, and
              community. We are dedicated to developing well-rounded athletes—on
              and off the court—through skill-building, teamwork, and
              mentorship. Our goal is to provide a positive, competitive
              environment where young players can grow, excel, and learn the
              values of discipline, respect, and perseverance. Through our
              programs, we strive to inspire the next generation of leaders both
              in sports and in life.
            </p>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="bg-gray-900 border-red-500/50 hover:scale-[1.02] transition-transform">
          <CardHeader>
            <CardTitle>Our History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white font-inter text-base">
              World Class Sports Kansas was founded in 2008 by a group of
              passionate coaches and parents in Salina, Kansas, who saw a need
              for a structured, inclusive youth basketball program. Starting
              with just four teams, the club quickly grew, thanks to community
              support and a commitment to excellence. By 2012, the club had
              expanded to include boys’ and girls’ teams across multiple age
              groups, hosting its first annual Salina Summer Slam tournament.
              Over the years, World Class Sports has trained hundreds of young
              athletes, with many going on to play at high school and collegiate
              levels. Today, the club serves over 20 teams and remains dedicated
              to building skills, character, and community pride in central
              Kansas.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-10 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 font-rubik">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
