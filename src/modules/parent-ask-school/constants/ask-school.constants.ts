import type { ComponentProps } from 'react';
import type { StatusBadge } from '@/modules/design-system';
import type { QuestionStatus, QuestionTopic } from '@/modules/parent-ask-school/types/ask-school.types';

type Tone = NonNullable<ComponentProps<typeof StatusBadge>['tone']>;

export const QUESTION_BODY_MAX = 2000;
export const ANSWER_BODY_MAX = 4000;

export const PARENT_QUESTIONS_QUERY_KEY = ['parent', 'ask-school', 'questions'] as const;
export const SCHOOL_QUESTIONS_QUERY_KEY = ['school', 'ask-school', 'questions'] as const;

export const QUESTION_TOPICS: readonly QuestionTopic[] = [
  'admissions',
  'fees',
  'boarding',
  'curriculum',
  'eal',
  'visa',
  'other',
];

export const INBOX_FILTERS: readonly (QuestionStatus | 'all')[] = [
  'pending',
  'answered',
  'published',
  'all',
];

export const STATUS_TONE: Record<QuestionStatus, Tone> = {
  pending: 'featured',
  answered: 'trust',
  published: 'accepted',
  declined: 'muted',
};
