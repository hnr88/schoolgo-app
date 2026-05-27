'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Student, StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useArchiveParentStudent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.post<StrapiSingleResponse<Student>>(
        `/api/students/${documentId}/archive`,
      );
      return data.data;
    },
    onSuccess: (_data, documentId) => {
      qc.invalidateQueries({ queryKey: ['parent', 'students'] });
      qc.invalidateQueries({ queryKey: ['parent', 'student', documentId] });
    },
  });
}
