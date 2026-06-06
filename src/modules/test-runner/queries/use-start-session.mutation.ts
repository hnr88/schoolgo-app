'use client';

import { useMutation } from '@tanstack/react-query';
import { startSession } from '@/modules/test-runner/lib/test-session-api';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type {
  StartSessionInput,
  TestSession,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

export function useStartSession() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useMutation<TestSession, TestSessionError, StartSessionInput>({
    mutationFn: (input) => {
      if (!jwt) {
        return Promise.reject<TestSession>({
          kind: 'unauthorized',
          message: 'A student session is required to start a test',
        } satisfies TestSessionError);
      }
      return startSession(jwt, input);
    },
  });
}
