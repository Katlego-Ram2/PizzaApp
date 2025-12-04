export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  category?: string;
  updatedAt: string;
}

export interface QuantityChange {
  id: string;
  itemId: string;
  type: "ADD" | "REMOVE";
  amount: number;
  reason: string;
  createdAt: string;
}
