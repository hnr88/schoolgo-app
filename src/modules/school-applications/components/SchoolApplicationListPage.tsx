'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
      <div className='flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-12'>
        <p className='text-sm text-foggy'>{t('loadError')}</p>
        <Button variant='outline' onClick={() => refetch()}>
          {t('retry')}
        </Button>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-6 py-4'>
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
