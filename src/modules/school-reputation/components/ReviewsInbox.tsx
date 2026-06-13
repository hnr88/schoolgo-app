'use client';

import { useTranslations } from 'next-intl';
import { Inbox } from 'lucide-react';
import { EmptyState, SectionHeading } from '@/modules/core';
import { ReviewCard } from '@/modules/school-reputation/components/ReviewCard';
import type { ReputationReview } from '@/modules/school-reputation/types/school-reputation.types';

interface ReviewsInboxProps {
  reviews: ReputationReview[];
}

export function ReviewsInbox({ reviews }: ReviewsInboxProps) {
  const t = useTranslations('SchoolReputation');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading
        level={3}
        icon={Inbox}
        title={t('inboxTitle')}
        description={t('inboxSubtitle')}
      />
      {reviews.length === 0 ? (
        <EmptyState
          framed
          icon={Inbox}
          title={t('inboxEmptyTitle')}
          description={t('inboxEmptyDescription')}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          {reviews.map((review) => (
            <ReviewCard key={review.documentId} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
