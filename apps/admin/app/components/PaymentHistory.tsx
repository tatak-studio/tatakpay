"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: string;
  externalId: string;
  amount: number;
  status: string;
  user?: { email: string };
  createdAt: string;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading payments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b">Customer</th>
            <th className="py-3 px-4 border-b">Amount</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Ref ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {payments.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 text-center">
                No payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {payment.user?.email || "Unknown"}
                </td>
                <td className="py-3 px-4">PHP {payment.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      payment.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  {payment.externalId}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
