import React from "react";
import PaymentForm from "../components/PaymentForm";

export default function PaymentPage(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Tatak Pay Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your payment securely
          </p>
        </div>
        <div className="flex justify-center">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
