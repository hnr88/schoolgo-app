'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  PARENT_STUDENT_POPULATE,
  PARENT_STUDENTS_DEFAULT_PAGE_SIZE,
} from '@/modules/students/constants/parent-students.constants';
import type {
  ParentStudentsResponse,
  UseParentStudentsParams,
} from '@/modules/students/types/parent-student.types';

export function useParentStudents({
  page = 1,
  pageSize = PARENT_STUDENTS_DEFAULT_PAGE_SIZE,
  search,
  sort,
  status,
}: UseParentStudentsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'students', { page, pageSize, search, sort, status }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        ...PARENT_STUDENT_POPULATE,
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
        'sort[0]': sort || 'createdAt:desc',
      };

      if (search) {
        params['filters[$or][0][firstName][$containsi]'] = search;
        params['filters[$or][1][lastName][$containsi]'] = search;
      }

      if (status === 'archived') {
        params['filters[status][$eq]'] = 'archived';
      }

      const { data } = await privateApi.get<ParentStudentsResponse>('/api/students', { params });
      return data;
    },
  });
}
