// /pages/api/coaches/get-team-news.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../src/lib/supabase/server";

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

  try {
    const { data, error } = await supabaseServer
      .from("news")
      .select("*")
      .eq("team_id", teamId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error fetching news articles" });
    }

    return res.status(200).json({ news: data || [] });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
}
