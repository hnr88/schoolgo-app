import type { LucideIcon } from 'lucide-react';

export type AgentVerificationStep =
  | 'email_verified'
  | 'profile_completed'
  | 'document_uploaded'
  | 'admin_review';

export type AgentAdminReviewStatus =
  | 'pending_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

export interface AgentVerificationChecklistItem {
  step: AgentVerificationStep;
  done: boolean;
  status?: AgentAdminReviewStatus;
}

export interface AgentVerificationStatus {
  emailVerified: boolean;
  profileCompleted: boolean;
  documentUploaded: boolean;
  adminReview: AgentAdminReviewStatus;
  verified: boolean;
  qeacCertified: boolean;
  checklist: AgentVerificationChecklistItem[];
}

export type AgentOnboardingStepKey =
  | 'email_verified'
  | 'profile_completed'
  | 'document_uploaded'
  | 'verification_submitted'
  | 'first_student_added'
  | 'first_application_created';

export interface AgentOnboardingStep {
  key: AgentOnboardingStepKey;
  completed: boolean;
}

export interface AgentOnboarding {
  steps: AgentOnboardingStep[];
  completedCount: number;
  totalCount: number;
  allComplete: boolean;
}

export interface AgentOnboardingStepConfig {
  key: AgentOnboardingStepKey;
  labelKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
}

export interface AgentPublicPreview {
  documentId: string;
  companyName: string;
  roleTitle: string | null;
  countryOfOperation: string | null;
  website: string | null;
  bio: string | null;
  qeacNumber: string | null;
  qeacValidationStatus: 'none' | 'pending' | 'verified';
  verified: boolean;
  profilePhoto: { url: string } | null;
  fullName: string;
}

export interface UpdatePublicProfilePayload {
  companyName?: string;
  roleTitle?: string;
  countryOfOperation?: string;
  qeacNumber?: string;
  phone?: string;
  website?: string;
  bio?: string;
}
