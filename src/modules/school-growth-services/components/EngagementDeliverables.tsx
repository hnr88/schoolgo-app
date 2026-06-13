'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { stringifyDeliverable } from '@/modules/school-growth-services/lib/stringify-deliverable';
import type { GrowthEngagement } from '@/modules/school-growth-services/types/growth-services.types';

export function EngagementDeliverables({
  deliverables,
}: {
  deliverables: GrowthEngagement['deliverables'];
}) {
  const t = useTranslations('SchoolGrowthServices');
  const entries = Object.entries(deliverables ?? {});

  if (entries.length === 0) return null;

  return (
    <div className='flex flex-col gap-2 rounded-lg bg-muted/40 p-3'>
      <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>
        {t('deliverablesLabel')}
      </span>
      <ul className='flex flex-col gap-1.5'>
        {entries.map(([key, value]) => (
          <li key={key} className='flex items-start gap-2 text-sm text-foreground'>
            <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-vivid-mint' aria-hidden='true' />
            <span className='min-w-0 break-words'>
              <span className='font-medium text-ink-900'>{key}: </span>
              {stringifyDeliverable(value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
