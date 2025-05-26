import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { playerId, teamId } = req.body;

  // Validate input
  if (!playerId || !teamId) {
    return res
      .status(400)
      .json({ error: "Player ID and Team ID are required" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verify the player belongs to the team
  const { data: player, error: playerError } = await supabase
    .from("players")
    .select("id")
    .eq("id", playerId)
    .eq("team_id", teamId)
    .single();

  if (playerError || !player) {
    return res
      .status(404)
      .json({ error: "Player not found or does not belong to this team" });
  }

  // Delete the player
  const { error } = await supabase.from("players").delete().eq("id", playerId);

  if (error) {
    return res
      .status(500)
      .json({ error: "Error removing player: " + error.message });
  }

  return res.status(200).json({ message: "Player removed successfully" });
}
