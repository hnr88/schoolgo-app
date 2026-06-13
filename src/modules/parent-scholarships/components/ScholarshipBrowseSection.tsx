'use client';

import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { SurfaceCard, EmptyState, ErrorState } from '@/modules/core';
import { useScholarshipFilters } from '@/modules/parent-scholarships/hooks/useScholarshipFilters';
import { ScholarshipFacetControls } from '@/modules/parent-scholarships/components/ScholarshipFacetControls';
import { ScholarshipGrid } from '@/modules/parent-scholarships/components/ScholarshipGrid';
import { ScholarshipGridSkeleton } from '@/modules/parent-scholarships/components/ScholarshipGridSkeleton';

export function ScholarshipBrowseSection() {
  const t = useTranslations('ParentScholarships');
  const browse = useScholarshipFilters();

  return (
    <div className='flex flex-col gap-4'>
      <SurfaceCard className='flex flex-col gap-4'>
        <ScholarshipFacetControls
          facets={browse.facets}
          hasActiveFacets={browse.hasActiveFacets}
          onTypeChange={browse.setType}
          onYearLevelChange={browse.setYearLevel}
          onNationalityChange={browse.setNationality}
          onMinAmountChange={browse.setMinAmount}
          onMaxAmountChange={browse.setMaxAmount}
          onReset={browse.reset}
        />
        {!browse.isLoading && !browse.isError ? (
          <p className='text-xs text-foggy'>{t('resultCount', { count: browse.total })}</p>
        ) : null}
      </SurfaceCard>

      {browse.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => browse.refetch()}
          retryLabel={t('retry')}
        />
      ) : browse.isLoading ? (
        <ScholarshipGridSkeleton />
      ) : browse.isEmpty ? (
        <EmptyState
          framed
          icon={SearchX}
          title={t('browseEmptyTitle')}
          description={t('browseEmptyDescription')}
        />
      ) : (
        <ScholarshipGrid scholarships={browse.scholarships} />
      )}
    </div>
  );
}
