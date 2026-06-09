'use client';

import { useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';
import { SurfaceCard } from '@/modules/core';
import { ReadinessItemRow } from '@/modules/parent-enrolment-readiness/components/ReadinessItemRow';
import type { ReadinessGroup } from '@/modules/parent-enrolment-readiness/types/enrolment-readiness.types';

export function ReadinessApplicationCard({ group }: { group: ReadinessGroup }) {
  const t = useTranslations('ParentEnrolmentReadiness');
  const percent = group.total > 0 ? (group.approved / group.total) * 100 : 0;

  return (
    <SurfaceCard padding='lg'>
      <div className='mb-4 flex flex-col gap-2'>
        <div className='flex flex-wrap items-baseline justify-between gap-2'>
          <h2 className='text-base font-semibold text-ink-900'>
            {group.schoolName ?? t('unknownSchool')}
          </h2>
          <span className='text-sm text-foggy'>{group.studentName ?? t('unknownStudent')}</span>
        </div>
        <span className='text-sm text-foggy'>
          {t('progress', { approved: group.approved, total: group.total })}
        </span>
        <Progress value={percent} />
      </div>
      <div className='flex flex-col'>
        {group.items.map((item) => (
          <ReadinessItemRow key={item.documentId} item={item} />
        ))}
      </div>
    </SurfaceCard>
  );
}
