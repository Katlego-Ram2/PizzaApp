import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { api } from "../../services/api";


type ParamList = {
  AddEditItem: { id?: string };
};

export default function AddEditItem() {
  const route = useRoute<RouteProp<ParamList, "AddEditItem">>();
  const navigation = useNavigation();
  const id = route.params?.id;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const it = await api.getItem(id);
        if (it) {
          setName(it.name || "");
          setCategory(it.category || "");
          setQuantity(String(it.quantity || 0));
          setDescription(it.description || "");
        }
        setLoading(false);
      })();
    }
  }, [id]);

  const onSave = async () => {
    try {
      if (!name.trim()) return Alert.alert("Validation", "Name is required");
      setLoading(true);
      if (id) {
        await api.updateItem(id, { name, category, quantity: Number(quantity), description });
        Alert.alert("Saved", "Item updated");
      } else {
        await api.createItem({ name, category, quantity: Number(quantity), description });
        Alert.alert("Saved", "Item created");
      }
      navigation.navigate("InventoryList" as never);
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>Quantity</Text>
      <TextInput style={styles.input} value={quantity} keyboardType="numeric" onChangeText={setQuantity} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 100 }]} multiline value={description} onChangeText={setDescription} />

      <TouchableOpacity style={styles.saveBtn} onPress={onSave} disabled={loading}>
        <Text style={styles.saveText}>{loading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f9fafb", flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontWeight: "600", marginBottom: 6, color: "#374151" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#e5e7eb", marginBottom: 12 },
  saveBtn: { backgroundColor: "#4f46e5", padding: 14, borderRadius: 12, marginTop: 10, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700" },
});
