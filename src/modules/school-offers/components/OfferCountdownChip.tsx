'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { OFFER_BUCKET_BADGE_VARIANT } from '@/modules/school-offers/constants/school-offers.constants';
import type { OfferDeadlineBucket } from '@/modules/school-offers/types/school-offers.types';

interface Props {
  bucket: OfferDeadlineBucket;
  daysLeft: number | null;
}

export function OfferCountdownChip({ bucket, daysLeft }: Props) {
  const t = useTranslations('SchoolOffers');

  const label =
    bucket === 'expired'
      ? t('chipExpired')
      : daysLeft === null
        ? t('chipNoDeadline')
        : t('chipDaysLeft', { count: daysLeft });

  return <Badge variant={OFFER_BUCKET_BADGE_VARIANT[bucket]}>{label}</Badge>;
}
