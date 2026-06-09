'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useSharedWithMe } from '@/modules/agent-shared-students/queries/use-shared-with-me.query';
import type { SharedStudentShare } from '@/modules/agent-shared-students/types/shared-student.types';

function SharedWithMeSkeleton() {
  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-2'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-14 w-full rounded-md' />
      ))}
    </SurfaceCard>
  );
}

function ShareRow({ share }: { share: SharedStudentShare }) {
  const t = useTranslations('AgentSharedStudents');
  const format = useFormatter();
  const student = share.student;
  const name = student
    ? [student.firstName, student.lastName].filter(Boolean).join(' ') || t('unknownStudent')
    : t('unknownStudent');

  return (
    <li className='flex flex-wrap items-center justify-between gap-3 px-4 py-3'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='truncate text-sm font-medium text-foreground'>{name}</span>
        <span className='truncate text-xs text-muted-foreground'>
          {student?.currentYearLevel
            ? t('yearLevel', { yearLevel: student.currentYearLevel })
            : t('yearLevelUnknown')}
          {student?.parentGuardianName
            ? ` · ${t('sharedBy', { name: student.parentGuardianName })}`
            : ''}
        </span>
      </div>
      <div className='flex shrink-0 items-center gap-3'>
        {share.sharedAt ? (
          <span className='text-xs text-muted-foreground'>
            {t('sharedOn', {
              date: format.dateTime(new Date(share.sharedAt), { dateStyle: 'medium' }),
            })}
          </span>
        ) : null}
        <Badge variant={share.status === 'active' ? 'secondary' : 'destructive'}>
          {share.status === 'active' ? t('statusActive') : t('statusRevoked')}
        </Badge>
      </div>
    </li>
  );
}

export function SharedWithMeSection() {
  const t = useTranslations('AgentSharedStudents');
  const sharesQuery = useSharedWithMe();

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('title')} description={t('subtitle')} level={2} />
      {sharesQuery.isLoading ? (
        <SharedWithMeSkeleton />
      ) : sharesQuery.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => sharesQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : (sharesQuery.data ?? []).length === 0 ? (
        <EmptyState
          framed
          icon={Users}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <SurfaceCard padding='none' className='overflow-hidden'>
          <ul className='divide-y divide-border'>
            {(sharesQuery.data ?? []).map((share) => (
              <ShareRow key={share.documentId} share={share} />
            ))}
          </ul>
        </SurfaceCard>
      )}
    </section>
  );
}
