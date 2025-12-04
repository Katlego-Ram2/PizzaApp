import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";

type ParamList = {
  AdjustQuantity: { id: string; name: string };
};

export default function AdjustQuantity() {
  const route = useRoute<RouteProp<ParamList, "AdjustQuantity">>();
  const navigation = useNavigation();
  const { id, name } = route.params;
  const [amount, setAmount] = useState("0");
  const [reason, setReason] = useState("");
  const [isAdding, setIsAdding] = useState(true);

  const submit = async () => {
    const n = Number(amount);
    if (!n || isNaN(n)) return Alert.alert("Validation", "Enter a valid amount");
    try {
      await api.adjustQuantity(id, isAdding ? Math.abs(n) : -Math.abs(n), reason);
      Alert.alert("Success", "Quantity updated");
      // navigation.navigate("ItemDetail" as never, { id } as never);
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adjust {name}</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity style={[styles.toggleBtn, isAdding && styles.toggleActive]} onPress={() => setIsAdding(true)}>
          <Text style={[styles.toggleText, isAdding && styles.toggleTextActive]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, !isAdding && styles.toggleActive]} onPress={() => setIsAdding(false)}>
          <Text style={[styles.toggleText, !isAdding && styles.toggleTextActive]}>Remove</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Text style={styles.label}>Reason</Text>
      <TextInput style={[styles.input, { height: 100 }]} multiline value={reason} onChangeText={setReason} />

      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text style={styles.submitText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  toggleRow: { flexDirection: "row", marginBottom: 12 },
  toggleBtn: { flex: 1, padding: 12, backgroundColor: "#fff", borderRadius: 10, marginRight: 8, alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb" },
  toggleActive: { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
  toggleText: { color: "#374151", fontWeight: "700" },
  toggleTextActive: { color: "#fff" },
  label: { fontWeight: "600", color: "#374151", marginBottom: 6 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#e5e7eb", marginBottom: 12 },
  submitBtn: { backgroundColor: "#16a34a", padding: 14, borderRadius: 12, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700" },
});
