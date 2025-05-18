"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { products, Product } from "@/lib/shop/data";

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const validCategories = ["wcs", "boys", "girls"];
  if (!validCategories.includes(category)) {
    return <div className="text-white text-center py-16">Invalid category</div>;
  }

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart client-side
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("CategoryPage: Loaded cart from localStorage:", storedCart);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(
        "CategoryPage: Failed to parse cart from localStorage:",
        error
      );
    }
  }, []);

  // Filter state
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "popularity"
  >("popularity");

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return b.popularity - a.popularity; // Default: popularity (descending)
  });

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#002C51] text-white">
      <Navbar cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src="/images/basketball-court.jpg"
          alt="Basketball Court Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-rubik font-bold uppercase tracking-tight">
            Gear Up with Team Merch!
          </h1>
          <p className="mt-4 text-lg font-inter text-gray-300">
            Explore{" "}
            {category === "wcs"
              ? "WCS"
              : category === "boys"
                ? "Boys Teams"
                : "Girls Teams"}{" "}
            merchandise.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-inter font-semibold uppercase">
              {category === "wcs"
                ? "WCS Merch"
                : category === "boys"
                  ? "Boys Teams"
                  : "Girls Teams"}
            </h2>
            <Select
              onValueChange={(value) =>
                setSortBy(value as "price-asc" | "price-desc" | "popularity")
              }
              defaultValue="popularity"
            >
              <SelectTrigger className="w-[180px] bg-gray-900 text-white border-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white border-none">
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Shop */}
      <section className="py-8 text-center">
        <Link href="/shop">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
            Back to Shop
          </Button>
        </Link>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Dialog>
      <Card className="bg-gray-900 border-none shadow-lg">
        <CardHeader className="p-0">
          <DialogTrigger asChild>
            <div className="relative h-64 cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = product.fallbackImage;
                }}
              />
            </div>
          </DialogTrigger>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-rubik uppercase text-white mb-2">
            {product.name}
          </CardTitle>
          <p className="text-gray-300 font-inter mb-4">
            ${product.price.toFixed(2)}
          </p>
          <Link href={`/shop/product/${product.id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
              Shop Now
            </Button>
          </Link>
        </CardContent>
      </Card>
      <DialogContent className="bg-gray-900/90 border-none p-6 max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] z-50">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-full max-h-[80vh]">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto max-h-[80vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = product.fallbackImage;
            }}
          />
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
