import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function InventoryScreen() {
  const router = useRouter();

  const [allItems, setAllItems] = useState([
    { id: '1', name: 'Margherita', qty: 8, note: 'Chef special' },
    { id: '2', name: 'Pepperoni', qty: 4, note: 'Low stock' },
    { id: '3', name: 'Dough Balls', qty: 20, note: 'Fresh batch' },
    { id: '4', name: 'Cheese', qty: 15, note: 'Mozzarella blocks' },
    { id: '5', name: 'Tomato Sauce', qty: 9, note: 'Homemade blend' },
  ]);

  // Remove item
  const removeItem = (id: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setAllItems((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  // Edit item (for demo purposes we just alert)
  const editItem = (id: string) => {
    const item = allItems.find((i) => i.id === id);
    if (item) {
      Alert.prompt(
        'Edit Item',
        `Update quantity for ${item.name}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: (text) => {
              const qty = Number(text);
              if (!isNaN(qty)) {
                setAllItems((prev) =>
                  prev.map((i) => (i.id === id ? { ...i, qty } : i))
                );
              } else {
                Alert.alert('Invalid', 'Enter a valid number');
              }
            },
          },
        ],
        'plain-text',
        item.qty.toString()
      );
    }
  };

  // Add new item
  const addItem = () => {
    Alert.prompt(
      'Add New Item',
      'Enter name and quantity separated by a comma (e.g., Cheese,10)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: (text) => {
            if (text) {
              const [name, qtyStr] = text.split(',');
              const qty = Number(qtyStr);
              if (name && !isNaN(qty)) {
                setAllItems((prev) => [
                  ...prev,
                  { id: (prev.length + 1).toString(), name, qty, note: '' },
                ]);
              } else {
                Alert.alert('Invalid', 'Please enter valid name and quantity');
              }
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Add Item button */}
       <TouchableOpacity
  style={styles.addButton}
  onPress={() => router.push("/inventory/add")} // navigate to Add Item tab/screen
>
  <Text style={styles.addButtonText}>+ Add New Item</Text>
</TouchableOpacity>

        {/* Inventory list */}
        <View>
          <Text style={styles.sectionTitle}>All Items</Text>
          <View style={{ marginTop: 10 }}>
            {allItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemNote}>{item.note}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={[
                        styles.itemQty,
                        item.qty < 5 ? styles.qtyLow : styles.qtyNormal,
                      ]}
                    >
                      {item.qty}
                    </Text>
                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => editItem(item.id)}
                    >
                      <Text style={{ color: '#4f46e5' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => removeItem(item.id)}
                    >
                      <Text style={{ color: '#ef4444' }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111827' },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  backText: { color: '#374151', fontWeight: '500' },
  scrollContainer: { padding: 20 },
  addButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  itemNote: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  itemQty: { fontSize: 16, fontWeight: '700' },
  qtyLow: { color: '#dc2626' },
  qtyNormal: { color: '#16a34a' },
});
