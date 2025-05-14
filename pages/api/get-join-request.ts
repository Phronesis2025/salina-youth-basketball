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

  const { stripe_payment_id } = req.body;

  try {
    const { data, error } = await supabase
      .from("join_requests")
      .select("*")
      .eq("stripe_payment_id", stripe_payment_id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("Join request not found");

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
