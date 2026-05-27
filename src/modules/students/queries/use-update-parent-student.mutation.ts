'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { buildParentStudentPayload } from '@/modules/students/lib/build-parent-student-payload';
import type { ParentStudentFormValues } from '@/modules/students/schemas/parent-student.schema';
import type { Student, StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useUpdateParentStudent(documentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (values: ParentStudentFormValues) => {
      const payload = buildParentStudentPayload(values);
      const { data } = await privateApi.put<StrapiSingleResponse<Student>>(
        `/api/students/${documentId}`,
        { data: payload },
      );
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['parent', 'students'] });
      qc.invalidateQueries({ queryKey: ['parent', 'student', documentId] });
    },
  });
}
