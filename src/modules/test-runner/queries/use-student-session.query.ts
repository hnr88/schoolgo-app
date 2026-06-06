'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStudentSession } from '@/modules/test-runner/lib/student-session';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';

export function useStudentSession() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useQuery({
    queryKey: ['student-session', jwt],
    enabled: Boolean(jwt),
    retry: false,
    staleTime: 30_000,
    queryFn: () => fetchStudentSession(jwt as string),
  });
}
