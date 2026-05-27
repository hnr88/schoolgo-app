'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentUploadedDocumentsResponse } from '@/modules/applications/types/parent-document.types';

export function useParentStudentDocuments(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'student-documents', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentUploadedDocumentsResponse>(
        `/api/student-documents/mine/by-application/${applicationDocumentId}`,
      );
      return data;
    },
  });
}
