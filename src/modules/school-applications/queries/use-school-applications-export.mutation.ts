'use client';

import { useMutation } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useSchoolApplicationsExport() {
  return useMutation({
    mutationFn: async (): Promise<string> => {
      const { data } = await privateApi.get<string>('/api/school-staffs/me/applications/export', {
        responseType: 'text',
      });
      return data;
    },
  });
}
