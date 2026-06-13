'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';
import { FitStatusBadge } from '@/modules/school-applicant-fit/components/FitStatusBadge';
import { contributionShare, formatScore } from '@/modules/school-applicant-fit/lib/format-fit';
import type { FitContribution } from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitContributionRowProps {
  contribution: FitContribution;
  contributions: readonly FitContribution[];
}

export function FitContributionRow({ contribution, contributions }: FitContributionRowProps) {
  const t = useTranslations('SchoolApplicantFit');
  const locale = useLocale();
  const share = contributionShare(contribution, contributions);

  return (
    <li className='flex flex-col gap-2 rounded-xl bg-gray-50 p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <span className='flex items-center gap-2 text-sm font-semibold text-ink-900'>
          {t(`criterion_${contribution.criterion}`)}
          <FitStatusBadge status={contribution.status} />
        </span>
        <span className='text-sm font-semibold tabular-nums text-ink-900'>
          {formatScore(share, locale)}
        </span>
      </div>
      <Progress value={Math.round(share * 100)} aria-hidden='true' />
      <p className='text-xs text-foggy'>{contribution.detail}</p>
      <p className='text-xs text-muted-foreground tabular-nums'>
        {t('contributionDetail', {
          weight: contribution.weight,
          fraction: formatScore(contribution.fraction, locale),
          weighted: contribution.weightedScore,
        })}
      </p>
    </li>
  );
}
