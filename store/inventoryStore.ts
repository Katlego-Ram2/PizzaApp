// store/inventoryStore.ts
import { create } from "zustand";
import { ItemPayload } from "../lib/types";

interface InventoryState {
  items: ItemPayload[];
  setItems: (items: ItemPayload[]) => void;
  addItem: (item: ItemPayload) => void;
  clearItems: () => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  clearItems: () => set({ items: [] }),
}));
