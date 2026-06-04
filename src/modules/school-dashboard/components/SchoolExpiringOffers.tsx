'use client';

import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState, surfaceCardVariants } from '@/modules/core';
import { SchoolSectionHeader } from '@/modules/school-dashboard/components/SchoolSectionHeader';
import type { SchoolExpiringOffer } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolExpiringOffers({ offers }: { offers: SchoolExpiringOffer[] }) {
  const t = useTranslations('SchoolDashboard');

  return (
    <section className={cn(surfaceCardVariants({ padding: 'none' }), 'flex flex-col overflow-hidden')}>
      <SchoolSectionHeader title={t('expiringOffersTitle')} icon={CalendarClock} />
      <div className='flex flex-col divide-y divide-divider'>
        {offers.length === 0 ? (
          <div className='p-4'>
            <EmptyState framed icon={CalendarClock} title={t('expiringOffersEmpty')} />
          </div>
        ) : (
          offers.map((offer) => (
            <Link
              key={offer.applicationDocumentId}
              href={`/dashboard/applications/${offer.applicationDocumentId}`}
              className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
            >
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rausch-50 text-rausch-700'>
                <CalendarClock className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary-strong'>
                {offer.studentName}
              </span>
              <span className='shrink-0 rounded-full bg-rausch-50 px-2 py-0.5 text-xs font-semibold text-rausch-700 tabular-nums'>
                {offer.daysRemaining <= 0
                  ? t('offerDueToday')
                  : t('offerDaysRemaining', { count: offer.daysRemaining })}
              </span>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
