'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { PARENT_TIMELINE_DEFAULT_PAGE_SIZE } from '@/modules/applications/constants/parent-timeline.constants';
import type { ParentTimelineResponse } from '@/modules/applications/types/parent-timeline.types';

export function useParentApplicationTimeline(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'timeline', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentTimelineResponse>('/api/timeline-events', {
        params: {
          'filters[application][documentId][$eq]': applicationDocumentId,
          'sort[0]': 'createdAt:desc',
          'pagination[pageSize]': PARENT_TIMELINE_DEFAULT_PAGE_SIZE,
        },
      });
      return data;
    },
  });
}
