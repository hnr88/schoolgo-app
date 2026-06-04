'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY } from '@/modules/school-settings/constants/notification-preferences.constants';
import type { SchoolNotificationPreferencesValues } from '@/modules/school-settings/schemas/notification-preferences.schema';
import type {
  SchoolNotificationPreferencesData,
  SchoolStrapiEnvelope,
  UpdateSchoolNotificationPreferencesPayload,
} from '@/modules/school-settings/types/notification-preferences.types';

export function useUpdateSchoolNotificationPreferences() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolNotificationPreferences');

  return useMutation({
    mutationFn: async (values: SchoolNotificationPreferencesValues) => {
      const payload: UpdateSchoolNotificationPreferencesPayload = values;
      const { data } = await privateApi.put<
        SchoolStrapiEnvelope<SchoolNotificationPreferencesData>
      >('/api/notification-preferences/me', payload);
      return data.data;
    },
    onSuccess: (data) => {
      qc.setQueryData<SchoolNotificationPreferencesData>(
        SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY,
        data,
      );
      qc.invalidateQueries({ queryKey: SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
