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
import { useSchoolCapacities } from '@/modules/school-profile/queries/use-school-capacities.query';
import { CapacityRow } from '@/modules/school-profile/components/CapacityRow';
import { CapacityAddForm } from '@/modules/school-profile/components/CapacityAddForm';

interface CapacityManagerProps {
  schoolDocumentId: string | undefined;
  canEdit: boolean;
}

export function CapacityManager({ schoolDocumentId, canEdit }: CapacityManagerProps) {
  const t = useTranslations('SchoolProfile');
  const { data, isLoading, isError, refetch } = useSchoolCapacities(schoolDocumentId);

  if (isLoading) return <Skeleton className='h-40 w-full rounded-lg' />;
  if (isError || !data) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.length === 0 ? (
        <p className='text-sm text-muted-foreground'>{t('capacityEmpty')}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('capacityYearLevelLabel')}</TableHead>
              <TableHead>{t('capacityIntakeLabel')}</TableHead>
              <TableHead>{t('capacityTotalLabel')}</TableHead>
              <TableHead>{t('capacityAutoWaitlistLabel')}</TableHead>
              <TableHead className='text-right' aria-label='actions' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((capacity) => (
              <CapacityRow key={capacity.documentId} capacity={capacity} disabled={!canEdit} />
            ))}
          </TableBody>
        </Table>
      )}
      {canEdit && <CapacityAddForm />}
    </div>
  );
}
