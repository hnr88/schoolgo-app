'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolTimelineEvent,
  SchoolTimelineResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolTimelineKey(applicationDocumentId: string) {
  return ['school-applications', applicationDocumentId, 'timeline'] as const;
}

export function useSchoolTimeline(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolTimelineKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<SchoolTimelineEvent[]> => {
      const { data } = await privateApi.get<SchoolTimelineResponse>('/api/timeline-events', {
        params: {
          'filters[application][documentId][$eq]': applicationDocumentId,
          'sort[0]': 'createdAt:desc',
          'pagination[pageSize]': 100,
        },
      });
      return data.data;
    },
  });
}
