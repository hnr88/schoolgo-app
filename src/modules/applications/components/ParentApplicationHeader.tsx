'use client';

import { useTranslations } from 'next-intl';
import { SurfaceCard } from '@/modules/core';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { ApplicationAvatar, ApplicationLogo } from '@/modules/applications/components/ApplicationTableCells';
import { OfferDeadlineChip } from '@/modules/applications/components/OfferDeadlineChip';
import { ParentApplicationProgressBar } from '@/modules/applications/components/ParentApplicationProgressBar';
import { ParentApplicationStatTiles } from '@/modules/applications/components/ParentApplicationStatTiles';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function ParentApplicationHeader({ application }: { application: ParentApplication }) {
  const t = useTranslations('ParentApplications');
  const studentName = `${application.student.firstName} ${application.student.lastName}`;
  const targetSuffix = application.targetIntake ? ` · ${application.targetIntake}` : '';

  return (
    <SurfaceCard elevation='raised' padding='lg' className='flex flex-col gap-5'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div className='flex items-start gap-4'>
          <span className='flex items-center -space-x-2'>
            <ApplicationLogo name={application.school.name} className='size-12 rounded-lg text-sm ring-2 ring-card' />
            <ApplicationAvatar
              firstName={application.student.firstName}
              lastName={application.student.lastName}
              className='size-12 text-sm ring-2 ring-card'
            />
          </span>
          <div className='flex flex-col gap-1'>
            <h1 className='font-display text-display-h1 font-bold tracking-tight text-ink-900'>
              {t('studentToSchool', { student: studentName, school: application.school.name })}
            </h1>
            {application.targetYearLevel && (
              <p className='text-sm text-foggy'>
                {application.targetYearLevel}
                {targetSuffix}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <ApplicationStatusBadge status={application.status} />
          <OfferDeadlineChip deadline={application.offerDeadline} />
        </div>
      </div>

      <ParentApplicationProgressBar application={application} />

      <ParentApplicationStatTiles application={application} />
    </SurfaceCard>
  );
}
