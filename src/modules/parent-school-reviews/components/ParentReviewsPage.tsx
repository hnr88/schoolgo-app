'use client';

import { useTranslations } from 'next-intl';
import { MessagesSquare, PenLine } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentReviewsSkeleton } from '@/modules/parent-school-reviews/components/ParentReviewsSkeleton';
import { SchoolReviewSection } from '@/modules/parent-school-reviews/components/SchoolReviewSection';
import { WriteReviewDialog } from '@/modules/parent-school-reviews/components/WriteReviewDialog';
import { useWriteReviewDialog } from '@/modules/parent-school-reviews/hooks/useWriteReviewDialog';
import { useReviewableSchools } from '@/modules/parent-school-reviews/queries/use-reviewable-schools.query';

export function ParentReviewsPage() {
  const t = useTranslations('ParentReviews');
  const { data: schools, isLoading, isError, refetch } = useReviewableSchools();
  const dialog = useWriteReviewDialog();

  if (isLoading) {
    return <ParentReviewsSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState framed message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />
    );
  }

  if (!schools || schools.length === 0) {
    return (
      <EmptyState
        framed
        icon={MessagesSquare}
        title={t('emptyTitle')}
        description={t('emptyDescription')}
        action={
          <Link href='/parent/applications' className={buttonVariants({ className: 'gap-1.5' })}>
            {t('emptyAction')}
          </Link>
        }
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-end'>
        <Button type='button' className='gap-1.5' onClick={() => dialog.openForSchool(null)}>
          <PenLine className='h-4 w-4' aria-hidden='true' />
          {t('writeReview')}
        </Button>
      </div>

      <div className='flex flex-col gap-4'>
        {schools.map((school) => (
          <SchoolReviewSection
            key={school.documentId}
            school={school}
            onWriteReview={dialog.openForSchool}
          />
        ))}
      </div>

      <WriteReviewDialog
        open={dialog.open}
        onOpenChange={dialog.setOpen}
        schools={schools}
        presetSchoolDocumentId={dialog.presetSchoolDocumentId}
      />
    </div>
  );
}
