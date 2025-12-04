// app/(tabs)/Home.tsx
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "@/components/Themed";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Home() {
  const featured = [
    { id: "1", name: "Margherita", qty: 8, note: "Chef special" },
    { id: "2", name: "Pepperoni", qty: 4, note: "Low stock" },
    { id: "3", name: "Dough Balls", qty: 20, note: "Fresh batch" },
  ];

  const recentAdjustments = [
    { id: "1", name: "Dough Balls", qty: 10, type: "add", user: "J.", note: "Stock replenished" },
    { id: "2", name: "Pepperoni", qty: 2, type: "remove", user: "P.", note: "Used in orders" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Pizza Pantry</Text>
          <Text style={styles.heroSubtitle}>
            Inventory & kitchen controls for the shop
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome name="plus" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.scanButton}>
            <MaterialIcons name="qr-code-scanner" size={20} color="#1f2937" style={{ marginRight: 8 }} />
            <Text style={styles.scanButtonText}>Scan / Count</Text>
          </TouchableOpacity>
        </View>

        {/* Inventory Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top items</Text>
            <Link href="/inventory" asChild>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {featured.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemLeft}>
                <FontAwesome name="cube" size={24} color="#6366f1" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemNote}>{item.note}</Text>
                </View>
              </View>
              <Text style={styles.itemQty}>{item.qty}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Tip</Text>
          <Text style={styles.tipText}>
            Set reorder levels to get notified when stock is low. Use quick adjustments during rush hours.
          </Text>
        </View>

        {/* Recent Adjustments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent adjustments</Text>
            <Text style={styles.sectionSubtitle}>Today</Text>
          </View>

          {recentAdjustments.map((item) => (
            <View key={item.id} style={styles.adjustmentCard}>
              <View style={styles.itemLeft}>
                <FontAwesome
                  name={item.type === "add" ? "plus-circle" : "minus-circle"}
                  size={24}
                  color={item.type === "add" ? "#16a34a" : "#dc2626"}
                  style={{ marginRight: 8 }}
                />
                <View>
                  <Text style={styles.adjustmentText}>
                    {item.type === "add" ? "Added" : "Removed"} {item.qty} {item.name}
                  </Text>
                  <Text style={styles.adjustmentNote}>
                    by {item.user} — {item.note}
                  </Text>
                </View>
              </View>
              <Text style={[styles.adjustmentQty, { color: item.type === "add" ? "#16a34a" : "#dc2626" }]}>
                {item.type === "add" ? `+${item.qty}` : `-${item.qty}`}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: { padding: 20 },
  hero: { marginBottom: 24 },
  heroTitle: { fontSize: 28, fontWeight: "bold", color: "#111827" },
  heroSubtitle: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  quickActions: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  addButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#4f46e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: { color: "white", fontWeight: "600" },
  scanButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#f3f4f6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  scanButtonText: { color: "#1f2937", fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  sectionSubtitle: { fontSize: 14, color: "#6b7280" },
  viewAllButton: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: "#d1d5db" },
  viewAllText: { color: "#4f46e5", fontSize: 12, fontWeight: "600" },
  itemCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemName: { fontWeight: "600", color: "#111827" },
  itemNote: { fontSize: 12, color: "#6b7280" },
  itemQty: { color: "#4f46e5", fontWeight: "700" },
  tipCard: { backgroundColor: "#fef3c7", padding: 16, borderRadius: 24, marginBottom: 24, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  tipTitle: { fontWeight: "600", color: "#111827" },
  tipText: { fontSize: 14, color: "#374151", marginTop: 4 },
  adjustmentCard: { backgroundColor: "#fff", padding: 16, borderRadius: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  adjustmentText: { fontWeight: "600", color: "#111827" },
  adjustmentNote: { fontSize: 12, color: "#6b7280" },
  adjustmentQty: { fontWeight: "700", fontSize: 16 },
});
