'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { QueueApplicationGroup } from '@/modules/school-pre-enrolment-queue/components/QueueApplicationGroup';
import {
  ReviewQueueItemDialog,
  type PendingReview,
} from '@/modules/school-pre-enrolment-queue/components/ReviewQueueItemDialog';
import { usePreEnrolmentQueue } from '@/modules/school-pre-enrolment-queue/queries/use-pre-enrolment-queue.query';
import { useQueueStaffMe } from '@/modules/school-pre-enrolment-queue/queries/use-queue-staff-me.query';
import type { PreEnrolmentQueueItem } from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

function groupByApplication(items: PreEnrolmentQueueItem[]) {
  const groups = new Map<string, PreEnrolmentQueueItem[]>();
  for (const item of items) {
    const key = item.application?.documentId ?? '__none__';
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return [...groups.entries()];
}

export function SchoolPreEnrolmentQueuePage() {
  const t = useTranslations('SchoolPreEnrolmentQueue');
  const { data: items, isLoading, isError, refetch } = usePreEnrolmentQueue();
  const { data: me } = useQueueStaffMe();
  const canReview = me?.permissionLevel === 'admin';
  const [pending, setPending] = useState<PendingReview | null>(null);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold text-ink-900'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
      </div>

      {isLoading && (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-32 w-full rounded-lg' />
          <Skeleton className='h-32 w-full rounded-lg' />
        </div>
      )}

      {isError && (
        <ErrorState
          framed
          message={t('loadError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      )}

      {!isLoading && !isError && (!items || items.length === 0) && (
        <EmptyState framed icon={ClipboardCheck} title={t('empty')} />
      )}

      {!isLoading && !isError && items && items.length > 0 && (
        <div className='flex flex-col gap-4'>
          {groupByApplication(items).map(([key, groupItems]) => (
            <QueueApplicationGroup
              key={key}
              applicationDocumentId={groupItems[0]?.application?.documentId ?? null}
              items={groupItems}
              canReview={canReview}
              onReview={(item, action) => setPending({ item, action })}
            />
          ))}
        </div>
      )}

      <ReviewQueueItemDialog pending={pending} onClose={() => setPending(null)} />
    </div>
  );
}
