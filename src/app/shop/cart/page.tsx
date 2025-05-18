"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/lib/shop/data";

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

export default function CartPage() {
  // Initialize cartItems from localStorage synchronously
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("CartPage: Loaded cart from localStorage:", storedCart);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("CartPage: Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // Update quantity
  const updateQuantity = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.variantId === variantId ? { ...item, quantity: newQuantity } : item
      );
      try {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        console.log(
          "CartPage: Saved cart to localStorage after updateQuantity:",
          updatedItems
        );
      } catch (error) {
        console.error("CartPage: Failed to save cart to localStorage:", error);
      }
      return updatedItems;
    });
  };

  // Remove item
  const removeItem = (variantId: string) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.variantId !== variantId);
      try {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        console.log(
          "CartPage: Saved cart to localStorage after removeItem:",
          updatedItems
        );
      } catch (error) {
        console.error("CartPage: Failed to save cart to localStorage:", error);
      }
      return updatedItems;
    });
  };

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#002C51] text-white">
      <Navbar cartItemCount={cartItemCount} />

      {/* Cart Section */}
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <h1 className="text-3xl font-rubik uppercase text-white text-center mb-8">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-300 font-inter mb-4">
                Your cart is empty.
              </p>
              <Link href="/shop">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <Card
                      key={item.variantId}
                      className="bg-gray-900 border-none shadow-lg"
                    >
                      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                        {/* Image */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                product.fallbackImage;
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl font-rubik uppercase text-white">
                            {product.name}
                          </h3>
                          <p className="text-gray-300 font-inter">
                            Size: {item.size}
                          </p>
                          <p className="text-gray-300 font-inter">
                            Color:{" "}
                            {item.color.charAt(0).toUpperCase() +
                              item.color.slice(1)}
                          </p>
                          <p className="text-gray-300 font-inter">
                            Price: ${product.price.toFixed(2)}
                          </p>
                          <p className="text-gray-300 font-inter">
                            Total: ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.variantId,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-16 bg-gray-900 text-white border border-gray-700 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <Button
                            variant="outline"
                            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>

                        {/* Remove */}
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white font-inter uppercase"
                          onClick={() => removeItem(item.variantId)}
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="mt-8 text-center">
                <p className="text-2xl font-inter text-white mb-4">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <Link href="/shop/checkout">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* Back to Shop */}
          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
