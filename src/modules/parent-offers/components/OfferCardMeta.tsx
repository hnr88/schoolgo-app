'use client';

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/modules/applications/lib/parent-format';
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
  const offerDate = formatDate(offer.statusChangedAt, locale);

  if (!yearLevel && !intake && !offerDate) return null;

  return (
    <div className='flex flex-col divide-y divide-border/50 rounded-md bg-muted px-4'>
      {yearLevel && <MetaRow label={t('yearLevel')} value={yearLevel} />}
      {intake && <MetaRow label={t('intake')} value={intake} />}
      {offerDate && <MetaRow label={t('offerDate')} value={offerDate} />}
    </div>
  );
}
