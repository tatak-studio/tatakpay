"use client";

import { PaymentButton } from "@repo/ui/src/PaymentButton";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Make a Payment</h1>
      <div className="p-6 border rounded-lg shadow-lg">
        <p className="mb-4">Item: Premium Subscription</p>
        <PaymentButton
          amount={500}
          userId="user-123"
          email="test@example.com"
          onSuccess={(url) => (window.location.href = url)}
        />
      </div>
    </div>
  );
}
