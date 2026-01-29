"use client";

import Image from "next/image";
import React from "react";
import icon from "../public/icon.png";
import PaymentForm from "./components/PaymentForm";

export default function Home(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div className="flex flex-col items-center text-center">
          <Image src={icon} alt="icon" width={150} height={150} />
          <h1 className="text-3xl font-extrabold text-gray-900">Tatak-Pay</h1>
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
