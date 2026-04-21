import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StudentDocument } from '@/modules/students/types/document.types';
import type { StrapiListResponse } from '@/modules/students/types/student.types';

interface UseStudentDocumentsParams {
  studentDocumentId: string;
  documentType?: string;
  status?: string;
}

export function useStudentDocuments({
  studentDocumentId,
  documentType,
  status,
}: UseStudentDocumentsParams) {
  return useQuery({
    queryKey: ['student-documents', studentDocumentId, { documentType, status }],
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'filters[student][documentId][$eq]': studentDocumentId,
        'populate[file]': true,
        'sort[0]': 'createdAt:desc',
        'pagination[pageSize]': 100,
      };

      if (documentType && documentType !== 'all') {
        params['filters[documentType][$eq]'] = documentType;
      }

      if (status && status !== 'all') {
        params['filters[status][$eq]'] = status;
      }

      const { data } = await privateApi.get<StrapiListResponse<StudentDocument>>(
        '/api/student-documents',
        { params },
      );
      return data;
    },
    enabled: !!studentDocumentId,
  });
}
