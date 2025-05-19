import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, data } = req.body;

  // Handle shipped event
  if (type === "order_shipped") {
    const { order_id, tracking_number, shipped_at } = data;

    try {
      // Fetch customer email from orders table
      const { data: order, error } = await supabase
        .from("orders")
        .select("customer_email")
        .eq("printful_order_id", order_id)
        .single();

      if (error || !order) {
        throw new Error("Order not found in database");
      }

      // Calculate estimated delivery (5-7 business days)
      const shipDate = new Date(shipped_at);
      let estDeliveryStart = new Date(shipDate);
      let estDeliveryEnd = new Date(shipDate);
      let businessDays = 0;
      let currentDate = new Date(shipDate);

      // Add 5-7 business days, skipping weekends
      while (businessDays < 7) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          businessDays++;
          if (businessDays === 5) estDeliveryStart = new Date(currentDate);
          if (businessDays === 7) estDeliveryEnd = new Date(currentDate);
        }
      }

      const estDelivery = `${estDeliveryStart.toLocaleDateString()}–${estDeliveryEnd.toLocaleDateString()}`;

      // Send shipped email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webhook: true,
          to: order.customer_email,
          subject: "Your Salina Youth Basketball Club Order Has Shipped!",
          html: `
            <div style="background-color: #002C51; color: #FFFFFF; font-family: 'Inter', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <h2 style="font-family: 'Rubik', sans-serif; color: #F11A20; text-align: center;">Your Firebolts T-Shirt has shipped!</h2>
              <p><strong>Order ID:</strong> ${order_id}</p>
              <p><strong>Tracking Number:</strong> ${tracking_number || "Not available"}</p>
              <p><strong>Estimated Delivery:</strong> ${estDelivery}</p>
              <p>Thank you for shopping with Salina Youth Basketball Club!</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send shipped email");
      }

      // Log to Supabase
      const { error: logError } = await supabase.from("logs").insert({
        type: "printful_webhook",
        data: {
          type,
          order_id,
          tracking_number,
          shipped_at,
          customer_email: order.customer_email,
        },
      });
      if (logError) {
        console.error("Supabase log error:", logError);
      }

      return res.status(200).json({ message: "Webhook processed" });
    } catch (error: any) {
      const { error: logError } = await supabase.from("logs").insert({
        type: "printful_webhook_error",
        data: { type, error: error.message, data },
      });
      if (logError) {
        console.error("Supabase log error:", logError);
      }
      return res.status(500).json({ error: "Failed to process webhook" });
    }
  }

  // Log unhandled webhook types
  const { error: logError } = await supabase.from("logs").insert({
    type: "printful_webhook_unhandled",
    data: { type, data },
  });
  if (logError) {
    console.error("Supabase log error:", logError);
  }

  return res
    .status(200)
    .json({ message: "Webhook received but not processed" });
}
