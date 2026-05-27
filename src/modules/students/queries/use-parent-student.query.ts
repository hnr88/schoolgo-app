'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { PARENT_STUDENT_POPULATE } from '@/modules/students/constants/parent-students.constants';
import type { ParentStudentDetailResponse } from '@/modules/students/types/parent-student.types';

export function useParentStudent(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'student', documentId],
    enabled: !!documentId && isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentStudentDetailResponse>(
        `/api/students/${documentId}`,
        { params: PARENT_STUDENT_POPULATE },
      );
      return data.data;
    },
  });
}
