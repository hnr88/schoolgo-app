'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  ParentUploadedDocument,
  UploadParentDocumentInput,
} from '@/modules/applications/types/parent-document.types';

export function useUploadParentDocument(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UploadParentDocumentInput) => {
      const { data } = await privateApi.post<{ data: ParentUploadedDocument }>(
        '/api/student-documents/mine',
        { data: input },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parent', 'student-documents', applicationDocumentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['parent', 'document-requests', applicationDocumentId],
      });
    },
  });
}
