'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_DOCUMENT_REQUESTS_QUERY_KEY } from '@/modules/school-document-requests/queries/use-school-document-requests.query';
import type { CreateDocumentRequestPayload } from '@/modules/school-document-requests/types/school-document-requests.types';

export function useCreateDocumentRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDocumentRequestPayload) => {
      const { data } = await privateApi.post('/api/document-requests', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_DOCUMENT_REQUESTS_QUERY_KEY });
    },
  });
}
