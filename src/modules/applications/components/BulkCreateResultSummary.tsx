'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { BulkCreateResultSummaryProps } from '@/modules/applications/types/create-application.types';

export function BulkCreateResultSummary({ result, schoolLabels }: BulkCreateResultSummaryProps) {
  const t = useTranslations('Applications');

  return (
    <div className='flex flex-col gap-6'>
      <section className='flex flex-col gap-3'>
        <h2 className='flex items-center gap-2 text-sm font-semibold text-ink-900'>
          <CheckCircle2 className='h-4 w-4 text-babu-600' />
          {t('fanoutCreatedHeading', { count: result.created.length })}
        </h2>
        {result.created.length === 0 ? (
          <p className='text-sm text-foggy'>{t('fanoutNoneCreated')}</p>
        ) : (
          <ul className='flex flex-col gap-2'>
            {result.created.map((item) => (
              <li
                key={item.documentId}
                className='flex items-center justify-between rounded-md border border-border bg-card px-4 py-3'
              >
                <span className='text-sm text-ink-900'>
                  {schoolLabels[item.school] ?? item.school}
                </span>
                <Link
                  href={`/dashboard/applications/${item.documentId}`}
                  className='flex items-center gap-1 text-sm font-medium text-babu-700 hover:underline'
                >
                  {t('fanoutViewDraft')}
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {result.errors.length > 0 && (
        <section className='flex flex-col gap-3'>
          <h2 className='flex items-center gap-2 text-sm font-semibold text-ink-900'>
            <AlertCircle className='h-4 w-4 text-rausch-600' />
            {t('fanoutErrorsHeading', { count: result.errors.length })}
          </h2>
          <ul className='flex flex-col gap-2'>
            {result.errors.map((item) => (
              <li
                key={item.school}
                className='flex flex-col gap-0.5 rounded-md border border-border bg-card px-4 py-3'
              >
                <span className='text-sm font-medium text-ink-900'>
                  {schoolLabels[item.school] ?? item.school}
                </span>
                <span className='text-sm text-rausch-600'>{item.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
