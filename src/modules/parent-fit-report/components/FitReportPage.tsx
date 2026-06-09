'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useBookmarks } from '@/modules/school-search';
import { PARENT_STUDENTS_MAX_PAGE_SIZE, useParentStudents } from '@/modules/students';
import { MAX_FIT_REPORT_SCHOOLS } from '@/modules/parent-fit-report/constants/fit-report.constants';
import { buildFitReportRows } from '@/modules/parent-fit-report/lib/build-fit-report-rows';
import { useFitReportChecks } from '@/modules/parent-fit-report/queries/use-fit-report-checks.query';
import { FitReportControls } from '@/modules/parent-fit-report/components/FitReportControls';
import { FitReportGrid } from '@/modules/parent-fit-report/components/FitReportGrid';
import { FitReportSkeleton } from '@/modules/parent-fit-report/components/FitReportSkeleton';
import type { FitReportYearLevel } from '@/modules/parent-fit-report/types/fit-report.types';

export function FitReportPage() {
  const t = useTranslations('ParentFitReport');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [yearLevel, setYearLevel] = useState<FitReportYearLevel | null>(null);

  const studentsQuery = useParentStudents({ pageSize: PARENT_STUDENTS_MAX_PAGE_SIZE });
  const bookmarksQuery = useBookmarks();

  const students = studentsQuery.data?.data ?? [];
  const allSchools = bookmarksQuery.data?.data ?? [];
  const schools = allSchools.slice(0, MAX_FIT_REPORT_SCHOOLS);

  const checkResults = useFitReportChecks(
    schools.map((school) => school.documentId),
    studentId,
    yearLevel,
  );

  const isLoading = studentsQuery.isLoading || bookmarksQuery.isLoading;
  const isError = studentsQuery.isError || bookmarksQuery.isError;
  const hasSelection = Boolean(studentId && yearLevel);
  const rows = buildFitReportRows(
    schools,
    checkResults.map((result) => ({ data: result.data, isError: result.isError })),
  );

  const handleRetry = () => {
    void studentsQuery.refetch();
    void bookmarksQuery.refetch();
  };

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={ClipboardCheck}
        title={t('title')}
        description={t('subtitle')}
      />

      {isError ? (
        <ErrorState framed message={t('errorMessage')} onRetry={handleRetry} retryLabel={t('retry')} />
      ) : isLoading ? (
        <FitReportSkeleton />
      ) : schools.length === 0 ? (
        <EmptyState
          framed
          icon={ClipboardCheck}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/parent/search' className={buttonVariants()}>
              {t('emptyCta')}
            </Link>
          }
        />
      ) : students.length === 0 ? (
        <EmptyState
          framed
          icon={ClipboardCheck}
          title={t('noStudentsTitle')}
          description={t('noStudentsDescription')}
          action={
            <Link href='/parent/students' className={buttonVariants()}>
              {t('noStudentsCta')}
            </Link>
          }
        />
      ) : (
        <>
          <SurfaceCard className='flex flex-col gap-4'>
            <FitReportControls
              students={students}
              studentId={studentId}
              yearLevel={yearLevel}
              onStudentChange={setStudentId}
              onYearLevelChange={setYearLevel}
            />
            {allSchools.length > schools.length && (
              <p className='text-xs text-foggy'>{t('truncatedNote', { count: schools.length })}</p>
            )}
          </SurfaceCard>

          {hasSelection ? (
            <FitReportGrid rows={rows} />
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              title={t('promptTitle')}
              description={t('promptDescription')}
            />
          )}
        </>
      )}
    </div>
  );
}
