import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AddItemScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.title}>Add New Item</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput style={styles.input} placeholder="Enter item name" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput style={styles.input} keyboardType="number-pad" placeholder="Enter quantity" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes / Description</Text>
          <TextInput
            style={[styles.input, { height: 90 }]}
            placeholder="Type any notes"
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save Item</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb"
  },
  saveButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelText: { color: "#6b7280", fontSize: 15, textAlign: "center", marginTop: 10 }
});
