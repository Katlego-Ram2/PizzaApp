import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ItemDetailScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.name}</Text>

        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{item.quantity}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Edit feature coming soon")}
      >
        <Text style={styles.buttonText}>Edit Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#dc2626" }]}
        onPress={() => alert("Delete feature coming soon")}
      >
        <Text style={styles.buttonText}>Delete Item</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  card: {
    backgroundColor: "#f3f4f6",
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 30,
  },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  value: { fontSize: 16, color: "#374151", marginTop: 4 },
  button: {
    backgroundColor: "#1e3a8a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "600" },
  link: { textAlign: "center", marginTop: 20, color: "#2563eb" },
});
