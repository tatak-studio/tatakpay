"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateInvoice from "./components/CreateInvoice";
import PaymentHistory from "./components/PaymentHistory";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">TatakPay Admin</h1>
        </header>

        <section>
          <CreateInvoice />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md text-gray-900">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <PaymentHistory />
        </section>
      </main>
    </div>
  );
}
