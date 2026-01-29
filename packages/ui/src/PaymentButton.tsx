import React from "react";

interface PaymentButtonProps {
  amount: number;
  userId: string;
  email: string;
  onSuccess?: (url: string) => void;
  onError?: (error: unknown) => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  userId,
  email,
  onSuccess,
  onError,
}) => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/payments/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, userId, email }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const data = await response.json();
      if (data.paymentUrl) {
        if (onSuccess) onSuccess(data.paymentUrl);
        else window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      if (onError) onError(error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
    >
      Pay PHP {amount}
    </button>
  );
};
