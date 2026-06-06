'use client';

import { useMutation } from '@tanstack/react-query';
import { syncResponses } from '@/modules/test-runner/lib/test-session-api';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type {
  SyncResponsesInput,
  TestSession,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

export function useSyncResponses() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useMutation<TestSession, TestSessionError, SyncResponsesInput>({
    mutationFn: (input) => {
      if (!jwt) {
        return Promise.reject<TestSession>({
          kind: 'unauthorized',
          message: 'A student session is required to save responses',
        } satisfies TestSessionError);
      }
      return syncResponses(jwt, input);
    },
  });
}
