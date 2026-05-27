'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.put(`/api/notifications/${documentId}/read`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent', 'notifications'] });
      queryClient.invalidateQueries({ queryKey: ['parent', 'notifications', 'unread-count'] });
    },
  });
}
