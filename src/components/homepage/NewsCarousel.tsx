"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
  details: string;
}

export default function NewsCarousel() {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Championship Victory!",
      date: "May 10, 2025",
      image: "/images/placeholder-news-1.png",
      description: "Our U-14 team won the regional championship!",
      details:
        "The Salina Youth Basketball Club's U-14 team secured a stunning victory at the Central Kansas Regional Championship on May 10, 2025. With a final score of 52-48, the team showcased exceptional teamwork and skill. Coach Smith praised the players for their dedication and strategic play, especially in the final quarter where they mounted a comeback from a 10-point deficit.",
    },
    {
      id: 2,
      title: "Summer Camp Registration Open",
      date: "May 5, 2025",
      image: "/images/placeholder-news-2.png",
      description: "Join our summer basketball camp starting June 1.",
      details:
        "Registration is now open for the Salina Youth Basketball Club's Summer Camp, starting June 1, 2025. The camp will run for 6 weeks, offering intensive training sessions, skill workshops, and friendly matches. Open to players aged 8-16, the camp will be led by experienced coaches, including guest appearances from local pros. Sign up now to secure your spot!",
    },
    {
      id: 3,
      title: "New Merch Drop",
      date: "April 28, 2025",
      image: "/images/placeholder-news-3.png",
      description: "Check out our latest team apparel in the shop.",
      details:
        "We've just released a new line of team apparel in the Salina Youth Basketball Club shop! From jerseys to hoodies, our latest collection features the club's navy and red colors with bold designs. Available for players, parents, and fans, these items are perfect for showing your support at games or training sessions. Visit the shop today!",
    },
  ];

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
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
    <section className="bg-[#002C51] py-12" aria-label="Latest News">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-white text-[clamp(2.25rem,5vw,3rem)] font-bold font-rubik mb-8 text-center"
          style={{ animationDelay: "0.2s" }}
        >
          Latest News
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="news-swiper"
          aria-label="News carousel"
        >
          {newsItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={cn(
                  "bg-gray-900 rounded-lg shadow-md overflow-hidden w-full h-[28rem]",
                  "transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "flex flex-col min-h-0"
                )}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={item.id === 1}
                    className="object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-news.png";
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow min-h-0">
                  <h3 className="text-white text-2xl font-rubik font-semibold mb-2 uppercase line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white text-base font-inter mb-2">
                    {item.date}
                  </p>
                  <p className="text-white text-base font-inter mb-4 line-clamp-2 flex-grow">
                    {item.description}
                  </p>
                  <Button
                    className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-4 py-2 uppercase mt-auto"
                    onClick={() => openModal(item)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal */}
        {isModalOpen && selectedNews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
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
                {selectedNews.title}
              </h3>
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className="object-cover object-top rounded-lg mb-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-news.png";
                  }}
                />
              </div>
              <p className="text-base font-inter mb-2">{selectedNews.date}</p>
              <p className="text-base font-inter">{selectedNews.details}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
