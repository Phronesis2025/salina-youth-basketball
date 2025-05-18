"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  total: number;
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
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load order data from query params
  useEffect(() => {
    try {
      const order = searchParams?.get("order");
      if (order) {
        const parsedOrder = JSON.parse(decodeURIComponent(order));
        setOrderData(parsedOrder);
        console.log("ConfirmationPage: Loaded order data:", parsedOrder);
      }
    } catch (error) {
      console.error("ConfirmationPage: Failed to parse order data:", error);
    }
  }, [searchParams]);

  // Load cart client-side (for Navbar count)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log(
        "ConfirmationPage: Loaded cart from localStorage:",
        storedCart
      );
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(
        "ConfirmationPage: Failed to parse cart from localStorage:",
        error
      );
    }
  }, []);

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#002C51] text-white">
        <Navbar cartItemCount={cartItemCount} />
        <section className="py-16">
          <div className="container max-w-[75rem] mx-auto px-4 text-center">
            <h1 className="text-3xl font-rubik uppercase text-white mb-4">
              Order Confirmation Error
            </h1>
            <p className="text-gray-300 font-inter mb-4">
              Unable to load order details. Please contact support.
            </p>
            <Link href="/shop">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                Return to Shop
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002C51] text-white">
      <Navbar cartItemCount={cartItemCount} />
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <h1 className="text-3xl font-rubik uppercase text-white text-center mb-8">
            Thank You for Your Order!
          </h1>
          <Card className="bg-gray-900 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-rubik uppercase text-white">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items.map((item, index) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}-${index}`}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <p className="text-white font-inter">{item.name}</p>
                    <p className="text-gray-300 font-inter text-sm">
                      Size: {item.size}, Color:{" "}
                      {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                    </p>
                    <p className="text-gray-300 font-inter text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-300 font-inter text-sm">
                      Total: ${item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-300 font-inter">
                  Subtotal: ${orderData.subtotal.toFixed(2)}
                </p>
                <p className="text-gray-300 font-inter">
                  Shipping:{" "}
                  {orderData.shippingCost === 0
                    ? "Free"
                    : `$${orderData.shippingCost.toFixed(2)}`}
                </p>
                <p className="text-white font-inter text-lg font-semibold">
                  Total: ${orderData.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-white font-inter font-semibold">
                  Shipping Address
                </p>
                <p className="text-gray-300 font-inter">
                  {orderData.shippingAddress.fullName}
                  <br />
                  {orderData.shippingAddress.street}
                  <br />
                  {orderData.shippingAddress.city},{" "}
                  {orderData.shippingAddress.state}{" "}
                  {orderData.shippingAddress.zip}
                  <br />
                  {orderData.shippingAddress.country}
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
