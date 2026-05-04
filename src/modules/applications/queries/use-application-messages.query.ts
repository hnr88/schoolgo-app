import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiApplicationMessagesResponse } from '@/modules/applications/types/detail.types';

export function useApplicationMessages(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', applicationDocumentId, 'messages'],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiApplicationMessagesResponse>(
        `/api/applications/${applicationDocumentId}/messages`
      );
      return data;
    },
  });
}
