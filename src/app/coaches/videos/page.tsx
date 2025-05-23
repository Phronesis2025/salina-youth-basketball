"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VideosPage() {
  const videos = [
    {
      title: "Teaching Basketball Layups for Beginners",
      description:
        "Learn the basics of teaching layups to young players with this step-by-step guide.",
      youtubeUrl: "https://www.youtube.com/watch?v=SIq8KC_FH34",
      videoId: "SIq8KC_FH34",
    },
    {
      title: "Basketball Dribbling Drills for Beginners",
      description:
        "Simple dribbling drills to help beginners improve their ball-handling skills.",
      youtubeUrl: "https://www.youtube.com/watch?v=8qvCSEG0SIQ",
      videoId: "8qvCSEG0SIQ",
    },
    {
      title: "This 5 Minute Dribbling Workout Changes Your Game Forever",
      description:
        "A quick 5-minute dribbling workout to transform your players’ skills on the court.",
      youtubeUrl: "https://www.youtube.com/watch?v=oADaM2L1YLc",
      videoId: "oADaM2L1YLc",
    },
    {
      title: "These Mistakes Are Ruining Your Jump Shot [Easy Fix]",
      description:
        "Identify and fix common jump shot mistakes to improve shooting accuracy.",
      youtubeUrl: "https://www.youtube.com/watch?v=ukkRfmc4KnM",
      videoId: "ukkRfmc4KnM",
    },
    {
      title: "16 Ways To Be A Better Scorer",
      description:
        "Discover 16 techniques to help your players become more effective scorers.",
      youtubeUrl: "https://www.youtube.com/watch?v=2tVj331G0ik",
      videoId: "2tVj331G0ik",
    },
    {
      title: "3 Ways To Become Unguardable",
      description:
        "Learn three strategies to make your players unguardable on the court.",
      youtubeUrl: "https://www.youtube.com/watch?v=KGhI7K9NxHU",
      videoId: "KGhI7K9NxHU",
    },
  ];

  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageError = (videoId: string) => {
    setImageErrors((prev) => ({ ...prev, [videoId]: true }));
  };

  return (
    <main className="bg-[#002C51] min-h-screen py-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          className="mb-12 text-center"
          aria-label="Video Tutorial Library"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase mb-4">
            Video Tutorial Library
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Watch tutorials on drills and techniques to enhance your coaching
            and player development.
          </p>
        </section>

        {/* Videos Grid */}
        <section className="mb-12" aria-label="Coaching Videos">
          <div className="bg-gray-900/50 rounded-lg px-3 md:px-6 py-6 shadow-md border border-red-500/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.map((video) => (
                <Link
                  key={video.title}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900/50 rounded-lg p-4 transition-all duration-300 hover:shadow-red-500/50"
                >
                  <div className="relative h-40 mb-4">
                    <Image
                      src={
                        imageErrors[video.videoId]
                          ? "/images/video-placeholder.png"
                          : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                      }
                      alt={`Thumbnail for ${video.title}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={() => handleImageError(video.videoId)}
                    />
                  </div>
                  <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-rubik font-semibold uppercase mb-2 line-clamp-2">
                    {video.title}
                  </h2>
                  <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] font-rubik">
                    {video.description}
                  </p>
                </Link>
              ))}
            </div>
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
