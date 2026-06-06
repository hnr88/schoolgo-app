'use client';

import { useMagicLinkLanding } from '@/modules/test-runner/hooks/useMagicLinkLanding';
import { TestLandingSkeleton } from '@/modules/test-runner/components/TestLandingSkeleton';
import { TestLinkError } from '@/modules/test-runner/components/TestLinkError';
import { TestSessionReady } from '@/modules/test-runner/components/TestSessionReady';

export function TestLanding({ token, testDocumentId }: { token?: string; testDocumentId?: string }) {
  const { status, student, error } = useMagicLinkLanding(token);

  if (status === 'error' && error) {
    return <TestLinkError error={error} />;
  }
  if (status === 'ready' && student) {
    return <TestSessionReady student={student} testDocumentId={testDocumentId} />;
  }
  return <TestLandingSkeleton />;
}
