'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export interface ChecklistItem {
  stepName: string;
  stepType: string;
  required: boolean;
  status: 'complete' | 'partial' | 'missing';
  details?: string;
}

interface ChecklistResponse {
  data: { checklist: ChecklistItem[]; message?: string };
}

export function useSchoolChecklist(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school-applications', applicationDocumentId, 'checklist'],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<ChecklistItem[]> => {
      const { data } = await privateApi.get<ChecklistResponse>(
        `/api/applications/${applicationDocumentId}/checklist`,
      );
      return data.data?.checklist ?? [];
    },
  });
}
