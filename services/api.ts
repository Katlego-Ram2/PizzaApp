import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = {
  // Get one item
  getItem: async (id: string) => {
    const res = await axios.get(`${API_URL}/inventory/${id}`);
    return res.data;
  },

  // Get all items
  getItems: async () => {
    const res = await axios.get(`${API_URL}/inventory`);
    return res.data;
  },

  // Create item
  createItem: async (payload: any) => {
    const res = await axios.post(`${API_URL}/inventory`, payload);
    return res.data;
  },

  // Update item
  updateItem: async (id: string, payload: any) => {
    const res = await axios.put(`${API_URL}/inventory/${id}`, payload);
    return res.data;
  },

  // Delete item
  deleteItem: async (id: string) => {
    const res = await axios.delete(`${API_URL}/inventory/${id}`);
    return res.data;
  },
};
