'use client';

import { useTranslations } from 'next-intl';
import { StatusPill } from '@/modules/core';
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_TONES,
} from '@/modules/applications/constants/application.constants';
import type { ApplicationStatusBadgeProps } from '@/modules/applications/types/component.types';

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const t = useTranslations('Applications');
  const labelKey = APPLICATION_STATUS_LABELS[status] ?? 'statusDraft';
  const tone = APPLICATION_STATUS_TONES[status] ?? 'neutral';

  return <StatusPill tone={tone}>{t(labelKey)}</StatusPill>;
}
