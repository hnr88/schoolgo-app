'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarClock } from 'lucide-react';
import { formatDate, formatOfferFee } from '@/modules/applications/lib/parent-format';
import type { OfferCardProps } from '@/modules/parent-offers/types/parent-offers.types';

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-baseline justify-between gap-3 py-2'>
      <span className='text-xs text-foggy'>{label}</span>
      <span className='text-sm font-medium text-ink-900'>{value}</span>
    </div>
  );
}

export function OfferCardMeta({ offer }: OfferCardProps) {
  const t = useTranslations('ParentOffers');
  const locale = useLocale();

  const yearLevel = offer.targetYearLevel;
  const intake = offer.targetIntake;
  const offerFee = formatOfferFee(offer.offerAnnualFee, locale);
  const offerDeadline = formatDate(offer.offerDeadline, locale);
  const offerDate = formatDate(offer.statusChangedAt, locale);

  if (!yearLevel && !intake && !offerFee && !offerDeadline && !offerDate) return null;

  return (
    <div className='flex flex-col divide-y divide-border/60 rounded-md border border-border/60 bg-muted px-4'>
      {yearLevel && <MetaRow label={t('yearLevel')} value={yearLevel} />}
      {intake && <MetaRow label={t('intake')} value={intake} />}
      {offerFee && <MetaRow label={t('annualFee')} value={t('feePerYear', { fee: offerFee })} />}
      {offerDeadline && (
        <div className='flex items-center justify-between gap-3 py-2.5'>
          <span className='flex items-center gap-1.5 text-xs font-medium text-ink-900'>
            <CalendarClock className='h-4 w-4 text-rausch-600' />
            {t('respondBy')}
          </span>
          <span className='text-base font-semibold text-rausch-600'>{offerDeadline}</span>
        </div>
      )}
      {offerDate && <MetaRow label={t('offerDate')} value={offerDate} />}
    </div>
  );
}
