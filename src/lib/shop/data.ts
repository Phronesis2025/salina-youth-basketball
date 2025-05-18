export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // White shirt image for gallery
  colorImages: { [color: string]: string }; // Simulated color-specific images
  fallbackImage: string; // Fallback if image is missing
  category: "wcs" | "boys" | "girls";
  team?: string; // Optional, null for WCS
  sizes: string[];
  colors: string[];
  printfulDesignTag: string;
  popularity: number;
  variants: { variantId: string; size: string; color: string }[];
}

export const products: Product[] = [
  {
    id: "wcs-tshirt1",
    name: "Salina Youth Basketball Club T-Shirt",
    price: 25.0,
    image: "/images/wcs-tshirt1-merch.png",
    colorImages: {
      white: "/images/wcs-tshirt1-merch-white.png",
      black: "/images/wcs-tshirt1-merch-black.png",
      navy: "/images/wcs-tshirt1-merch-navy.png",
      red: "/images/wcs-tshirt1-merch-red.png",
      "heather gray": "/images/wcs-tshirt1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "wcs",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "wcs-tshirt1",
    popularity: 10,
    variants: [
      { variantId: "wcs-tshirt1-ys-white", size: "YS", color: "white" },
      { variantId: "wcs-tshirt1-ys-black", size: "YS", color: "black" },
      { variantId: "wcs-tshirt1-ys-navy", size: "YS", color: "navy" },
      { variantId: "wcs-tshirt1-ys-red", size: "YS", color: "red" },
      {
        variantId: "wcs-tshirt1-ys-heather-gray",
        size: "YS",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-ym-white", size: "YM", color: "white" },
      { variantId: "wcs-tshirt1-ym-black", size: "YM", color: "black" },
      { variantId: "wcs-tshirt1-ym-navy", size: "YM", color: "navy" },
      { variantId: "wcs-tshirt1-ym-red", size: "YM", color: "red" },
      {
        variantId: "wcs-tshirt1-ym-heather-gray",
        size: "YM",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-yl-white", size: "YL", color: "white" },
      { variantId: "wcs-tshirt1-yl-black", size: "YL", color: "black" },
      { variantId: "wcs-tshirt1-yl-navy", size: "YL", color: "navy" },
      { variantId: "wcs-tshirt1-yl-red", size: "YL", color: "red" },
      {
        variantId: "wcs-tshirt1-yl-heather-gray",
        size: "YL",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-yxl-white", size: "YXL", color: "white" },
      { variantId: "wcs-tshirt1-yxl-black", size: "YXL", color: "black" },
      { variantId: "wcs-tshirt1-yxl-navy", size: "YXL", color: "navy" },
      { variantId: "wcs-tshirt1-yxl-red", size: "YXL", color: "red" },
      {
        variantId: "wcs-tshirt1-yxl-heather-gray",
        size: "YXL",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-s-white", size: "S", color: "white" },
      { variantId: "wcs-tshirt1-s-black", size: "S", color: "black" },
      { variantId: "wcs-tshirt1-s-navy", size: "S", color: "navy" },
      { variantId: "wcs-tshirt1-s-red", size: "S", color: "red" },
      {
        variantId: "wcs-tshirt1-s-heather-gray",
        size: "S",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-m-white", size: "M", color: "white" },
      { variantId: "wcs-tshirt1-m-black", size: "M", color: "black" },
      { variantId: "wcs-tshirt1-m-navy", size: "M", color: "navy" },
      { variantId: "wcs-tshirt1-m-red", size: "M", color: "red" },
      {
        variantId: "wcs-tshirt1-m-heather-gray",
        size: "M",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-l-white", size: "L", color: "white" },
      { variantId: "wcs-tshirt1-l-black", size: "L", color: "black" },
      { variantId: "wcs-tshirt1-l-navy", size: "L", color: "navy" },
      { variantId: "wcs-tshirt1-l-red", size: "L", color: "red" },
      {
        variantId: "wcs-tshirt1-l-heather-gray",
        size: "L",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-xl-white", size: "XL", color: "white" },
      { variantId: "wcs-tshirt1-xl-black", size: "XL", color: "black" },
      { variantId: "wcs-tshirt1-xl-navy", size: "XL", color: "navy" },
      { variantId: "wcs-tshirt1-xl-red", size: "XL", color: "red" },
      {
        variantId: "wcs-tshirt1-xl-heather-gray",
        size: "XL",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-2xl-white", size: "2XL", color: "white" },
      { variantId: "wcs-tshirt1-2xl-black", size: "2XL", color: "black" },
      { variantId: "wcs-tshirt1-2xl-navy", size: "2XL", color: "navy" },
      { variantId: "wcs-tshirt1-2xl-red", size: "2XL", color: "red" },
      {
        variantId: "wcs-tshirt1-2xl-heather-gray",
        size: "2XL",
        color: "heather gray",
      },
      { variantId: "wcs-tshirt1-3xl-white", size: "3XL", color: "white" },
      { variantId: "wcs-tshirt1-3xl-black", size: "3XL", color: "black" },
      { variantId: "wcs-tshirt1-3xl-navy", size: "3XL", color: "navy" },
      { variantId: "wcs-tshirt1-3xl-red", size: "3XL", color: "red" },
      {
        variantId: "wcs-tshirt1-3xl-heather-gray",
        size: "3XL",
        color: "heather gray",
      },
    ],
  },
  {
    id: "thunderhawks-style-1",
    name: "Thunderhawks T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-thunderhawks-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-thunderhawks-style-1-merch-white.png",
      black: "/images/team-thunderhawks-style-1-merch-black.png",
      navy: "/images/team-thunderhawks-style-1-merch-navy.png",
      red: "/images/team-thunderhawks-style-1-merch-red.png",
      "heather gray":
        "/images/team-thunderhawks-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Thunderhawks",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "thunderhawks-style-1",
    popularity: 9,
    variants: [
      // Same pattern as WCS: 10 sizes × 5 colors = 50 variants
      // Example: { variantId: 'thunderhawks-style-1-ys-white', size: 'YS', color: 'white' },
      // ... (omitted for brevity, follows WCS structure)
    ],
  },
  {
    id: "thunderhawks-style-2",
    name: "Thunderhawks T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-thunderhawks-style-2-merch.png",
    colorImages: {
      white: "/images/team-thunderhawks-style-2-merch-white.png",
      black: "/images/team-thunderhawks-style-2-merch-black.png",
      navy: "/images/team-thunderhawks-style-2-merch-navy.png",
      red: "/images/team-thunderhawks-style-2-merch-red.png",
      "heather gray":
        "/images/team-thunderhawks-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Thunderhawks",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "thunderhawks-style-2",
    popularity: 8,
    variants: [
      // Same pattern: 50 variants
    ],
  },
  {
    id: "firebolts-style-1",
    name: "Firebolts T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-firebolts-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-firebolts-style-1-merch-white.png",
      black: "/images/team-firebolts-style-1-merch-black.png",
      navy: "/images/team-firebolts-style-1-merch-navy.png",
      red: "/images/team-firebolts-style-1-merch-red.png",
      "heather gray": "/images/team-firebolts-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Firebolts",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "firebolts-style-1",
    popularity: 7,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "firebolts-style-2",
    name: "Firebolts T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-firebolts-style-2-merch.png",
    colorImages: {
      white: "/images/team-firebolts-style-2-merch-white.png",
      black: "/images/team-firebolts-style-2-merch-black.png",
      navy: "/images/team-firebolts-style-2-merch-navy.png",
      red: "/images/team-firebolts-style-2-merch-red.png",
      "heather gray": "/images/team-firebolts-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Firebolts",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "firebolts-style-2",
    popularity: 6,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "stingers-style-1",
    name: "Stingers T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-stingers-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-stingers-style-1-merch-white.png",
      black: "/images/team-stingers-style-1-merch-black.png",
      navy: "/images/team-stingers-style-1-merch-navy.png",
      red: "/images/team-stingers-style-1-merch-red.png",
      "heather gray": "/images/team-stingers-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Stingers",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "stingers-style-1",
    popularity: 5,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "stingers-style-2",
    name: "Stingers T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-stingers-style-2-merch.png",
    colorImages: {
      white: "/images/team-stingers-style-2-merch-white.png",
      black: "/images/team-stingers-style-2-merch-black.png",
      navy: "/images/team-stingers-style-2-merch-navy.png",
      red: "/images/team-stingers-style-2-merch-red.png",
      "heather gray": "/images/team-stingers-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Stingers",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "stingers-style-2",
    popularity: 4,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "lightning-style-1",
    name: "Lightning T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-lightning-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-lightning-style-1-merch-white.png",
      black: "/images/team-lightning-style-1-merch-black.png",
      navy: "/images/team-lightning-style-1-merch-navy.png",
      red: "/images/team-lightning-style-1-merch-red.png",
      "heather gray": "/images/team-lightning-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Lightning",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "lightning-style-1",
    popularity: 3,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "lightning-style-2",
    name: "Lightning T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-lightning-style-2-merch.png",
    colorImages: {
      white: "/images/team-lightning-style-2-merch-white.png",
      black: "/images/team-lightning-style-2-merch-black.png",
      navy: "/images/team-lightning-style-2-merch-navy.png",
      red: "/images/team-lightning-style-2-merch-red.png",
      "heather gray": "/images/team-lightning-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "boys",
    team: "Lightning",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "lightning-style-2",
    popularity: 2,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "raptors-style-1",
    name: "Raptors T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-raptors-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-raptors-style-1-merch-white.png",
      black: "/images/team-raptors-style-1-merch-black.png",
      navy: "/images/team-raptors-style-1-merch-navy.png",
      red: "/images/team-raptors-style-1-merch-red.png",
      "heather gray": "/images/team-raptors-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "girls",
    team: "Raptors",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "raptors-style-1",
    popularity: 3,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "raptors-style-2",
    name: "Raptors T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-raptors-style-2-merch.png",
    colorImages: {
      white: "/images/team-raptors-style-2-merch-white.png",
      black: "/images/team-raptors-style-2-merch-black.png",
      navy: "/images/team-raptors-style-2-merch-navy.png",
      red: "/images/team-raptors-style-2-merch-red.png",
      "heather gray": "/images/team-raptors-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "girls",
    team: "Raptors",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "raptors-style-2",
    popularity: 2,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "vipers-style-1",
    name: "Vipers T-Shirt Style 1",
    price: 25.0,
    image: "/images/team-vipers-style-1-merch-white.png",
    colorImages: {
      white: "/images/team-vipers-style-1-merch-white.png",
      black: "/images/team-vipers-style-1-merch-black.png",
      navy: "/images/team-vipers-style-1-merch-navy.png",
      red: "/images/team-vipers-style-1-merch-red.png",
      "heather gray": "/images/team-vipers-style-1-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "girls",
    team: "Vipers",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "vipers-style-1",
    popularity: 3,
    variants: [
      // 50 variants
    ],
  },
  {
    id: "vipers-style-2",
    name: "Vipers T-Shirt Style 2",
    price: 25.0,
    image: "/images/team-vipers-style-2-merch.png",
    colorImages: {
      white: "/images/team-vipers-style-2-merch-white.png",
      black: "/images/team-vipers-style-2-merch-black.png",
      navy: "/images/team-vipers-style-2-merch-navy.png",
      red: "/images/team-vipers-style-2-merch-red.png",
      "heather gray": "/images/team-vipers-style-2-merch-heather-gray.png",
    },
    fallbackImage: "/images/wcs-tshirt1-merch.png",
    category: "girls",
    team: "Vipers",
    sizes: ["YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["white", "black", "navy", "red", "heather gray"],
    printfulDesignTag: "vipers-style-2",
    popularity: 1,
    variants: [
      // 50 variants
    ],
  },
];

// Note: Each product (except WCS) has 50 variants (10 sizes × 5 colors), following the WCS pattern.
// Omitted for brevity to avoid repetitive code. Variants are generated as:
// variantId: `${id}-${size}-${color.replace(' ', '-')}`, e.g., 'thunderhawks-style-1-ys-white'
