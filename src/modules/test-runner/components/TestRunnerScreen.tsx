'use client';

import { useTranslations } from 'next-intl';
import { TestRunner } from '@/modules/test-runner/components/TestRunner';
import { TestLandingSkeleton } from '@/modules/test-runner/components/TestLandingSkeleton';
import { TestLinkError } from '@/modules/test-runner/components/TestLinkError';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';

export function TestRunnerScreen({ testDocumentId }: { testDocumentId?: string }) {
  const t = useTranslations('TestRunner');
  const jwt = useStudentSessionStore((s) => s.jwt);
  const isHydrated = useStudentSessionStore((s) => s.isHydrated);

  if (!isHydrated) {
    return <TestLandingSkeleton />;
  }
  if (!jwt) {
    return <TestLinkError error={{ kind: 'missing_token', message: t('error.missing_token') }} />;
  }
  const trimmed = testDocumentId?.trim();
  if (!trimmed) {
    return <TestLinkError error={{ kind: 'unavailable', message: t('runner.noTest') }} />;
  }
  return <TestRunner testDocumentId={trimmed} />;
}
