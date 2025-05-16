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

  const formData = req.body;

  console.log("Creating join request with formData:", formData);

  try {
    const { data, error } = await supabase
      .from("join_requests")
      .insert({
        first_name: formData.first_name,
        last_name: formData.last_name,
        age_group: formData.age_group,
        team_gender: formData.team_gender,
        date_of_birth: formData.date_of_birth,
        parent_name: formData.parent_name,
        parent_phone: formData.parent_phone,
        parent_email: formData.parent_email,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_phone: formData.emergency_contact_phone,
        preferred_position: formData.preferred_position,
        prior_experience: formData.prior_experience,
        payment_option: formData.payment_option,
        payment_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message);
    }

    console.log("Join request created, id:", data.id);
    return res.status(200).json({ joinRequestId: data.id });
  } catch (error) {
    console.error("Create join request error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
