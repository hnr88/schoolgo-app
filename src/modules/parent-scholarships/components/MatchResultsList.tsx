'use client';

import { useTranslations } from 'next-intl';
import { Award, BadgeCheck } from 'lucide-react';
import { StatTile, EmptyState } from '@/modules/core';
import { MatchResultCard } from '@/modules/parent-scholarships/components/MatchResultCard';
import type { ScholarshipMatch } from '@/modules/parent-scholarships/types/scholarship.types';

interface MatchResultsListProps {
  matches: ScholarshipMatch[];
  eligibleCount: number;
  evaluatedCount: number;
}

export function MatchResultsList({
  matches,
  eligibleCount,
  evaluatedCount,
}: MatchResultsListProps) {
  const t = useTranslations('ParentScholarships');

  if (matches.length === 0) {
    return (
      <EmptyState
        icon={Award}
        title={t('matchEmptyTitle')}
        description={t('matchEmptyDescription')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-3 sm:grid-cols-2'>
        <StatTile
          icon={BadgeCheck}
          iconClassName='text-vivid-mint'
          label={t('statEligible')}
          value={eligibleCount}
        />
        <StatTile
          icon={Award}
          label={t('statEvaluated')}
          value={evaluatedCount}
        />
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        {matches.map((match) => (
          <MatchResultCard key={match.documentId} match={match} />
        ))}
      </div>
    </div>
  );
}
