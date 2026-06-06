'use client';

import { useMutation } from '@tanstack/react-query';
import { submitSession } from '@/modules/test-runner/lib/test-session-api';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type {
  SubmitSessionInput,
  TestSession,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

export function useSubmitSession() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useMutation<TestSession, TestSessionError, SubmitSessionInput>({
    mutationFn: (input) => {
      if (!jwt) {
        return Promise.reject<TestSession>({
          kind: 'unauthorized',
          message: 'A student session is required to submit the test',
        } satisfies TestSessionError);
      }
      return submitSession(jwt, input);
    },
  });
}
