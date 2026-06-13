'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPETITION_LABEL_KEYS } from '@/modules/parent-admission-likelihood/constants/admission-likelihood.constants';
import type {
  CompetitionLevel,
  DemandSignalRowProps,
} from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

const COMPETITION_STYLES: Record<CompetitionLevel, string> = {
  low: 'bg-vivid-mint-soft text-vivid-mint-strong',
  moderate: 'bg-arches-50 text-arches-700',
  high: 'bg-rausch-50 text-rausch-700',
  unknown: 'bg-muted text-foggy',
};

export function DemandSignalRow({ demand, isLoading }: DemandSignalRowProps) {
  const t = useTranslations('ParentAdmissionLikelihood');

  if (isLoading) {
    return (
      <p className='flex items-center gap-2 text-xs text-foggy'>
        <Loader2 className='h-3.5 w-3.5 animate-spin' aria-hidden='true' />
        {t('demandLoading')}
      </p>
    );
  }

  if (!demand) {
    return <p className='text-xs text-foggy'>{t('demandUnavailable')}</p>;
  }

  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-foggy'>
      <span className='inline-flex items-center gap-1.5 font-medium text-hof'>
        <Users className='h-3.5 w-3.5' strokeWidth={1.75} aria-hidden='true' />
        {t('demandLabel')}
      </span>
      <span
        className={cn(
          'inline-flex h-6 items-center rounded-pill px-2.5 font-semibold',
          COMPETITION_STYLES[demand.competition],
        )}
      >
        {t(COMPETITION_LABEL_KEYS[demand.competition])}
      </span>
      <span className='tabular-nums'>
        {demand.placesRemaining === null
          ? t('placesUnknown')
          : t('placesRemaining', { count: demand.placesRemaining })}
      </span>
      <span className='tabular-nums'>{t('activeApplications', { count: demand.activeApplications })}</span>
    </div>
  );
}
