import { Building2, FilePlus, FileText, MailCheck, ShieldCheck, UserPlus } from 'lucide-react';
import type {
  AgentOnboardingStepConfig,
  AgentVerificationStep,
} from '@/modules/agent-profile/types/agent-profile.types';

export const VERIFICATION_STEP_ORDER: readonly AgentVerificationStep[] = [
  'email_verified',
  'profile_completed',
  'document_uploaded',
  'admin_review',
] as const;

export const AGENT_ONBOARDING_STEPS: readonly AgentOnboardingStepConfig[] = [
  {
    key: 'email_verified',
    labelKey: 'stepEmailLabel',
    descriptionKey: 'stepEmailDescription',
    href: '/dashboard/profile',
    icon: MailCheck,
  },
  {
    key: 'profile_completed',
    labelKey: 'stepProfileLabel',
    descriptionKey: 'stepProfileDescription',
    href: '/dashboard/profile',
    icon: Building2,
  },
  {
    key: 'document_uploaded',
    labelKey: 'stepDocumentLabel',
    descriptionKey: 'stepDocumentDescription',
    href: '/dashboard/profile',
    icon: FileText,
  },
  {
    key: 'verification_submitted',
    labelKey: 'stepVerificationLabel',
    descriptionKey: 'stepVerificationDescription',
    href: '/dashboard/profile',
    icon: ShieldCheck,
  },
  {
    key: 'first_student_added',
    labelKey: 'stepStudentLabel',
    descriptionKey: 'stepStudentDescription',
    href: '/dashboard/students/new',
    icon: UserPlus,
  },
  {
    key: 'first_application_created',
    labelKey: 'stepApplicationLabel',
    descriptionKey: 'stepApplicationDescription',
    href: '/dashboard/applications/new',
    icon: FilePlus,
  },
] as const;
