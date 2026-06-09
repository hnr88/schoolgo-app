'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SurfaceCard } from '@/modules/core';
import { QueueItemRow } from '@/modules/school-pre-enrolment-queue/components/QueueItemRow';
import type { PreEnrolmentQueueItem } from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

interface QueueApplicationGroupProps {
  applicationDocumentId: string | null;
  items: PreEnrolmentQueueItem[];
  canReview: boolean;
  onReview: (item: PreEnrolmentQueueItem, action: 'approved' | 'rejected') => void;
}

export function QueueApplicationGroup({
  applicationDocumentId,
  items,
  canReview,
  onReview,
}: QueueApplicationGroupProps) {
  const t = useTranslations('SchoolPreEnrolmentQueue');

  const student = items[0]?.application?.student ?? null;
  const studentName = [student?.firstName, student?.lastName]
    .filter((part): part is string => Boolean(part))
    .join(' ');

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-base font-semibold text-ink-900'>
          {studentName || t('unknownStudent')}
        </h2>
        {applicationDocumentId && (
          <Link
            href={`/dashboard/applications/${applicationDocumentId}`}
            className='inline-flex items-center gap-1 text-sm text-rausch-700 hover:underline'
          >
            {t('viewApplication')}
            <ExternalLink className='h-3.5 w-3.5' />
          </Link>
        )}
      </div>
      <ul className='flex flex-col gap-3'>
        {items.map((item) => (
          <QueueItemRow key={item.documentId} item={item} canReview={canReview} onReview={onReview} />
        ))}
      </ul>
    </SurfaceCard>
  );
}
