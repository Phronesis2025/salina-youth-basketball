import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase/client';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../src/components/ui/accordion';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../src/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../src/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '../../src/lib/utils';
import { EventClickArg } from '@fullcalendar/core';

interface Player {
  id: string;
  name: string;
  age: number;
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    type: string;
    location: string;
    description: string;
    hasResult?: boolean;
  };
}

interface GameResult {
  id: string;
  schedule_id: string;
  date: string;
  opponent: string;
  score_us: number;
  score_them: number;
  outcome: 'win' | 'loss' | 'tie';
}

interface NewsArticle {
  id: string;
  team_id: string;
  coach_id: string;
  title: string;
  content: string;
  image_path: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function CoachesPage() {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerAge, setNewPlayerAge] = useState('');
  const [deletePlayer, setDeletePlayer] = useState<Player | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: '',
    location: '',
    description: '',
  });
  const [editEvent, setEditEvent] = useState<ScheduleEvent | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [addEventMessage, setAddEventMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [newGameResult, setNewGameResult] = useState({
    scheduleId: '',
    date: '',
    opponent: '',
    scoreUs: '',
    scoreThem: '',
    outcome: '',
  });
  const [isAddGameResultModalOpen, setIsAddGameResultModalOpen] =
    useState(false);
  const [addGameResultMessage, setAddGameResultMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [newNewsArticle, setNewNewsArticle] = useState({
    title: '',
    content: '',
    imageFile: null as File | null,
  });
  const [editNewsArticle, setEditNewsArticle] = useState<NewsArticle | null>(
    null
  );
  const [editNewsImageFile, setEditNewsImageFile] = useState<File | null>(null);
  const [deleteNewsArticle, setDeleteNewsArticle] =
    useState<NewsArticle | null>(null);
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false);
  const [addNewsMessage, setAddNewsMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCoachData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      console.log('User Data:', { userData, userError });

      if (userError || !userData.user) {
        setError('Unable to authenticate user');
        router.push('/coaches/login');
        return;
      }

      const userId = userData.user.id;
      setUserId(userId);
      console.log('User ID:', userId, 'EASY PICKINGS');

      const coachResponse = await fetch('/api/get-coach-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const coachResult = await coachResponse.json();
      console.log('Coach API Result:', coachResult);

      if (!coachResponse.ok || !coachResult.teamId) {
        setError(coachResult.error || 'Coach data not found');
        return;
      }

      setTeamId(coachResult.teamId);

      // Fetch players
      const playersResponse = await fetch('/api/get-team-players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: coachResult.teamId }),
      });

      const playersResult = await playersResponse.json();
      console.log('Players API Result:', playersResult);

      if (!playersResponse.ok) {
        setError(playersResult.error || 'Error fetching players');
        return;
      }

      setPlayers(playersResult.players || []);

      // Fetch schedule
      const schedulesResponse = await fetch('/api/get-team-schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: coachResult.teamId }),
      });

      const schedulesResult = await schedulesResponse.json();
      console.log('Schedules API Result:', schedulesResult);

      if (!schedulesResponse.ok) {
        setError(schedulesResult.error || 'Error fetching schedule');
        return;
      }

      // Fetch game results
      const gameResultsResponse = await fetch(
        '/api/coaches/get-team-game-results',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamId: coachResult.teamId }),
        }
      );

      const gameResultsResult = await gameResultsResponse.json();
      console.log('Game Results API Result:', gameResultsResult);

      if (!gameResultsResponse.ok) {
        console.error('Error fetching game results:', gameResultsResult.error);
      } else {
        setGameResults(gameResultsResult.gameResults || []);
      }

      // Fetch news articles
      const newsResponse = await fetch('/api/coaches/get-team-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: coachResult.teamId }),
      });

      const newsResult = await newsResponse.json();
      console.log('News API Result:', newsResult);

      if (!newsResponse.ok) {
        console.error('Error fetching news articles:', newsResult.error);
      } else {
        setNewsArticles(newsResult.news || []);
      }

      const gameResultScheduleIds = (gameResultsResult.gameResults || []).map(
        (result: GameResult) => result.schedule_id
      );

      const formattedEvents = schedulesResult.schedules.map(
        (event: ScheduleEvent) => {
          const eventDate = new Date(event.start);
          const formattedEvent: ScheduleEvent = {
            id: event.id,
            title: event.title,
            start: eventDate.toISOString(),
            extendedProps: {
              type: event.extendedProps.type,
              location: event.extendedProps.location,
              description: event.extendedProps.description,
              hasResult: gameResultScheduleIds.includes(event.id),
            },
          };
          console.log('Formatted Event:', formattedEvent);
          return formattedEvent;
        }
      );

      setEvents(formattedEvents);
    };

    fetchCoachData();
  }, [router]);

  const handleAddPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!teamId) {
      setError('Team ID not found');
      return;
    }

    const age = parseInt(newPlayerAge);
    if (isNaN(age) || age < 8 || age > 14) {
      setError('Age must be a number between 8 and 14');
      return;
    }

    if (!newPlayerName.trim()) {
      setError('Name is required');
      return;
    }

    const response = await fetch('/api/coaches/roster-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId, name: newPlayerName.trim(), age }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Error adding player');
      return;
    }

    setPlayers([...players, result.player]);
    setNewPlayerName('');
    setNewPlayerAge('');
    setSuccessMessage('Player added successfully');
  };

  const handleRemovePlayer = async () => {
    if (!deletePlayer || !teamId) return;

    setError(null);
    setSuccessMessage(null);

    const response = await fetch('/api/coaches/roster-remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: deletePlayer.id, teamId }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Error removing player');
      return;
    }

    setPlayers(players.filter((p) => p.id !== deletePlayer.id));
    setDeletePlayer(null);
    setSuccessMessage('Player removed successfully');
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddEventMessage(null);

    if (!teamId) {
      setAddEventMessage({ type: 'error', text: 'Team ID not found' });
      return;
    }

    const { title, date, type, location, description } = newEvent;

    if (!title.trim() || !date || !type) {
      setAddEventMessage({
        type: 'error',
        text: 'Title, date, and type are required',
      });
      return;
    }

    const eventDate = new Date(date);
    const currentDate = new Date();
    if (isNaN(eventDate.getTime()) || eventDate <= currentDate) {
      setAddEventMessage({
        type: 'error',
        text: 'Date must be a valid future date',
      });
      return;
    }

    const response = await fetch('/api/coaches/schedule-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        title,
        date,
        type,
        location,
        description,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setAddEventMessage({
        type: 'error',
        text: result.error || 'Error adding event',
      });
      return;
    }

    const formattedEvent: ScheduleEvent = {
      id: result.event.id,
      title: result.event.title,
      start: result.event.date,
      extendedProps: {
        type: result.event.type,
        location: result.event.location,
        description: result.event.description,
        hasResult: false,
      },
    };

    setEvents([...events, formattedEvent]);
    setNewEvent({
      title: '',
      date: '',
      type: '',
      location: '',
      description: '',
    });
    setAddEventMessage({ type: 'success', text: 'Event added successfully' });
  };

  const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!editEvent || !teamId) return;

    const { title, date, type, location, description } = newEvent;

    if (!title.trim() || !date || !type) {
      setError('Title, date, and type are required');
      return;
    }

    const eventDate = new Date(date);
    const currentDate = new Date();
    if (isNaN(eventDate.getTime()) || eventDate <= currentDate) {
      setError('Date must be a valid future date');
      return;
    }

    const response = await fetch('/api/coaches/schedule-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: editEvent.id,
        teamId,
        title,
        date,
        type,
        location,
        description,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Error updating event');
      return;
    }

    const updatedEvent: ScheduleEvent = {
      id: result.event.id,
      title: result.event.title,
      start: result.event.date,
      extendedProps: {
        type: result.event.type,
        location: result.event.location,
        description: result.event.description,
        hasResult: editEvent.extendedProps.hasResult,
      },
    };

    setEvents(
      events.map((evt) => (evt.id === editEvent.id ? updatedEvent : evt))
    );
    setEditEvent(null);
    setNewEvent({
      title: '',
      date: '',
      type: '',
      location: '',
      description: '',
    });
    setSuccessMessage('Event updated successfully');
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    alert(
      `Event: ${event.title}\nType: ${event.extendedProps.type}\nLocation: ${event.extendedProps.location}\nDescription: ${event.extendedProps.description}`
    );
  };

  const handleAddGameResult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddGameResultMessage(null);

    if (!teamId) {
      setAddGameResultMessage({ type: 'error', text: 'Team ID not found' });
      return;
    }

    const { scheduleId, date, opponent, scoreUs, scoreThem, outcome } =
      newGameResult;

    if (
      !scheduleId ||
      !date ||
      !opponent.trim() ||
      !scoreUs ||
      !scoreThem ||
      !outcome
    ) {
      setAddGameResultMessage({
        type: 'error',
        text: 'All fields are required',
      });
      return;
    }

    const gameDate = new Date(date);
    const currentDate = new Date();
    if (isNaN(gameDate.getTime()) || gameDate > currentDate) {
      setAddGameResultMessage({
        type: 'error',
        text: 'Date must be a valid past or present date',
      });
      return;
    }

    const scoreUsNum = parseInt(scoreUs);
    const scoreThemNum = parseInt(scoreThem);
    if (isNaN(scoreUsNum) || scoreUsNum < 0) {
      setAddGameResultMessage({
        type: 'error',
        text: 'Our score must be a non-negative integer',
      });
      return;
    }
    if (isNaN(scoreThemNum) || scoreThemNum < 0) {
      setAddGameResultMessage({
        type: 'error',
        text: 'Opponent score must be a non-negative integer',
      });
      return;
    }

    const response = await fetch('/api/coaches/game-result-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        scheduleId,
        date,
        opponent: opponent.trim(),
        scoreUs: scoreUsNum,
        scoreThem: scoreThemNum,
        outcome,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setAddGameResultMessage({
        type: 'error',
        text: result.error || 'Error adding game result',
      });
      return;
    }

    setGameResults([...gameResults, result.gameResult]);
    setEvents(
      events.map((evt) =>
        evt.id === result.gameResult.schedule_id
          ? { ...evt, extendedProps: { ...evt.extendedProps, hasResult: true } }
          : evt
      )
    );
    setNewGameResult({
      scheduleId: '',
      date: '',
      opponent: '',
      scoreUs: '',
      scoreThem: '',
      outcome: '',
    });
    setAddGameResultMessage({
      type: 'success',
      text: 'Game result added successfully',
    });
  };

  const handleAddNewsArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddNewsMessage(null);
    setIsAddingNews(true);

    if (!teamId) {
      setAddNewsMessage({ type: 'error', text: 'Team ID not found' });
      setIsAddingNews(false);
      return;
    }

    if (!userId) {
      setAddNewsMessage({ type: 'error', text: 'Coach ID not found' });
      setIsAddingNews(false);
      return;
    }

    const { title, content, imageFile } = newNewsArticle;

    if (!title.trim() || !content.trim()) {
      setAddNewsMessage({
        type: 'error',
        text: 'Title and content are required',
      });
      setIsAddingNews(false);
      return;
    }

    let imagePath: string | null = null;

    // Upload image to Supabase Storage if provided
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(`public/${fileName}`, imageFile);

      if (uploadError) {
        console.error('Supabase storage error:', uploadError);
        setAddNewsMessage({
          type: 'error',
          text: 'Error uploading image',
        });
        setIsAddingNews(false);
        return;
      }

      // Use the uploaded data to get the public URL
      if (data) {
        imagePath = supabase.storage
          .from('news-images')
          .getPublicUrl(`public/${fileName}`).data.publicUrl;
      }
    }

    // Add the news article with the image path and coach_id
    const response = await fetch('/api/coaches/news-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        coachId: userId,
        title,
        content,
        imagePath,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setAddNewsMessage({
        type: 'error',
        text: result.error || 'Error adding news article',
      });
      setIsAddingNews(false);
      return;
    }

    setNewsArticles([...newsArticles, result.news]);
    setNewNewsArticle({ title: '', content: '', imageFile: null });
    setAddNewsMessage({
      type: 'success',
      text: 'News article added successfully',
    });
    setIsAddingNews(false);
  };

  const handleUpdateNewsArticle = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!editNewsArticle || !teamId) return;

    const { title, content } = newNewsArticle;
    let imagePath: string | null = editNewsArticle.image_path;

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    // If a new image is uploaded, delete the old one and upload the new one
    if (editNewsImageFile) {
      // Delete the old image if it exists
      if (editNewsArticle.image_path) {
        const oldFilePath = editNewsArticle.image_path.split('/').pop();
        if (oldFilePath) {
          const { error: deleteError } = await supabase.storage
            .from('news-images')
            .remove([`public/${oldFilePath}`]);
          if (deleteError) {
            console.error('Supabase storage delete error:', deleteError);
          }
        }
      }

      // Upload the new image
      const fileExt = editNewsImageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(`public/${fileName}`, editNewsImageFile);

      if (uploadError) {
        console.error('Supabase storage error:', uploadError);
        setError('Error uploading image');
        return;
      }

      // Use the uploaded data to get the public URL
      if (data) {
        imagePath = supabase.storage
          .from('news-images')
          .getPublicUrl(`public/${fileName}`).data.publicUrl;
      }
    }

    // Update the news article
    const response = await fetch('/api/coaches/news-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newsId: editNewsArticle.id,
        teamId,
        title,
        content,
        imagePath,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Error updating news article');
      return;
    }

    setNewsArticles(
      newsArticles.map((article) =>
        article.id === result.news.id ? result.news : article
      )
    );
    setEditNewsArticle(null);
    setEditNewsImageFile(null);
    setNewNewsArticle({ title: '', content: '', imageFile: null });
    setSuccessMessage('News article updated successfully');
  };

  const handleDeleteNewsArticle = async () => {
    if (!deleteNewsArticle || !teamId) return;

    setError(null);
    setSuccessMessage(null);

    // Delete the associated image if it exists
    if (deleteNewsArticle.image_path) {
      const filePath = deleteNewsArticle.image_path.split('/').pop();
      if (filePath) {
        const { error: deleteError } = await supabase.storage
          .from('news-images')
          .remove([`public/${filePath}`]);
        if (deleteError) {
          console.error('Supabase storage delete error:', deleteError);
        }
      }
    }

    const response = await fetch('/api/coaches/news-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newsId: deleteNewsArticle.id,
        teamId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Error deleting news article');
      return;
    }

    setNewsArticles(
      newsArticles.filter((article) => article.id !== deleteNewsArticle.id)
    );
    setDeleteNewsArticle(null);
    setSuccessMessage('News article deleted successfully');
  };

  const subPages = [
    { title: 'AI-Generated Drills', link: '/coaches/drills/current' },
    { title: 'Video Tutorial Library', link: '/coaches/videos' },
    { title: 'Rules & Policies', link: '/coaches/rules' },
    { title: 'Resource Archive', link: '/coaches/resources' },
  ];

  // Filter games without results for the game result form
  const availableGames = events.filter(
    (event) =>
      event.extendedProps.type === 'game' && !event.extendedProps.hasResult
  );

  return (
    <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section
          className="mb-12 text-center"
          aria-label="Coach Dashboard Welcome"
        >
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4">
            Locker Room Dashboard
          </h1>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] font-rubik mb-8 max-w-2xl mx-auto">
            Manage your team, view schedules, and access coaching resources.
          </p>
        </section>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-8 p-4 bg-gray-900 border border-red-500/50 rounded-lg">
            <p className="text-red-500 text-sm font-rubik">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-8 p-4 bg-gray-900 border border-green-500/50 rounded-lg">
            <p className="text-green-500 text-sm font-rubik">
              {successMessage}
            </p>
          </div>
        )}

        {/* Roster Section */}
        <section className="mb-12" aria-label="Team Roster">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Team Roster
              </CardTitle>
              <p className="text-gray-300 text-sm font-rubik">
                Total Players: {players.length}
              </p>
            </CardHeader>
            <CardContent>
              {/* Add Player Form */}
              <form onSubmit={handleAddPlayer} className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <Label
                      htmlFor="player-name"
                      className="text-white font-rubik"
                    >
                      Player Name
                    </Label>
                    <Input
                      id="player-name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      placeholder="Enter player name"
                    />
                  </div>
                  <div className="w-full sm:w-24">
                    <Label
                      htmlFor="player-age"
                      className="text-white font-rubik"
                    >
                      Age
                    </Label>
                    <Input
                      id="player-age"
                      type="number"
                      value={newPlayerAge}
                      onChange={(e) => setNewPlayerAge(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      placeholder="8-14"
                      min="8"
                      max="14"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12"
                >
                  Add Player
                </Button>
              </form>

              {/* Player List */}
              {players.length > 0 ? (
                <>
                  <ul className="space-y-2">
                    {players.map((player) => (
                      <li
                        key={player.id}
                        className="flex justify-between items-center text-gray-300 text-sm font-rubik border-b border-gray-700 pb-2"
                      >
                        <span>
                          {player.name} (Age: {player.age})
                        </span>
                        <Button
                          onClick={() => setDeletePlayer(player)}
                          className="bg-red-600 hover:bg-red-700 text-white font-inter uppercase"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Dialog
                    open={!!deletePlayer}
                    onOpenChange={() => setDeletePlayer(null)}
                  >
                    <DialogContent className="bg-gray-900 text-white border border-red-500/50">
                      <DialogHeader>
                        <DialogTitle>Confirm Removal</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Are you sure you want to remove {deletePlayer?.name}{' '}
                          from the roster? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => setDeletePlayer(null)}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleRemovePlayer}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Remove
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <p className="text-gray-300 text-sm font-rubik">
                  No players found.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Schedule Section */}
        <section className="mb-12" aria-label="Team Schedule">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800">
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-4 sm:mb-0">
                Schedule
              </CardTitle>
              <Dialog
                open={isAddEventModalOpen}
                onOpenChange={setIsAddEventModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12">
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border border-red-500/50 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Fill in the details to add a new event to the schedule.
                    </DialogDescription>
                  </DialogHeader>
                  {addEventMessage && (
                    <div
                      className={cn(
                        'p-4 rounded-lg mb-4',
                        addEventMessage.type === 'success'
                          ? 'bg-gray-900 border border-green-500/50'
                          : 'bg-gray-900 border border-red-500/50'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-rubik',
                          addEventMessage.type === 'success'
                            ? 'text-green-500'
                            : 'text-red-500'
                        )}
                      >
                        {addEventMessage.text}
                      </p>
                      {addEventMessage.type === 'success' && (
                        <Button
                          onClick={() => {
                            setAddEventMessage(null);
                            setIsAddEventModalOpen(false);
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  )}
                  {!addEventMessage && (
                    <form onSubmit={handleAddEvent} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="event-title"
                          className="text-white font-rubik"
                        >
                          Title
                        </Label>
                        <Input
                          id="event-title"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="event-date"
                          className="text-white font-rubik"
                        >
                          Date and Time
                        </Label>
                        <Input
                          id="event-date"
                          type="datetime-local"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="event-type"
                          className="text-white font-rubik"
                        >
                          Type
                        </Label>
                        <Select
                          value={newEvent.type}
                          onValueChange={(value: string) =>
                            setNewEvent({ ...newEvent, type: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-gray-700">
                            <SelectItem value="practice">Practice</SelectItem>
                            <SelectItem value="game">Game</SelectItem>
                            <SelectItem value="tournament">
                              Tournament
                            </SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="event-location"
                          className="text-white font-rubik"
                        >
                          Location (Optional)
                        </Label>
                        <Input
                          id="event-location"
                          value={newEvent.location}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              location: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="event-description"
                          className="text-white font-rubik"
                        >
                          Description (Optional)
                        </Label>
                        <Input
                          id="event-description"
                          value={newEvent.description}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              description: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          placeholder="Enter description"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsAddEventModalOpen(false);
                            setAddEventMessage(null);
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add Event
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <FullCalendar
                plugins={[listPlugin]}
                initialView="listWeek"
                events={events}
                headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'next',
                }}
                eventClick={handleEventClick}
                eventContent={(eventInfo) => (
                  <div className="flex flex-col p-2">
                    <p className="text-white font-rubik text-sm">
                      <span
                        className={cn(
                          'inline-block w-3 h-3 mr-2 rounded-full',
                          eventInfo.event.extendedProps.type === 'practice' &&
                            'bg-blue-500',
                          eventInfo.event.extendedProps.type === 'game' &&
                            'bg-red-500',
                          eventInfo.event.extendedProps.type === 'tournament' &&
                            'bg-purple-500',
                          eventInfo.event.extendedProps.type === 'event' &&
                            'bg-green-500'
                        )}
                      />
                      {eventInfo.event.title}
                      {eventInfo.event.extendedProps.hasResult && (
                        <span className="ml-2 text-green-500 text-xs">
                          [Result Added]
                        </span>
                      )}
                    </p>
                    <p className="text-white text-xs font-rubik">
                      {eventInfo.event.extendedProps.location}
                    </p>
                    <p className="text-white text-xs font-rubik">
                      {eventInfo.event.extendedProps.description}
                    </p>
                  </div>
                )}
                eventClassNames="bg-gray-800 border-none cursor-pointer"
                height="auto"
                contentHeight="auto"
              />
              {/* Edit Event Modal */}
              <Dialog
                open={!!editEvent}
                onOpenChange={() => setEditEvent(null)}
              >
                <DialogContent className="bg-gray-900 text-white border border-red-500/50 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Update the details for this event.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdateEvent} className="space-y-4">
                    <div>
                      <Label
                        htmlFor="edit-event-title"
                        className="text-white font-rubik"
                      >
                        Title
                      </Label>
                      <Input
                        id="edit-event-title"
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-event-date"
                        className="text-white font-rubik"
                      >
                        Date and Time
                      </Label>
                      <Input
                        id="edit-event-date"
                        type="datetime-local"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-event-type"
                        className="text-white font-rubik"
                      >
                        Type
                      </Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: string) =>
                          setNewEvent({ ...newEvent, type: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white border-gray-700">
                          <SelectItem value="practice">Practice</SelectItem>
                          <SelectItem value="game">Game</SelectItem>
                          <SelectItem value="tournament">Tournament</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-event-location"
                        className="text-white font-rubik"
                      >
                        Location (Optional)
                      </Label>
                      <Input
                        id="edit-event-location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-event-description"
                        className="text-white font-rubik"
                      >
                        Description (Optional)
                      </Label>
                      <Input
                        id="edit-event-description"
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        placeholder="Enter description"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => setEditEvent(null)}
                        className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Update Event
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        {/* Game Results Section */}
        <section className="mb-12" aria-label="Game Results">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-4 sm:mb-0">
                Game Results
              </CardTitle>
              <Dialog
                open={isAddGameResultModalOpen}
                onOpenChange={setIsAddGameResultModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12"
                    disabled={availableGames.length === 0}
                  >
                    Add Game Result
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border border-red-500/50 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Game Result</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Record the result for a game in the schedule.
                    </DialogDescription>
                  </DialogHeader>
                  {addGameResultMessage && (
                    <div
                      className={cn(
                        'p-4 rounded-lg mb-4',
                        addGameResultMessage.type === 'success'
                          ? 'bg-gray-900 border border-green-500/50'
                          : 'bg-gray-900 border border-red-500/50'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-rubik',
                          addGameResultMessage.type === 'success'
                            ? 'text-green-500'
                            : 'text-red-500'
                        )}
                      >
                        {addGameResultMessage.text}
                      </p>
                      {addGameResultMessage.type === 'success' && (
                        <Button
                          onClick={() => {
                            setAddGameResultMessage(null);
                            setIsAddGameResultModalOpen(false);
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  )}
                  {!addGameResultMessage && (
                    <form onSubmit={handleAddGameResult} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="game-schedule"
                          className="text-white font-rubik"
                        >
                          Game
                        </Label>
                        <Select
                          value={newGameResult.scheduleId}
                          onValueChange={(value: string) => {
                            const selectedGame = availableGames.find(
                              (game) => game.id === value
                            );
                            setNewGameResult({
                              ...newGameResult,
                              scheduleId: value,
                              date: selectedGame?.start || '',
                            });
                          }}
                        >
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12">
                            <SelectValue placeholder="Select a game" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-gray-700">
                            {availableGames.map((game) => (
                              <SelectItem key={game.id} value={game.id}>
                                {game.title} (
                                {new Date(game.start).toLocaleDateString()})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="game-date"
                          className="text-white font-rubik"
                        >
                          Date
                        </Label>
                        <Input
                          id="game-date"
                          type="datetime-local"
                          value={newGameResult.date}
                          onChange={(e) =>
                            setNewGameResult({
                              ...newGameResult,
                              date: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="game-opponent"
                          className="text-white font-rubik"
                        >
                          Opponent
                        </Label>
                        <Input
                          id="game-opponent"
                          value={newGameResult.opponent}
                          onChange={(e) =>
                            setNewGameResult({
                              ...newGameResult,
                              opponent: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          placeholder="Enter opponent name"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label
                            htmlFor="game-score-us"
                            className="text-white font-rubik"
                          >
                            Our Score
                          </Label>
                          <Input
                            id="game-score-us"
                            type="number"
                            value={newGameResult.scoreUs}
                            onChange={(e) =>
                              setNewGameResult({
                                ...newGameResult,
                                scoreUs: e.target.value,
                              })
                            }
                            className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor="game-score-them"
                            className="text-white font-rubik"
                          >
                            Opponent Score
                          </Label>
                          <Input
                            id="game-score-them"
                            type="number"
                            value={newGameResult.scoreThem}
                            onChange={(e) =>
                              setNewGameResult({
                                ...newGameResult,
                                scoreThem: e.target.value,
                              })
                            }
                            className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="game-outcome"
                          className="text-white font-rubik"
                        >
                          Outcome
                        </Label>
                        <Select
                          value={newGameResult.outcome}
                          onValueChange={(value: string) =>
                            setNewGameResult({
                              ...newGameResult,
                              outcome: value,
                            })
                          }
                        >
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12">
                            <SelectValue placeholder="Select outcome" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-gray-700">
                            <SelectItem value="win">Win</SelectItem>
                            <SelectItem value="loss">Loss</SelectItem>
                            <SelectItem value="tie">Tie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsAddGameResultModalOpen(false);
                            setAddGameResultMessage(null);
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add Result
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {gameResults.length > 0 ? (
                <ul className="space-y-4">
                  {gameResults.map((result) => {
                    const relatedEvent = events.find(
                      (event) => event.id === result.schedule_id
                    );
                    return (
                      <li
                        key={result.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-300 text-sm font-rubik border-b border-gray-700 pb-4"
                      >
                        <div className="mb-2 sm:mb-0">
                          <p className="text-white font-semibold">
                            {relatedEvent ? relatedEvent.title : 'Game'} vs{' '}
                            {result.opponent}
                          </p>
                          <p className="text-gray-300">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-300">
                            Score: {result.score_us} - {result.score_them}
                          </p>
                          <p
                            className={cn(
                              'text-sm capitalize',
                              result.outcome === 'win' && 'text-green-500',
                              result.outcome === 'loss' && 'text-red-500',
                              result.outcome === 'tie' && 'text-yellow-500'
                            )}
                          >
                            {result.outcome}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm font-rubik">
                  No game results recorded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* News Section */}
        <section className="mb-12" aria-label="Team News">
          <Card className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase mb-4 sm:mb-0">
                Team News
              </CardTitle>
              <Dialog
                open={isAddNewsModalOpen}
                onOpenChange={setIsAddNewsModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12">
                    Add News Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border border-red-500/50 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add News Article</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Create a new news article for your team.
                    </DialogDescription>
                  </DialogHeader>
                  {addNewsMessage && (
                    <div
                      className={cn(
                        'p-4 rounded-lg mb-4',
                        addNewsMessage.type === 'success'
                          ? 'bg-gray-900 border border-green-500/50'
                          : 'bg-gray-900 border border-red-500/50'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-rubik',
                          addNewsMessage.type === 'success'
                            ? 'text-green-500'
                            : 'text-red-500'
                        )}
                      >
                        {addNewsMessage.text}
                      </p>
                      {addNewsMessage.type === 'success' && (
                        <Button
                          onClick={() => {
                            setAddNewsMessage(null);
                            setIsAddNewsModalOpen(false);
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  )}
                  {!addNewsMessage && (
                    <form onSubmit={handleAddNewsArticle} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="news-title"
                          className="text-white font-rubik"
                        >
                          Title
                        </Label>
                        <Input
                          id="news-title"
                          value={newNewsArticle.title}
                          onChange={(e) =>
                            setNewNewsArticle({
                              ...newNewsArticle,
                              title: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          placeholder="Enter news title"
                          disabled={isAddingNews}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="news-content"
                          className="text-white font-rubik"
                        >
                          Content
                        </Label>
                        <textarea
                          id="news-content"
                          value={newNewsArticle.content}
                          onChange={(e) =>
                            setNewNewsArticle({
                              ...newNewsArticle,
                              content: e.target.value,
                            })
                          }
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 w-full p-2 rounded-md min-h-[150px]"
                          placeholder="Enter news content"
                          disabled={isAddingNews}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="news-image-file"
                          className="text-white font-rubik"
                        >
                          Image (Optional)
                        </Label>
                        <Input
                          id="news-image-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setNewNewsArticle({
                              ...newNewsArticle,
                              imageFile: file,
                            });
                          }}
                          className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                          disabled={isAddingNews}
                        />
                      </div>
                      <DialogFooter className="flex justify-between items-center">
                        {isAddingNews ? (
                          <div className="flex items-center space-x-2">
                            <svg
                              className="animate-spin h-5 w-5 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                            <span className="text-white font-rubik">
                              Adding article...
                            </span>
                          </div>
                        ) : (
                          <>
                            <Button
                              type="button"
                              onClick={() => {
                                setIsAddNewsModalOpen(false);
                                setAddNewsMessage(null);
                              }}
                              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Add Article
                            </Button>
                          </>
                        )}
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {newsArticles.length > 0 ? (
                <ul className="space-y-4">
                  {newsArticles.map((article) => (
                    <li
                      key={article.id}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between text-gray-300 text-sm font-rubik border-b border-gray-700 pb-4"
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="text-white font-semibold">
                          {article.title}
                        </p>
                        <p className="text-gray-300">
                          Posted:{' '}
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-300">{article.content}</p>
                        {article.image_path && (
                          <img
                            src={article.image_path}
                            alt={article.title}
                            className="mt-2 max-w-xs rounded-lg"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.src = '/placeholder-image.jpg'; // Fallback image
                            }}
                          />
                        )}
                        <p
                          className={cn(
                            'text-sm capitalize',
                            article.status === 'pending' && 'text-yellow-500',
                            article.status === 'approved' && 'text-green-500',
                            article.status === 'rejected' && 'text-red-500'
                          )}
                        >
                          Status: {article.status}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            setEditNewsArticle(article);
                            setNewNewsArticle({
                              title: article.title,
                              content: article.content,
                              imageFile: null,
                            });
                          }}
                          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 font-inter uppercase"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => setDeleteNewsArticle(article)}
                          className="bg-red-600 hover:bg-red-700 text-white font-inter uppercase"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm font-rubik">
                  No news articles available.
                </p>
              )}
              {/* Edit News Modal */}
              <Dialog
                open={!!editNewsArticle}
                onOpenChange={() => setEditNewsArticle(null)}
              >
                <DialogContent className="bg-gray-900 text-white border border-red-500/50 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit News Article</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Update the details for this news article.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleUpdateNewsArticle}
                    className="space-y-4"
                  >
                    <div>
                      <Label
                        htmlFor="edit-news-title"
                        className="text-white font-rubik"
                      >
                        Title
                      </Label>
                      <Input
                        id="edit-news-title"
                        value={newNewsArticle.title}
                        onChange={(e) =>
                          setNewNewsArticle({
                            ...newNewsArticle,
                            title: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                        placeholder="Enter news title"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-news-content"
                        className="text-white font-rubik"
                      >
                        Content
                      </Label>
                      <textarea
                        id="edit-news-content"
                        value={newNewsArticle.content}
                        onChange={(e) =>
                          setNewNewsArticle({
                            ...newNewsArticle,
                            content: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 w-full p-2 rounded-md min-h-[150px]"
                        placeholder="Enter news content"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-news-image-file"
                        className="text-white font-rubik"
                      >
                        Image (Optional)
                      </Label>
                      <Input
                        id="edit-news-image-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setEditNewsImageFile(file);
                        }}
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                      />
                      {editNewsArticle?.image_path && !editNewsImageFile && (
                        <p className="text-gray-300 text-sm mt-1">
                          Current Image:{' '}
                          <a
                            href={editNewsArticle.image_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View
                          </a>
                        </p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          setEditNewsArticle(null);
                          setEditNewsImageFile(null);
                        }}
                        className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Update Article
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Delete News Confirmation Modal */}
              <Dialog
                open={!!deleteNewsArticle}
                onOpenChange={() => setDeleteNewsArticle(null)}
              >
                <DialogContent className="bg-gray-900 text-white border border-red-500/50">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Are you sure you want to delete the news article &quot;
                      {deleteNewsArticle?.title}&quot;? This action cannot be
                      undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => setDeleteNewsArticle(null)}
                      className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteNewsArticle}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        {/* Sub-Page Navigation */}
        <section className="mb-12" aria-label="Coaching Resources">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="resources">
              <AccordionTrigger className="text-white text-[clamp(1.25rem,2vw,1.5rem)] font-inter font-semibold uppercase">
                Coaching Resources
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {subPages.map((page) => (
                    <Link key={page.title} href={page.link}>
                      <Button className="w-full bg-blue-600 text-white font-medium font-inter rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base px-6 py-3 uppercase">
                        {page.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
