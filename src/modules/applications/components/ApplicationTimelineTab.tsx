'use client';

import { useTranslations } from 'next-intl';
import { Clock, ArrowRight, FileUp, MessageSquare, StickyNote, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { useApplicationTimeline } from '@/modules/applications/queries/use-application-timeline.query';
import type { Application } from '@/modules/applications/types/application.types';
import type { ApplicationTimelineEvent } from '@/modules/applications/types/detail.types';

const EVENT_ICONS: Record<ApplicationTimelineEvent['type'], React.ComponentType<{ className?: string }>> = {
  status_change: ArrowRight,
  document_uploaded: FileUp,
  message_sent: MessageSquare,
  note_added: StickyNote,
  application_created: Plus,
};

function TimelineSkeleton() {
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

export function ApplicationTimelineTab({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const { data, isLoading } = useApplicationTimeline(application.documentId);

  if (isLoading) return <TimelineSkeleton />;

  const events = data?.data ?? [];

  if (events.length === 0) {
    return <EmptyState icon={Clock} title={t('timelineEmpty')} />;
  }

  return (
    <div className='flex flex-col'>
      {events.map((event, idx) => {
        const Icon = EVENT_ICONS[event.type] ?? Plus;
        const isLast = idx === events.length - 1;

        return (
          <div key={event.id} className='flex gap-3'>
            <div className='flex flex-col items-center'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babu-50 text-babu-500'>
                <Icon className='h-4 w-4' />
              </div>
              {!isLast && <div className='w-px flex-1 border-l border-border my-1' />}
            </div>
            <div className='flex flex-col gap-0.5 pb-5'>
              <span className='text-sm text-ink-900'>{event.description}</span>
              <span className='text-xs text-foggy'>
                {t('timelineBy', { actor: event.actor })} · {new Date(event.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
