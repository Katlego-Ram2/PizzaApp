import axios from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3000/api"; // make sure .env has API_URL

export const api = {
  getItems: async () => {
    const res = await axios.get(`${BASE_URL}/inventory`);
    return res.data;
  },

  getItem: async (id: string) => {
    const res = await axios.get(`${BASE_URL}/inventory/${id}`);
    return res.data;
  },

  createItem: async (payload: any) => {
    const res = await axios.post(`${BASE_URL}/inventory`, payload);
    return res.data;
  },

  updateItem: async (id: string, payload: any) => {
    const res = await axios.put(`${BASE_URL}/inventory/${id}`, payload);
    return res.data;
  },

  deleteItem: async (id: string) => {
    const res = await axios.delete(`${BASE_URL}/inventory/${id}`);
    return res.data;
  },

  // ✅ Add this for quantity adjustments
  adjustQuantity: async (id: string, quantity: number, note?: string) => {
    const res = await axios.post(`${BASE_URL}/inventory/adjust`, {
      itemId: id,
      quantity,
      type: quantity > 0 ? "add" : "remove",
      note,
    });
    return res.data;
  },
};
