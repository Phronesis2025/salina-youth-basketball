"use client";

import { cn } from "@/lib/utils";

interface Value {
  id: number;
  title: string;
  description: string;
  icon: string; // Added for hover icon
}

export default function ValuesSection() {
  const values: Value[] = [
    {
      id: 1,
      title: "Teamwork",
      description:
        "We believe in the power of collaboration and supporting each other on and off the court.",
      icon: "teamwork",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We strive for greatness in every game, practice, and interaction, pushing our limits to achieve success.",
      icon: "trophy",
    },
    {
      id: 3,
      title: "Inspiration",
      description:
        "We aim to inspire young athletes to dream big, work hard, and make a positive impact in their communities.",
      icon: "star",
    },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "teamwork":
        return (
          <svg
            className="w-10 h-10 text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case "trophy":
        return (
          <svg
            className="w-10 h-10 text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          </svg>
        );
      case "star":
        return (
          <svg
            className="w-10 h-10 text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-[#002C51] py-12" aria-label="Our Values">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center uppercase animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Our Values
        </h2>
        <div className="flex flex-col gap-6">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={cn(
                "group bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg shadow-md overflow-hidden",
                "transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600/30",
                "animate-fadeIn p-6 sm:p-8 relative"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-360">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-rubik font-semibold uppercase">
                    {value.title}
                  </h3>
                </div>
                <p className="text-white text-base font-inter flex-grow">
                  {value.description}
                </p>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 sm:block hidden">
                  {renderIcon(value.icon)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
