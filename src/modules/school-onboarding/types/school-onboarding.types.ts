export type { ClaimValues } from '@/modules/school-onboarding/schemas/claim.schema';
export type { VerifyValues } from '@/modules/school-onboarding/schemas/verify.schema';

export interface UnclaimedSchool {
  documentId: string;
  name: string;
  cricosCode: string | null;
  suburb: string | null;
  state: string | null;
  sector: string | null;
  claimed: boolean;
}

export type ClaimVerificationStatus = 'verified' | 'pending';

export interface ClaimSchoolPayload {
  schoolDocumentId: string;
  roleTitle: string;
}

export interface ClaimedStaffRecord {
  documentId: string;
  roleTitle: string;
  permissionLevel: 'admin' | 'staff';
  status: 'active' | 'pending_verification';
}

export interface ClaimSchoolResult {
  staff: ClaimedStaffRecord;
  verificationStatus: ClaimVerificationStatus;
}

export interface SendVerificationCodeResult {
  sent: boolean;
  expiresAt: string;
}

export type OnboardingStep = 'search' | 'verify';
