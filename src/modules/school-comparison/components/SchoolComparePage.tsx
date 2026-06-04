'use client';

import { useTranslations } from 'next-intl';
import { Columns3 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { useSchoolComparison } from '@/modules/school-comparison/hooks/useSchoolComparison';
import { CompareSelectorBar } from '@/modules/school-comparison/components/CompareSelectorBar';
import { CompareTable } from '@/modules/school-comparison/components/CompareTable';

export function SchoolComparePage() {
  const t = useTranslations('SchoolComparison');
  const {
    savedSchools,
    selectedSchools,
    isSelected,
    isAtCapacity,
    toggleSchool,
    isLoading,
    isError,
    isEmpty,
    hasUrlIds,
    schoolKey,
  } = useSchoolComparison();

  const labels = { yes: t('valueYes'), no: t('valueNo'), empty: t('valueEmpty') };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h2>
        <p className='text-body-sm text-foggy'>{t('subtitle')}</p>
      </div>

      {isLoading ? (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-9 w-64 rounded-pill' />
          <Skeleton className='h-96 w-full rounded-lg' />
        </div>
      ) : isError ? (
        <EmptyState icon={Columns3} title={t('errorTitle')} description={t('errorDescription')} />
      ) : isEmpty ? (
        <EmptyState
          icon={Columns3}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/parent/search' className={buttonVariants({ size: 'sm' })}>
              {t('browseSchools')}
            </Link>
          }
        />
      ) : (
        <div className='flex flex-col gap-6'>
          {!hasUrlIds && (
            <CompareSelectorBar
              savedSchools={savedSchools}
              isSelected={isSelected}
              isAtCapacity={isAtCapacity}
              onToggle={toggleSchool}
              schoolKey={schoolKey}
            />
          )}
          {selectedSchools.length === 0 ? (
            <EmptyState
              icon={Columns3}
              title={t('noSelectionTitle')}
              description={t('noSelectionDescription')}
            />
          ) : (
            <CompareTable
              schools={selectedSchools}
              labels={labels}
              onRemove={toggleSchool}
              schoolKey={schoolKey}
            />
          )}
        </div>
      )}
    </div>
  );
}
