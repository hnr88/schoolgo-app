import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { Student, StrapiSingleResponse } from '@/modules/students/types/student.types';

export function useStudent(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['students', documentId],
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiSingleResponse<Student>>(
        `/api/students/${documentId}`,
      );
      return data.data;
    },
    enabled: !!documentId && isAuthenticated,
  });
}
