'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/modules/design-system';
import { useSchoolApplicationAgeCheck } from '@/modules/school-applications/queries/use-school-application-age-check.query';
import {
  VETTING_CHECK_ICON,
  VETTING_CHECK_ICON_CLASS,
  VETTING_CHECK_TONE,
} from '@/modules/school-applications/constants/school-vetting.constants';

export function SchoolAgeEligibilityRow({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data, isLoading, isError } = useSchoolApplicationAgeCheck(documentId);

  if (isLoading) {
    return <Skeleton className='h-16 w-full rounded-lg' />;
  }

  if (isError || !data) {
    return (
      <div className='flex items-start gap-3 rounded-lg border border-border p-3'>
        <span className='text-sm text-foggy'>{t('ageEligibilityUnavailable')}</span>
      </div>
    );
  }

  const Icon = VETTING_CHECK_ICON[data.status];

  return (
    <div className='flex items-start gap-3 rounded-lg border border-border p-3'>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', VETTING_CHECK_ICON_CLASS[data.status])} />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-ink-900'>{t('ageEligibilityLabel')}</span>
          <StatusBadge tone={VETTING_CHECK_TONE[data.status]}>
            {t(`ageEligibilityStatus_${data.status}`)}
          </StatusBadge>
        </div>
        <span className='text-sm text-foggy'>{data.message}</span>
      </div>
    </div>
  );
}
