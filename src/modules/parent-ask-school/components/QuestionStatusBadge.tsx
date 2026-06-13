'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import { STATUS_TONE } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { QuestionStatus } from '@/modules/parent-ask-school/types/ask-school.types';

export function QuestionStatusBadge({ status }: { status: QuestionStatus }) {
  const t = useTranslations('AskSchool');
  return <StatusBadge tone={STATUS_TONE[status]}>{t(`status_${status}`)}</StatusBadge>;
}
