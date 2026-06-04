'use client';

import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { EmptyState, SurfaceCard } from '@/modules/core';
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
    <SurfaceCard elevation='interactive' padding='lg' className='flex flex-col gap-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-display text-base font-semibold tracking-tight text-ink-900'>{application.school.name}</h3>
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
        <EmptyState icon={ListChecks} title={t('checklistEmpty')} framed />
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
          className='rounded-md text-sm font-semibold text-babu-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          {t('viewApplication')}
        </Link>
      </div>
    </SurfaceCard>
  );
}
