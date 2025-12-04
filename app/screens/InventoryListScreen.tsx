import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function InventoryListScreen({ navigation }: any) {
  const [items, setItems] = useState([
    { id: "1", name: "Mozzarella Cheese", quantity: 10 },
    { id: "2", name: "Pizza Dough", quantity: 25 },
    { id: "3", name: "Tomato Sauce", quantity: 8 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Items</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate("ItemDetail", { item })}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  itemCard: {
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  itemName: { fontSize: 18, fontWeight: "600" },
  itemQty: { marginTop: 6, color: "#4b5563" },
});
