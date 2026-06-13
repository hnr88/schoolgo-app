'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardCheck } from 'lucide-react';
import { EmptyState, SectionHeading } from '@/modules/core';
import { ReadinessSummary } from '@/modules/agent-application-qa/components/ReadinessSummary';
import { SchoolReadinessCard } from '@/modules/agent-application-qa/components/SchoolReadinessCard';
import { sortReadinessResults } from '@/modules/agent-application-qa/lib/sort-results';
import type { SchoolReadinessResult } from '@/modules/agent-application-qa/types/readiness.types';

export function ReadinessResults({
  results,
  labelFor,
}: {
  results: readonly SchoolReadinessResult[];
  labelFor: (documentId: string) => string;
}) {
  const t = useTranslations('AgentApplicationQa');
  const ordered = useMemo(() => sortReadinessResults(results), [results]);

  if (ordered.length === 0) {
    return (
      <EmptyState
        framed
        icon={ClipboardCheck}
        title={t('resultsEmptyTitle')}
        description={t('resultsEmptyDescription')}
      />
    );
  }

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('resultsTitle')} description={t('resultsSubtitle')} level={2} />
      <ReadinessSummary results={ordered} />
      <div className='flex flex-col gap-3'>
        {ordered.map((result) => (
          <SchoolReadinessCard
            key={result.schoolDocumentId}
            result={result}
            schoolLabel={labelFor(result.schoolDocumentId)}
          />
        ))}
      </div>
    </section>
  );
}
