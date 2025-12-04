import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ItemPayload } from '@/lib/types'; // ✅ use unified type

export const useCreateItem = (): UseMutationResult<
  any,
  Error,
  ItemPayload,
  unknown
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
