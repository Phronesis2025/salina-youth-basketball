// /pages/api/coaches/news-delete.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../src/lib/supabase/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { newsId, teamId } = req.body;

  if (!newsId || !teamId) {
    return res.status(400).json({ error: "News ID and team ID are required" });
  }

  try {
    const { data, error } = await supabaseServer
      .from("news")
      .delete()
      .eq("id", newsId)
      .eq("team_id", teamId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error deleting news article" });
    }

    if (!data) {
      return res.status(404).json({ error: "News article not found" });
    }

    return res
      .status(200)
      .json({ message: "News article deleted successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
}
