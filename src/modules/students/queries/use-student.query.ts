import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Student, StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useStudent(documentId: string) {
  return useQuery({
    queryKey: ['students', documentId],
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiSingleResponse<Student>>(
        `/api/students/${documentId}`,
      );
      return data.data;
    },
    enabled: !!documentId,
  });
}
