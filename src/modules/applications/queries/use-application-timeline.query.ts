import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiApplicationTimelineResponse } from '@/modules/applications/types/detail.types';

export function useApplicationTimeline(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', applicationDocumentId, 'timeline'],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiApplicationTimelineResponse>(
        `/api/applications/${applicationDocumentId}/timeline`
      );
      return data;
    },
  });
}
