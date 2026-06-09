'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, LayoutGrid, Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useFamilyOverview } from '@/modules/parent-family-overview/hooks/useFamilyOverview';
import { FamilyMatrixGrid } from '@/modules/parent-family-overview/components/FamilyMatrixGrid';
import { FamilyOverviewSkeleton } from '@/modules/parent-family-overview/components/FamilyOverviewSkeleton';

export function FamilyOverviewPage() {
  const t = useTranslations('ParentFamilyOverview');
  const overview = useFamilyOverview();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={LayoutGrid} title={t('title')} description={t('subtitle')} />

      {overview.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => overview.refetch()}
          retryLabel={t('retry')}
        />
      ) : overview.isLoading ? (
        <FamilyOverviewSkeleton />
      ) : !overview.hasStudents ? (
        <EmptyState
          framed
          icon={GraduationCap}
          title={t('emptyStudentsTitle')}
          description={t('emptyStudentsDescription')}
          action={
            <Link href='/parent/students' className={buttonVariants()}>
              {t('emptyStudentsCta')}
            </Link>
          }
        />
      ) : !overview.hasApplications ? (
        <EmptyState
          framed
          icon={Search}
          title={t('emptyApplicationsTitle')}
          description={t('emptyApplicationsDescription')}
          action={
            <Link href='/parent/search' className={buttonVariants()}>
              {t('emptyApplicationsCta')}
            </Link>
          }
        />
      ) : (
        <>
          <FamilyMatrixGrid matrix={overview.matrix} />
          <p className='text-xs text-foggy'>{t('hint')}</p>
        </>
      )}
    </div>
  );
}
