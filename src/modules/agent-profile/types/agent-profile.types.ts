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
