'use client';

import { useTranslations } from 'next-intl';
import { SurfaceCard } from '@/modules/core';
import { agentUserName } from '@/modules/school-applications/lib/school-application';
import { SchoolAgeEligibilityRow } from '@/modules/school-applications/components/SchoolAgeEligibilityRow';
import type { SchoolApplicationDetail } from '@/modules/school-applications/types/school-applications.types';

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <span className='text-sm text-foggy'>{label}</span>
      <span className='text-sm font-medium text-ink-900'>{value}</span>
    </div>
  );
}

function fmt(value: string | null | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString('en-AU');
}

export function SchoolDetailsTab({ application }: { application: SchoolApplicationDetail }) {
  const t = useTranslations('SchoolApplications');
  const submission = application.submissionData ?? {};
  const submissionEntries = Object.entries(submission).filter(
    ([, v]) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean',
  );

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-6'>
      <section>
        <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('sectionStudent')}</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Row
            label={t('labelName')}
            value={application.student ? `${application.student.firstName} ${application.student.lastName}` : '—'}
          />
          <Row label={t('labelNationality')} value={application.student?.nationality ?? '—'} />
          <Row label={t('labelDateOfBirth')} value={fmt(application.student?.dateOfBirth)} />
        </div>
      </section>

      <section className='border-t border-border pt-6'>
        <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('sectionAgent')}</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Row label={t('labelAgent')} value={agentUserName(application.agent?.user) ?? '—'} />
          <Row label={t('labelAgency')} value={application.agent?.companyName ?? '—'} />
        </div>
      </section>

      <section className='border-t border-border pt-6'>
        <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('sectionApplication')}</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Row label={t('labelYearLevel')} value={application.targetYearLevel ?? '—'} />
          <Row label={t('labelIntake')} value={application.targetIntake ?? '—'} />
          <Row label={t('labelSubmitted')} value={fmt(application.submittedAt)} />
          {application.offerDeadline && <Row label={t('labelOfferDeadline')} value={fmt(application.offerDeadline)} />}
        </div>
        <div className='mt-4'>
          <SchoolAgeEligibilityRow documentId={application.documentId} />
        </div>
      </section>

      {submissionEntries.length > 0 && (
        <section className='border-t border-border pt-6'>
          <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('sectionSubmission')}</h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {submissionEntries.map(([key, value]) => (
              <Row key={key} label={key} value={String(value)} />
            ))}
          </div>
        </section>
      )}
    </SurfaceCard>
  );
}
