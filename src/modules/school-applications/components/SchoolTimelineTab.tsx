'use client';

import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { useSchoolTimeline } from '@/modules/school-applications/queries/use-school-timeline.query';

export function SchoolTimelineTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data, isLoading } = useSchoolTimeline(documentId);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
        {[0, 1, 2].map((i) => (
          <div key={i} className='flex gap-3'>
            <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
            <div className='flex flex-1 flex-col gap-1.5'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-1/3' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const events = data ?? [];
  if (events.length === 0) {
    return (
      <div className='rounded-xl border border-border bg-card p-6'>
        <EmptyState icon={Clock} title={t('timelineEmpty')} />
      </div>
    );
  }

  return (
    <div className='flex flex-col rounded-xl border border-border bg-card p-6'>
      {events.map((event, idx) => (
        <div key={event.documentId} className='flex gap-3'>
          <div className='flex flex-col items-center'>
            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babu-50 text-babu-500'>
              <Clock className='h-4 w-4' />
            </div>
            {idx < events.length - 1 && <div className='my-1 w-px flex-1 border-l border-border' />}
          </div>
          <div className='flex flex-col gap-0.5 pb-5'>
            <span className='text-sm text-ink-900'>{event.description}</span>
            <span className='text-xs text-foggy'>
              {event.actorRole ? t(`actorRole_${event.actorRole}`) : ''} ·{' '}
              {new Date(event.createdAt).toLocaleDateString('en-AU')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
