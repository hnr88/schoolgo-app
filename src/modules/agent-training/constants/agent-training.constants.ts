import type { StatusBadgeProps } from '@/modules/core';
import { COURSE_LEVELS } from '@/modules/agent-training/schemas/agent-training.schema';
import type { CourseLevel, TrainingTier } from '@/modules/agent-training/types/agent-training.types';

export const TRAINING_COURSES_ENDPOINT = '/api/training/courses';
export const AGENT_CERTIFICATIONS_ENDPOINT = '/api/agents/me/certifications';

export function trainingCourseEndpoint(documentId: string): string {
  return `${TRAINING_COURSES_ENDPOINT}/${documentId}`;
}

export function assessmentSubmitEndpoint(documentId: string): string {
  return `/api/training/assessments/${documentId}/submit`;
}

export const TRAINING_COURSES_QUERY_KEY = ['agent', 'training', 'courses'] as const;
export const AGENT_CERTIFICATIONS_QUERY_KEY = ['agent', 'training', 'certifications'] as const;

export function trainingCourseQueryKey(documentId: string) {
  return ['agent', 'training', 'courses', documentId] as const;
}

/** Tier strength ordering — higher index outranks lower for the badge. */
export const TIER_RANK: Record<TrainingTier, number> = {
  none: 0,
  foundation: 1,
  intermediate: 2,
  advanced: 3,
};

const LEVEL_LABEL_KEY: Record<CourseLevel, string> = {
  foundation: 'level_foundation',
  intermediate: 'level_intermediate',
  advanced: 'level_advanced',
};

const TIER_LABEL_KEY: Record<TrainingTier, string> = {
  none: 'tier_none',
  foundation: 'tier_foundation',
  intermediate: 'tier_intermediate',
  advanced: 'tier_advanced',
};

const CERT_STATUS_LABEL_KEY: Record<string, string> = {
  in_progress: 'certStatus_in_progress',
  passed: 'certStatus_passed',
  expired: 'certStatus_expired',
};

/** Resolve a translation key for any (possibly unknown) backend level. */
export function resolveLevelLabelKey(level: string): string {
  return LEVEL_LABEL_KEY[level as CourseLevel] ?? 'level_foundation';
}

export function resolveTierLabelKey(tier: TrainingTier): string {
  return TIER_LABEL_KEY[tier] ?? 'tier_none';
}

/** Resolve a translation key for any (possibly unknown) certification status. */
export function resolveCertStatusLabelKey(status: string): string {
  return CERT_STATUS_LABEL_KEY[status] ?? 'certStatus_in_progress';
}

export const LEVEL_ORDER = COURSE_LEVELS;

export const LEVEL_BADGE_STYLES: StatusBadgeProps['styles'] = {
  foundation: { dot: 'bg-babu-500', bg: 'bg-babu-50', text: 'text-babu-700' },
  intermediate: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  advanced: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
};

export const CERT_STATUS_BADGE_STYLES: StatusBadgeProps['styles'] = {
  passed: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  in_progress: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  expired: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};
