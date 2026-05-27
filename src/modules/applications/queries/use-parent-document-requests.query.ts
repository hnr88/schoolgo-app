'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentDocumentRequestsResponse } from '@/modules/applications/types/parent-document.types';

export function useParentDocumentRequests(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'document-requests', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentDocumentRequestsResponse>(
        '/api/document-requests',
        {
          params: {
            'filters[application][documentId][$eq]': applicationDocumentId,
            'populate[requestedBy][fields][0]': 'documentId',
            'sort[0]': 'createdAt:desc',
          },
        },
      );
      return data;
    },
  });
}
