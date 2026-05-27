'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  ParentMe,
  UpdateProfilePayload,
} from '@/modules/parent-settings/types/parent-settings.types';

export function useUpdateProfile() {
  const qc = useQueryClient();
  const t = useTranslations('ParentSettings');
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const { data } = await privateApi.put<ParentMe>('/api/users/me', payload);
      return data;
    },
    onSuccess: (data) => {
      const current = useAuthStore.getState().user;
      if (current) {
        const displayName =
          [data.firstName, data.lastName].filter(Boolean).join(' ') || current.displayName;
        setUser({ ...current, displayName });
      }
      qc.setQueryData(['parent', 'me'], data);
      qc.invalidateQueries({ queryKey: ['parent', 'me'] });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
