'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { downloadJson } from '@/modules/parent-settings/lib/download-json';
import type { ParentExportResponse } from '@/modules/parent-settings/types/parent-settings.types';

export function useExportParentData() {
  const t = useTranslations('ParentSettings');

  return useMutation({
    mutationFn: async () => {
      const { data } = await privateApi.post<ParentExportResponse>(
        '/api/parents/me/export-data',
      );
      return data.data;
    },
    onSuccess: (data) => {
      downloadJson(data, `schoolgo-export-${new Date().toISOString().slice(0, 10)}.json`);
      toast.success(t('exportSuccess'));
    },
    onError: () => {
      toast.error(t('exportError'));
    },
  });
}
