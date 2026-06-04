'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ErrorState, surfaceCardVariants } from '@/modules/core';
import { useSchoolApplicationList } from '@/modules/school-applications/hooks/useSchoolApplicationList';
import { useSchoolApplicationsExport } from '@/modules/school-applications/queries/use-school-applications-export.mutation';
import { SchoolApplicationToolbar } from '@/modules/school-applications/components/SchoolApplicationToolbar';
import { SchoolApplicationTable } from '@/modules/school-applications/components/SchoolApplicationTable';
import { downloadCsv } from '@/modules/school-applications/lib/download-csv';

export function SchoolApplicationListPage() {
  const t = useTranslations('SchoolApplications');
  const {
    search,
    setSearch,
    status,
    setStatus,
    intake,
    setIntake,
    intakes,
    applications,
    isLoading,
    isError,
    refetch,
  } = useSchoolApplicationList();
  const exportCsv = useSchoolApplicationsExport();

  function handleExport() {
    exportCsv.mutate(undefined, {
      onSuccess: (csv) => downloadCsv(csv, 'applications.csv'),
      onError: () => toast.error(t('actionError')),
    });
  }

  if (isError) {
    return (
      <ErrorState
        framed
        message={t('loadError')}
        onRetry={() => refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  return (
    <div className={cn(surfaceCardVariants({ padding: 'none' }), 'overflow-hidden')}>
      <div className='border-b border-divider px-5 py-4'>
        <SchoolApplicationToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          intake={intake}
          onIntakeChange={setIntake}
          intakes={intakes}
          onExport={handleExport}
        />
      </div>
      <SchoolApplicationTable applications={applications} isLoading={isLoading} />
    </div>
  );
}
