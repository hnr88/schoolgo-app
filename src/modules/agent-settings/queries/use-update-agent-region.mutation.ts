'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import {
  AGENT_SETTINGS_QUERY_KEY,
  type AgentSettingsData,
} from '@/modules/agent-settings/queries/use-agent-settings.query';
import type { AgentRegionValues } from '@/modules/agent-settings/schemas/region.schema';

export function useUpdateAgentRegion() {
  const qc = useQueryClient();
  const t = useTranslations('AgentSettings');

  return useMutation({
    mutationFn: async (values: AgentRegionValues) => {
      await privateApi.put('/api/agents/me/locale-preferences', {
        interfaceLanguage: values.interfaceLanguage,
        timezone: values.timezone,
        dateFormat: values.dateFormat,
      });
      return values;
    },
    onSuccess: (values) => {
      qc.setQueryData<AgentSettingsData>(AGENT_SETTINGS_QUERY_KEY, (prev) =>
        prev ? { ...prev, locale: { ...values } } : prev,
      );
      qc.invalidateQueries({ queryKey: AGENT_SETTINGS_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
