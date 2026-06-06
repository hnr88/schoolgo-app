'use client';

import { useMutation } from '@tanstack/react-query';
import { requestNextItem } from '@/modules/test-runner/lib/test-session-api';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type {
  NextItemInput,
  NextItemResult,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

export function useNextItem() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useMutation<NextItemResult, TestSessionError, NextItemInput>({
    mutationFn: (input) => {
      if (!jwt) {
        return Promise.reject<NextItemResult>({
          kind: 'unauthorized',
          message: 'A student session is required to advance the test',
        } satisfies TestSessionError);
      }
      return requestNextItem(jwt, input);
    },
  });
}
