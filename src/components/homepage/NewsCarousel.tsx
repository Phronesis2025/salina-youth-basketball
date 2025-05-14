"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Define an interface for the news item structure
interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
  details: string;
}

export default function NewsCarousel() {
  // Static news data
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

  const openModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <section className="py-16 bg-[#002C51]">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h2 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center">
          Latest News
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="news-swiper"
        >
          {newsItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={cn(
                  "bg-[#01182B] rounded-[1rem] shadow-[0, 4px, 6px, -1px, rgba(0,0,0,0.1),0, 2px, 4px, -1px, rgba(0,0,0,0.06)] overflow-hidden",
                  "transform transition-all duration-[300ms] rounded-[1rem] hover:scale-105 hover:shadow-[0, 6px, 12px, -2px, rgba(0,0,0,0.2),0, 4px, 8px, -2px, rgba(0,0,0,0.12)]",
                  "h-full flex flex-col"
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-news-1.png";
                  }}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[#FFFFFF] text-lg font-rubik font-semibold mb-2 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[#FFFFFF] text-sm font-inter mb-[2px]">
                    {item.date}
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-inter mb-[4px] line-clamp-2 flex-grow">
                    {item.description}
                  </p>
                  <Button
                    className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0, 4px, 6px, -1px, rgba(0,0,0,0.1),0, 2px, 4px, -1px, rgba(0,0,0,0.06)] text-sm py-[2px] px-[4px] uppercase mt-auto"
                    onClick={() => openModal(item)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Modal */}
        {isModalOpen && selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#01182B] text-[#FFFFFF] rounded-lg max-w-lg w-full mx-4 p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#FFFFFF] hover:text-[#E6ECEF]"
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
              <h3 className="font-rubik text-xl mb-4 uppercase">
                {selectedNews.title}
              </h3>
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-news-3.png";
                }}
              />
              <p className="text-sm font-inter mb-2">{selectedNews.date}</p>
              <p className="text-sm font-inter">{selectedNews.details}</p>
            </div>
          </div>
        )}

        {/* Custom Swiper Styles */}
        <style jsx global>{`
          .news-swiper .swiper-button-next,
          .news-swiper .swiper-button-prev {
            color: #ffffff;
          }
          .news-swiper .swiper-pagination-bullet {
            background: #ffffff;
            opacity: 0.5;
          }
          .news-swiper .swiper-pagination-bullet-active {
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
