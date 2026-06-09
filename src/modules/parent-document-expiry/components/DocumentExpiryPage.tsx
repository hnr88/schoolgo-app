'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { DocumentExpirySection } from '@/modules/parent-document-expiry/components/DocumentExpirySection';
import { DocumentExpirySkeleton } from '@/modules/parent-document-expiry/components/DocumentExpirySkeleton';
import { useDocumentExpiry } from '@/modules/parent-document-expiry/hooks/useDocumentExpiry';

export function DocumentExpiryPage() {
  const t = useTranslations('ParentDocumentExpiry');
  const { buckets, isLoading, isError, isEmpty, retry } = useDocumentExpiry();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={CalendarClock}
        title={t('title')}
        description={t('subtitle')}
      />

      {isError ? (
        <ErrorState framed message={t('errorMessage')} onRetry={retry} retryLabel={t('retry')} />
      ) : isLoading ? (
        <DocumentExpirySkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={CalendarClock}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/parent/documents' className={buttonVariants()}>
              {t('emptyCta')}
            </Link>
          }
        />
      ) : (
        <>
          <DocumentExpirySection bucket='expired' items={buckets.expired} />
          <DocumentExpirySection bucket='expiringSoon' items={buckets.expiringSoon} />
          <DocumentExpirySection bucket='later' items={buckets.later} />
        </>
      )}

      {!isLoading && !isError && buckets.untrackedCount > 0 ? (
        <p className='text-xs text-foggy'>
          {t('untrackedNote', { count: buckets.untrackedCount })}
        </p>
      ) : null}
    </div>
  );
}
