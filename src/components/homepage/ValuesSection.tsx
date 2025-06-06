"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
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
      title: "Fundamentals First",
      description:
        "Mastering ball-handling, shooting, passing, defense, and footwork.",
      longDescription:
        "Fundamentals First builds a strong foundation, ensuring players master essential skills like dribbling, shooting, and defense through disciplined practice, setting them up for long-term success.",
      example:
        "In practice, players focus on perfecting their shooting form, repeating drills to ensure muscle memory and consistency.",
      image: "/images/fundamentalsfirst.png",
    },
    {
      id: 2,
      title: "Basketball IQ",
      description:
        "Understanding the game, reading situations, and making smart decisions.",
      longDescription:
        "Basketball IQ empowers players to read the court, anticipate plays, and make strategic decisions, fostering a deeper understanding of the game’s nuances and team dynamics.",
      example:
        "A player recognizes a defensive gap and calls a play to exploit it, leading to an easy basket.",
      image: "/images/basketballiq.png",
    },
    {
      id: 3,
      title: "Work Ethic",
      description:
        "Committing to consistent practice and striving for excellence.",
      longDescription:
        "Work Ethic drives players to show up, put in the effort, and pursue excellence daily, building habits that translate to success in basketball and beyond.",
      example:
        "A player stays after practice to work on free throws, aiming to improve their percentage before the next game.",
      image: "/images/workethic.png",
    },
    {
      id: 4,
      title: "Teamwork",
      description:
        "Playing unselfishly and supporting others on and off the court.",
      longDescription:
        "Teamwork fosters unselfish play, encouraging players to prioritize team goals, communicate effectively, and uplift teammates, creating a cohesive and supportive unit.",
      example:
        "In a game, a player passes to an open teammate for a game-winning shot instead of forcing a contested one.",
      image: "/images/teamwork.png",
    },
    {
      id: 5,
      title: "Leadership",
      description:
        "Leading by example with humility, communication, and accountability.",
      longDescription:
        "Leadership inspires players to guide their team with humility, clear communication, and accountability, setting a positive example for peers both on and off the court.",
      example:
        "A player rallies teammates during a timeout, encouraging focus and teamwork to mount a comeback.",
      image: "/images/leadership.png",
    },
    {
      id: 6,
      title: "Discipline",
      description:
        "Training the mind and body to stay focused, resilient, and coachable.",
      longDescription:
        "Discipline strengthens players’ mental and physical resilience, ensuring they stay focused, follow coaching, and remain coachable under pressure, driving personal growth.",
      example:
        "A player adheres to a strict training schedule, balancing schoolwork and practice to stay prepared.",
      image: "/images/discipline.png",
    },
    {
      id: 7,
      title: "Adaptability",
      description: "Learning to adjust, improve, and overcome challenges.",
      longDescription:
        "Adaptability equips players to adjust to new strategies, overcome setbacks, and embrace feedback, fostering growth and versatility in dynamic game situations.",
      example:
        "A player switches defensive roles mid-game to counter an opponent’s star player, adjusting seamlessly.",
      image: "/images/adaptability.png",
    },
    {
      id: 8,
      title: "Mental Toughness",
      description: "Competing with confidence and composure under pressure.",
      longDescription:
        "Mental Toughness builds confidence and composure, enabling players to stay calm, focused, and competitive in high-pressure moments, both in games and in life.",
      example:
        "A player sinks two crucial free throws in the final seconds, staying calm despite the crowd’s pressure.",
      image: "/images/mental-toughness.png",
    },
  ];

  const [selectedValue, setSelectedValue] = useState<Value>(values[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [borderColor, setBorderColor] = useState<string>("border-[#f11a20]");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getBorderColor = (index: number) => {
    const colors = ["border-[#f11a20]", "border-white", "border-[#002C51]"];
    return colors[index % colors.length];
  };

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
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-[clamp(2rem,4vw,2.5rem)] font-rubik font-bold uppercase bg-gray-900/70 px-3 md:px-6 py-2 rounded whitespace-nowrap z-10">
          Our Values
        </h2>
        <div
          className={cn(
            "absolute top-1/2 inset-x-0 mx-auto max-w-[80vw] bg-gray-900/80 px-4 py-2 rounded md:max-w-[400px] md:ml-12 md:inset-x-auto transform -translate-y-1/2 text-white text-center md:text-left z-10",
            `border-l-4 ${borderColor} transition-colors duration-300`
          )}
          aria-live="polite"
        >
          <h3 className="text-2xl md:text-3xl font-rubik font-semibold uppercase mb-2 truncate">
            {selectedValue.title}
          </h3>
          <p className="text-sm md:text-lg font-inter mb-4 line-clamp-2">
            {selectedValue.description}
          </p>
          <Button
            className={cn(
              "bg-blue-600 text-white font-medium font-inter rounded-md animate-pulse-button",
              "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "transition-all duration-300 text-base px-4 py-2 mb-2 uppercase mx-auto md:mx-0"
            )}
            onClick={openModal}
          >
            Read More
          </Button>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: ".values-prev",
            nextEl: ".values-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => {
            setSelectedValue(values[swiper.realIndex]);
            setBorderColor(getBorderColor(swiper.realIndex));
          }}
          className="values-swiper"
          aria-label="Values carousel"
        >
          {values.map((item) => (
            <SwiperSlide key={item.id} className="animate-slide-in">
              <div
                className={cn(
                  "relative w-full h-[500px] sm:h-[400px] rounded-lg overflow-hidden",
                  "transform transition-all duration-300"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={item.id === 1}
                  loading={item.id > 1 ? "lazy" : undefined}
                  className="object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-team-default.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-[#01182b] bg-opacity-80" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
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
              className="bg-gray-900 text-white rounded-lg max-w-xl w-full mx-4 p-6 relative animate-slide-in-modal"
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
                className="font-rubik text-3xl font-semibold mb-4 uppercase border-b-2 border-[#f11a20] pb-2"
              >
                {selectedValue.title}
              </h3>
              <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
                <Image
                  src={selectedValue.image}
                  alt={selectedValue.title}
                  fill
                  loading="lazy"
                  className="object-cover object-center"
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
