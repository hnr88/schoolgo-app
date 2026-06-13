'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { FitBandBadge } from '@/modules/school-applicant-fit/components/FitBandBadge';
import { FitContributionRow } from '@/modules/school-applicant-fit/components/FitContributionRow';
import { useFitBreakdown } from '@/modules/school-applicant-fit/queries/use-fit-breakdown.query';
import { formatScore } from '@/modules/school-applicant-fit/lib/format-fit';

interface FitBreakdownDrawerProps {
  documentId: string | null;
  onClose: () => void;
}

export function FitBreakdownDrawer({ documentId, onClose }: FitBreakdownDrawerProps) {
  const t = useTranslations('SchoolApplicantFit');
  const locale = useLocale();
  const query = useFitBreakdown(documentId);
  const breakdown = query.data;

  return (
    <Dialog open={documentId !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{breakdown?.student?.name ?? t('breakdownTitle')}</DialogTitle>
          <DialogDescription>{t('breakdownDescription')}</DialogDescription>
        </DialogHeader>

        {query.isError ? (
          <ErrorState
            framed
            message={t('errorMessage')}
            onRetry={() => query.refetch()}
            retryLabel={t('retry')}
          />
        ) : query.isLoading || breakdown === undefined ? (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-20 w-full rounded-lg' />
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted p-4'>
              <div className='flex flex-col gap-1'>
                <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('overallScore')}
                </span>
                <span className='font-display text-3xl font-bold tabular-nums text-ink-900'>
                  {formatScore(breakdown.score, locale)}
                </span>
              </div>
              <FitBandBadge band={breakdown.band} />
            </div>
            <ul className='flex flex-col gap-3'>
              {breakdown.contributions.map((contribution) => (
                <FitContributionRow
                  key={contribution.criterion}
                  contribution={contribution}
                  contributions={breakdown.contributions}
                />
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
