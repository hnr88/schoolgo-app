import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiApplicationDocumentsResponse } from '@/modules/applications/types/detail.types';

export function useApplicationDocuments(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', applicationDocumentId, 'documents'],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiApplicationDocumentsResponse>(
        `/api/applications/${applicationDocumentId}/documents`
      );
      return data;
    },
  });
}
