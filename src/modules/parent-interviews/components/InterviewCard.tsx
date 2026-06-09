'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarPlus, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import { buildIcs } from '@/modules/parent-interviews/lib/build-ics';
import { downloadIcsFile } from '@/modules/parent-interviews/lib/download-ics';
import { isJoinableLink } from '@/modules/parent-interviews/lib/derive-interviews';
import type {
  InterviewItem,
  InterviewOutcome,
} from '@/modules/parent-interviews/types/parent-interviews.types';

const OUTCOME_VARIANT: Record<InterviewOutcome, 'outline' | 'secondary' | 'destructive'> = {
  pending: 'outline',
  passed: 'secondary',
  further_review: 'outline',
  not_recommended: 'destructive',
};

export function InterviewCard({
  item,
  bucket,
}: {
  item: InterviewItem;
  bucket: 'upcoming' | 'past';
}) {
  const t = useTranslations('ParentInterviews');
  const tLabels = useTranslations('SchoolApplications');
  const format = useFormatter();

  const scheduledDate = new Date(item.scheduledAt);
  const joinLink = isJoinableLink(item.method, item.meetingLink) ? item.meetingLink : null;

  const handleAddToCalendar = () => {
    const ics = buildIcs({
      uid: item.applicationDocumentId,
      start: scheduledDate,
      summary: t('icsSummary', { child: item.childName, school: item.schoolName }),
      url: joinLink,
      stamp: new Date(),
    });
    downloadIcsFile(`interview-${item.applicationDocumentId}.ics`, ics);
  };

  return (
    <SurfaceCard padding='sm' className='flex flex-wrap items-center justify-between gap-3'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='truncate text-sm font-medium text-ink-900'>{item.childName}</span>
        <span className='truncate text-xs text-foggy'>{item.schoolName}</span>
        <span className='text-xs text-foggy'>
          {format.dateTime(scheduledDate, { dateStyle: 'medium', timeStyle: 'short' })}
          {item.method ? ` · ${tLabels(`interviewMethod_${item.method}`)}` : ''}
        </span>
      </div>
      <div className='flex shrink-0 items-center gap-2'>
        {bucket === 'past' && item.outcome ? (
          <Badge variant={OUTCOME_VARIANT[item.outcome]}>
            {tLabels(`interviewOutcome_${item.outcome}`)}
          </Badge>
        ) : null}
        {joinLink ? (
          <a
            href={joinLink}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            <Video aria-hidden='true' />
            {t('joinButton')}
          </a>
        ) : null}
        <Button variant='outline' size='sm' onClick={handleAddToCalendar}>
          <CalendarPlus aria-hidden='true' />
          {t('addToCalendar')}
        </Button>
      </div>
    </SurfaceCard>
  );
}
