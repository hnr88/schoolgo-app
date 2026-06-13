'use client';

import { useMutation } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useComplianceExport() {
  return useMutation({
    mutationFn: async (): Promise<string> => {
      const { data } = await privateApi.get<string>('/api/school-staffs/me/compliance/export', {
        responseType: 'text',
      });
      return data;
    },
  });
}
