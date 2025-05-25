"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Initialize cart count from localStorage or other storage
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCartItemCount(count);
      } catch (error) {
        console.error("Error reading cart from localStorage:", error);
      }
    };

    updateCartCount();

    // Listen for cart updates
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main id="main-content" className="flex flex-col min-h-screen">
        {children}
      </main>
    </>
  );
}
