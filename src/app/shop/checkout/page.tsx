"use client";

import dynamic from "next/dynamic";

// Dynamically import the CheckoutPage component with SSR disabled
const CheckoutPage = dynamic(() => import("./CheckoutPage"), {
  ssr: false, // Disable server-side rendering to avoid useSearchParams prerendering issue
});

export default function Page() {
  return <CheckoutPage />;
}
