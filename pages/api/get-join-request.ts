import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { joinRequestId } = req.body;

  if (!joinRequestId) {
    return res.status(400).json({ error: "Missing joinRequestId" });
  }

  try {
    const { data, error } = await supabase
      .from("join_requests")
      .select(
        "first_name, last_name, parent_email, age_group, team_gender, payment_option, payment_status, created_at, stripe_payment_id"
      )
      .eq("id", joinRequestId)
      .single();

    if (error || !data) {
      throw new Error("Join request not found");
    }

    return res.status(200).json({ joinRequest: data });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
