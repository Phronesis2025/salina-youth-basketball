import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const printfulApiKey = process.env.PRINTFUL_API_KEY;
const printfulApiUrl = "https://api.printful.com/orders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items, shippingAddress } = req.body;

  try {
    const response = await axios.post(
      printfulApiUrl,
      {
        recipient: {
          name: shippingAddress.name,
          address1: shippingAddress.address1,
          city: shippingAddress.city,
          state_code: shippingAddress.state,
          country_code: "US",
          zip: shippingAddress.zip,
        },
        items: items.map((item: any) => ({
          variant_id: item.printfulVariantId, // From /src/lib/shop/data.ts
          quantity: item.quantity,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${printfulApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.status(200).json({ orderId: response.data.result.id });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
