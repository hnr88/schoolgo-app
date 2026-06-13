'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';
import { SurfaceCard } from '@/modules/core';
import { BandBadge } from '@/modules/parent-admission-likelihood/components/BandBadge';
import { DemandSignalRow } from '@/modules/parent-admission-likelihood/components/DemandSignalRow';
import { FactorList } from '@/modules/parent-admission-likelihood/components/FactorList';
import type { AdmissionLikelihoodRowCardProps } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

export function AdmissionLikelihoodRowCard({
  row,
  demand,
  isDemandLoading,
}: AdmissionLikelihoodRowCardProps) {
  const t = useTranslations('ParentAdmissionLikelihood');
  const { school, status, likelihood } = row;

  return (
    <SurfaceCard className='flex flex-col gap-3'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <p className='truncate font-semibold text-ink-900'>{school.name}</p>
          <p className='text-xs text-foggy'>
            {school.suburb}, {school.state}
          </p>
        </div>
        {status === 'success' && (
          <BandBadge band={likelihood.band} score={likelihood.score} />
        )}
      </div>

      {status === 'missing' ? (
        <p className='flex items-center gap-2 text-sm text-rausch-700'>
          <AlertCircle className='h-4 w-4 shrink-0' strokeWidth={1.75} aria-hidden='true' />
          {t('schoolMissing')}
        </p>
      ) : (
        <>
          <FactorList factors={likelihood.factors} />
          <div className='border-t border-divider pt-3'>
            <DemandSignalRow demand={demand} isLoading={isDemandLoading} />
          </div>
        </>
      )}
    </SurfaceCard>
  );
}
