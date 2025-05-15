"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Utility to add timeout to fetch
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 10000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

interface JoinRequest {
  first_name: string;
  last_name: string;
  parent_email: string;
  age_group: string;
  team_gender: string;
  payment_option: string;
  payment_status: string;
  created_at: string;
  stripe_payment_id: string;
}

export const dynamic = "force-dynamic";

function StatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered", {
      status: searchParams?.get("status"),
      paymentId: searchParams?.get("paymentId"),
    });

    if (!searchParams) {
      console.log("No searchParams");
      setError("Invalid payment status or payment ID");
      setLoading(false);
      return;
    }

    const statusParam = searchParams.get("status");
    const paymentIdParam = searchParams.get("paymentId");

    if (!statusParam || !paymentIdParam) {
      console.log("Missing status or paymentId", {
        statusParam,
        paymentIdParam,
      });
      setError("Invalid payment status or payment ID");
      setLoading(false);
      return;
    }

    setStatus(statusParam);

    const fetchInvoice = async () => {
      console.log("Starting fetchInvoice");
      try {
        console.log("Fetching join request for paymentId:", paymentIdParam);
        const response = await fetchWithTimeout(
          "/api/get-join-request",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stripe_payment_id: paymentIdParam }),
          },
          10000
        );

        console.log("Join request response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch join request data: ${response.status} ${errorText}`
          );
        }

        const { joinRequest } = await response.json().catch((err) => {
          throw new Error(
            `Failed to parse join request response: ${err.message}`
          );
        });
        console.log("Join request data:", joinRequest);

        if (!joinRequest) {
          throw new Error("Join request not found");
        }

        const amount = joinRequest.payment_option === "full" ? 36000 : 3000;
        console.log("Calculated amount:", amount);

        console.log("Generating invoice with data:", {
          first_name: joinRequest.first_name,
          last_name: joinRequest.last_name,
          parent_email: joinRequest.parent_email,
          payment_id: joinRequest.stripe_payment_id,
        });

        const invoiceResponse = await fetchWithTimeout(
          "/api/generate-invoice",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              first_name: joinRequest.first_name,
              last_name: joinRequest.last_name,
              parent_email: joinRequest.parent_email,
              age_group: joinRequest.age_group,
              team_gender: joinRequest.team_gender,
              payment_option: joinRequest.payment_option,
              payment_status: joinRequest.payment_status,
              created_at: joinRequest.created_at,
              amount,
              payment_id: joinRequest.stripe_payment_id,
            }),
          },
          15000
        );

        console.log(
          "Invoice response status:",
          invoiceResponse.status,
          "headers:",
          [...invoiceResponse.headers]
        );

        if (!invoiceResponse.ok) {
          const errorText = await invoiceResponse.text();
          throw new Error(
            `Failed to generate invoice: ${invoiceResponse.status} ${errorText}`
          );
        }

        const contentType = invoiceResponse.headers.get("content-type");
        if (contentType !== "application/pdf") {
          const errorText = await invoiceResponse.text();
          throw new Error(
            `Invalid invoice response type: ${contentType}, body: ${errorText}`
          );
        }

        const blob = await invoiceResponse.blob().catch((err) => {
          throw new Error(`Failed to process invoice blob: ${err.message}`);
        });
        console.log(
          "Invoice blob received, size:",
          blob.size,
          "type:",
          blob.type
        );

        if (blob.size === 0 || blob.type !== "application/pdf") {
          throw new Error(
            `Invalid invoice blob: size=${blob.size}, type=${blob.type}`
          );
        }

        const url = URL.createObjectURL(blob);
        setInvoiceUrl(url);
        console.log("Invoice URL set:", url);
      } catch (err) {
        const errorMessage =
          (err as Error).message || "Failed to load invoice data";
        console.error("fetchInvoice error:", errorMessage, err);
        setError(errorMessage);
      } finally {
        console.log("fetchInvoice complete, setting loading to false");
        setLoading(false);
      }
    };

    if (statusParam === "success") {
      console.log("Calling fetchInvoice for success status");
      fetchInvoice().catch((err) => {
        console.error("Unhandled fetchInvoice error:", err);
        setError("Failed to load invoice data");
        setLoading(false);
      });
    } else {
      console.log("Not success status, setting loading false");
      setLoading(false);
    }
  }, [searchParams, router]);

  const handleDownload = () => {
    if (!invoiceUrl) {
      console.log("No invoiceUrl for download");
      return;
    }

    console.log("Downloading invoice, URL:", invoiceUrl);
    const link = document.createElement("a");
    link.href = invoiceUrl;
    link.download = `invoice-${
      searchParams.get("paymentId") || "download"
    }.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Download triggered");
  };

  if (loading) {
    console.log("Rendering loading state");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#002C51]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D91E18]"></div>
      </div>
    );
  }

  console.log("Rendering status content", { status, error, invoiceUrl });

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
            ) : status === "success" ? (
              <div>
                <div className="rounded-md bg-green-900 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-inter font-medium text-[#FFFFFF]">
                        Payment Successful
                      </h3>
                      <div className="mt-2 text-sm text-[#E6ECEF]">
                        <p>Your payment has been processed successfully.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {invoiceUrl && (
                  <div className="mt-5 flex justify-center">
                    <Button
                      onClick={handleDownload}
                      className="bg-[#D91E18] hover:bg-[#B81C15] text-[#FFFFFF] font-rubik uppercase text-sm py-2 px-4 rounded-[0.25rem]"
                    >
                      Download Invoice
                    </Button>
                  </div>
                )}
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
