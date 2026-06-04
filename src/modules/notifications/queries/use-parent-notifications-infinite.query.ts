'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { NOTIFICATIONS_DEFAULT_PAGE_SIZE } from '../constants/notification.constants';
import type {
  ParentNotificationsResponse,
  UseParentNotificationsParams,
} from '../types/notification.types';

type InfiniteParams = Pick<UseParentNotificationsParams, 'pageSize' | 'eventType' | 'read'>;

export function useParentNotificationsInfinite({
  pageSize = NOTIFICATIONS_DEFAULT_PAGE_SIZE,
  eventType,
  read,
}: InfiniteParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useInfiniteQuery({
    queryKey: ['parent', 'notifications', { pageSize, eventType, read }],
    enabled: isAuthenticated,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params: Record<string, unknown> = {
        page: pageParam,
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
    getNextPageParam: (lastPage) => {
      const { page, pageSize: size, total } = lastPage.meta.pagination;
      const loaded = page * size;
      return loaded < total ? page + 1 : undefined;
    },
  });
}
