import React from "react";
import { View, Text, ScrollView } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabTwoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      {/* Header */}
      <Text className="text-3xl font-bold text-gray-800 mb-4">Kitchen Dashboard</Text>
      <Text className="text-gray-500 mb-6">
        Quick overview of inventory, recent adjustments, and chef's notes.
      </Text>

      {/* Featured Card */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-md">
        <Text className="text-xl font-semibold text-gray-800 mb-2">Top Alerts</Text>
        <Text className="text-gray-600">
          ⚠️ Pepperoni stock is low — reorder soon.
        </Text>
      </View>

      {/* Another Card */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-md">
        <Text className="text-xl font-semibold text-gray-800 mb-2">Recent Adjustments</Text>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
            <Text className="text-gray-700">Added 10 Margherita Pizzas</Text>
            <Text className="text-green-600 font-bold">+10</Text>
          </View>
          <View className="flex-row justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
            <Text className="text-gray-700">Removed 2 Dough Balls</Text>
            <Text className="text-red-500 font-bold">-2</Text>
          </View>
        </View>
      </View>

      {/* Info / Footer */}
      <View className="items-center mt-10">
        <EditScreenInfo path="app/(tabs)/two.tsx" />
      </View>
    </ScrollView>
  );
}
