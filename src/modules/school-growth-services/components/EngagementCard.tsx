'use client';

import { useTranslations } from 'next-intl';
import { Receipt } from 'lucide-react';
import { SurfaceCard, StatusBadge } from '@/modules/core';
import {
  CATEGORY_ICON,
  ENGAGEMENT_STATUS_STYLES,
} from '@/modules/school-growth-services/constants/growth-services.constants';
import { formatAud } from '@/modules/school-growth-services/lib/format-aud';
import { formatGrowthDate } from '@/modules/school-growth-services/lib/format-date';
import type { GrowthEngagement } from '@/modules/school-growth-services/types/growth-services.types';
import { EngagementDeliverables } from '@/modules/school-growth-services/components/EngagementDeliverables';

export function EngagementCard({ engagement }: { engagement: GrowthEngagement }) {
  const t = useTranslations('SchoolGrowthServices');
  const service = engagement.growthService;
  const Icon = service ? CATEGORY_ICON[service.category] : Receipt;
  const amount = engagement.invoice?.amountAud ?? service?.priceAud ?? null;

  return (
    <SurfaceCard padding='md' className='flex flex-col gap-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-primary-strong'>
            <Icon className='h-5 w-5' aria-hidden='true' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h3 className='truncate text-base font-semibold text-ink-900'>
              {service?.name ?? t('engagementUnnamed')}
            </h3>
            <span className='text-xs text-foggy'>
              {t('engagementRequestedOn', { date: formatGrowthDate(engagement.createdAt) })}
            </span>
          </div>
        </div>
        <StatusBadge
          status={engagement.status}
          label={t(`status.${engagement.status}`)}
          styles={ENGAGEMENT_STATUS_STYLES}
        />
      </div>

      <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
        {amount !== null ? (
          <span className='flex items-center gap-1.5 text-foggy'>
            <Receipt className='h-4 w-4' aria-hidden='true' />
            <span className='font-medium text-ink-900 tabular-nums'>{formatAud(amount)}</span>
          </span>
        ) : null}
        {engagement.invoice?.invoiceNumber ? (
          <span className='text-foggy'>
            {t('invoiceNumber', { number: engagement.invoice.invoiceNumber })}
          </span>
        ) : null}
        {engagement.startedAt ? (
          <span className='text-foggy'>
            {t('engagementStartedOn', { date: formatGrowthDate(engagement.startedAt) })}
          </span>
        ) : null}
      </div>

      <EngagementDeliverables deliverables={engagement.deliverables} />
    </SurfaceCard>
  );
}
