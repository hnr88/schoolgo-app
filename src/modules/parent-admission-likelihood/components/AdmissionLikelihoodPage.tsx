'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Target } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useBookmarks } from '@/modules/school-search';
import { PARENT_STUDENTS_MAX_PAGE_SIZE, useParentStudents } from '@/modules/students';
import { MAX_ADMISSION_LIKELIHOOD_SCHOOLS } from '@/modules/parent-admission-likelihood/constants/admission-likelihood.constants';
import { buildLikelihoodRows } from '@/modules/parent-admission-likelihood/lib/build-likelihood-rows';
import { useAdmissionLikelihood } from '@/modules/parent-admission-likelihood/queries/use-admission-likelihood.mutation';
import { AdmissionLikelihoodControls } from '@/modules/parent-admission-likelihood/components/AdmissionLikelihoodControls';
import { AdmissionLikelihoodGrid } from '@/modules/parent-admission-likelihood/components/AdmissionLikelihoodGrid';
import { AdmissionLikelihoodSkeleton } from '@/modules/parent-admission-likelihood/components/AdmissionLikelihoodSkeleton';

export function AdmissionLikelihoodPage() {
  const t = useTranslations('ParentAdmissionLikelihood');
  const [studentId, setStudentId] = useState<string | null>(null);

  const studentsQuery = useParentStudents({ pageSize: PARENT_STUDENTS_MAX_PAGE_SIZE });
  const bookmarksQuery = useBookmarks();
  const likelihood = useAdmissionLikelihood();

  const students = studentsQuery.data?.data ?? [];
  const allSchools = bookmarksQuery.data?.data ?? [];
  const schools = allSchools.slice(0, MAX_ADMISSION_LIKELIHOOD_SCHOOLS);

  const rows = buildLikelihoodRows(schools, likelihood.data);

  const isLoading = studentsQuery.isLoading || bookmarksQuery.isLoading;
  const isError = studentsQuery.isError || bookmarksQuery.isError;

  const handleCompute = () => {
    if (!studentId || schools.length === 0) return;
    likelihood.mutate({ studentId, schoolIds: schools.map((school) => school.documentId) });
  };

  const handleRetry = () => {
    void studentsQuery.refetch();
    void bookmarksQuery.refetch();
  };

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Target} title={t('title')} description={t('subtitle')} />

      {isError ? (
        <ErrorState framed message={t('errorMessage')} onRetry={handleRetry} retryLabel={t('retry')} />
      ) : isLoading ? (
        <AdmissionLikelihoodSkeleton />
      ) : schools.length === 0 ? (
        <EmptyState
          framed
          icon={Target}
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
          icon={Target}
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
            <AdmissionLikelihoodControls
              students={students}
              studentId={studentId}
              onStudentChange={setStudentId}
              onCompute={handleCompute}
              isComputing={likelihood.isPending}
              canCompute={Boolean(studentId)}
              schoolCount={schools.length}
            />
            {allSchools.length > schools.length && (
              <p className='text-xs text-foggy'>{t('truncatedNote', { count: schools.length })}</p>
            )}
          </SurfaceCard>

          {likelihood.isPending ? (
            <AdmissionLikelihoodSkeleton />
          ) : rows.length > 0 ? (
            <AdmissionLikelihoodGrid rows={rows} />
          ) : (
            <EmptyState icon={Target} title={t('promptTitle')} description={t('promptDescription')} />
          )}
        </>
      )}
    </div>
  );
}
