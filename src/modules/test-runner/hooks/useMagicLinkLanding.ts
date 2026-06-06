'use client';

import { useEffect } from 'react';
import { isStudentSessionError } from '@/modules/test-runner/lib/student-session';
import { useVerifyMagicLink } from '@/modules/test-runner/queries/use-verify-magic-link.query';
import { useStudentSession } from '@/modules/test-runner/queries/use-student-session.query';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import type {
  StudentSessionError,
  StudentSessionStudent,
} from '@/modules/test-runner/types/student-session.types';

type LandingStatus = 'verifying' | 'resolving' | 'ready' | 'error';

interface MagicLinkLanding {
  status: LandingStatus;
  student: StudentSessionStudent | null;
  error: StudentSessionError | null;
}

function toError(err: unknown, fallback: StudentSessionError): StudentSessionError {
  return isStudentSessionError(err) ? err : fallback;
}

export function useMagicLinkLanding(token: string | undefined): MagicLinkLanding {
  const jwt = useStudentSessionStore((s) => s.jwt);
  const setSession = useStudentSessionStore((s) => s.setSession);

  const verify = useVerifyMagicLink(token, !jwt);
  useEffect(() => {
    if (verify.data) {
      setSession(verify.data.jwt, verify.data.student);
    }
  }, [verify.data, setSession]);

  const sessionQuery = useStudentSession();

  if (verify.isError) {
    return {
      status: 'error',
      student: null,
      error: toError(verify.error, {
        kind: 'invalid_token',
        message: 'This sign-in link is invalid or expired.',
      }),
    };
  }
  if (token && !jwt && (verify.isPending || verify.isFetching)) {
    return { status: 'verifying', student: null, error: null };
  }
  if (!token && !jwt) {
    return {
      status: 'error',
      student: null,
      error: { kind: 'missing_token', message: 'This page requires a sign-in link.' },
    };
  }
  if (sessionQuery.isError) {
    return {
      status: 'error',
      student: null,
      error: toError(sessionQuery.error, {
        kind: 'invalid_token',
        message: 'This sign-in link is invalid or expired.',
      }),
    };
  }
  if (sessionQuery.data) {
    return { status: 'ready', student: sessionQuery.data.student, error: null };
  }
  return { status: 'resolving', student: null, error: null };
}
