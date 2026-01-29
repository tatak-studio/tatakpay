import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "./global.css";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
      const baseUrl =
        Platform.OS === "android"
          ? "http://10.0.2.2:3000"
          : "http://localhost:3000";

      const response = await fetch(`${baseUrl}/payments/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500,
          userId: "mobile-user-123",
          email: "mobile@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const data = await response.json();
      if (data.paymentUrl) {
        // Open the URL in browser
        const supported = await Linking.canOpenURL(data.paymentUrl);
        if (supported) {
          await Linking.openURL(data.paymentUrl);
        } else {
          Alert.alert("Error", "Cannot open payment URL");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Payment failed. ensure API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Tatak Pay Mobile</Text>
      <Text className="mb-8 text-gray-600">Pay for your subscription</Text>

      <TouchableOpacity
        onPress={handlePayment}
        disabled={loading}
        className={`bg-blue-600 py-3 px-6 rounded-lg ${loading ? "opacity-50" : "opacity-100"}`}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? "Processing..." : "Pay PHP 500"}
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
