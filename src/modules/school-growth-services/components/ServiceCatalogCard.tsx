'use client';

import { useTranslations } from 'next-intl';
import { SurfaceCard } from '@/modules/core';
import { cn } from '@/lib/utils';
import { CATEGORY_ICON } from '@/modules/school-growth-services/constants/growth-services.constants';
import { formatAud } from '@/modules/school-growth-services/lib/format-aud';
import type { GrowthService } from '@/modules/school-growth-services/types/growth-services.types';
import { PurchaseServiceDialog } from '@/modules/school-growth-services/components/PurchaseServiceDialog';

export function ServiceCatalogCard({ service }: { service: GrowthService }) {
  const t = useTranslations('SchoolGrowthServices');
  const Icon = CATEGORY_ICON[service.category];

  return (
    <SurfaceCard
      elevation='interactive'
      padding='md'
      className='flex flex-col gap-4'
    >
      <div className='flex items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-primary-strong'>
          <Icon className='h-5 w-5' aria-hidden='true' />
        </span>
        <div className='flex min-w-0 flex-col gap-1'>
          <h3 className='truncate text-base font-semibold text-ink-900'>{service.name}</h3>
          <span className='text-xs font-medium uppercase tracking-wide text-foggy'>
            {t(`category.${service.category}`)}
          </span>
        </div>
      </div>

      <p className={cn('text-sm text-foggy', !service.description && 'italic')}>
        {service.description ?? t('noDescription')}
      </p>

      <div className='mt-auto flex items-end justify-between gap-3 pt-2'>
        <div className='flex flex-col'>
          <span className='font-display text-2xl font-bold tracking-tight text-ink-900 tabular-nums'>
            {formatAud(service.priceAud)}
          </span>
          <span className='text-xs text-muted-foreground'>
            {t(`billing.${service.billingType}`)}
          </span>
        </div>
        <PurchaseServiceDialog service={service} />
      </div>
    </SurfaceCard>
  );
}
