import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { api } from '@/lib/api';

export type ItemPayload = {
  _id?: string;
  name: string;
  sku?: string;
  quantity: number;
  unit?: string;
  category?: string;
  notes?: string;
};

// Explicit generics & return type
export const useCreateItem = (): UseMutationResult<
  any,        // TData returned by mutation
  Error,      // TError
  ItemPayload, // TVariables (payload)
  unknown     // TContext
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ItemPayload, unknown>({
    mutationFn: async (payload: ItemPayload) => {
      const { data } = await api.post('/items', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (err: unknown) => {
      console.error('Error creating item:', err);
    },
  });
};
