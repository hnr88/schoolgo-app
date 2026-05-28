'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiListResponse } from '@/modules/students/types/student.types';
import type {
  AgentDocument,
  AgentDocumentFilters,
} from '@/modules/agent-documents/types/agent-document.types';

export function useAgentDocuments({
  studentDocumentId,
  documentType,
  status,
}: AgentDocumentFilters = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent-documents', { studentDocumentId, documentType, status }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'populate[file][fields][0]': 'url',
        'populate[file][fields][1]': 'name',
        'populate[file][fields][2]': 'mime',
        'populate[file][fields][3]': 'size',
        'populate[student][fields][0]': 'firstName',
        'populate[student][fields][1]': 'lastName',
        'sort[0]': 'createdAt:desc',
        'pagination[pageSize]': 100,
      };

      if (studentDocumentId && studentDocumentId !== 'all') {
        params['filters[student][documentId][$eq]'] = studentDocumentId;
      }
      if (documentType && documentType !== 'all') {
        params['filters[documentType][$eq]'] = documentType;
      }
      if (status && status !== 'all') {
        params['filters[status][$eq]'] = status;
      }

      const { data } = await privateApi.get<StrapiListResponse<AgentDocument>>(
        '/api/student-documents',
        { params },
      );
      return data;
    },
  });
}
