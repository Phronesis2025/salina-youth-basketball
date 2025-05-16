"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function StatusContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      "JoinStatus useEffect triggered, searchParams:",
      searchParams?.toString()
    );

    if (!searchParams) {
      console.log("No searchParams available");
      setError("Missing URL parameters");
      setLoading(false);
      return;
    }

    const statusParam = searchParams.get("status");
    const joinRequestId = searchParams.get("joinRequestId");
    const paymentId = searchParams.get("paymentId");

    console.log("URL parameters:", { statusParam, joinRequestId, paymentId });

    if (!statusParam) {
      console.log("Missing status parameter");
      setError("Missing payment status");
      setLoading(false);
      return;
    }

    if (!joinRequestId) {
      console.log("Missing joinRequestId parameter");
      setError("Missing join request ID");
      setLoading(false);
      return;
    }

    setStatus(statusParam);

    const fetchEmail = async () => {
      console.log("Fetching email for joinRequestId:", joinRequestId);
      try {
        const response = await fetch("/api/get-join-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ joinRequestId }),
        });

        console.log("Get join request response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch join request data: ${response.status} ${errorText}`
          );
        }

        const { joinRequest } = await response.json();
        console.log("Join request data:", joinRequest);

        if (!joinRequest || !joinRequest.parent_email) {
          throw new Error("Join request or email not found");
        }

        setEmail(joinRequest.parent_email);
      } catch (err) {
        console.error("Fetch email error:", err);
        setError((err as Error).message || "Failed to load email data");
      } finally {
        console.log("Fetch email complete, setting loading to false");
        setLoading(false);
      }
    };

    if (statusParam === "success") {
      console.log("Status is success, calling fetchEmail");
      fetchEmail();
    } else {
      console.log("Status is not success, setting loading to false");
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    console.log("Rendering loading state");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1C2526]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D91E18]"></div>
      </div>
    );
  }

  console.log("Rendering status content", { status, error, email });

  return (
    <div className="min-h-screen bg-[#1C2526] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#01182B] shadow rounded-[1rem] p-6">
          <h3 className="text-lg font-rubik font-semibold text-[#FFFFFF] uppercase text-center">
            Payment Status
          </h3>
          <div className="mt-5">
            {error ? (
              <div className="rounded-md bg-red-900 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-inter font-medium text-[#FFFFFF]">
                      Error
                    </h3>
                    <div className="mt-2 text-sm text-[#E6ECEF]">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : status === "success" && email ? (
              <div>
                <div className="rounded-md bg-green-900 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-inter font-medium text-[#FFFFFF]">
                        Payment Successful
                      </h3>
                      <div className="mt-2 text-sm text-[#E6ECEF]">
                        <p>
                          Your payment has been processed successfully. A
                          confirmation email has been sent to {email}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-yellow-900 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-inter font-medium text-[#FFFFFF]">
                      Payment Failed
                    </h3>
                    <div className="mt-2 text-sm text-[#E6ECEF]">
                      <p>Please try again or contact support.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-center">
              <Link href="/">
                <Button className="bg-[#D91E18] text-[#FFFFFF] font-inter uppercase text-sm py-2 px-4 rounded-[0.25rem] hover:bg-[#b51815]">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JoinStatus() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#1C2526]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D91E18]"></div>
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
