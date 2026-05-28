'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { downloadJson } from '@/modules/agent-settings/lib/download-json';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type { AgentExportData } from '@/modules/agent-settings/types/agent-settings.types';

export function useExportAgentData() {
  const t = useTranslations('AgentSettings');

  return useMutation({
    mutationFn: async () => {
      const { data } = await privateApi.post<StrapiEnvelope<AgentExportData>>(
        '/api/agents/me/export-data',
      );
      return data.data;
    },
    onSuccess: (data) => {
      downloadJson(data, `schoolgo-agent-data-${new Date().toISOString().slice(0, 10)}.json`);
      toast.success(t('exportSuccess'));
    },
    onError: () => {
      toast.error(t('exportError'));
    },
  });
}
