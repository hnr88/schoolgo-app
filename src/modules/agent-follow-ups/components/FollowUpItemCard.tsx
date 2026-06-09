'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { daysSince, daysUntil } from '@/modules/agent-follow-ups/lib/follow-up-days';
import type { FollowUpItem, FollowUpVariant } from '@/modules/agent-follow-ups/types/agent-follow-ups.types';

function daysChip(item: FollowUpItem, variant: FollowUpVariant, t: ReturnType<typeof useTranslations>) {
  if (variant === 'offer' && item.offerDeadline) {
    const days = daysUntil(item.offerDeadline);
    return days === 0 ? t('dueToday') : t('daysLeft', { days });
  }
  if (variant === 'draft' && item.createdAt) {
    return t('daysOld', { days: daysSince(item.createdAt) });
  }
  if (variant === 'stale' && item.statusChangedAt) {
    return t('daysStale', { days: daysSince(item.statusChangedAt) });
  }
  return null;
}

export function FollowUpItemCard({ item, variant }: { item: FollowUpItem; variant: FollowUpVariant }) {
  const t = useTranslations('AgentFollowUps');

  const studentName = item.student
    ? `${item.student.firstName ?? ''} ${item.student.lastName ?? ''}`.trim()
    : '';
  const chip = daysChip(item, variant, t);

  return (
    <Link
      href={`/dashboard/applications/${item.documentId}`}
      className='group flex flex-col gap-1.5 rounded-lg border border-divider bg-card p-3 transition-colors hover:border-ring'
      aria-label={t('viewApplication')}
    >
      <div className='flex items-start justify-between gap-2'>
        <span className='text-sm font-medium text-foreground'>
          {studentName || t('unknownStudent')}
        </span>
        <ArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      {item.school?.name && (
        <span className='text-xs text-muted-foreground'>{item.school.name}</span>
      )}
      <div className='flex flex-wrap items-center gap-1.5'>
        <Badge variant='outline'>{t(`status_${item.status}`)}</Badge>
        {chip && (
          <Badge variant={variant === 'offer' ? 'destructive' : 'secondary'}>{chip}</Badge>
        )}
      </div>
    </Link>
  );
}
