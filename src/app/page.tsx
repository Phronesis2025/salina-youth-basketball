import Hero from "@/components/homepage/Hero";
import NewsCarousel from "@/components/homepage/NewsCarousel";
import TeamPreview from "@/components/homepage/TeamPreview";
import SchedulePreview from "@/components/homepage/SchedulePreview";
import ValuesSection from "@/components/homepage/ValuesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="pt-24 px-4">
        <div className="mx-auto max-w-[75rem]">
          <Hero />
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <NewsCarousel />
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <TeamPreview />
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <SchedulePreview />
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.8s" }}>
            <ValuesSection />
          </div>
        </div>
      </main>
    </div>
  );
}
