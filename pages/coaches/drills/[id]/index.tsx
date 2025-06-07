'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import Link from 'next/link';
import { supabase } from '../../../../src/lib/supabase/client';

interface Drill {
  id: string;
  title: string;
  skills: string[];
  equipment: string[];
  time: string;
  difficulty: string;
  intensity: string;
  ageGroup: string;
  description: string;
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface DrillId {
  id: string;
}

interface DrillPageProps {
  drill: Drill | null;
  error?: string;
}

export default function DrillPage({
  drill,
  error: initialError,
}: DrillPageProps) {
  if (initialError) {
    return (
      <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">{initialError}</div>
          <div className="flex justify-center mt-4">
            <Link href="/coaches">
              <Button className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                Back to Locker Room
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!drill) {
    return (
      <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-12" aria-label="Drill Details">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                {drill.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Skills:</strong> {drill.skills.join(', ')}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Equipment:</strong> {drill.equipment.join(', ')}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Time:</strong> {drill.time}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Difficulty:</strong> {drill.difficulty}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Intensity:</strong> {drill.intensity}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Age Group:</strong> {drill.ageGroup}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Description:</strong> {drill.description}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Instructions:</strong> {drill.instructions}
              </p>
              {drill.videoUrl && (
                <div className="mb-4">
                  <video controls className="w-full rounded-lg">
                    <source src={drill.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {drill.imageUrl && (
                <div className="mb-4">
                  <img
                    src={drill.imageUrl}
                    alt={drill.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="flex justify-center" aria-label="Navigation">
          <Link href="/coaches">
            <Button className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
              Back to Locker Room
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  // Fetch a list of drill IDs from Supabase
  const { data: drills, error } = (await supabase
    .from('drills')
    .select('id')
    .limit(10)) as { data: DrillId[]; error: any }; // Type assertion for Supabase query result

  if (error) {
    console.error('Error fetching drills for static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const paths = drills.map((drill) => ({
    params: { id: drill.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // Generate pages at runtime if not prerendered
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  if (!params || !params.id) {
    return {
      props: {
        drill: null,
        error: 'Invalid drill ID.',
      },
    };
  }

  const { id } = params;

  // Fetch drill data directly from Supabase
  const { data: drill, error } = (await supabase
    .from('drills')
    .select('*')
    .eq('id', id)
    .single()) as { data: Drill | null; error: any }; // Type assertion for Supabase query result

  if (error || !drill) {
    console.error('Error fetching drill:', error);
    return {
      props: {
        drill: null,
        error: error
          ? 'Failed to load the current drill. Please try again later.'
          : 'Drill not found.',
      },
    };
  }

  return {
    props: {
      drill,
      error: null,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
