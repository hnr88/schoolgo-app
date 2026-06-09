'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/modules/design-system';
import type { PreEnrolmentQueueItem } from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

const TONE = {
  pending: 'muted',
  submitted: 'submitted',
} as const;

interface QueueItemRowProps {
  item: PreEnrolmentQueueItem;
  canReview: boolean;
  onReview: (item: PreEnrolmentQueueItem, action: 'approved' | 'rejected') => void;
}

export function QueueItemRow({ item, canReview, onReview }: QueueItemRowProps) {
  const t = useTranslations('SchoolPreEnrolmentQueue');
  const format = useFormatter();

  const label =
    item.itemType === 'custom' && item.customLabel
      ? item.customLabel
      : t(`itemType_${item.itemType}`);

  return (
    <li className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3'>
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-medium text-ink-900'>{label}</span>
        <div className='flex items-center gap-2'>
          <StatusBadge tone={TONE[item.status]}>{t(`status_${item.status}`)}</StatusBadge>
          {item.submittedAt ? (
            <span className='text-xs text-muted-foreground'>
              {t('submittedOn', {
                date: format.dateTime(new Date(item.submittedAt), {
                  dateStyle: 'medium',
                }),
              })}
            </span>
          ) : (
            <span className='text-xs text-muted-foreground'>{t('awaitingSubmission')}</span>
          )}
        </div>
      </div>
      {item.status === 'submitted' &&
        (canReview ? (
          <div className='flex gap-2'>
            <Button size='sm' variant='outline' onClick={() => onReview(item, 'approved')}>
              {t('approve')}
            </Button>
            <Button size='sm' variant='destructive' onClick={() => onReview(item, 'rejected')}>
              {t('reject')}
            </Button>
          </div>
        ) : (
          <span className='text-xs text-muted-foreground'>{t('adminOnlyHint')}</span>
        ))}
    </li>
  );
}
