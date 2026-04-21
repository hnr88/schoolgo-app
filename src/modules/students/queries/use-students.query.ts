import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Student, StrapiListResponse } from '@/modules/students/types/student.types';

interface UseStudentsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export function useStudents({ page = 1, pageSize = 25, status, search }: UseStudentsParams = {}) {
  return useQuery({
    queryKey: ['students', { page, pageSize, status, search }],
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
        'sort[0]': 'createdAt:desc',
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
