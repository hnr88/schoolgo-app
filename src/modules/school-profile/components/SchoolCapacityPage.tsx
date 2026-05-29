'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolStaffMe } from '@/modules/school-profile/queries/use-school-staff-me.query';
import { ProfileSection } from '@/modules/school-profile/components/ProfileSection';
import { CapacityManager } from '@/modules/school-profile/components/CapacityManager';

export function SchoolCapacityPage() {
  const t = useTranslations('SchoolProfile');
  const staff = useSchoolStaffMe();

  if (staff.isLoading) return <Skeleton className='h-64 w-full rounded-xl' />;

  if (staff.isError || !staff.data) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => staff.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const canEdit = staff.data.permissionLevel === 'admin';

  return (
    <div className='flex flex-col gap-6'>
      {!canEdit && (
        <p className='rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground'>
          {t('adminOnly')}
        </p>
      )}
      <ProfileSection title={t('capacityTitle')} description={t('capacitySubtitle')}>
        <CapacityManager schoolDocumentId={staff.data.school.documentId} canEdit={canEdit} />
      </ProfileSection>
    </div>
  );
}
