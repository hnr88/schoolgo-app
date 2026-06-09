'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { studentExpiryDocumentsResponseSchema } from '@/modules/parent-document-expiry/schemas/document-expiry.schema';

export const CHILDREN_DOCUMENTS_QUERY_KEY = ['parent-document-expiry', 'student-documents'] as const;

export function useChildrenDocuments() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: CHILDREN_DOCUMENTS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<unknown>('/api/student-documents/mine-children');
      return studentExpiryDocumentsResponseSchema.parse(data);
    },
  });
}
