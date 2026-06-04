'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import { ParentApplicationInfoSection } from '@/modules/applications/components/ParentApplicationInfoSection';
import { ParentApplicationTimelineSection } from './ParentApplicationTimelineSection';
import { ParentPreEnrolmentSection } from './ParentPreEnrolmentSection';
import { ParentApplicationDocumentsSection } from './ParentApplicationDocumentsSection';
import { formatDate, formatOfferFee } from '@/modules/applications/lib/parent-format';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function ParentApplicationDetailBody({ application }: { application: ParentApplication }) {
  const t = useTranslations('ParentApplications');
  const locale = useLocale();
  const hasOffer = application.offerAnnualFee != null || application.offerDeadline != null;

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid gap-6 lg:grid-cols-2'>
      <ParentApplicationInfoSection
        title={t('sectionApplication')}
        rows={[
          { label: t('labelSchool'), value: application.school.name },
          { label: t('labelYearLevel'), value: application.targetYearLevel },
          { label: t('labelIntake'), value: application.targetIntake },
          { label: t('labelSubmitted'), value: formatDate(application.submittedAt, locale) },
          { label: t('labelCreated'), value: formatDate(application.createdAt, locale) },
        ]}
      />

      <SurfaceCard
        padding='lg'
        elevation={hasOffer ? 'raised' : 'flat'}
        accent={hasOffer ? 'brand' : 'none'}
      >
        <SectionHeading title={t('sectionOffer')} level={2} className='mb-3' />
        {hasOffer ? (
          <div className='flex flex-col'>
            <div className='flex items-baseline justify-between border-b border-rausch-200/60 py-4'>
              <span className='text-sm text-foggy'>{t('labelAnnualFee')}</span>
              <span className='text-base font-semibold tabular-nums text-ink-900'>
                {formatOfferFee(application.offerAnnualFee, locale) ?? '—'}
              </span>
            </div>
            <div className='flex items-baseline justify-between py-4'>
              <span className='text-sm text-foggy'>{t('labelOfferDeadline')}</span>
              <span className='text-sm font-medium text-ink-900'>
                {formatDate(application.offerDeadline, locale) ?? '—'}
              </span>
            </div>
          </div>
        ) : (
          <p className='py-4 text-sm text-foggy'>{t('noOfferYet')}</p>
        )}

        <div className={`mt-4 border-t pt-4 ${hasOffer ? 'border-rausch-200/60' : 'border-border/50'}`}>
          <Link
            href={`/parent/students/${application.student.documentId}`}
            className='text-sm font-medium text-primary-strong hover:underline'
          >
            {t('viewStudent')}
          </Link>
        </div>
      </SurfaceCard>
      </div>

      <ParentApplicationTimelineSection applicationDocumentId={application.documentId} />

      <ParentPreEnrolmentSection applicationDocumentId={application.documentId} />

      <ParentApplicationDocumentsSection
        applicationDocumentId={application.documentId}
        studentDocumentId={application.student.documentId}
      />
    </div>
  );
}
