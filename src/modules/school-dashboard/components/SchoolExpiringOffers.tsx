'use client';

import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { EmptyState } from '@/modules/core';
import type { SchoolExpiringOffer } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolExpiringOffers({ offers }: { offers: SchoolExpiringOffer[] }) {
  const t = useTranslations('SchoolDashboard');

  return (
    <div className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-1'>
      <div className='border-b border-divider px-6 py-5'>
        <h2 className='text-base font-bold text-ink-900'>{t('expiringOffersTitle')}</h2>
      </div>
      <div className='flex flex-col divide-y divide-divider'>
        {offers.length === 0 ? (
          <EmptyState icon={CalendarClock} title={t('expiringOffersEmpty')} />
        ) : (
          offers.map((offer) => (
            <Link
              key={offer.applicationDocumentId}
              href={`/dashboard/applications/${offer.applicationDocumentId}`}
              className='group flex items-center gap-3 px-6 py-4 no-underline transition-colors hover:bg-muted'
            >
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rausch-50 text-rausch-600'>
                <CalendarClock className='h-4 w-4' strokeWidth={1.75} />
              </span>
              <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary'>
                {offer.studentName}
              </span>
              <span className='shrink-0 rounded-full bg-rausch-50 px-2 py-0.5 text-xs font-semibold text-rausch-600'>
                {offer.daysRemaining <= 0
                  ? t('offerDueToday')
                  : t('offerDaysRemaining', { count: offer.daysRemaining })}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
