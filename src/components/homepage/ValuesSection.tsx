"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

interface Value {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  example: string;
  image: string;
}

export default function ValuesSection() {
  const values: Value[] = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We uphold honesty and strong moral principles in all actions.",
      longDescription:
        "Integrity is the foundation of our program, ensuring players act with honesty and fairness, fostering trust within the team and community.",
      example:
        "During a game, a player admits to a referee about an unnoticed foul, even if it risks a penalty, demonstrating our commitment to fair play.",
      image: "/images/integrity.png",
    },
    {
      id: 2,
      title: "Respect",
      description: "We honor teammates, opponents, and coaches with dignity.",
      longDescription:
        "Respect shapes our interactions, teaching players to value others’ efforts and perspectives, creating a positive and inclusive environment.",
      example:
        "In practice, players listen attentively to their coach’s feedback and encourage struggling teammates, building a supportive team culture.",
      image: "/images/respect.png",
    },
    {
      id: 3,
      title: "Responsibility",
      description: "We take ownership of our actions and commitments.",
      longDescription:
        "Responsibility empowers players to be accountable for their roles, from attending practices to making smart decisions on and off the court.",
      example:
        "A player ensures their equipment is ready and arrives early to practice, setting a reliable example for the team.",
      image: "/images/responsibility.png",
    },
    {
      id: 4,
      title: "Teamwork",
      description: "We succeed through collaboration and mutual support.",
      longDescription:
        "Teamwork drives our success, teaching players to work together, communicate effectively, and prioritize the team’s goals over individual achievements.",
      example:
        "In a close game, players pass to an open teammate for a better shot, showcasing trust and collective effort.",
      image: "/images/teamwork.png",
    },
    {
      id: 5,
      title: "Having Fun",
      description: "We embrace joy and passion in every moment.",
      longDescription:
        "Having Fun fuels our love for the game, encouraging players to enjoy the process, celebrate progress, and maintain a positive attitude.",
      example:
        "During practice, coaches incorporate fun drills like a dribbling relay race, keeping players engaged and excited.",
      image: "/images/having fun.png",
    },
  ];

  const [selectedValue, setSelectedValue] = useState<Value | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = (item: Value) => {
    setSelectedValue(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedValue(null);
    setIsModalOpen(false);
  };

  // Handle click outside modal to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Focus trap and ESC key handling for modal
  useEffect(() => {
    if (isModalOpen && modalRef.current && closeButtonRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal();
          return;
        }
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current.focus();

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isModalOpen]);

  return (
    <section className="bg-[#002C51] py-12" aria-label="Our Values">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: ".values-prev",
            nextEl: ".values-next",
          }}
          className="values-swiper"
          aria-label="Values carousel"
        >
          {values.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={cn(
                  "relative w-full h-[500px] rounded-lg overflow-hidden",
                  "transform transition-all duration-300"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={item.id === 1}
                  className={cn(
                    "object-cover",
                    ["Having Fun", "Respect", "Teamwork"].includes(item.title)
                      ? "object-center"
                      : "object-top"
                  )}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gray-900/75" />
                <h2
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase bg-gray-900/70 px-3 md:px-6 py-2 rounded whitespace-nowrap"
                  style={{ animationDelay: "0.2s" }}
                >
                  Our Values
                </h2>
                <div
                  className={cn(
                    "absolute top-1/2 inset-x-0 mx-auto max-w-[80vw] bg-gray-900/70 px-4 py-2 rounded md:max-w-[400px] md:ml-12 md:inset-x-auto transform -translate-y-1/2 md:transform md:-translate-y-1/2 md:translate-x-0 text-white text-center md:text-left"
                  )}
                >
                  <h3 className="text-2xl md:text-3xl font-rubik font-semibold uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-lg font-inter mb-4">
                    {item.description}
                  </p>
                  <Button
                    className={cn(
                      "bg-blue-600 text-white font-medium font-inter rounded-md",
                      "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "transition-all duration-300 text-base px-4 py-2 mb-2 uppercase mx-auto md:mx-0"
                    )}
                    onClick={() => openModal(item)}
                  >
                    Read More
                  </Button>
                </div>
                <div
                  className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2"
                  style={{ animationDelay: "0.4s" }}
                >
                  <button
                    className={cn(
                      "values-prev bg-blue-600 text-white p-2 rounded-full",
                      "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "transition-all duration-300"
                    )}
                    aria-label="Previous value"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className={cn(
                      "values-next bg-blue-600 text-white p-2 rounded-full",
                      "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "transition-all duration-300"
                    )}
                    aria-label="Next value"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal */}
        {isModalOpen && selectedValue && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            onClick={handleOverlayClick}
          >
            <div
              ref={modalRef}
              className="bg-gray-900 text-white rounded-lg max-w-xl w-full mx-4 p-6 relative"
            >
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                onKeyDown={(e) => e.key === "Enter" && closeModal()}
                className="absolute top-4 right-4 text-white hover:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3
                id="modal-title"
                className="font-rubik text-3xl font-semibold mb-4 uppercase"
              >
                {selectedValue.title}
              </h3>
              <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
                <Image
                  src={selectedValue.image}
                  alt={selectedValue.title}
                  fill
                  className={cn(
                    "object-cover",
                    ["Having Fun", "Respect", "Teamwork"].includes(
                      selectedValue.title
                    )
                      ? "object-center"
                      : "object-top"
                  )}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
              </div>
              <p className="text-base font-inter mb-2">
                {selectedValue.longDescription}
              </p>
              <p className="text-base font-inter">
                <strong>Example:</strong> {selectedValue.example}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
