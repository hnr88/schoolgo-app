'use client';

import { useTranslations } from 'next-intl';
import {
  Building2,
  Images,
  FileText,
  Wallet,
  GraduationCap,
  ShieldCheck,
  CalendarCheck,
  Coins,
  Lock,
} from 'lucide-react';
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
import { AdmissionsControlsForm } from '@/modules/school-profile/components/AdmissionsControlsForm';
import { TuitionManager } from '@/modules/school-profile/components/TuitionManager';

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-64 w-full rounded-lg' />
      <Skeleton className='h-64 w-full rounded-lg' />
      <Skeleton className='h-48 w-full rounded-lg' />
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
        <p className='flex items-center gap-2 rounded-lg border border-arches-100 bg-arches-50 px-4 py-3 text-sm font-medium text-arches-700'>
          <Lock className='h-4 w-4 shrink-0' aria-hidden='true' />
          {t('adminOnly')}
        </p>
      )}

      <ProfileSection icon={Building2} title={t('sectionIdentity')} description={t('sectionIdentityDesc')}>
        <IdentityForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={Images} title={t('sectionMedia')} description={t('sectionMediaDesc')}>
        <MediaSection school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={FileText} title={t('sectionDescription')} description={t('sectionDescriptionDesc')}>
        <DescriptionForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={Wallet} title={t('sectionFees')} description={t('sectionFeesDesc')}>
        <FeesForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={GraduationCap} title={t('sectionAcademic')} description={t('sectionAcademicDesc')}>
        <AcademicForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={ShieldCheck} title={t('sectionPolicies')} description={t('sectionPoliciesDesc')}>
        <PoliciesForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={CalendarCheck} title={t('sectionAdmissions')} description={t('sectionAdmissionsDesc')}>
        <AdmissionsControlsForm school={details} disabled={!canEdit} />
      </ProfileSection>

      <ProfileSection icon={Coins} title={t('sectionTuition')} description={t('sectionTuitionDesc')}>
        <TuitionManager canEdit={canEdit} />
      </ProfileSection>
    </div>
  );
}
