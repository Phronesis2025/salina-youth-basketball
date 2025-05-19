"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { products, Product } from "@/lib/shop/data";

// Initialize Stripe with your publishable key
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
}

interface FormData {
  email: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Mock data for test mode
const mockCartItems: CartItem[] = [
  {
    productId: "firebolts-style-1",
    variantId: "firebolts-style-1-S-heather-gray",
    size: "S",
    color: "heather gray",
    quantity: 2,
  },
];

const mockFormData: FormData = {
  email: "test@example.com",
  fullName: "John Doe",
  phone: "123-456-7890",
  street: "123 Main St",
  city: "Salina",
  state: "Kansas",
  zip: "67401",
  country: "United States",
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Allow test mode in both development and production when ?test=true is present
  const isTestMode = searchParams?.get("test") === "true";
  const [cartItems, setCartItems] = useState<CartItem[]>(
    isTestMode ? mockCartItems : []
  );
  const [formData, setFormData] = useState<FormData>(
    isTestMode
      ? mockFormData
      : {
          email: "",
          fullName: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        }
  );
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [printfulSuccess, setPrintfulSuccess] = useState<string | null>(null);
  const [printfulError, setPrintfulError] = useState<string | null>(null);

  // Load cart items from localStorage on client side
  useEffect(() => {
    if (isTestMode) {
      setCartItems(mockCartItems);
      return;
    }
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("CheckoutPage: Loaded cart from localStorage:", storedCart);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(
        "CheckoutPage: Failed to parse cart from localStorage:",
        error
      );
      setCartItems([]);
    }
  }, [isTestMode]);

