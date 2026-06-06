'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { StatusBadge } from '@/modules/design-system';
import { useSchoolVetting } from '@/modules/school-applications/queries/use-school-vetting.query';
import {
  VETTING_CHECK_ICON,
  VETTING_CHECK_ICON_CLASS,
  VETTING_CHECK_TONE,
  VETTING_DOC_VERIFICATION_TONE,
  VETTING_INTEGRITY_TONE,
  VETTING_OVERALL_TONE,
} from '@/modules/school-applications/constants/school-vetting.constants';
import type {
  VettingCheck,
  VettingDocVerification,
  VettingIntegrity,
  VettingOverall,
} from '@/modules/school-applications/types/school-applications.types';

function CheckRow({ check }: { check: VettingCheck }) {
  const t = useTranslations('SchoolApplications');
  const Icon = VETTING_CHECK_ICON[check.status];
  return (
    <li className='flex items-start gap-3 rounded-lg border border-border p-3'>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', VETTING_CHECK_ICON_CLASS[check.status])} />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-ink-900'>{t(`vettingCheck_${check.check}`)}</span>
          <StatusBadge tone={VETTING_CHECK_TONE[check.status]}>
            {t(`vettingStatus_${check.status}`)}
          </StatusBadge>
        </div>
        <span className='text-sm text-foggy'>{check.message}</span>
      </div>
    </li>
  );
}

function IntegritySection({ integrity }: { integrity: VettingIntegrity }) {
  const t = useTranslations('SchoolApplications');
  if (!integrity.hasProctoredSession) {
    return <EmptyState framed icon={ShieldCheck} title={t('vettingNoProctoring')} />;
  }
  const score =
    integrity.proctoringRiskScore === null
      ? t('vettingRiskUnknown')
      : `${Math.round(integrity.proctoringRiskScore * 100)}%`;
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm font-medium text-ink-900'>{t('vettingRiskLabel')}</span>
        <span className='text-sm font-semibold text-ink-900'>{score}</span>
      </div>
      {integrity.integrityStatus && (
        <div className='flex items-center justify-between gap-3'>
          <span className='text-sm text-foggy'>{t('vettingIntegrityLabel')}</span>
          <StatusBadge tone={VETTING_INTEGRITY_TONE[integrity.integrityStatus]}>
            {t(`vettingIntegrity_${integrity.integrityStatus}`)}
          </StatusBadge>
        </div>
      )}
    </div>
  );
}

function DocVerificationList({ items }: { items: VettingDocVerification[] }) {
  const t = useTranslations('SchoolApplications');
  if (items.length === 0) {
    return <p className='text-sm text-foggy'>{t('vettingNoDocVerification')}</p>;
  }
  return (
    <ul className='flex flex-col gap-2'>
      {items.map((item) => (
        <li key={item.testType} className='flex items-center justify-between gap-3'>
          <span className='text-sm text-ink-900'>{item.testType}</span>
          <StatusBadge tone={VETTING_DOC_VERIFICATION_TONE[item.verificationStatus]}>
            {t(`vettingDocStatus_${item.verificationStatus}`)}
          </StatusBadge>
        </li>
      ))}
    </ul>
  );
}

function OverallVerdict({ overall }: { overall: VettingOverall }) {
  const t = useTranslations('SchoolApplications');
  return (
    <div className='flex items-center justify-between gap-3'>
      <span className='text-sm font-semibold text-ink-900'>{t('vettingOverallLabel')}</span>
      <StatusBadge tone={VETTING_OVERALL_TONE[overall]}>{t(`vettingOverall_${overall}`)}</StatusBadge>
    </div>
  );
}

export function SchoolVettingTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data, isLoading, isError, refetch } = useSchoolVetting(documentId);

  if (isLoading) {
    return (
      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <Skeleton className='h-16 w-full rounded-lg' />
        <Skeleton className='h-16 w-full rounded-lg' />
        <Skeleton className='h-24 w-full rounded-lg' />
      </SurfaceCard>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState
        framed
        message={t('vettingLoadError')}
        onRetry={() => refetch()}
        retryLabel={t('vettingRetry')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <SurfaceCard padding='lg'>
        <OverallVerdict overall={data.overall} />
      </SurfaceCard>

      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('vettingChecksTitle')}</h3>
        <ul className='flex flex-col gap-3'>
          {data.checks.map((check) => (
            <CheckRow key={check.check} check={check} />
          ))}
        </ul>
      </SurfaceCard>

      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('vettingIntegrityTitle')}</h3>
        <IntegritySection integrity={data.integrity} />
      </SurfaceCard>

      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('vettingDocVerificationTitle')}</h3>
        <DocVerificationList items={data.docVerification} />
      </SurfaceCard>
    </div>
  );
}
