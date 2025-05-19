import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

// Printful API configuration
const printfulApiUrl = "https://api.printful.com/orders";

// Variant ID mapping (confirmed Printful variant_id values)
const variantIdMap: { [key: string]: number } = {
  "firebolts-style-1-S-heather-gray": 21683, // Confirmed variant_id for Firebolts1_gray (S, Graphite Heather)
  "firebolts-style-1-L-heather-gray": 21685, // Confirmed variant_id for Firebolts1_gray (L, Graphite Heather)
};

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderData {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  customerEmail: string;
  paymentIntentId?: string;
}

// State and country code mappings
const stateToCode: { [key: string]: string } = { Kansas: "KS" };
const countryToCode: { [key: string]: string } = { "United States": "US" };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items, shippingAddress, subtotal, customerEmail, paymentIntentId } =
    req.body as OrderData;
  const isTestMode =
    process.env.NODE_ENV === "development" && req.query.test === "true";
  const printfulApiKey = isTestMode
    ? process.env.PRINTFUL_TEST_API_KEY
    : process.env.PRINTFUL_API_KEY;

  if (!printfulApiKey) {
    const errorMsg = `Printful API key not configured. Ensure ${isTestMode ? "PRINTFUL_TEST_API_KEY" : "PRINTFUL_API_KEY"} is set in .env.local and Vercel environment variables.`;
    await writesToSupabaseLogs(errorMsg, isTestMode, req.body);
    return res.status(500).json({ error: errorMsg });
  }

  // Validate input
  if (!items.length || !shippingAddress || !customerEmail) {
    const errorMsg = "Missing order items, shipping address, or customer email";
    await writesToSupabaseLogs(errorMsg, isTestMode, req.body);
    return res.status(400).json({ error: errorMsg });
  }

  try {
    // Build the payload explicitly
    const payload: any = {
      source: "api",
      recipient: {
        name: shippingAddress.fullName,
        address1: shippingAddress.street,
        city: shippingAddress.city,
        state_code: stateToCode[shippingAddress.state] || shippingAddress.state,
        country_code:
          countryToCode[shippingAddress.country] || shippingAddress.country,
        zip: shippingAddress.zip,
      },
      items: items.map((item) => {
        const product = require("@/lib/shop/data").products.find(
          (p: any) => p.id === item.productId
        );
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        const printfulVariantId = variantIdMap[item.variantId];
        if (!printfulVariantId) {
          throw new Error(
            `Printful variant ID not found for: ${item.variantId}`
          );
        }
        const rawImageUrl = `https://wcs-three.vercel.app${product.colorImages[item.color] || product.fallbackImage}`;
        return {
          variant_id: printfulVariantId,
          quantity: item.quantity,
          name: `${product.teamName || "WCS"} T-Shirt - ${item.color} / ${item.size}`,
          retail_price: (
            subtotal / items.reduce((sum, i) => sum + i.quantity, 0)
          ).toFixed(2),
          files: [{ type: "default", url: rawImageUrl }],
        };
      }),
      needs_approval: isTestMode,
    };

    if (paymentIntentId) {
      payload.external_id = paymentIntentId;
    }

    // Log the payload
    console.log("Payload being sent to Printful:", JSON.stringify(payload));

    // Rate limit handling
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Send the payload as an object
    const response = await axios.post(printfulApiUrl, payload, {
      headers: {
        Authorization: `Bearer ${printfulApiKey}`,
        "Content-Type": "application/json",
      },
    });

    const printfulOrderId = response.data.result.id;

    // Store order in Supabase orders table
    const { error: orderError } = await supabase.from("orders").insert({
      printful_order_id: printfulOrderId,
      customer_email: customerEmail,
      payment_intent_id: paymentIntentId,
    });
    if (orderError) {
      console.error("Supabase order insert error:", orderError);
      await supabase.from("logs").insert({
        type: "supabase_error",
        data: { error: orderError.message, printfulOrderId, isTestMode },
      });
    }

    // Log to Supabase logs table
    const { error: logError } = await supabase.from("logs").insert({
      type: "printful_order",
      data: { printfulOrderId, isTestMode, paymentIntentId, customerEmail },
    });
    if (logError) {
      console.error("Supabase log error:", logError);
      await supabase.from("logs").insert({
        type: "supabase_error",
        data: { error: logError.message, printfulOrderId, isTestMode },
      });
    }

    // Confirm order only in non-test mode
    if (!isTestMode) {
      await axios.post(
        `https://api.printful.com/v2/orders/@confirm`,
        { id: printfulOrderId },
        { headers: { Authorization: `Bearer ${printfulApiKey}` } }
      );
    }

    return res.status(200).json({ orderId: printfulOrderId, isTestMode });
  } catch (error: any) {
    const errorDetails = {
      error: error.message,
      status: error.response?.status,
      printfulError: error.response?.data,
      isTestMode,
      requestBody: req.body,
      axiosConfig: error.config,
    };
    const { error: logError } = await supabase.from("logs").insert({
      type: "printful_error",
      data: errorDetails,
    });
    if (logError) {
      console.error("Supabase log error:", logError);
    }

    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 60;
      return res.status(429).json({ error: "Rate limit exceeded", retryAfter });
    }

    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to create Printful order",
    });
  }
}

async function writesToSupabaseLogs(
  errorMsg: string,
  isTestMode: boolean,
  requestBody: any
) {
  const { error: logError } = await supabase.from("logs").insert({
    type: "printful_error",
    data: { error: errorMsg, isTestMode, requestBody },
  });
  if (logError) {
    console.error("Supabase log error:", logError);
  }
}
