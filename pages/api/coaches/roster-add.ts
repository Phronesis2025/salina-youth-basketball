import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamId, name, age } = req.body;

  // Validate input
  if (!teamId || !name || !age) {
    return res
      .status(400)
      .json({ error: "Team ID, name, and age are required" });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Name must be a non-empty string" });
  }

  if (!Number.isInteger(age) || age < 8 || age > 14) {
    return res
      .status(400)
      .json({ error: "Age must be an integer between 8 and 14" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check current roster size
  const { count, error: countError } = await supabase
    .from("players")
    .select("*", { count: "exact", head: true })
    .eq("team_id", teamId);

  if (countError) {
    return res
      .status(500)
      .json({ error: "Error checking roster size: " + countError.message });
  }

  if (count === null) {
    return res.status(500).json({ error: "Unable to determine roster size" });
  }

  if (count >= 12) {
    return res
      .status(400)
      .json({ error: "Roster is full (maximum 12 players)" });
  }

  // Add the new player
  const { data, error } = await supabase
    .from("players")
    .insert({ team_id: teamId, name: name.trim(), age })
    .select()
    .single();

  if (error) {
    return res
      .status(500)
      .json({ error: "Error adding player: " + error.message });
  }

  return res.status(200).json({ player: data });
}
