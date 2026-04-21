import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StudentDocument } from '@/modules/students/types/document.types';
import type { StrapiSingleResponse } from '@/modules/students/types/student.types';

interface UploadDocumentInput {
  studentDocumentId: string;
  file: File;
  documentType: string;
  fileName?: string;
  expiresAt?: string;
  notes?: string;
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ studentDocumentId, file, ...fields }: UploadDocumentInput) => {
      const formData = new FormData();

      const jsonData = {
        student: studentDocumentId,
        documentType: fields.documentType,
        ...(fields.fileName && { fileName: fields.fileName }),
        ...(fields.expiresAt && { expiresAt: fields.expiresAt }),
        ...(fields.notes && { notes: fields.notes }),
      };

      formData.append('data', JSON.stringify(jsonData));
      formData.append('files.file', file, file.name);

      const { data } = await privateApi.post<StrapiSingleResponse<StudentDocument>>(
        '/api/student-documents',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['student-documents'] });
    },
  });
}
