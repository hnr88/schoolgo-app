'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { TestResultsList } from '@/modules/test-results/components/TestResultsList';
import { TestResultsStudentSelector } from '@/modules/test-results/components/TestResultsStudentSelector';
import { useStudentSelection } from '@/modules/test-results/hooks/useStudentSelection';
import type { TestResultsPanelProps } from '@/modules/test-results/types/component.types';

export function TestResultsPanel({ studentDocumentId }: TestResultsPanelProps) {
  const t = useTranslations('ParentTestResults');
  const { selected, setSelected, students, isLoading, isError, refetch } =
    useStudentSelection(studentDocumentId);

  if (isLoading) {
    return <Skeleton className='h-40 w-full rounded-xl' />;
  }

  if (isError) {
    return (
      <ErrorState message={t('studentsErrorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />
    );
  }

  if (students.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={t('noStudentsTitle')}
        description={t('noStudentsSubtitle')}
        action={
          <Link href='/parent/students/new'>
            <Button>{t('addStudent')}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <TestResultsStudentSelector students={students} value={selected} onChange={setSelected} />

      {selected ? (
        <TestResultsList studentDocumentId={selected} />
      ) : (
        <EmptyState
          icon={ClipboardList}
          title={t('pickStudentTitle')}
          description={t('pickStudentSubtitle')}
        />
      )}
    </div>
  );
}
