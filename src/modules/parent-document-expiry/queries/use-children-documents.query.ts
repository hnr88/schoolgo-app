'use client';

import { useQueries } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { studentExpiryDocumentsResponseSchema } from '@/modules/parent-document-expiry/schemas/document-expiry.schema';
import type { ChildDocumentsResult } from '@/modules/parent-document-expiry/types/document-expiry.types';

export const CHILDREN_DOCUMENTS_QUERY_KEY = ['parent-document-expiry', 'student-documents'] as const;

export function useChildrenDocuments(studentDocumentIds: readonly string[]) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQueries({
    queries: studentDocumentIds.map((studentDocumentId) => ({
      queryKey: [...CHILDREN_DOCUMENTS_QUERY_KEY, studentDocumentId] as const,
      enabled: isAuthenticated,
      queryFn: async (): Promise<ChildDocumentsResult> => {
        const params: Record<string, unknown> = {
          'filters[student][documentId][$eq]': studentDocumentId,
          'filters[status][$eq]': 'active',
          'sort[0]': 'createdAt:desc',
          'pagination[pageSize]': 100,
        };

        const { data } = await privateApi.get<unknown>('/api/student-documents', { params });
        const parsed = studentExpiryDocumentsResponseSchema.parse(data);

        return { studentDocumentId, documents: parsed.data };
      },
    })),
    combine: (results) => ({
      perStudent: results.flatMap((result) => (result.data ? [result.data] : [])),
      isLoading: results.some((result) => result.isLoading),
      isError: results.some((result) => result.isError),
    }),
  });
}
