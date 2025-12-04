import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { api } from "../../services/api";
import { FontAwesome } from "@expo/vector-icons";

// Define ALL screens here
type RootStackParamList = {
  InventoryList: undefined;
  ItemDetail: { id: string };
  AddEditItem: { id: string };
  AdjustQuantity: { id: string; name: string };
};

type ScreenRoute = RouteProp<RootStackParamList, "ItemDetail">;

export default function ItemDetail() {
  const route = useRoute<ScreenRoute>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = route.params;

  const [item, setItem] = useState<any | null>(null);
  const [log, setLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const it = await api.getItem(id);
      const lg = await api.getItemLog(id);
      if (!mounted) return;

      setItem(it);
      setLog(lg);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const onDelete = () => {
    Alert.alert("Delete item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await api.deleteItem(id);
          navigation.navigate("InventoryList");
        },
      },
    ]);
  };

  if (loading || !item) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#6b7280" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={[styles.qty, item.quantity < 5 ? styles.qtyLow : styles.qtyOk]}>
          {item.quantity}
        </Text>
      </View>

      <Text style={styles.note}>{item.description || item.category || "No description"}</Text>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("AddEditItem", { id })}
        >
          <FontAwesome name="pencil" size={16} color="#fff" />
          <Text style={styles.actionText}> Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#f97316" }]}
          onPress={() => navigation.navigate("AdjustQuantity", { id, name: item.name })}
        >
          <FontAwesome name="plus-circle" size={16} color="#fff" />
          <Text style={styles.actionText}> Adjust</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#ef4444" }]}
          onPress={onDelete}
        >
          <FontAwesome name="trash" size={16} color="#fff" />
          <Text style={styles.actionText}> Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Recent adjustments</Text>

        {log.length === 0 && <Text style={styles.muted}>No adjustments yet.</Text>}

        {log.map((l) => (
          <View key={l.id} style={styles.logRow}>
            <Text style={styles.logText}>{l.type === "ADD" ? `+${l.amount}` : `-${l.amount}`}</Text>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.logReason}>{l.reason || "—"}</Text>
              <Text style={styles.logTime}>{new Date(l.createdAt).toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f9fafb", flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  qty: { fontSize: 18, fontWeight: "800" },
  qtyLow: { color: "#dc2626" },
  qtyOk: { color: "#16a34a" },
  note: { color: "#6b7280", marginBottom: 12 },
  actionRow: { flexDirection: "row", justifyContent: "space-between" },
  actionBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#4f46e5", padding: 10, borderRadius: 10 },
  actionText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  sectionTitle: { fontWeight: "700", marginBottom: 8, marginTop: 8 },
  muted: { color: "#6b7280" },
  logRow: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#eef2ff" },
  logText: { fontWeight: "800", color: "#111827", width: 52 },
  logReason: { color: "#111827", fontWeight: "600" },
  logTime: { color: "#6b7280", fontSize: 12, marginTop: 4 },
});
