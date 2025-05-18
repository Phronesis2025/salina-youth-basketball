"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize cartItems for cartItemCount
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart client-side
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("ClientLayout: Loaded cart from localStorage:", storedCart);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(
        "ClientLayout: Failed to parse cart from localStorage:",
        error
      );
    }
  }, []);

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
