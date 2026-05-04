import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { Student, StrapiListResponse } from '@/modules/students/types/student.types';
import type { UseStudentsParams } from '@/modules/students/types/query.types';

export function useStudents({ page = 1, pageSize = 12, status, search, sort }: UseStudentsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['students', { page, pageSize, status, search, sort }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
        'sort[0]': sort || 'createdAt:desc',
      };

      if (status && status !== 'all') {
        params['filters[status][$eq]'] = status;
      }

      if (search) {
        params['filters[$or][0][firstName][$containsi]'] = search;
        params['filters[$or][1][lastName][$containsi]'] = search;
      }

      const { data } = await privateApi.get<StrapiListResponse<Student>>('/api/students', { params });
      return data;
    },
  });
}
