'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import type { ApplicationTemplateStatus } from '@/modules/school-templates/types/school-templates.types';

const STATUS_TO_TONE: Record<
  ApplicationTemplateStatus,
  NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>
> = {
  draft: 'muted',
  published: 'enrolled',
  superseded: 'featured',
};

const STATUS_TO_LABEL: Record<ApplicationTemplateStatus, string> = {
  draft: 'statusDraft',
  published: 'statusPublished',
  superseded: 'statusSuperseded',
};

export function TemplateStatusBadge({ status }: { status: ApplicationTemplateStatus }) {
  const t = useTranslations('SchoolTemplates');
  return <StatusBadge tone={STATUS_TO_TONE[status]}>{t(STATUS_TO_LABEL[status])}</StatusBadge>;
}
