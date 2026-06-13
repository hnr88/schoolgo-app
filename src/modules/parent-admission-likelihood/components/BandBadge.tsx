'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BAND_LABEL_KEYS } from '@/modules/parent-admission-likelihood/constants/admission-likelihood.constants';
import type {
  BandBadgeProps,
  LikelihoodBand,
} from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

const BAND_STYLES: Record<LikelihoodBand, string> = {
  safety: 'border-vivid-mint/30 bg-vivid-mint-soft text-vivid-mint-strong',
  match: 'border-babu-200 bg-babu-50 text-babu-700',
  reach: 'border-rausch-200 bg-rausch-50 text-rausch-700',
};

const BAND_ICONS = {
  safety: ShieldCheck,
  match: Target,
  reach: TrendingUp,
} as const;

export function BandBadge({ band, score }: BandBadgeProps) {
  const t = useTranslations('ParentAdmissionLikelihood');
  const Icon = BAND_ICONS[band];

  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-pill border px-2.5 text-xs font-semibold',
        BAND_STYLES[band],
      )}
    >
      <Icon className='size-3 shrink-0' strokeWidth={1.75} aria-hidden='true' />
      {t(BAND_LABEL_KEYS[band])}
      <span className='tabular-nums opacity-70'>{t('scoreSuffix', { score })}</span>
    </span>
  );
}
