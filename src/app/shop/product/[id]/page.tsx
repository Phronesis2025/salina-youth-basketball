"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
import { products, Product } from "@/lib/shop/data";

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-white text-center py-16">Product not found</div>
    );
  }

  // Initialize cartItems synchronously from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("ProductPage: Loaded cart from localStorage:", storedCart);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error(
        "ProductPage: Failed to parse cart from localStorage:",
        error
      );
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("ProductPage: Saved cart to localStorage:", cartItems);
    } catch (error) {
      console.error("ProductPage: Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  // State for selections
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]); // Default: first size
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default: white
  const [quantity, setQuantity] = useState(1);

  // Check if the selected variant is in the cart
  const variantId = `${product.id}-${selectedSize}-${selectedColor.replace(" ", "-")}`;
  const isInCart = cartItems.some((item) => item.variantId === variantId);

  // Add to cart
  const addToCart = () => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.variantId === variantId);
      const updatedItems = existingItem
        ? prev.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [
            ...prev,
            {
              productId: product.id,
              variantId,
              size: selectedSize,
              color: selectedColor,
              quantity,
            },
          ];
      try {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        console.log("ProductPage: Saved cart after addToCart:", updatedItems);
      } catch (error) {
        console.error(
          "ProductPage: Failed to save cart to localStorage:",
          error
        );
      }
      return updatedItems;
    });
  };

  // Remove from cart
  const removeFromCart = () => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.variantId !== variantId);
      try {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        console.log(
          "ProductPage: Saved cart after removeFromCart:",
          updatedItems
        );
      } catch (error) {
        console.error(
          "ProductPage: Failed to save cart to localStorage:",
          error
        );
      }
      return updatedItems;
    });
  };

  // Calculate total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#002C51] text-white">
      <Navbar cartItemCount={cartItemCount} />

      {/* Product Section */}
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src={product.colorImages[selectedColor] || product.image}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = product.fallbackImage;
                }}
              />
            </div>

            {/* Product Details */}
            <Card className="bg-gray-900 border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-rubik uppercase text-white">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-2xl font-inter text-gray-300">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-300 font-inter">
                  Show your team spirit with this high-quality t-shirt!
                </p>

                {/* Size Selector */}
                <div>
                  <label className="block text-sm font-inter text-gray-300 mb-2">
                    Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger
                      className={cn(
                        "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                        "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                      )}
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#002C51] text-white border-gray-600 rounded-md">
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-sm font-inter text-gray-300 mb-2">
                    Color
                  </label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-blue-600 text-white font-medium font-inter rounded-md text-base uppercase h-10 w-full",
                        "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                      )}
                    >
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#002C51] text-white border-gray-600 rounded-md">
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-inter text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-20 bg-gray-900 text-white border border-gray-700 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      variant="outline"
                      className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Cart Actions */}
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
                      onClick={addToCart}
                      disabled={quantity < 1}
                    >
                      Add to Cart
                    </Button>
                    {isInCart && (
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-inter uppercase"
                        onClick={removeFromCart}
                      >
                        Remove from Cart
                      </Button>
                    )}
                  </div>
                  <Link href="/shop/cart">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Category */}
          <div className="mt-8 text-center">
            <Link href={`/shop/${product.category}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                Back to{" "}
                {product.category === "wcs"
                  ? "WCS"
                  : product.category === "boys"
                    ? "Boys Teams"
                    : "Girls Teams"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
