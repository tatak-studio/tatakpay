import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { api, Payment } from "../utils/api";

const USER_ID = "mobile-user-" + Math.floor(Math.random() * 10000);

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAID":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "EXPIRED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function PaymentHistoryScreen() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchPayments = async () => {
    try {
      setError("");
      const data = await api.getPaymentsByUser(USER_ID);
      setPayments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load payments. Please check your API connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPayments();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPayments();
  };

  const renderPaymentItem = ({ item }: { item: Payment }) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">
              ₱{item.amount.toLocaleString()}
            </Text>
            <Text className="text-sm text-gray-500">{item.currency}</Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}
          >
            <Text className="text-xs font-medium capitalize">
              {item.status.toLowerCase()}
            </Text>
          </View>
        </View>

        {item.description && (
          <Text className="text-gray-600 text-sm mb-2">{item.description}</Text>
        )}

        <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
          <Text className="text-xs text-gray-400">{formattedDate}</Text>
          <Text className="text-xs text-gray-400">{formattedTime}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-500 mt-4">Loading payments...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {error ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-gray-500 text-center">{error}</Text>
        </View>
      ) : payments.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-6xl mb-4">💳</Text>
          <Text className="text-xl font-bold text-gray-700 mb-2">
            No Payments Yet
          </Text>
          <Text className="text-gray-500 text-center">
            Your payment history will appear here once you make a payment.
          </Text>
        </View>
      ) : (
        <FlatList
          data={payments}
          renderItem={renderPaymentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <Text className="text-sm text-gray-500 mb-4">
              {payments.length} payment{payments.length !== 1 ? "s" : ""} found
            </Text>
          }
        />
      )}
    </View>
  );
}
