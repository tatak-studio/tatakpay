import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import PaymentScreen from "../screens/PaymentScreen";

export type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  PaymentHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: "Make Payment" }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistoryScreen}
          options={{ title: "Payment History" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
