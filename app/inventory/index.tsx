import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import InventoryPreview from '@/components/InventoryPreview';

export default function InventoryScreen() {
  const router = useRouter();

  // Example inventory list — replace with API or local data
  const allItems = [
    { id: '1', name: 'Margherita', qty: 8, note: 'Chef special' },
    { id: '2', name: 'Pepperoni', qty: 4, note: 'Low stock' },
    { id: '3', name: 'Dough Balls', qty: 20, note: 'Fresh batch' },
    { id: '4', name: 'Cheese', qty: 15, note: 'Mozzarella blocks' },
    { id: '5', name: 'Tomato Sauce', qty: 9, note: 'Homemade blend' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="p-5 border-b border-gray-200 flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Inventory</Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="px-3 py-1 rounded-full border border-gray-300"
        >
          <Text className="text-gray-700">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Add Item button */}
        <TouchableOpacity className="bg-indigo-600 p-4 rounded-2xl mb-5 items-center">
          <Text className="text-white font-semibold">+ Add New Item</Text>
        </TouchableOpacity>

        {/* Inventory list */}
        <View>
          <Text className="text-lg font-semibold mb-3">All Items</Text>

          <View className="space-y-3">
            {allItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="font-semibold text-lg">{item.name}</Text>
                    <Text className="text-sm text-gray-500">{item.note}</Text>
                  </View>
                  <Text
                    className={`text-base font-bold ${
                      item.qty < 5 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.qty}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
