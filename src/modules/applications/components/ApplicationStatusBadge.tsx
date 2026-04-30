'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { APPLICATION_STATUS_STYLES, APPLICATION_STATUS_LABELS } from '@/modules/applications/constants/application.constants';
import type { ApplicationStatusBadgeProps } from '@/modules/applications/types/component.types';

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const t = useTranslations('Applications');
  const style = APPLICATION_STATUS_STYLES[status] ?? APPLICATION_STATUS_STYLES.draft;
  const labelKey = APPLICATION_STATUS_LABELS[status] ?? 'statusDraft';

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', style.bg, style.text)}>
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', style.dot)} />
      {t(labelKey)}
    </span>
  );
}
