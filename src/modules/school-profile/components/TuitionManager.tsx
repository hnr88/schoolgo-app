'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ErrorState } from '@/modules/core';
import { useSchoolTuitions } from '@/modules/school-profile/queries/use-school-tuitions.query';
import { TuitionRow } from '@/modules/school-profile/components/TuitionRow';
import { TuitionAddForm } from '@/modules/school-profile/components/TuitionAddForm';

interface TuitionManagerProps {
  canEdit: boolean;
}

export function TuitionManager({ canEdit }: TuitionManagerProps) {
  const t = useTranslations('SchoolProfile');
  const { data, isLoading, isError, refetch } = useSchoolTuitions();

  if (isLoading) return <Skeleton className='h-40 w-full rounded-lg' />;
  if (isError || !data) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  const usedLevels = data.map((tu) => tu.level);

  return (
    <div className='flex flex-col gap-4'>
      {data.length === 0 ? (
        <p className='text-sm text-muted-foreground'>{t('tuitionEmpty')}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('tuitionLevelLabel')}</TableHead>
              <TableHead>{t('tuitionAmountLabel')}</TableHead>
              <TableHead className='text-right' aria-label='actions' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tuition) => (
              <TuitionRow key={tuition.documentId} tuition={tuition} disabled={!canEdit} />
            ))}
          </TableBody>
        </Table>
      )}
      {canEdit && <TuitionAddForm usedLevels={usedLevels} />}
    </div>
  );
}
