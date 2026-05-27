import {
  TEST_TYPE_LABELS,
  VERIFICATION_STATUS_LABELS,
  type TestType,
  type VerificationStatus,
} from '@/modules/test-results';

export function testTypeLabelKey(testType: string): string {
  return TEST_TYPE_LABELS[testType as TestType] ?? TEST_TYPE_LABELS.other;
}

export function verificationLabelKey(status: string): string {
  return VERIFICATION_STATUS_LABELS[status as VerificationStatus] ?? VERIFICATION_STATUS_LABELS.unverified;
}
