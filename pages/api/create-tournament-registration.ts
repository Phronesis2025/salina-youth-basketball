import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamName, coachName, email, phone, tournamentId } = req.body;

  // Server-side validation
  if (!teamName || !coachName || !email || !tournamentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const { error } = await supabase.from("tournament_registrations").insert([
      {
        team_name: teamName,
        coach_name: coachName,
        email,
        phone,
        tournament_id: tournamentId,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res
      .status(200)
      .json({ message: "Registration submitted successfully" });
  } catch (error) {
    console.error("Error submitting registration:", error);
    return res.status(500).json({ error: "Failed to submit registration" });
  }
}
