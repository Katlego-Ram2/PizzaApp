import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function InventoryPreview({ items }) {
  return (
    <View style={styles.wrapper}>
      {items.map(i => (
        <TouchableOpacity key={i.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{i.name}</Text>
            {i.note && <Text style={styles.note}>{i.note}</Text>}
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={[
                styles.qty,
                i.qty < 5 ? styles.qtyRed : styles.qtyGreen,
              ]}
            >
              {i.qty}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  note: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  qty: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
    fontWeight: "700",
    textAlign: "center",
  },
  qtyGreen: {
    backgroundColor: "#d1fae5",
    color: "#059669",
  },
  qtyRed: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  },
});
