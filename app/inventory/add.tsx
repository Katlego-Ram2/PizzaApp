// app/inventory/add.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Item } from "@/lib/types";
import { ItemSchema } from "@/lib/validation";
import { useCreateItem } from "@/lib/hooks/useItems";

export default function AddItemScreen() {
  const router = useRouter();
  const createItem = useCreateItem();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Item>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      category: "",
      unit: "",
      sku: "",
      reorderLevel: 0,
      notes: "",
    },
  });

  const onSubmit = (data: Item) => {
    createItem.mutate(data, {
      onSuccess: () => {
        Alert.alert("Success", "Item created successfully!");
        router.back();
      },
      onError: (err) => {
        Alert.alert("Error", err.message);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Add New Item</Text>

        {/* NAME */}
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Margherita Sauce"
          onChangeText={(t) => setValue("name", t)}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        {/* CATEGORY */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Sauces / Ingredients"
          onChangeText={(t) => setValue("category", t)}
        />

        {/* SKU */}
        <Text style={styles.label}>SKU</Text>
        <TextInput
          style={styles.input}
          placeholder="SKU-001"
          onChangeText={(t) => setValue("sku", t)}
        />

        {/* QUANTITY */}
        <Text style={styles.label}>Quantity *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(t) => setValue("quantity", Number(t))}
        />
        {errors.quantity && <Text style={styles.error}>{errors.quantity.message}</Text>}

        {/* UNIT */}
        <Text style={styles.label}>Unit</Text>
        <TextInput
          style={styles.input}
          placeholder="kg / boxes / litres"
          onChangeText={(t) => setValue("unit", t)}
        />

        {/* REORDER LEVEL */}
        <Text style={styles.label}>Reorder Level</Text>
        <TextInput
          style={styles.input}
          placeholder="5"
          keyboardType="numeric"
          onChangeText={(t) => setValue("reorderLevel", Number(t))}
        />

        {/* NOTES */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Extra notes about the item..."
          multiline
          onChangeText={(t) => setValue("notes", t)}
        />

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          style={styles.button}
          disabled={createItem.isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          {createItem.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Item</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scroll: { padding: 20, paddingBottom: 60 },
  header: { fontSize: 24, fontWeight: "700", color: "#111827", marginBottom: 20 },
  label: { fontWeight: "600", color: "#374151", marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  inputMultiline: { height: 100, textAlignVertical: "top" },
  error: { color: "#dc2626", fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
