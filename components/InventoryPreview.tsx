// components/InventoryPreview.tsx
import React from 'react';
import { View } from 'react-native';
import ItemCard from './ItemCard';

export default function InventoryPreview({ items }: { items: Array<{ id: string; name: string; qty: number; note?: string }> }) {
  return (
    <View className="space-y-3">
      {items.map(i => (
        <ItemCard key={i.id} id={i.id} name={i.name} qty={i.qty} note={i.note} onPress={() => { /* navigate to detail */ }} />
      ))}
    </View>
  );
}
