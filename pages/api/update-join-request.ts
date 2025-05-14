import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role key (server-side only)
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

  const { joinRequestId, payment_status, stripe_payment_id } = req.body;

  try {
    const updates: { payment_status: string; stripe_payment_id?: string } = {
      payment_status,
    };
    if (stripe_payment_id) updates.stripe_payment_id = stripe_payment_id;

    const { error } = await supabase
      .from("join_requests")
      .update(updates)
      .eq("id", joinRequestId);

    if (error) throw new Error(error.message);

    return res
      .status(200)
      .json({ message: "Join request updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
