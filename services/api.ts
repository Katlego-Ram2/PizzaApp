import { InventoryItem, QuantityChange } from "../types/Item";

// In-memory storage
let items: InventoryItem[] = [];
let changes: QuantityChange[] = [];

export const api = {
  /** List all inventory items */
  async listItems(): Promise<InventoryItem[]> {
    // Return a copy to prevent accidental mutation
    return [...items];
  },

  /** Get a single item by ID */
  async getItem(id: string): Promise<InventoryItem | null> {
    return items.find((i) => i.id === id) ?? null;
  },

  /** Create a new item */
  async createItem(data: Omit<InventoryItem, "id" | "updatedAt">): Promise<InventoryItem> {
    const newItem: InventoryItem = {
      ...data,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newItem);
    return newItem;
  },

  /** Update an existing item */
  async updateItem(id: string, data: Partial<Omit<InventoryItem, "id">>): Promise<InventoryItem | null> {
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
    return items[index];
  },

  /** Delete an item and its change log */
  async deleteItem(id: string): Promise<boolean> {
    const exists = items.some((i) => i.id === id);
    if (!exists) return false;

    items = items.filter((i) => i.id !== id);
    changes = changes.filter((c) => c.itemId !== id);
    return true;
  },

  /** Adjust quantity (add/remove) */
  async adjustQuantity(itemId: string, amount: number, reason: string): Promise<QuantityChange> {
    const item = items.find((i) => i.id === itemId);
    if (!item) throw new Error("Item not found");

    item.quantity += amount;
    item.updatedAt = new Date().toISOString();

    const entry: QuantityChange = {
      id: Date.now().toString(),
      itemId,
      amount: Math.abs(amount),
      type: amount > 0 ? "ADD" : "REMOVE",
      reason,
      createdAt: new Date().toISOString(),
    };

    changes.push(entry);
    return entry;
  },

  /** Get quantity adjustment log for an item */
  async getItemLog(itemId: string): Promise<QuantityChange[]> {
    return changes.filter((c) => c.itemId === itemId);
  },
};
