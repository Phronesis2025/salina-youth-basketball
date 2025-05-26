import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamId } = req.body;

  if (!teamId) {
    return res.status(400).json({ error: "Team ID is required" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: schedules, error } = await supabase
    .from("schedules")
    .select("id, title, date, type, location, description")
    .eq("team_id", teamId);

  if (error) {
    return res
      .status(500)
      .json({ error: "Error fetching schedules: " + error.message });
  }

  return res.status(200).json({ schedules: schedules || [] });
}
