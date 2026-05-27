'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Clock, History } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { useParentApplicationTimeline } from '@/modules/applications/queries/use-parent-application-timeline.query';
import { PARENT_TIMELINE_EVENT_ICON } from '@/modules/applications/constants/parent-timeline.constants';
import { formatDate } from '@/modules/applications/lib/parent-format';
import type { ParentTimelineActorRole } from '@/modules/applications/types/parent-timeline.types';

function ParentTimelineSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className='flex gap-3'>
          <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
          <div className='flex flex-1 flex-col gap-1.5 pt-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/3' />
          </div>
        </div>
      ))}
    </div>
  );
}

const ACTOR_ROLE_KEY: Record<Exclude<ParentTimelineActorRole, null>, string> = {
  agent: 'timelineActorAgent',
  school_staff: 'timelineActorSchool',
  system: 'timelineActorSystem',
};

export function ParentApplicationTimelineSection({
  applicationDocumentId,
}: {
  applicationDocumentId: string;
}) {
  const t = useTranslations('ParentApplications');
  const locale = useLocale();
  const { data, isLoading } = useParentApplicationTimeline(applicationDocumentId);

  const events = data?.data ?? [];

  return (
    <div className='rounded-xl border border-border bg-card p-6'>
      <h2 className='mb-4 text-base font-semibold text-ink-900'>{t('timelineTitle')}</h2>

      {isLoading ? (
        <ParentTimelineSkeleton />
      ) : events.length === 0 ? (
        <EmptyState icon={Clock} title={t('timelineEmpty')} />
      ) : (
        <div className='flex flex-col'>
          {events.map((event, idx) => {
            const Icon = PARENT_TIMELINE_EVENT_ICON[event.eventType] ?? History;
            const isLast = idx === events.length - 1;
            const actorLabel = event.actorRole ? t(ACTOR_ROLE_KEY[event.actorRole]) : null;
            const date = formatDate(event.createdAt, locale);

            return (
              <div key={event.documentId} className='flex gap-3'>
                <div className='flex flex-col items-center'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babu-50 text-babu-500'>
                    <Icon className='h-4 w-4' />
                  </div>
                  {!isLast && <div className='my-1 w-px flex-1 border-l border-border' />}
                </div>
                <div className='flex flex-col gap-0.5 pb-5'>
                  <span className='text-sm text-ink-900'>{event.description}</span>
                  <span className='text-xs text-foggy'>
                    {[actorLabel, date].filter(Boolean).join(' · ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
