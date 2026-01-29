import { Platform } from "react-native";

const getBaseUrl = () => {
  // Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3001";
  }
  return "http://localhost:3001";
};

export interface Payment {
  id: string;
  xenditInvoiceId: string;
  externalId: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  paymentUrl: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceRequest {
  amount: number;
  userId: string;
  email: string;
}

export interface CreateInvoiceResponse {
  id: string;
  paymentUrl: string;
}

export const api = {
  createInvoice: async (
    data: CreateInvoiceRequest,
  ): Promise<CreateInvoiceResponse> => {
    const response = await fetch(`${getBaseUrl()}/payments/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Payment creation failed");
    }

    return response.json() as Promise<CreateInvoiceResponse>;
  },

  getPaymentsByUser: async (userId: string): Promise<Payment[]> => {
    const response = await fetch(`${getBaseUrl()}/payments/user/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }

    return response.json() as Promise<Payment[]>;
  },
};
