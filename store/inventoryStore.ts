import { create } from "zustand";
import { api } from "../services/api";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  description?: string;
}

export interface InventoryState {
  items: InventoryItem[];
  loading: boolean;

  fetchItems: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  loading: false,

  fetchItems: async () => {
    try {
      set({ loading: true });
      const data = await api.getItems();
      set({ items: data });
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (id: string) => {
    try {
      await api.deleteItem(id);
      set({ items: get().items.filter((i) => i.id !== id) });
    } catch (err) {
      console.log("Delete error:", err);
    }
  },
}));
