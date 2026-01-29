import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../utils/api";

const USER_ID = "mobile-user-" + Math.floor(Math.random() * 10000);

export default function PaymentScreen() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!amount || !email) {
      setError("Please fill in all fields");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.createInvoice({
        amount: numAmount,
        userId: USER_ID,
        email,
      });

      if (response.paymentUrl) {
        const supported = await Linking.canOpenURL(response.paymentUrl);
        if (supported) {
          await Linking.openURL(response.paymentUrl);
        } else {
          Alert.alert("Error", "Cannot open payment URL");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 p-6">
          {/* Card */}
          <View className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Secure Payment
            </Text>
            <Text className="text-gray-500 mb-6">
              Enter your payment details below
            </Text>

            {/* Error Alert */}
            {error ? (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <Text className="text-red-600 text-sm">{error}</Text>
              </View>
            ) : null}

            {/* Amount Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Amount (PHP)
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
                <View className="bg-gray-100 px-4 py-3 border-r border-gray-300">
                  <Text className="text-gray-500 font-medium">₱</Text>
                </View>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  className="flex-1 px-4 py-3 text-gray-900"
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </View>

            {/* Pay Button */}
            <TouchableOpacity
              onPress={handlePayment}
              disabled={loading}
              className={`py-4 rounded-xl ${
                loading ? "bg-blue-400" : "bg-blue-600"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg text-center">
                  Pay Now
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Quick Amount Buttons */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-500 mb-3">
              Quick amounts
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {[100, 500, 1000, 5000].map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  onPress={() => setAmount(quickAmount.toString())}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2"
                >
                  <Text className="text-gray-700 font-medium">
                    ₱{quickAmount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View className="mt-auto pt-6 items-center">
            <Text className="text-gray-400 text-xs">
              Powered by Xendit • Secure Payments
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
