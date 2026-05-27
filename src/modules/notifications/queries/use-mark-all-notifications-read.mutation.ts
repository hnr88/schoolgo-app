'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await privateApi.put('/api/notifications/read-all');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent', 'notifications'] });
      queryClient.invalidateQueries({ queryKey: ['parent', 'notifications', 'unread-count'] });
    },
  });
}
