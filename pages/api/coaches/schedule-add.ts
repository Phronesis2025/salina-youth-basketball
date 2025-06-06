import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamId, title, date, type, location, description } = req.body;

  // Validate input
  if (!teamId || !title || !date || !type) {
    return res
      .status(400)
      .json({ error: "Team ID, title, date, and type are required" });
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

  // Add the new schedule event
  const { data, error } = await supabase
    .from("schedules")
    .insert({
      team_id: teamId,
      title: title.trim(),
      date,
      type,
      location: location?.trim() || null,
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return res
      .status(500)
      .json({ error: "Error adding schedule event: " + error.message });
  }

  return res.status(200).json({ event: data });
}
