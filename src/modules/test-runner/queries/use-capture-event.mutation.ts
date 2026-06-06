'use client';

import { useMutation } from '@tanstack/react-query';
import { captureProctoringEvent } from '@/modules/test-runner/lib/telemetry';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type { CaptureEventInput, ProctoringEvent } from '@/modules/test-runner/types/proctoring.types';
import type { TestSessionError } from '@/modules/test-runner/types/test-session.types';

export function useCaptureEvent() {
  const jwt = useStudentSessionStore((s) => s.jwt);

  return useMutation<ProctoringEvent, TestSessionError, CaptureEventInput>({
    mutationFn: (input) => {
      if (!jwt) {
        return Promise.reject<ProctoringEvent>({
          kind: 'unauthorized',
          message: 'A student session is required to capture proctoring events',
        } satisfies TestSessionError);
      }
      return captureProctoringEvent(jwt, input);
    },
  });
}
