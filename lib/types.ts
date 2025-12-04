// lib/types.ts
export type ItemPayload = {
  _id?: string;
  name: string;
  sku?: string;
  quantity: number;
  unit?: string;
  category?: string;
  notes?: string;
};
