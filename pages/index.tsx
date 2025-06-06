import Hero from '@/components/homepage/Hero';
import ValuesSection from '@/components/homepage/ValuesSection';
import CoachesCorner from '@/components/homepage/CoachesCorner';
import NewsCarousel from '@/components/homepage/NewsCarousel';
import TeamPreview from '@/components/homepage/TeamPreview';
import SchedulePreview from '@/components/homepage/SchedulePreview';

export default function Home() {
  return (
    <main>
      {/* Test Tailwind Classes */}
      <div className="bg-navy text-white flex justify-center items-center h-20">
        Tailwind Test
      </div>
      <Hero />
      <ValuesSection />
      <CoachesCorner />
      <NewsCarousel />
      <TeamPreview />
      <SchedulePreview />
    </main>
  );
}
