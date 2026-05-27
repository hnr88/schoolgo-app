import type { TestType, VerificationStatus } from '@/modules/test-results/types/test-result.types';

export const TEST_TYPE_LABELS: Record<TestType, string> = {
  aeas: 'testTypeAeas',
  ielts: 'testTypeIelts',
  pte: 'testTypePte',
  cambridge: 'testTypeCambridge',
  toefl: 'testTypeToefl',
  duolingo: 'testTypeDuolingo',
  istart: 'testTypeIstart',
  idat: 'testTypeIdat',
  other: 'testTypeOther',
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  unverified: 'verificationUnverified',
  verifying: 'verificationVerifying',
  issuer_verified: 'verificationIssuerVerified',
  direct_delivered: 'verificationDirectDelivered',
  revoked: 'verificationRevoked',
};

export const VERIFICATION_STATUS_STYLES: Record<
  VerificationStatus,
  { dot: string; bg: string; text: string }
> = {
  unverified: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  verifying: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
  issuer_verified: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  direct_delivered: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  revoked: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
};

export const TEST_RESULTS_POPULATE: Record<string, string> = {
  'populate[student][fields][0]': 'firstName',
  'populate[student][fields][1]': 'lastName',
  'populate[student][fields][2]': 'documentId',
};

export const TEST_RESULTS_DEFAULT_PAGE_SIZE = 50;
