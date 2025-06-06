// /pages/api/coaches/news-update.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../src/lib/supabase/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { newsId, teamId, title, content, imagePath } = req.body;

  if (!newsId || !teamId || !title || !content) {
    return res
      .status(400)
      .json({ error: "News ID, team ID, title, and content are required" });
  }

  try {
    const { data, error } = await supabaseServer
      .from("news")
      .update({
        title,
        content,
        image_path: imagePath,
      })
      .eq("id", newsId)
      .eq("team_id", teamId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error updating news article" });
    }

    if (!data) {
      return res.status(404).json({ error: "News article not found" });
    }

    return res.status(200).json({ news: data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
}
