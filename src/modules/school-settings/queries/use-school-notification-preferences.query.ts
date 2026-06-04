'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY } from '@/modules/school-settings/constants/notification-preferences.constants';
import type {
  SchoolNotificationPreferencesData,
  SchoolStrapiEnvelope,
} from '@/modules/school-settings/types/notification-preferences.types';

export function useSchoolNotificationPreferences() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolNotificationPreferencesData>({
    queryKey: SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<
        SchoolStrapiEnvelope<SchoolNotificationPreferencesData>
      >('/api/notification-preferences/me');
      return data.data;
    },
  });
}
