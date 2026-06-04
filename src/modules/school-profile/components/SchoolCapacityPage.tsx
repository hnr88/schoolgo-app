'use client';

import { useTranslations } from 'next-intl';
import { Lock, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolStaffMe } from '@/modules/school-profile/queries/use-school-staff-me.query';
import { ProfileSection } from '@/modules/school-profile/components/ProfileSection';
import { CapacityManager } from '@/modules/school-profile/components/CapacityManager';

export function SchoolCapacityPage() {
  const t = useTranslations('SchoolProfile');
  const staff = useSchoolStaffMe();

  if (staff.isLoading) return <Skeleton className='h-64 w-full rounded-lg' />;

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
        <p className='flex items-center gap-2 rounded-lg border border-arches-100 bg-arches-50 px-4 py-3 text-sm font-medium text-arches-700'>
          <Lock className='h-4 w-4 shrink-0' aria-hidden='true' />
          {t('adminOnly')}
        </p>
      )}
      <ProfileSection icon={Users} title={t('capacityTitle')} description={t('capacitySubtitle')}>
        <CapacityManager schoolDocumentId={staff.data.school.documentId} canEdit={canEdit} />
      </ProfileSection>
    </div>
  );
}
