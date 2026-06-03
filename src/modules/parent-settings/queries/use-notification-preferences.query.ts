'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import { NOTIFICATION_PREFERENCES_QUERY_KEY } from '@/modules/parent-settings/constants/notification-preferences.constants';
import type { NotificationPreferencesData } from '@/modules/parent-settings/types/notification-preferences.types';

export function useNotificationPreferences() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<NotificationPreferencesData>({
    queryKey: NOTIFICATION_PREFERENCES_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiEnvelope<NotificationPreferencesData>>(
        '/api/notification-preferences/me',
      );
      return data.data;
    },
  });
}