  // Log Stripe initialization
  useEffect(() => {
    console.log("CheckoutPage: Stripe key:", stripeKey ? "Present" : "Missing");
    console.log("CheckoutPage: Stripe promise initialized:", !!stripePromise);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const totalPrice = subtotal + shippingCost;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check for missing Stripe key
  if (!stripeKey || !stripePromise) {
    return (
      <div className="min-h-screen bg-navy text-white">
        <Navbar cartItemCount={cartItemCount} />
        <section className="py-16">
          <div className="container max-w-[75rem] mx-auto px-4 text-center">
            <h1 className="text-3xl font-rubik uppercase text-white mb-4">
              Checkout Error
            </h1>
            <p className="text-gray-300 font-inter mb-4">
              Payment system is unavailable. Please contact support or try again
              later.
            </p>
            <Link href="/shop">
              <Button
                className="bg-blue-600 hover:bg-blue-7
00 text-white font-inter uppercase"
              >
                Return to Shop
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        cartItems={cartItems}
        setCartItems={setCartItems}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        paymentError={paymentError}
        setPaymentError={setPaymentError}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        subtotal={subtotal}
        shippingCost={shippingCost}
        totalPrice={totalPrice}
        cartItemCount={cartItemCount}
        isTestMode={isTestMode}
        printfulSuccess={printfulSuccess}
        setPrintfulSuccess={setPrintfulSuccess}
        printfulError={printfulError}
        setPrintfulError={setPrintfulError}
      />
    </Elements>
  );
}

function CheckoutForm({
  cartItems,
  setCartItems,
  formData,
  setFormData,
  errors,
  setErrors,
  paymentError,
  setPaymentError,
  isProcessing,
  setIsProcessing,
  subtotal,
  shippingCost,
  totalPrice,
  cartItemCount,
  isTestMode,
  printfulSuccess,
  setPrintfulSuccess,
  printfulError,
  setPrintfulError,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<FormData>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  paymentError: string | null;
  setPaymentError: React.Dispatch<React.SetStateAction<string | null>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  cartItemCount: number;
  isTestMode: boolean;
  printfulSuccess: string | null;
  setPrintfulSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  printfulError: string | null;
  setPrintfulError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  // Form validation
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "ZIP code is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !validateForm()) return;

    setIsProcessing(true);
    setPaymentError(null);
    setPrintfulSuccess(null);
    setPrintfulError(null);

    try {
      // Create payment intent
      const response = await fetch("/api/stripe-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100 }), // Stripe expects cents
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await response.json();

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
        shipping: {
          name: formData.fullName,
          address: {
            line1: formData.street,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zip,
            country: formData.country,
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      // Submit order to Printful
      const printfulResponse = await fetch(
        `/api/create-printful-order${isTestMode ? "?test=true" : ""}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            shippingAddress: {
              fullName: formData.fullName,
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
            subtotal,
            customerEmail: formData.email,
            paymentIntentId: paymentResult.paymentIntent?.id,
          }),
        }
      );

      if (!printfulResponse.ok) {
        const errorData = await printfulResponse.json();
        throw new Error(
          errorData.error || "Failed to submit order to Printful"
        );
      }

      const printfulData = await printfulResponse.json();

      // Send confirmation email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject: "Order Confirmation - Salina Youth Basketball Club",
          html: `
            <div style="background-color: #002C51; color: #FFFFFF; font-family: 'Inter', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <h2 style="font-family: 'Rubik', sans-serif; color: #F11A20; text-align: center;">Thank You for Your Order!</h2>
              <p><strong>Order ID:</strong> ${printfulData.orderId}</p>
              <p><strong>Order Summary:</strong></p>
              <ul>
                ${cartItems
                  .map((item) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    return product
                      ? `<li>${product.name} (${item.size}, ${item.color}) x${item.quantity} - $${(
                          product.price * item.quantity
                        ).toFixed(2)}</li>`
                      : "";
                  })
                  .join("")}
              </ul>
              <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
              <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
              <p><strong>Total:</strong> $${totalPrice.toFixed(2)}</p>
              <p><strong>Shipping Address:</strong></p>
              <p>${formData.fullName}<br>${formData.street}<br>${formData.city}, ${formData.state} ${
                formData.zip
              }<br>${formData.country}</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send confirmation email");
      }

      // Clear cart
      setCartItems([]);
      localStorage.setItem("cart", "[]");
      console.log("CheckoutPage: Cleared cart after successful payment");

      // Set success message
      setPrintfulSuccess(
        isTestMode
          ? `Test order created successfully (Printful Order ID: ${printfulData.orderId})`
          : "Order placed successfully!"
      );

      // Redirect to confirmation page
      const orderData = {
        items: cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            productId: item.productId,
            variantId: item.variantId,
            name: product?.name || "Unknown",
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: product?.price || 0,
            total: product ? product.price * item.quantity : 0,
          };
        }),
        subtotal,
        shippingCost,
        totalPrice,
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        printfulOrderId: printfulData.orderId,
      };

      router.push(
        `/shop/confirmation?order=${encodeURIComponent(JSON.stringify(orderData))}`
      );
    } catch (error: any) {
      if (error.message.includes("Printful")) {
        setPrintfulError(error.message);
      } else {
        setPaymentError(error.message || "Checkout failed. Please try again.");
      }
      console.error("CheckoutPage: Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <Navbar cartItemCount={cartItemCount} />

      {/* Printful Failure Modal */}
      <Dialog
        open={!!printfulError}
        onOpenChange={() => setPrintfulError(null)}
      >
        <DialogContent className="bg-navy text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="font-rubik text-white">
              Order Submission Failed
            </DialogTitle>
            <DialogDescription className="font-inter text-gray-300">
              Contact support at phronesis700@gmail.com
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
              onClick={() => setPrintfulError(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Section */}
      <section className="py-16">
        <div className="container max-w-[75rem] mx-auto px-4">
          <h1 className="text-3xl font-rubik uppercase text-white text-center mb-8">
            Checkout
          </h1>

          {isTestMode && (
            <Card className="bg-navy border-none shadow-lg mb-8">
              <CardContent className="pt-6">
                <p className="text-yellow-400 font-inter">
                  Test Mode: Using mock data for Printful testing. Use Stripe
                  test card (e.g., 4242 4242 4242 4242). No real orders will be
                  placed.
                </p>
              </CardContent>
            </Card>
          )}

          {paymentError && (
            <Card className="bg-navy border-l-4 border-red mb-8">
              <CardContent className="pt-6">
                <p className="text-red font-inter">{paymentError}</p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
                  onClick={() => setPaymentError(null)}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {printfulSuccess && (
            <Card className="bg-navy border-l-4 border-green-600 mb-8">
              <CardContent className="pt-6">
                <p className="text-green-600 font-inter">{printfulSuccess}</p>
                {isTestMode && (
                  <Button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
                    onClick={() => setPrintfulSuccess(null)}
                  >
                    Reset
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <Card className="bg-navy border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-rubik uppercase text-white">
                    Shipping & Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.email && (
                        <p className="text-red text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.fullName && (
                        <p className="text-red text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.phone && (
                        <p className="text-red text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    {/* Street Address */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.street && (
                        <p className="text-red text-sm mt-1">{errors.street}</p>
                      )}
                    </div>
                    {/* City */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.city && (
                        <p className="text-red text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    {/* State */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.state && (
                        <p className="text-red text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    {/* ZIP Code */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.zip && (
                        <p className="text-red text-sm mt-1">{errors.zip}</p>
                      )}
                    </div>
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-red focus:border-red"
                        required
                      />
                      {errors.country && (
                        <p className="text-red text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                    {/* Payment */}
                    <div>
                      <label className="block text-sm font-inter text-gray-300 mb-2">
                        Card Information *
                      </label>
                      <CardElement
                        className="w-full bg-navy text-white border border-gray-700 rounded-md px-3 py-4 focus:ring-2 focus:ring-red"
                        options={{
                          style: {
                            base: {
                              color: "#FFFFFF",
                              backgroundColor: "#002C51",
                              "::placeholder": { color: "#D1D5DB" },
                            },
                            invalid: { color: "#F11A20" },
                          },
                        }}
                      />
                      {paymentError && (
                        <p className="text-red text-sm mt-1">{paymentError}</p>
                      )}
                    </div>
                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase"
                      disabled={isProcessing || !stripe || !elements}
                    >
                      {isProcessing
                        ? "Processing..."
                        : isTestMode
                          ? "Test Order"
                          : "Place Order"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-navy border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-rubik uppercase text-white">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    if (!product) return null;
                    return (
                      <div
                        key={item.variantId}
                        className="flex items-center gap-4"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
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
                        <div className="flex-1">
                          <p className="text-white font-inter">
                            {product.name}
                          </p>
                          <p className="text-gray-300 font-inter text-sm">
                            Size: {item.size}, Color:{" "}
                            {item.color.charAt(0).toUpperCase() +
                              item.color.slice(1)}
                          </p>
                          <p className="text-gray-300 font-inter text-sm">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-gray-300 font-inter text-sm">
                            Total: ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 font-inter">
                      Subtotal: ${subtotal.toFixed(2)}
                    </p>
                    <p className="text-gray-300 font-inter">
                      Shipping:{" "}
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </p>
                    <p className="text-white font-inter text-lg font-semibold">
                      Total: ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Back to Cart */}
          <div className="mt-8 text-center">
            <Link href="/shop/cart">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-inter uppercase">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
