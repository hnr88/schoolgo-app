'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StrapiUploadResponseItem } from '@/modules/forms/types/media.types';
import type {
  AgentDocument,
  UploadAgentDocumentInput,
} from '@/modules/agent-documents/types/agent-document.types';
import type { StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useUploadAgentDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentDocumentId,
      file,
      documentType,
      fileName,
      notes,
    }: UploadAgentDocumentInput) => {
      const uploadForm = new FormData();
      uploadForm.append('files', file, file.name);

      const { data: uploaded } = await privateApi.post<StrapiUploadResponseItem[]>(
        '/api/upload',
        uploadForm,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      const fileId = uploaded?.[0]?.id;
      if (!fileId) throw new Error('Upload returned an empty response');

      const { data } = await privateApi.post<StrapiSingleResponse<AgentDocument>>(
        '/api/student-documents/mine',
        {
          data: {
            documentType,
            student: studentDocumentId,
            file: fileId,
            ...(fileName ? { fileName } : {}),
            ...(notes ? { notes } : {}),
          },
        },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent-documents'] });
    },
  });
}
