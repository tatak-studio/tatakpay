import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View className="flex-1 bg-gradient-to-b from-blue-600 to-indigo-700">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-white text-center">
            Tatak Pay
          </Text>
          <Text className="text-lg text-blue-100 text-center mt-2">
            Fast & Secure Payments
          </Text>
        </View>

        {/* Main Actions */}
        <View className="w-full space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment")}
            className="bg-white py-4 px-6 rounded-xl shadow-lg"
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-blue-600 font-bold text-lg">
                💳 Make a Payment
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentHistory")}
            className="bg-white/20 py-4 px-6 rounded-xl border-2 border-white/30"
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white font-bold text-lg">
                📋 Payment History
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="pb-8 items-center">
        <Text className="text-blue-200 text-sm">Powered by Xendit</Text>
      </View>
    </View>
  );
}
