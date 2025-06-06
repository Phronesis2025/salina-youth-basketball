import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { eventId, teamId, title, date, type, location, description } =
    req.body;

  // Validate input
  if (!eventId || !teamId || !title || !date || !type) {
    return res
      .status(400)
      .json({ error: "Event ID, Team ID, title, date, and type are required" });
  }

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }

  const eventDate = new Date(date);
  const currentDate = new Date();
  if (isNaN(eventDate.getTime()) || eventDate <= currentDate) {
    return res.status(400).json({ error: "Date must be a valid future date" });
  }

  if (!["practice", "game", "tournament", "event"].includes(type)) {
    return res
      .status(400)
      .json({
        error: "Type must be one of: practice, game, tournament, event",
      });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verify the event belongs to the team
  const { data: event, error: eventError } = await supabase
    .from("schedules")
    .select("id")
    .eq("id", eventId)
    .eq("team_id", teamId)
    .single();

  if (eventError || !event) {
    return res
      .status(404)
      .json({ error: "Event not found or does not belong to this team" });
  }

  // Update the event
  const { data, error } = await supabase
    .from("schedules")
    .update({
      title: title.trim(),
      date,
      type,
      location: location?.trim() || null,
      description: description?.trim() || null,
    })
    .eq("id", eventId)
    .select()
    .single();

  if (error) {
    return res
      .status(500)
      .json({ error: "Error updating schedule event: " + error.message });
  }

  return res.status(200).json({ event: data });
}
