import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useInventoryStore } from "../../store/inventoryStore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { string } from "zod";

// 1️⃣ Define the navigation stack types
export type RootStackParamList = {
  InventoryList: undefined;
  AddEditItem: { id?: string };
  ItemDetail: { id: string };
};

export default function InventoryList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { items, fetchItems, loading } = useInventoryStore();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  // Unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(items.map((i) => i.category || "Uncategorized")));
  }, [items]);

  // Filter items by search query & category
  const filtered = items.filter((it) => {
    const matchesQuery = it.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter ? (it.category || "Uncategorized") === categoryFilter : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddEditItem", { id: "" })}>
          <FontAwesome name="plus" size={16} color="#fff" />
          <Text style={styles.addText}> Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search and category filters */}
      <View style={styles.controls}>
        <TextInput
          placeholder="Search items..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          <TouchableOpacity
            style={[styles.catBtn, categoryFilter === null && styles.catBtnActive]}
            onPress={() => setCategoryFilter(null)}
          >
            <Text style={[styles.catText, categoryFilter === null && styles.catTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.catBtn, categoryFilter === c && styles.catBtnActive]}
              onPress={() => setCategoryFilter(categoryFilter === c ? null : c)}
            >
              <Text style={[styles.catText, categoryFilter === c && styles.catTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Item list */}
      <ScrollView
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} />}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No items found. Tap Add to create one.</Text>
          </View>
        ) : (
          filtered.map((it) => (
            <TouchableOpacity
              key={it.id}
              style={styles.card}
              onPress={() => navigation.navigate("ItemDetail", { id: it.id })}
            >
              <View style={styles.cardLeft}>
                <FontAwesome name="cube" size={20} color="#6366f1" style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.itemName}>{it.name}</Text>
                  <Text style={styles.itemNote}>{it.category || "Uncategorized"}</Text>
                </View>
              </View>
              <Text style={[styles.qty, it.quantity < 5 ? styles.qtyLow : styles.qtyOk]}>
                {it.quantity}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  addBtn: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  controls: { padding: 12 },
  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categories: { marginTop: 10 },
  catBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  catBtnActive: { backgroundColor: "#eef2ff", borderColor: "#c7d2fe" },
  catText: { color: "#374151" },
  catTextActive: { color: "#4f46e5", fontWeight: "700" },
  list: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eef2ff",
  },
  cardLeft: { flexDirection: "row", alignItems: "center" },
  itemName: { fontWeight: "600", color: "#111827" },
  itemNote: { color: "#6b7280", fontSize: 12 },
  qty: { fontWeight: "800", fontSize: 16 },
  qtyLow: { color: "#dc2626" },
  qtyOk: { color: "#16a34a" },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: "#6b7280" },
});
