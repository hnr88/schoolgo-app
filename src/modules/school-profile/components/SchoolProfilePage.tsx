'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolStaffMe } from '@/modules/school-profile/queries/use-school-staff-me.query';
import { useSchool } from '@/modules/school-profile/queries/use-school.query';
import { ProfileSection } from '@/modules/school-profile/components/ProfileSection';
import { ProfileSectionNav } from '@/modules/school-profile/components/ProfileSectionNav';
import { IdentityForm } from '@/modules/school-profile/components/IdentityForm';
import { MediaSection } from '@/modules/school-profile/components/MediaSection';
import { DescriptionForm } from '@/modules/school-profile/components/DescriptionForm';
import { KeyFactsForm } from '@/modules/school-profile/components/KeyFactsForm';
import { FeesForm } from '@/modules/school-profile/components/FeesForm';
import { ScholarshipsForm } from '@/modules/school-profile/components/ScholarshipsForm';
import { AcademicForm } from '@/modules/school-profile/components/AcademicForm';
import { CoCurricularForm } from '@/modules/school-profile/components/CoCurricularForm';
import { InternationalForm } from '@/modules/school-profile/components/InternationalForm';
import { LocationForm } from '@/modules/school-profile/components/LocationForm';
import { PoliciesForm } from '@/modules/school-profile/components/PoliciesForm';
import { AdmissionsControlsForm } from '@/modules/school-profile/components/AdmissionsControlsForm';
import { TuitionManager } from '@/modules/school-profile/components/TuitionManager';
import { PROFILE_SECTIONS } from '@/modules/school-profile/constants/profile-sections.constants';

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-64 w-full rounded-lg' />
      <Skeleton className='h-64 w-full rounded-lg' />
      <Skeleton className='h-48 w-full rounded-lg' />
    </div>
  );
}

function sectionMeta(id: string) {
  return PROFILE_SECTIONS.find((section) => section.id === id)!;
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
  const disabled = !canEdit;

  const renderSection = (id: string, children: ReactNode) => {
    const meta = sectionMeta(id);
    return (
      <ProfileSection
        id={meta.id}
        icon={meta.icon}
        title={t(meta.titleKey)}
        description={t(meta.descriptionKey)}
      >
        {children}
      </ProfileSection>
    );
  };

  return (
    <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8'>
      <aside className='lg:w-64 lg:shrink-0'>
        <ProfileSectionNav />
      </aside>

      <div className='flex min-w-0 flex-1 flex-col gap-6'>
        {!canEdit && (
          <p className='flex items-center gap-2 rounded-lg border border-arches-100 bg-arches-50 px-4 py-3 text-sm font-medium text-arches-700'>
            <Lock className='h-4 w-4 shrink-0' aria-hidden='true' />
            {t('adminOnly')}
          </p>
        )}

        {renderSection('identity', <IdentityForm school={details} disabled={disabled} />)}
        {renderSection('media', <MediaSection school={details} disabled={disabled} />)}
        {renderSection('description', <DescriptionForm school={details} disabled={disabled} />)}
        {renderSection('keyFacts', <KeyFactsForm school={details} disabled={disabled} />)}
        {renderSection('fees', <FeesForm school={details} disabled={disabled} />)}
        {renderSection('scholarships', <ScholarshipsForm school={details} disabled={disabled} />)}
        {renderSection('academic', <AcademicForm school={details} disabled={disabled} />)}
        {renderSection('cocurricular', <CoCurricularForm school={details} disabled={disabled} />)}
        {renderSection('international', <InternationalForm school={details} disabled={disabled} />)}
        {renderSection('location', <LocationForm school={details} disabled={disabled} />)}
        {renderSection('policies', <PoliciesForm school={details} disabled={disabled} />)}
        {renderSection('admissions', <AdmissionsControlsForm school={details} disabled={disabled} />)}
        {renderSection('tuition', <TuitionManager canEdit={canEdit} />)}
      </div>
    </div>
  );
}
