'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { InterviewSection } from '@/modules/parent-interviews/components/InterviewSection';
import { InterviewsSkeleton } from '@/modules/parent-interviews/components/InterviewsSkeleton';
import { useParentInterviews } from '@/modules/parent-interviews/hooks/useParentInterviews';

export function ParentInterviewsPage() {
  const t = useTranslations('ParentInterviews');
  const { buckets, isLoading, isError, isEmpty, retry } = useParentInterviews();

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
        <InterviewsSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={CalendarClock}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/parent/applications' className={buttonVariants()}>
              {t('emptyCta')}
            </Link>
          }
        />
      ) : (
        <>
          <InterviewSection bucket='upcoming' items={buckets.upcoming} />
          <InterviewSection bucket='past' items={buckets.past} />
        </>
      )}
    </div>
  );
}
