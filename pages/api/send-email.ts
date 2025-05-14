import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { formData, paymentStatus, joinRequestId } = req.body;

  // Placeholder: Log email data to console
  console.log("Sending admin email notification...");
  console.log("Form Data:", formData);
  console.log("Payment Status:", paymentStatus);
  console.log("Join Request ID:", joinRequestId);

  // Placeholder: Admin email notification
  console.log("Admin Email:");
  console.log(
    `Subject: New Join Request from ${formData.first_name} ${formData.last_name}`
  );
  console.log(
    `Body: A new player has submitted a join request. Name: ${formData.first_name} ${formData.last_name}, Parent Email: ${formData.parent_email}, Age Group: ${formData.age_group}, Team Gender: ${formData.team_gender}, Payment Status: ${paymentStatus}.`
  );

  // Placeholder: User confirmation email
  console.log("User Confirmation Email:");
  console.log(`To: ${formData.parent_email}`);
  console.log(`Subject: Thank you for your join request`);
  console.log(
    `Body: Thank you for your join request. We’ll review your application and get back to you.`
  );

  return res
    .status(200)
    .json({ message: "Email notifications logged (placeholder)" });
}
