'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import type { Application } from '@/modules/applications/types/application.types';

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <span className='text-sm text-foggy'>{label}</span>
      <span className='text-sm font-medium text-ink-900'>{children}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='border-b border-border pb-6 last:border-b-0 last:pb-0'>
      <h2 className='mb-4 text-sm font-semibold text-ink-900'>{title}</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>{children}</div>
    </div>
  );
}

export function ApplicationDetailsTab({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const studentName = `${application.student.firstName} ${application.student.lastName}`;
  const fmt = (d: string | undefined) =>
    d ? new Date(d).toLocaleDateString() : t('notProvided');

  return (
    <div className='flex flex-col gap-6 rounded-xl border border-border bg-card p-6'>
      <Section title={t('sectionStudent')}>
        <InfoRow label={t('labelName')}>
          <Link
            href={`/dashboard/students/${application.student.documentId}`}
            className='text-primary hover:underline'
          >
            {studentName}
          </Link>
        </InfoRow>
        <InfoRow label={t('labelNationality')}>
          {application.student.nationality ?? t('notProvided')}
        </InfoRow>
      </Section>

      <Section title={t('sectionSchool')}>
        <InfoRow label={t('labelSchoolName')}>{application.school.name}</InfoRow>
        <InfoRow label={t('labelState')}>
          {application.school.state ?? t('notProvided')}
        </InfoRow>
        <InfoRow label={t('labelCricosCode')}>
          {application.school.cricosCode ?? t('notProvided')}
        </InfoRow>
      </Section>

      <Section title={t('sectionApplication')}>
        <InfoRow label={t('labelYearLevel')}>
          {application.targetYearLevel ?? t('notProvided')}
        </InfoRow>
        <InfoRow label={t('labelIntake')}>
          {application.targetIntake ?? t('notProvided')}
        </InfoRow>
        <InfoRow label={t('labelStatus')}>
          <ApplicationStatusBadge status={application.status} />
        </InfoRow>
        <InfoRow label={t('labelSubmitted')}>{fmt(application.submittedAt)}</InfoRow>
        <InfoRow label={t('labelCreated')}>{fmt(application.createdAt)}</InfoRow>
        <InfoRow label={t('labelUpdated')}>{fmt(application.updatedAt)}</InfoRow>
      </Section>
    </div>
  );
}
