"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart client-side
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("ShopPage: Loaded cart from localStorage:", storedCart);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("ShopPage: Failed to parse cart from localStorage:", error);
    }
  }, []);

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#002C51] text-white">
      <Navbar cartItemCount={cartItemCount} />
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
            Shop Team Merch
          </h1>
          <p className="mt-4 text-lg font-inter text-gray-300">
            Support our teams with exclusive gear!
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <h2 className="text-3xl font-inter font-semibold uppercase text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-none shadow-lg">
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/images/wcs-tshirt1-merch.png"
                    alt="WCS Merch"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <CardTitle className="text-xl font-rubik uppercase text-white mb-2">
                  WCS Merch
                </CardTitle>
                <Link href="/shop/wcs">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-none shadow-lg">
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/images/team-thunderhawks-style-1-merch-white.png"
                    alt="Boys Teams Merch"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <CardTitle className="text-xl font-rubik uppercase text-white mb-2">
                  Boys Teams
                </CardTitle>
                <Link href="/shop/boys">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-none shadow-lg">
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/images/team-raptors-style-1-merch-white.png"
                    alt="Girls Teams Merch"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <CardTitle className="text-xl font-rubik uppercase text-white mb-2">
                  Girls Teams
                </CardTitle>
                <Link href="/shop/girls">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-8 text-center">
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
            Back to Homepage
          </Button>
        </Link>
      </section>
    </div>
  );
}
