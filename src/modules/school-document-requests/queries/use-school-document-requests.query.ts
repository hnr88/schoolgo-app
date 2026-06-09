'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolDocumentRequestRow,
  SchoolDocumentRequestsResponse,
} from '@/modules/school-document-requests/types/school-document-requests.types';

export const SCHOOL_DOCUMENT_REQUESTS_QUERY_KEY = ['school-document-requests'] as const;

export function useSchoolDocumentRequests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SCHOOL_DOCUMENT_REQUESTS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolDocumentRequestRow[]> => {
      const { data } = await privateApi.get<SchoolDocumentRequestsResponse>(
        '/api/document-requests/by-school',
      );
      return data.data;
    },
  });
}
