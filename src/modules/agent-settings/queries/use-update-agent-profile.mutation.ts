'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  AGENT_SETTINGS_QUERY_KEY,
  type AgentSettingsData,
} from '@/modules/agent-settings/queries/use-agent-settings.query';
import type {
  AgentUserMe,
  UpdateUserProfilePayload,
} from '@/modules/agent-settings/types/agent-settings.types';

export function useUpdateAgentProfile() {
  const qc = useQueryClient();
  const t = useTranslations('AgentSettings');
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateUserProfilePayload) => {
      const { data } = await privateApi.put<AgentUserMe>('/api/users/me', payload);
      return data;
    },
    onSuccess: (data) => {
      const current = useAuthStore.getState().user;
      if (current) {
        const displayName =
          [data.firstName, data.lastName].filter(Boolean).join(' ') || current.displayName;
        setUser({ ...current, displayName });
      }
      qc.setQueryData<AgentSettingsData>(AGENT_SETTINGS_QUERY_KEY, (prev) =>
        prev ? { ...prev, user: { ...prev.user, ...data } } : prev,
      );
      qc.invalidateQueries({ queryKey: AGENT_SETTINGS_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
