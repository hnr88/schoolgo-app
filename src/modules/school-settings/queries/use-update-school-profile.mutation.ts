'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolUserMe,
  UpdateSchoolProfilePayload,
} from '@/modules/school-settings/types/school-settings.types';

export function useUpdateSchoolProfile() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolSettings');
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateSchoolProfilePayload) => {
      const { data } = await privateApi.put<SchoolUserMe>('/api/users/me', payload);
      return data;
    },
    onSuccess: (data) => {
      const current = useAuthStore.getState().user;
      if (current) {
        const displayName =
          [data.firstName, data.lastName].filter(Boolean).join(' ') || current.displayName;
        setUser({ ...current, displayName });
      }
      const userId = useAuthStore.getState().user?.id ?? null;
      qc.setQueryData(['school', 'me', userId], data);
      qc.invalidateQueries({ queryKey: ['school', 'me'] });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
