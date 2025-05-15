"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface FormData {
  first_name: string;
  last_name: string;
  age_group: string;
  team_gender: string;
  date_of_birth: string;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  preferred_position: string;
  prior_experience: string;
  payment_option: string;
}

const CheckoutForm = ({
  formData,
  onSuccess,
  onError,
}: {
  formData: FormData;
  onSuccess: (paymentId: string, joinRequestId: string) => void;
  onError: (error: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    let joinRequestId: string | null = null;

    try {
      const response = await fetch("/api/create-join-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const { joinRequestId: newJoinRequestId, error: insertError } =
        await response.json();
      if (insertError) throw new Error(insertError);
      joinRequestId = newJoinRequestId;

      const paymentResponse = await fetch("/api/stripe-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.payment_option === "full" ? 36000 : 3000,
          description:
            formData.payment_option === "full"
              ? "Full Membership Fee"
              : "Monthly Membership Fee Installment",
          metadata: { joinRequestId },
        }),
      });

      const { clientSecret, error: paymentError } =
        await paymentResponse.json();
      if (paymentError) throw new Error(paymentError);

      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement! },
        });

      if (stripeError) throw new Error(stripeError.message);

      if (paymentIntent?.status === "succeeded") {
        const updateResponse = await fetch("/api/update-join-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            joinRequestId,
            payment_status: "completed",
            stripe_payment_id: paymentIntent.id,
          }),
        });

        const { error: updateError } = await updateResponse.json();
        if (updateError) throw new Error(updateError);

        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData,
            paymentStatus: "completed",
            joinRequestId,
          }),
        });

        onSuccess(paymentIntent.id, joinRequestId as string);
      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An error occurred during payment";
      setError(errorMessage);
      onError(errorMessage);

      if (joinRequestId) {
        await fetch("/api/update-join-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            joinRequestId,
            payment_status: "failed",
          }),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-[#FFFFFF] text-sm font-inter mb-2">
          Card Information
        </label>
        <CardElement
          options={{
            style: {
              base: {
                color: "#0A0F15",
                fontSize: "16px",
                "::placeholder": { color: "#AAB7C4" },
              },
              invalid: { color: "#EF4444" },
            },
          }}
          className="p-3 bg-[#FFFFFF] rounded-[0.25rem]"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Button
        type="submit"
        disabled={!stripe || loading}
        variant="default"
        className="w-full bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
      >
        {loading ? "Processing..." : "Confirm and Pay"}
      </Button>
    </form>
  );
};

export default function JoinConfirm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("joinFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    } else {
      router.push("/join");
    }
  }, [router]);

  const handleEdit = () => {
    router.push("/join");
  };

  const handlePaymentSuccess = (paymentId: string, joinRequestId: string) => {
    router.push(
      `/join/status?status=success&paymentId=${paymentId}&joinRequestId=${joinRequestId}`
    );
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (!formData) return null;

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Confirm Your Registration
        </h1>

        <div className="bg-[#01182B] p-6 rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] max-w-lg mx-auto">
          <h2 className="text-[#FFFFFF] text-xl font-rubik font-semibold mb-4 uppercase text-center">
            Registration Summary
          </h2>

          <div className="text-[#FFFFFF] text-sm font-inter space-y-2 mb-6">
            <p>
              <strong>Name:</strong> {formData.first_name} {formData.last_name}
            </p>
            <p>
              <strong>Age Group:</strong> {formData.age_group}
            </p>
            <p>
              <strong>Team Gender:</strong> {formData.team_gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formData.date_of_birth}
            </p>
            <p>
              <strong>Parent/Guardian:</strong> {formData.parent_name}
            </p>
            <p>
              <strong>Parent Phone:</strong> {formData.parent_phone}
            </p>
            <p>
              <strong>Parent Email:</strong> {formData.parent_email}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {formData.emergency_contact_name}
            </p>
            <p>
              <strong>Emergency Phone:</strong>{" "}
              {formData.emergency_contact_phone}
            </p>
            <p>
              <strong>Preferred Position:</strong> {formData.preferred_position}
            </p>
            <p>
              <strong>Prior Experience:</strong>{" "}
              {formData.prior_experience || "None"}
            </p>
            <p>
              <strong>Payment Option:</strong>{" "}
              {formData.payment_option === "full"
                ? "Pay in Full ($360.00)"
                : "Monthly Installments ($30.00 x 12)"}
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              formData={formData}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <div className="text-center mt-4">
            <Button
              onClick={handleEdit}
              variant="default"
              className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
            >
              Back to Edit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
