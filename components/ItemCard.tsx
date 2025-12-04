// components/ItemCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  id: string;
  name: string;
  qty: number;
  note?: string;
  onPress?: () => void;
};

export default function ItemCard({ name, qty, note, onPress }: Props) {
  const low = qty <= 5;
  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-3 rounded-lg shadow-sm flex-row justify-between items-center">
      <View>
        <Text className="font-semibold text-lg">{name}</Text>
        {note ? <Text className="text-sm text-gray-500 mt-1">{note}</Text> : null}
      </View>

      <View className="items-end">
        <Text className={`text-lg font-bold ${low ? 'text-red-500' : 'text-gray-900'}`}>{qty}</Text>
        <Text className="text-xs text-gray-500">pcs</Text>
      </View>
    </TouchableOpacity>
  );
}
