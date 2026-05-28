'use client';

import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { usePreEnrolmentItems } from '@/modules/applications/queries/use-pre-enrolment-items.query';
import { usePreEnrolmentSummary } from '@/modules/applications/queries/use-pre-enrolment-summary.query';
import { PreEnrolmentItemRow } from '@/modules/agent-offers/components/PreEnrolmentItemRow';
import type { Application } from '@/modules/applications/types/application.types';

export function PreEnrolmentCard({ application }: { application: Application }) {
  const t = useTranslations('AgentOffers');
  const { data: itemsData, isLoading } = usePreEnrolmentItems(application.documentId);
  const { data: summary } = usePreEnrolmentSummary(application.documentId);

  const items = itemsData?.data ?? [];
  const percent = summary && summary.total > 0 ? (summary.approved / summary.total) * 100 : 0;
  const studentName = `${application.student.firstName} ${application.student.lastName}`;

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-base font-semibold text-ink-900'>{application.school.name}</h3>
          <span className='text-sm text-foggy'>{studentName}</span>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-2 w-full rounded-full' />
          {[0, 1].map((i) => (
            <div key={i} className='flex items-center justify-between gap-3'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-5 w-20 rounded-full' />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={ListChecks} title={t('checklistEmpty')} />
      ) : (
        <div className='flex flex-col gap-3'>
          {summary && (
            <div className='flex flex-col gap-2'>
              <span className='text-sm text-foggy'>
                {t('checklistProgress', { approved: summary.approved, total: summary.total })}
              </span>
              <Progress value={percent} />
            </div>
          )}
          <div className='flex flex-col'>
            {items.map((item) => (
              <PreEnrolmentItemRow
                key={item.documentId}
                item={item}
                applicationDocumentId={application.documentId}
              />
            ))}
          </div>
        </div>
      )}

      <div className='border-t border-border/60 pt-4'>
        <Link
          href={`/dashboard/applications/${application.documentId}`}
          className='text-sm font-medium text-vivid-iris hover:underline'
        >
          {t('viewApplication')}
        </Link>
      </div>
    </div>
  );
}
