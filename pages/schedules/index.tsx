'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../src/components/ui/select';
import Link from 'next/link';
import { EventClickArg } from '@fullcalendar/core';
import { Button } from '../../src/components/ui/button';

interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
}

export default function Schedules() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('/api/get-all-schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch schedules');
        }

        const result = await response.json();
        console.log('Schedules API Response:', result); // Debug log
        setEvents(result.schedules || []);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  // Filter events based on dropdown selections
  const filteredEvents = events.filter((event) => {
    return typeFilter === 'all' || event.type === typeFilter;
  });

  const formattedEvents = filteredEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    extendedProps: {
      type: event.type,
      location: event.location,
      description: event.description,
    },
  }));

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    alert(
      `Event: ${event.title}\nType: ${event.extendedProps.type}\nLocation: ${event.extendedProps.location}\nDescription: ${event.extendedProps.description}`
    );
  };

  return (
    <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section
          className="mb-12 text-center"
          aria-label="Schedules Page Welcome"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Schedules
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            View the upcoming games, practices, and events for all teams.
          </p>
        </section>

        {/* Filters Section */}
        <section className="mb-8" aria-label="Schedule Filter">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1rem,2vw,1.25rem)] font-inter font-semibold uppercase">
                Filter Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="event-type"
                    className="text-white font-rubik text-sm mb-2 block"
                  >
                    Event Type
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger
                      id="event-type"
                      className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="practice">Practice</SelectItem>
                      <SelectItem value="game">Game</SelectItem>
                      <SelectItem value="tournament">Tournament</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Calendar Section */}
        <section className="mb-12" aria-label="Schedules Calendar">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Team Schedules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                eventContent={(eventInfo) => (
                  <div className="flex flex-col p-1">
                    <p className="text-white font-rubik text-xs">
                      {eventInfo.event.title}
                    </p>
                    <p className="text-gray-300 text-xs font-rubik">
                      {eventInfo.event.extendedProps.location}
                    </p>
                  </div>
                )}
                eventClassNames="bg-gray-800 border-none cursor-pointer"
                height="auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <section className="flex justify-center" aria-label="Navigation">
          <Link href="/">
            <Button className="bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase">
              Back to Homepage
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
