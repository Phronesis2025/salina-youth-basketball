"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function StatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams) {
      setError("Invalid payment status or join request ID");
      setLoading(false);
      return;
    }

    const statusParam = searchParams.get("status");
    const joinRequestId = searchParams.get("joinRequestId");

    if (!statusParam || !joinRequestId) {
      setError("Invalid payment status or join request ID");
      setLoading(false);
      return;
    }

    setStatus(statusParam);

    const fetchEmail = async () => {
      try {
        const response = await fetch("/api/get-join-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ joinRequestId }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch join request data: ${response.status} ${errorText}`
          );
        }

        const { joinRequest } = await response.json();

        if (!joinRequest || !joinRequest.parent_email) {
          throw new Error("Join request or email not found");
        }

        setEmail(joinRequest.parent_email);
      } catch (err) {
        setError((err as Error).message || "Failed to load email data");
      } finally {
        setLoading(false);
      }
    };

    if (statusParam === "success") {
      fetchEmail();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#002C51]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D91E18]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002C51] py-12 px-4 sm:px-6 lg:px-8">
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
                          Your payment has been processed successfully. An
                          invoice has been sent to {email}.
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
                      <p>Your payment could not be processed.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-center">
              <Link href="/">
                <Button className="bg-[#FFFFFF] text-[#0A0F15] font-inter uppercase text-sm py-2 px-4 rounded-[0.25rem] hover:bg-[#E6ECEF]">
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
        <div className="min-h-screen flex items-center justify-center bg-[#002C51]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D91E18]"></div>
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
