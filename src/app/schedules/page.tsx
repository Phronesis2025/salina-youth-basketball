"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import Head from "next/head"; // Import Head for adding <link> tags
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Static event data (5 teams, May 16–July 31, 2025)
export const events = [
  // May 16–31, 2025
  {
    id: "1",
    title: "Lightning Practice",
    start: "2025-05-16T18:00:00",
    end: "2025-05-16T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "2",
    title: "Thunderhawks vs. Warriors (Game)",
    start: "2025-05-17T14:00:00",
    end: "2025-05-17T15:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "3",
    title: "Raptors Practice",
    start: "2025-05-19T17:00:00",
    end: "2025-05-19T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "4",
    title: "Vipers Practice",
    start: "2025-05-19T18:30:00",
    end: "2025-05-19T20:00:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "5",
    title: "Stingers vs. Warriors (Game)",
    start: "2025-05-20T15:00:00",
    end: "2025-05-20T16:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "6",
    title: "Firebolts Practice",
    start: "2025-05-21T17:00:00",
    end: "2025-05-21T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "7",
    title: "Lightning Practice",
    start: "2025-05-22T18:00:00",
    end: "2025-05-22T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "8",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-05-23T16:00:00",
    end: "2025-05-23T17:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "9",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-05-24T15:00:00",
    end: "2025-05-24T16:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "10",
    title: "Thunderhawks Practice",
    start: "2025-05-26T16:00:00",
    end: "2025-05-26T17:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "11",
    title: "Raptors Practice",
    start: "2025-05-26T18:00:00",
    end: "2025-05-26T19:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "12",
    title: "Firebolts Practice",
    start: "2025-05-28T17:00:00",
    end: "2025-05-28T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "13",
    title: "Lightning vs. Warriors (Game)",
    start: "2025-05-29T15:00:00",
    end: "2025-05-29T16:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "14",
    title: "Vipers Practice",
    start: "2025-05-30T18:00:00",
    end: "2025-05-30T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "15",
    title: "Stingers vs. Warriors (Game)",
    start: "2025-05-31T14:00:00",
    end: "2025-05-31T15:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  // June 2025
  {
    id: "16",
    title: "Lightning vs. Warriors (Game)",
    start: "2025-06-01T14:00:00",
    end: "2025-06-01T15:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "17",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-06-02T15:00:00",
    end: "2025-06-02T16:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "18",
    title: "Lightning Practice",
    start: "2025-06-03T18:00:00",
    end: "2025-06-03T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "19",
    title: "Raptors Practice",
    start: "2025-06-04T17:00:00",
    end: "2025-06-04T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "20",
    title: "Thunderhawks Practice",
    start: "2025-06-05T16:00:00",
    end: "2025-06-05T17:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "21",
    title: "Tournament: Summer Slam",
    start: "2025-06-06T09:00:00",
    end: "2025-06-08T18:00:00",
    extendedProps: {
      team: "Lightning & Thunderhawks",
      gender: "Boys",
      type: "Tournament",
      location: "Salina Community Center",
    },
  },
  {
    id: "22",
    title: "Firebolts vs. Warriors (Game)",
    start: "2025-06-07T10:00:00",
    end: "2025-06-07T11:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "23",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-06-08T14:30:00",
    end: "2025-06-08T16:00:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "24",
    title: "Lightning Practice",
    start: "2025-06-09T18:00:00",
    end: "2025-06-09T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "25",
    title: "Firebolts Practice",
    start: "2025-06-10T17:00:00",
    end: "2025-06-10T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "26",
    title: "Vipers Practice",
    start: "2025-06-11T18:00:00",
    end: "2025-06-11T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "27",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-06-12T15:00:00",
    end: "2025-06-12T16:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "28",
    title: "Tournament: June Classic",
    start: "2025-06-13T09:00:00",
    end: "2025-06-15T18:00:00",
    extendedProps: {
      team: "Raptors & Vipers",
      gender: "Girls",
      type: "Tournament",
      location: "South Salina Court",
    },
  },
  {
    id: "29",
    title: "Thunderhawks vs. Warriors (Game)",
    start: "2025-06-14T15:00:00",
    end: "2025-06-14T16:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "30",
    title: "Lightning vs. Warriors (Game)",
    start: "2025-06-15T13:00:00",
    end: "2025-06-15T14:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "South Salina Court",
    },
  },
  {
    id: "31",
    title: "Raptors Practice",
    start: "2025-06-16T17:00:00",
    end: "2025-06-16T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "32",
    title: "Stingers Practice",
    start: "2025-06-17T16:00:00",
    end: "2025-06-17T17:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "33",
    title: "Firebolts Practice",
    start: "2025-06-18T17:00:00",
    end: "2025-06-18T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "34",
    title: "Lightning Practice",
    start: "2025-06-19T18:00:00",
    end: "2025-06-19T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "35",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-06-20T15:00:00",
    end: "2025-06-20T16:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "36",
    title: "Stingers vs. Warriors (Game)",
    start: "2025-06-21T14:00:00",
    end: "2025-06-21T15:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "37",
    title: "Raptors Practice",
    start: "2025-06-23T17:00:00",
    end: "2025-06-23T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "38",
    title: "Vipers Practice",
    start: "2025-06-24T18:00:00",
    end: "2025-06-24T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "39",
    title: "Firebolts vs. Warriors (Game)",
    start: "2025-06-25T15:00:00",
    end: "2025-06-25T16:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "40",
    title: "Lightning Practice",
    start: "2025-06-26T18:00:00",
    end: "2025-06-26T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "41",
    title: "Tournament: Mid-Summer Bash",
    start: "2025-06-27T09:00:00",
    end: "2025-06-29T18:00:00",
    extendedProps: {
      team: "All Teams",
      gender: "Mixed",
      type: "Tournament",
      location: "Salina Community Center",
    },
  },
  {
    id: "42",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-06-28T14:00:00",
    end: "2025-06-28T15:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "43",
    title: "Thunderhawks vs. Warriors (Game)",
    start: "2025-06-29T13:00:00",
    end: "2025-06-29T14:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "44",
    title: "Stingers Practice",
    start: "2025-06-30T16:00:00",
    end: "2025-06-30T17:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  // July 2025
  {
    id: "45",
    title: "Vipers Practice",
    start: "2025-07-01T18:00:00",
    end: "2025-07-01T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "46",
    title: "Firebolts Practice",
    start: "2025-07-02T17:00:00",
    end: "2025-07-02T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "47",
    title: "Lightning Practice",
    start: "2025-07-03T18:00:00",
    end: "2025-07-03T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "48",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-07-04T15:00:00",
    end: "2025-07-04T16:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "49",
    title: "Lightning vs. Warriors (Game)",
    start: "2025-07-05T16:00:00",
    end: "2025-07-05T17:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "South Salina Court",
    },
  },
  {
    id: "50",
    title: "Raptors Practice",
    start: "2025-07-06T18:00:00",
    end: "2025-07-06T19:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "51",
    title: "Vipers Practice",
    start: "2025-07-07T18:00:00",
    end: "2025-07-07T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "52",
    title: "Firebolts vs. Warriors (Game)",
    start: "2025-07-08T14:00:00",
    end: "2025-07-08T15:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "53",
    title: "Stingers Practice",
    start: "2025-07-09T16:00:00",
    end: "2025-07-09T17:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "54",
    title: "Tournament: July Showdown",
    start: "2025-07-11T09:00:00",
    end: "2025-07-13T18:00:00",
    extendedProps: {
      team: "Stingers & Lightning",
      gender: "Boys",
      type: "Tournament",
      location: "North Salina Gym",
    },
  },
  {
    id: "55",
    title: "Thunderhawks Practice",
    start: "2025-07-12T18:00:00",
    end: "2025-07-12T19:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "56",
    title: "Vipers Practice",
    start: "2025-07-13T17:00:00",
    end: "2025-07-13T18:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "57",
    title: "Lightning Practice",
    start: "2025-07-14T18:00:00",
    end: "2025-07-14T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "58",
    title: "Raptors Practice",
    start: "2025-07-15T17:00:00",
    end: "2025-07-15T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "59",
    title: "Firebolts Practice",
    start: "2025-07-16T17:00:00",
    end: "2025-07-16T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "60",
    title: "Stingers Practice",
    start: "2025-07-17T16:00:00",
    end: "2025-07-17T17:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "61",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-07-18T15:00:00",
    end: "2025-07-18T16:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "62",
    title: "Thunderhawks vs. Warriors (Game)",
    start: "2025-07-19T14:00:00",
    end: "2025-07-19T15:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Game",
      location: "South Salina Court",
    },
  },
  {
    id: "63",
    title: "Raptors vs. Warriors (Game)",
    start: "2025-07-20T16:00:00",
    end: "2025-07-20T17:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "64",
    title: "Lightning Practice",
    start: "2025-07-21T18:00:00",
    end: "2025-07-21T19:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "65",
    title: "Vipers Practice",
    start: "2025-07-22T18:00:00",
    end: "2025-07-22T19:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "66",
    title: "Firebolts vs. Warriors (Game)",
    start: "2025-07-23T14:00:00",
    end: "2025-07-23T15:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
  {
    id: "67",
    title: "Raptors Practice",
    start: "2025-07-24T17:00:00",
    end: "2025-07-24T18:30:00",
    extendedProps: {
      team: "Raptors",
      gender: "Girls",
      type: "Practice",
      location: "South Salina Court",
    },
  },
  {
    id: "68",
    title: "Tournament: Summer Finale",
    start: "2025-07-25T09:00:00",
    end: "2025-07-27T18:00:00",
    extendedProps: {
      team: "All Teams",
      gender: "Mixed",
      type: "Tournament",
      location: "Salina Community Center",
    },
  },
  {
    id: "69",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-07-26T15:00:00",
    end: "2025-07-26T16:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "70",
    title: "Lightning vs. Warriors (Game)",
    start: "2025-07-27T13:00:00",
    end: "2025-07-27T14:30:00",
    extendedProps: {
      team: "Lightning",
      gender: "Boys",
      type: "Game",
      location: "Salina Community Center",
    },
  },
  {
    id: "71",
    title: "Firebolts Practice",
    start: "2025-07-28T17:00:00",
    end: "2025-07-28T18:30:00",
    extendedProps: {
      team: "Firebolts",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "72",
    title: "Stingers Practice",
    start: "2025-07-29T16:00:00",
    end: "2025-07-29T17:30:00",
    extendedProps: {
      team: "Stingers",
      gender: "Boys",
      type: "Practice",
      location: "North Salina Gym",
    },
  },
  {
    id: "73",
    title: "Vipers vs. Warriors (Game)",
    start: "2025-07-30T15:00:00",
    end: "2025-07-30T16:30:00",
    extendedProps: {
      team: "Vipers",
      gender: "Girls",
      type: "Game",
      location: "South Salina Court",
    },
  },
  {
    id: "74",
    title: "Thunderhawks vs. Warriors (Game)",
    start: "2025-07-31T14:00:00",
    end: "2025-07-31T15:30:00",
    extendedProps: {
      team: "Thunderhawks",
      gender: "Boys",
      type: "Game",
      location: "Central Salina Arena",
    },
  },
];

// Static team list (5 teams: 3 Boys, 2 Girls)
export const teams = [
  { name: "Lightning", gender: "Boys" },
  { name: "Thunderhawks", gender: "Boys" },
  { name: "Firebolts", gender: "Boys" },
  { name: "Raptors", gender: "Girls" },
  { name: "Vipers", gender: "Girls" },
  { name: "Stingers", gender: "Boys" },
];

export default function SchedulesPage() {
  const [genderFilter, setGenderFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [typeFilter, setTypeFilter] = useState("All Events");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use the current date dynamically
  const today = new Date();

  // Update filtered events when any filter changes
  useEffect(() => {
    let filtered = events;

    if (genderFilter !== "All") {
      filtered = filtered.filter(
        (event) => event.extendedProps.gender === genderFilter
      );
    }

    if (teamFilter !== "All Teams") {
      filtered = filtered.filter(
        (event) => event.extendedProps.team === teamFilter
      );
    }

    if (typeFilter !== "All Events") {
      filtered = filtered.filter(
        (event) => event.extendedProps.type === typeFilter
      );
    }

    setFilteredEvents(filtered);
  }, [genderFilter, teamFilter, typeFilter]);

  // Disable animation after initial render
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Filter available teams based on gender selection
  const availableTeams =
    genderFilter === "All"
      ? teams
      : teams.filter((team) => team.gender === genderFilter);

  // Get events for today (current date)
  const todayEvents = filteredEvents.filter((event) => {
    const eventStart = new Date(event.start);
    return (
      eventStart.getFullYear() === today.getFullYear() &&
      eventStart.getMonth() === today.getMonth() &&
      eventStart.getDate() === today.getDate()
    );
  });

  // Detect if the user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/core@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/daygrid@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/timegrid@6.1.15/main.css"
        />
      </Head>
      <section
        className="bg-[#002C51] pt-20 sm:pt-24 py-12 min-h-screen"
        aria-label="Schedules"
      >
        <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-white text-[clamp(2.25rem,5vw,3rem)] font-rubik font-bold mb-8 text-center uppercase animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Team Schedules
          </h1>

          {/* Today's Events Card */}
          <div
            className="mb-8 bg-gray-900 rounded-lg shadow-md p-6 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-white text-2xl font-rubik font-semibold mb-4">
              Today’s Events (
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              )
            </h2>
            {todayEvents.length > 0 ? (
              <ul className="space-y-4">
                {todayEvents.map((event) => (
                  <li key={event.id} className="text-white font-inter">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-300">
                      Team: {event.extendedProps.team}
                    </p>
                    <p className="text-sm text-gray-300">
                      Gender: {event.extendedProps.gender}
                    </p>
                    <p className="text-sm text-gray-300">
                      Type: {event.extendedProps.type}
                    </p>
                    <p className="text-sm text-gray-300">
                      Location: {event.extendedProps.location}
                    </p>
                    <p className="text-sm text-gray-300">
                      Time:{" "}
                      {new Date(event.start).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      –{" "}
                      {new Date(event.end).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white font-inter">
                No events scheduled for today.
              </p>
            )}
          </div>

          {/* Filter Section */}
          <div
            className="mb-8 flex justify-center flex-wrap gap-2 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
            role="tablist"
            aria-label="Filter schedules"
          >
            {/* Boys/Girls Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Gender
              </label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Team Name Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Team
              </label>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All Teams">All Teams</SelectItem>
                  {availableTeams.map((team) => (
                    <SelectItem key={team.name} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Practice/Game/Tournament Filter */}
            <div className="min-w-0 flex-1">
              <label className="block text-base font-inter text-gray-300 mb-1">
                Event Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger
                  className={cn(
                    "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  )}
                >
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#002C51] text-white border-gray-600">
                  <SelectItem value="All Events">All Events</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Game">Game</SelectItem>
                  <SelectItem value="Tournament">Tournament</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar Section */}
          <div
            className={cn(
              "bg-gray-900 rounded-lg shadow-md overflow-hidden w-full",
              isInitialLoad && "animate-fadeIn"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="p-6">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                events={filteredEvents}
                selectable
                eventMinHeight={30}
                dayMaxEventRows={2}
                eventDisplay="block"
                displayEventTime={false} // Hide time in Month view
                eventContent={(arg) => {
                  if (isMobile && arg.view.type === "dayGridMonth") {
                    return <div style={{ height: "100%", width: "100%" }} />;
                  }
                  return (
                    <div className="flex items-center">
                      <span className="whitespace-normal text-wrap">
                        {arg.event.title}
                      </span>
                    </div>
                  );
                }}
                eventDidMount={(info) => {
                  const type = info.event.extendedProps.type;
                  let bgColor;
                  if (type === "Game")
                    bgColor = "#EF4444"; // Red
                  else if (type === "Practice")
                    bgColor = "#3B82F6"; // Blue
                  else if (type === "Tournament") bgColor = "#A855F7"; // Purple
                  info.el.style.backgroundColor = bgColor || "#000000"; // Fallback to black if undefined
                  info.el.style.borderColor = bgColor || "#000000"; // Fallback to black if undefined
                }}
                eventClick={(info) => {
                  alert(
                    `${info.event.title}\n` +
                      `Team: ${info.event.extendedProps.team}\n` +
                      `Gender: ${info.event.extendedProps.gender}\n` +
                      `Type: ${info.event.extendedProps.type}\n` +
                      `Location: ${info.event.extendedProps.location}\n` +
                      `Time: ${info.event.start?.toLocaleString()}`
                  );
                }}
                eventTextColor="#FFFFFF"
                height="auto"
                dayMaxEvents
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                customButtons={{
                  today: {
                    text: "Today",
                    click: function () {
                      const calendarApi = (this as any).getCalendar();
                      calendarApi.today();
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 text-center">
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-blue-600 text-white font-medium font-inter rounded-md text-base px-6 py-3 uppercase",
                "hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 animate-fadeIn"
              )}
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/" className="no-underline">
                Back to Homepage
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={cn(
                "ml-4 bg-transparent border-blue-600 text-blue-600 font-medium font-inter rounded-md text-base px-6 py-3 uppercase",
                "hover:bg-blue-700 hover:text-white hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 animate-fadeIn"
              )}
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/teams" className="no-underline">
                View Teams
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
