'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import Link from 'next/link';

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

interface DrillResponse {
  drill: Drill;
}

export default function DrillPage({ params }: { params: { id: string } }) {
  const [currentDrill, setCurrentDrill] = useState<Drill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchDrill = async () => {
      try {
        const response = await fetch(`/api/coaches/drills/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch drill');
        }

        const data: DrillResponse = await response.json();

        if (data && data.drill) {
          setCurrentDrill(data.drill);
        } else {
          setError('Drill not found.');
        }
      } catch (err) {
        setError('Failed to load the current drill. Please try again later.');
      }
    };

    fetchDrill();
  }, [id]);

  if (error) {
    return (
      <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">{error}</div>
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

  if (!currentDrill) {
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
                {currentDrill.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Skills:</strong> {currentDrill.skills.join(', ')}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Equipment:</strong> {currentDrill.equipment.join(', ')}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Time:</strong> {currentDrill.time}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Difficulty:</strong> {currentDrill.difficulty}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Intensity:</strong> {currentDrill.intensity}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Age Group:</strong> {currentDrill.ageGroup}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Description:</strong> {currentDrill.description}
              </p>
              <p className="text-gray-300 text-sm font-rubik mb-2">
                <strong>Instructions:</strong> {currentDrill.instructions}
              </p>
              {currentDrill.videoUrl && (
                <div className="mb-4">
                  <video controls className="w-full rounded-lg">
                    <source src={currentDrill.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {currentDrill.imageUrl && (
                <div className="mb-4">
                  <img
                    src={currentDrill.imageUrl}
                    alt={currentDrill.title}
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
