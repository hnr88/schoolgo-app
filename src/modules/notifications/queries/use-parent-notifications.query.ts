'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { NOTIFICATIONS_DEFAULT_PAGE_SIZE } from '../constants/notification.constants';
import type {
  ParentNotificationsResponse,
  UseParentNotificationsParams,
} from '../types/notification.types';

export function useParentNotifications({
  page = 1,
  pageSize = NOTIFICATIONS_DEFAULT_PAGE_SIZE,
  eventType,
  read,
}: UseParentNotificationsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'notifications', { page, pageSize, eventType, read }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        page,
        pageSize,
      };

      if (eventType) {
        params.eventType = eventType;
      }

      if (read !== undefined) {
        params.read = read;
      }

      const { data } = await privateApi.get<ParentNotificationsResponse>(
        '/api/notifications/me',
        { params },
      );
      return data;
    },
  });
}
