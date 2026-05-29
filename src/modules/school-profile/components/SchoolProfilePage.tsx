'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolStaffMe } from '@/modules/school-profile/queries/use-school-staff-me.query';
import { useSchool } from '@/modules/school-profile/queries/use-school.query';
import { ProfileSection } from '@/modules/school-profile/components/ProfileSection';
import { IdentityForm } from '@/modules/school-profile/components/IdentityForm';
import { MediaSection } from '@/modules/school-profile/components/MediaSection';
import { DescriptionForm } from '@/modules/school-profile/components/DescriptionForm';
import { FeesForm } from '@/modules/school-profile/components/FeesForm';
import { AcademicForm } from '@/modules/school-profile/components/AcademicForm';
import { PoliciesForm } from '@/modules/school-profile/components/PoliciesForm';
import { TuitionManager } from '@/modules/school-profile/components/TuitionManager';

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-48 w-full rounded-xl' />
    </div>
  );
}

export function SchoolProfilePage() {
  const t = useTranslations('SchoolProfile');
  const staff = useSchoolStaffMe();
  const schoolDocumentId = staff.data?.school.documentId;
  const school = useSchool(schoolDocumentId);

  if (staff.isLoading || school.isLoading) return <ProfileSkeleton />;

  if (staff.isError || school.isError || !staff.data || !school.data) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => {
          staff.refetch();
          school.refetch();
        }}
        retryLabel={t('retry')}
      />
    );
  }

  const canEdit = staff.data.permissionLevel === 'admin';
  const details = school.data;

  return (
    <div className='flex flex-col gap-6'>
      {!canEdit && (
        <p className='rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground'>
          {t('adminOnly')}
        </p>
      )}

      <ProfileSection title={t('sectionIdentity')} description={t('sectionIdentityDesc')}>
        <IdentityForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionMedia')} description={t('sectionMediaDesc')}>
        <MediaSection school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionDescription')} description={t('sectionDescriptionDesc')}>
        <DescriptionForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionFees')} description={t('sectionFeesDesc')}>
        <FeesForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionAcademic')} description={t('sectionAcademicDesc')}>
        <AcademicForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionPolicies')} description={t('sectionPoliciesDesc')}>
        <PoliciesForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection title={t('sectionTuition')} description={t('sectionTuitionDesc')}>
        <TuitionManager canEdit={canEdit} />
      </ProfileSection>
    </div>
  );
}
