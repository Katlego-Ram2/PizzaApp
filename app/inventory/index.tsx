import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function InventoryScreen() {
  const router = useRouter();

  const allItems = [
    { id: '1', name: 'Margherita', qty: 8, note: 'Chef special' },
    { id: '2', name: 'Pepperoni', qty: 4, note: 'Low stock' },
    { id: '3', name: 'Dough Balls', qty: 20, note: 'Fresh batch' },
    { id: '4', name: 'Cheese', qty: 15, note: 'Mozzarella blocks' },
    { id: '5', name: 'Tomato Sauce', qty: 9, note: 'Homemade blend' },
  ];

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
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Item</Text>
        </TouchableOpacity>

        {/* Inventory list */}
        <View>
          <Text style={styles.sectionTitle}>All Items</Text>
          <View style={{ marginTop: 10 }}>
            {allItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemNote}>{item.note}</Text>
                  </View>
                  <Text style={[styles.itemQty, item.qty < 5 ? styles.qtyLow : styles.qtyNormal]}>
                    {item.qty}
                  </Text>
                </View>
              </TouchableOpacity>
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
