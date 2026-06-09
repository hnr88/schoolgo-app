'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { sharedStudentsResponseSchema } from '@/modules/agent-shared-students/schemas/shared-student.schema';
import type { SharedStudentShare } from '@/modules/agent-shared-students/types/shared-student.types';

async function fetchSharedWithMe(): Promise<SharedStudentShare[]> {
  const { data } = await privateApi.get('/api/student-agent-shares/mine');
  return sharedStudentsResponseSchema.parse(data).data;
}

export function useSharedWithMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'shared-students', 'mine'],
    queryFn: fetchSharedWithMe,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
