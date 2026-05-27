'use client';

import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { useParentPreEnrolment } from '@/modules/applications/queries/use-parent-pre-enrolment.query';
import { computePreEnrolmentSummary } from '@/modules/applications/lib/pre-enrolment-summary';
import {
  PRE_ENROLMENT_ITEM_LABEL_KEY,
  PRE_ENROLMENT_STATUS_BADGE,
} from '@/modules/applications/constants/parent-pre-enrolment.constants';
import type { ParentPreEnrolmentItem } from '@/modules/applications/types/parent-pre-enrolment.types';

function ParentPreEnrolmentSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-2 w-full rounded-full' />
      {[0, 1, 2].map((i) => (
        <div key={i} className='flex items-center justify-between gap-3'>
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-5 w-20 rounded-full' />
        </div>
      ))}
    </div>
  );
}

function ParentPreEnrolmentRow({ item }: { item: ParentPreEnrolmentItem }) {
  const t = useTranslations('ParentApplications');
  const label =
    item.itemType === 'custom' && item.customLabel
      ? item.customLabel
      : t(PRE_ENROLMENT_ITEM_LABEL_KEY[item.itemType]);

  return (
    <div className='flex flex-col gap-1 border-b border-border/50 py-3 last:border-b-0'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm text-ink-900'>{label}</span>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
            PRE_ENROLMENT_STATUS_BADGE[item.status],
          )}
        >
          {t(`preEnrolmentStatus_${item.status}`)}
        </span>
      </div>
      {item.note && <span className='text-xs text-foggy'>{item.note}</span>}
    </div>
  );
}

export function ParentPreEnrolmentSection({
  applicationDocumentId,
}: {
  applicationDocumentId: string;
}) {
  const t = useTranslations('ParentApplications');
  const { data, isLoading } = useParentPreEnrolment(applicationDocumentId);

  const items = data?.data ?? [];
  const summary = computePreEnrolmentSummary(items);
  const percent = summary.total > 0 ? (summary.approved / summary.total) * 100 : 0;

  return (
    <div className='rounded-xl border border-border bg-card p-6'>
      <h2 className='mb-4 text-base font-semibold text-ink-900'>{t('preEnrolmentTitle')}</h2>

      {isLoading ? (
        <ParentPreEnrolmentSkeleton />
      ) : items.length === 0 ? (
        <EmptyState icon={ListChecks} title={t('preEnrolmentEmpty')} />
      ) : (
        <div className='flex flex-col'>
          <div className='mb-4 flex flex-col gap-2'>
            <span className='text-sm text-foggy'>
              {t('preEnrolmentProgress', {
                approved: summary.approved,
                total: summary.total,
              })}
            </span>
            <Progress value={percent} />
          </div>
          <div className='flex flex-col'>
            {items.map((item) => (
              <ParentPreEnrolmentRow key={item.documentId} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
