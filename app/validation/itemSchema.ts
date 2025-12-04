import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().optional(),
  quantity: z.coerce.number().int().nonnegative("Quantity cannot be negative"),
  unit: z.string().optional(),
  sku: z.string().optional(),
  reorderLevel: z.coerce.number().optional(),
  notes: z.string().optional(),
});
