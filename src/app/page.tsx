import Navbar from "@/components/common/Navbar";
import Hero from "@/components/homepage/Hero";
import NewsCarousel from "@/components/homepage/NewsCarousel";
import TeamPreview from "@/components/homepage/TeamPreview";
import SchedulePreview from "@/components/homepage/SchedulePreview";
import ValuesSection from "@/components/homepage/ValuesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 px-4">
        <div className="mx-auto max-w-[75rem]">
          <Hero />
          <NewsCarousel />
          <TeamPreview />
          <SchedulePreview />
          <ValuesSection />
        </div>
      </main>
    </div>
  );
}
