import type { AgentVerificationStep } from '@/modules/agent-profile/types/agent-profile.types';

export const VERIFICATION_STEP_ORDER: readonly AgentVerificationStep[] = [
  'email_verified',
  'profile_completed',
  'document_uploaded',
  'admin_review',
] as const;
