'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { UNREAD_COUNT_REFETCH_INTERVAL_MS } from '../constants/notification.constants';
import type { UnreadCountResponse } from '../types/notification.types';

export function useParentUnreadCount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'notifications', 'unread-count'],
    enabled: isAuthenticated,
    refetchInterval: UNREAD_COUNT_REFETCH_INTERVAL_MS,
    queryFn: async () => {
      const { data } = await privateApi.get<UnreadCountResponse>(
        '/api/notifications/unread-count',
      );
      return data.data.count;
    },
  });
}
