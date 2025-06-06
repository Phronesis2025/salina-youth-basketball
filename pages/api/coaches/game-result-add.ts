import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamId, scheduleId, date, opponent, scoreUs, scoreThem, outcome } =
    req.body;

  // Validate input
  if (
    !teamId ||
    !scheduleId ||
    !date ||
    !opponent ||
    scoreUs === undefined ||
    scoreThem === undefined ||
    !outcome
  ) {
    return res
      .status(400)
      .json({
        error:
          "Team ID, schedule ID, date, opponent, scores, and outcome are required",
      });
  }

  if (typeof opponent !== "string" || opponent.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Opponent must be a non-empty string" });
  }

  const gameDate = new Date(date);
  const currentDate = new Date();
  if (isNaN(gameDate.getTime()) || gameDate > currentDate) {
    return res
      .status(400)
      .json({ error: "Date must be a valid past or present date" });
  }

  if (!Number.isInteger(scoreUs) || scoreUs < 0) {
    return res
      .status(400)
      .json({ error: "Our score must be a non-negative integer" });
  }

  if (!Number.isInteger(scoreThem) || scoreThem < 0) {
    return res
      .status(400)
      .json({ error: "Opponent score must be a non-negative integer" });
  }

  if (!["win", "loss", "tie"].includes(outcome)) {
    return res
      .status(400)
      .json({ error: "Outcome must be one of: win, loss, tie" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verify the schedule event exists and belongs to the team
  const { data: schedule, error: scheduleError } = await supabase
    .from("schedules")
    .select("id, type")
    .eq("id", scheduleId)
    .eq("team_id", teamId)
    .eq("type", "game")
    .single();

  if (scheduleError || !schedule) {
    return res
      .status(404)
      .json({ error: "Game not found or does not belong to this team" });
  }

  // Check if a game result already exists for this schedule ID
  const { data: existingResult, error: existingError } = await supabase
    .from("game_results")
    .select("id")
    .eq("schedule_id", scheduleId)
    .single();

  if (existingError && existingError.code !== "PGRST116") {
    // PGRST116 means no rows found
    return res
      .status(500)
      .json({
        error: "Error checking existing game result: " + existingError.message,
      });
  }

  if (existingResult) {
    return res
      .status(400)
      .json({ error: "A game result already exists for this game" });
  }

  // Add the game result
  const { data, error } = await supabase
    .from("game_results")
    .insert({
      team_id: teamId,
      schedule_id: scheduleId,
      date,
      opponent: opponent.trim(),
      score_us: scoreUs,
      score_them: scoreThem,
      outcome,
    })
    .select()
    .single();

  if (error) {
    return res
      .status(500)
      .json({ error: "Error adding game result: " + error.message });
  }

  return res.status(200).json({ gameResult: data });
}
