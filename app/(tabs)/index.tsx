import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>🍕 Pizza Pantry</Text>
      <Text style={styles.subtitle}>
        Track stock, manage ingredients, and keep the kitchen running smoothly.
      </Text>

      {/* Hero Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "https://i.ibb.co/4JRKf4h/pizza-illustration.png",
          }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Quick Actions */}
      <View style={{ width: "100%" }}>

        <TouchableOpacity style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>View Inventory</Text>
            <Text style={styles.cardText}>See all pizza ingredients</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Add New Item</Text>
            <Text style={styles.cardText}>Create a new pantry entry</Text>
          </View>
          <FontAwesome name="plus-circle" size={22} color="#4f46e5" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Stock Alerts</Text>
            <Text style={styles.cardText}>Check low-quantity items</Text>
          </View>
          <FontAwesome name="exclamation-triangle" size={22} color="#f59e0b" />
        </TouchableOpacity>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    marginTop: 50,
    marginBottom: 8,
  },

  subtitle: {
    color: "#6b7280",
    fontSize: 16,
    marginBottom: 30,
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  heroImage: {
    width: 220,
    height: 220,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  cardText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },

  footer: {
    marginTop: 40,
    alignItems: "center",
  },
});
