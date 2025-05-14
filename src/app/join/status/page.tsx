"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

interface InvoiceData {
  first_name: string;
  last_name: string;
  parent_email: string;
  age_group: string;
  team_gender: string;
  payment_option: string;
  payment_status: string;
  created_at: string;
  amount: number;
  payment_id: string;
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
    if (!searchParams) return;

    const statusParam = searchParams.get("status");
    const paymentIdParam = searchParams.get("paymentId");

    if (!statusParam || !paymentIdParam) {
      setError("Invalid payment status or payment ID");
      setLoading(false);
      return;
    }

    setStatus(statusParam);

    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `/api/generate-invoice?paymentId=${paymentIdParam}`
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setInvoiceUrl(url);
      } catch {
        setError("Failed to load invoice data");
      } finally {
        setLoading(false);
      }
    };

    if (statusParam === "success") {
      fetchInvoice();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleDownload = async () => {
    if (!invoiceUrl) return;

    try {
      const link = document.createElement("a");
      link.href = invoiceUrl;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError("Failed to download invoice");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Payment Status
            </h3>
            <div className="mt-5">
              {error ? (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : status === "success" ? (
                <div>
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Payment successful
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your payment has been processed successfully.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {invoiceUrl && (
                    <div className="mt-5">
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Download Invoice
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Payment failed
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Your payment could not be processed.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-5">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Return to Home
                </button>
              </div>
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
