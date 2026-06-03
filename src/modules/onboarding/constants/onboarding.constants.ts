import { FileText, Heart, UserPlus, UserRound } from 'lucide-react';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';
import type { OnboardingStepConfig } from '@/modules/onboarding/types/onboarding.types';

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    key: 'completeProfile',
    labelKey: 'stepProfileLabel',
    descriptionKey: 'stepProfileDescription',
    href: '/parent/settings',
    icon: UserRound,
  },
  {
    key: 'addChild',
    labelKey: 'stepChildLabel',
    descriptionKey: 'stepChildDescription',
    href: '/parent/students/new',
    icon: UserPlus,
  },
  {
    key: 'saveSchools',
    labelKey: 'stepSchoolsLabel',
    descriptionKey: 'stepSchoolsDescription',
    href: '/parent/search',
    icon: Heart,
  },
  {
    key: 'firstApplication',
    labelKey: 'stepApplicationLabel',
    descriptionKey: 'stepApplicationDescription',
    href: '/parent/applications',
    icon: FileText,
  },
];

export const ALL_APPLICATION_STATUSES: ApplicationStatus[] = [
  'draft',
  'submitted',
  'received',
  'under_review',
  'documents_requested',
  'assessment_required',
  'interview_scheduled',
  'interview_completed',
  'offer_made',
  'offer_accepted',
  'pre_enrolment',
  'coe_issued',
  'enrolled',
  'withdrawn',
  'declined',
  'waitlisted',
];
