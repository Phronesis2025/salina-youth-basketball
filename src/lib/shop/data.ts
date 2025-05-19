export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colorImages: { [color: string]: string };
  fallbackImage: string;
  category: "wcs" | "boys" | "girls";
  team?: string;
  teamName?: string;
  sizes: string[];
  colors: string[];
  printfulDesignTag: string;
  popularity: number;
  variants: { variantId: string; size: string; color: string }[];
}

export const products: Product[] = [
  {
    id: "firebolts-style-1",
    name: "Firebolts T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-firebolts-style-1-merch-white.png",
    colorImages: {
      "heather gray": "/images/team-firebolts-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Firebolts",
    teamName: "Firebolts",
    sizes: ["S", "L"], // Updated YS to S based on Printful variants
    colors: ["heather gray"],
    printfulDesignTag: "firebolts-style-1",
    popularity: 7,
    variants: [
      {
        variantId: "firebolts-style-1-S-heather-gray",
        size: "S",
        color: "heather gray",
      }, // Updated YS to S
      {
        variantId: "firebolts-style-1-L-heather-gray",
        size: "L",
        color: "heather gray",
      },
    ],
  },
];

// Note: Updated to use size S instead of YS for Graphite Heather (heather gray) to match available variants in Printful store.
// Other products (e.g., thunderhawks-style-1) can be added later.
// Map variantId to Printful variant_id in /pages/api/create-printful-order.ts.
