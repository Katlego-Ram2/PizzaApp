import React from "react";
import { View, ScrollView, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabTwoScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb", padding: 20 }}>
      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#111827", marginBottom: 8 }}>
        Kitchen Dashboard
      </Text>
      <Text style={{ color: "#6b7280", marginBottom: 20 }}>
        Quick overview of inventory, recent adjustments, and chef's notes.
      </Text>

      {/* Alerts Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <FontAwesome name="exclamation-triangle" size={24} color="#f59e0b" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#111827" }}>Top Alerts</Text>
        </View>
        <Text style={{ color: "#4b5563" }}>
          Pepperoni stock is low — reorder soon.
        </Text>
      </View>

      {/* Recent Adjustments Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600", color: "#111827", marginBottom: 12 }}>
          Recent Adjustments
        </Text>
        <View style={{ marginVertical: 4 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              padding: 12,
              borderRadius: 12,
              marginBottom: 6,
            }}
          >
            <Text style={{ color: "#374151" }}>Added 10 Margherita Pizzas</Text>
            <Text style={{ color: "#16a34a", fontWeight: "700" }}>+10</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#374151" }}>Removed 2 Dough Balls</Text>
            <Text style={{ color: "#dc2626", fontWeight: "700" }}>-2</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>
          © 2025 Seedway Agri College — Kitchen Dashboard
        </Text>
        <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 8 }}>
          Version 1.0.0
        </Text>
        
      </View>
    </ScrollView>
  );
}
