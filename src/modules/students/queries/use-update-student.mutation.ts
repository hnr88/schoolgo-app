import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { Student, StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useUpdateStudent(documentId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: StudentFormValues) => {
      const { data } = await privateApi.put<StrapiSingleResponse<Student>>(
        `/api/students/${documentId}`,
        { data: values },
      );
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] });
      qc.invalidateQueries({ queryKey: ['students', documentId] });
    },
  });
}
