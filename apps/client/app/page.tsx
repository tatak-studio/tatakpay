"use client";

import React from "react";
import PaymentForm from "./components/PaymentForm";

export default function Home(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">TatakPay</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to your payment portal
          </p>
        </div>

        <div className="flex flex-col items-center">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
