import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { formData, paymentStatus, joinRequestId, to, subject, html, webhook } =
    req.body;

  try {
    // Handle webhook email (e.g., order shipped)
    if (webhook && to && subject && html) {
      const emailResponse = await resend.emails.send({
        from: "Salina Youth Basketball Club <no-reply@yourdomain.com>",
        to,
        subject,
        html,
      });
      console.log("Webhook email sent:", emailResponse);
      return res.status(200).json({ message: "Webhook email sent" });
    }

    // Handle checkout page email
    if (to && subject && html) {
      const emailResponse = await resend.emails.send({
        from: "Salina Youth Basketball Club <no-reply@yourdomain.com>",
        to,
        subject,
        html,
      });
      console.log("Checkout email sent:", emailResponse);
      return res.status(200).json({ message: "Email sent" });
    }

    // Handle join request email
    if (!formData || !paymentStatus || !joinRequestId) {
      return res
        .status(400)
        .json({ error: "Missing required fields for join request" });
    }

    const { data: joinRequest, error } = await supabase
      .from("join_requests")
      .select("stripe_payment_id, created_at, payment_status")
      .eq("id", joinRequestId)
      .single();

    if (error || !joinRequest) {
      throw new Error("Failed to fetch join request data");
    }

    const amount = formData.payment_option === "full" ? 36000 : 3000;

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
        <style>
          body { background-color: #002C51; color: #FFFFFF; font-family: 'Inter', sans-serif; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #01182B; padding: 20px; border-radius: 8px; }
          h1 { font-family: 'Rubik', sans-serif; font-size: 24px; color: #F11A20; text-align: center; }
          p { font-size: 16px; line-height: 1.5; }
          .label { font-weight: 500; color: #F11A20; }
          .value { margin-left: 10px; }
          .section { margin: 20px 0; }
          .footer { text-align: center; font-size: 14px; color: #E6ECEF; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Salina Youth Basketball Club - Invoice</h1>
          <div class="section">
            <p><span class="label">Invoice Number:</span> <span class="value">${joinRequest.stripe_payment_id}</span></p>
            <p><span class="label">Date:</span> <span class="value">${new Date(joinRequest.created_at).toLocaleDateString()}</span></p>
          </div>
          <div class="section">
            <p><span class="label">To:</span> <span class="value">${formData.first_name} ${formData.last_name}</span></p>
            <p><span class="label">Email:</span> <span class="value">${formData.parent_email}</span></p>
          </div>
          <div class="section">
            <p><span class="label">Registration Details:</span></p>
            <p><span class="label">Name:</span> <span class="value">${formData.first_name} ${formData.last_name}</span></p>
            <p><span class="label">Age Group:</span> <span class="value">${formData.age_group}</span></p>
            <p><span class="label">Team Gender:</span> <span class="value">${formData.team_gender}</span></p>
            <p><span class="label">Payment Option:</span> <span class="value">${
              formData.payment_option === "full"
                ? "Pay in Full ($360.00)"
                : "Monthly Installments ($30.00 x 12)"
            }</span></p>
            <p><span class="label">Amount:</span> <span class="value">$${(amount / 100).toFixed(2)}</span></p>
            <p><span class="label">Payment Status:</span> <span class="value">${
              joinRequest.payment_status.charAt(0).toUpperCase() +
              joinRequest.payment_status.slice(1)
            }</span></p>
          </div>
          <div class="footer">
            <p>Thank you for joining the Salina Youth Basketball Club! We look forward to seeing you on the court.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const userEmailResponse = await resend.emails.send({
      from: "Salina Youth Basketball Club <no-reply@yourdomain.com>",
      to: formData.parent_email,
      subject: "Your Salina Youth Basketball Club Invoice",
      html: invoiceHtml,
    });
    console.log("User email sent:", userEmailResponse);

    const adminEmailResponse = await resend.emails.send({
      from: "Salina Youth Basketball Club <no-reply@yourdomain.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New Join Request and Invoice for ${formData.first_name} ${formData.last_name}`,
      html: `
        ${invoiceHtml}
        <div class="container" style="margin-top: 20px;">
          <h1>Join Request Summary</h1>
          <p><span class="label">Name:</span> <span class="value">${formData.first_name} ${formData.last_name}</span></p>
          <p><span class="label">Parent Email:</span> <span class="value">${formData.parent_email}</span></p>
          <p><span class="label">Age Group:</span> <span class="value">${formData.age_group}</span></p>
          <p><span class="label">Team Gender:</span> <span class="value">${formData.team_gender}</span></p>
          <p><span class="label">Payment Status:</span> <span class="value">${paymentStatus}</span></p>
        </div>
      `,
    });
    console.log("Admin email sent:", adminEmailResponse);

    return res.status(200).json({ message: "Email notifications sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return res
      .status(500)
      .json({ error: "Failed to send email notifications" });
  }
}
