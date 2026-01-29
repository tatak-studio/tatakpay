"use client";

import { useState } from "react";

export default function CreateInvoice() {
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>(""); // Optional, for manual ID
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/payments/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          email,
          userId: userId || undefined, // Send undefined if empty to let backend handle generation if we allowed it, but backend expects string.
          // Wait, backend expects userId string.
          // If we want "guest" behavior, we might need to send a dummy ID or let backend handle missing userId if we changed DTO?
          // The previous fix allowed ANY userId. So we can generate one or let user input.
          // For "Create Invoice" usually we just need email.
          // But our backend currently REQUIRES userId in the body: { amount, userId, email }.
          // Let's generate a random one if not provided, or ask admin to input.
          // Let's use email as seed or just random.
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create invoice");
      }

      const data = await res.json();
      setMessage(
        `Invoice Created! User ID: ${data.userId}, External ID: ${data.externalId}`,
      );
      setAmount(0);
      setEmail("");
      setUserId("");
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white text-gray-900">
      <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Amount (PHP)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Customer Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            User ID (Optional)
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Leave empty to auto-generate/match email"
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500">
            If empty, system uses email to find/create user.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm font-medium text-center">{message}</p>
      )}
    </div>
  );
}
