'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import { NOTIFICATION_PREFERENCES_QUERY_KEY } from '@/modules/parent-settings/constants/notification-preferences.constants';
import type { NotificationPreferencesValues } from '@/modules/parent-settings/schemas/notification-preferences.schema';
import type {
  NotificationPreferencesData,
  UpdateNotificationPreferencesPayload,
} from '@/modules/parent-settings/types/notification-preferences.types';

export function useUpdateNotificationPreferences() {
  const qc = useQueryClient();
  const t = useTranslations('NotificationPreferences');

  return useMutation({
    mutationFn: async (values: NotificationPreferencesValues) => {
      const payload: UpdateNotificationPreferencesPayload = values;
      const { data } = await privateApi.put<StrapiEnvelope<NotificationPreferencesData>>(
        '/api/notification-preferences/me',
        payload,
      );
      return data.data;
    },
    onSuccess: (data) => {
      qc.setQueryData<NotificationPreferencesData>(NOTIFICATION_PREFERENCES_QUERY_KEY, data);
      qc.invalidateQueries({ queryKey: NOTIFICATION_PREFERENCES_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
