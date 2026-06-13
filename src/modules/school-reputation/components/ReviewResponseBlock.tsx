'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { MessageSquareReply } from 'lucide-react';
import type { ReviewResponse } from '@/modules/school-reputation/types/school-reputation.types';

interface ReviewResponseBlockProps {
  response: ReviewResponse;
}

export function ReviewResponseBlock({ response }: ReviewResponseBlockProps) {
  const t = useTranslations('SchoolReputation');
  const format = useFormatter();

  const authorName = response.authorStaff?.name ?? t('responseAuthorFallback');
  const roleTitle = response.authorStaff?.roleTitle;
  const stamp = response.publishedAt ?? response.createdAt;

  return (
    <div className='rounded-lg border border-divider bg-muted/40 p-4'>
      <div className='flex items-center gap-2 text-xs font-semibold text-ink-900'>
        <MessageSquareReply className='h-4 w-4 text-primary-strong' aria-hidden='true' />
        {t('officialResponse')}
      </div>
      {response.body ? (
        <p className='mt-2 whitespace-pre-line text-sm text-foreground'>{response.body}</p>
      ) : null}
      <p className='mt-2 text-xs text-foggy'>
        {roleTitle ? t('responseByline', { name: authorName, role: roleTitle }) : authorName}
        {' · '}
        {format.dateTime(new Date(stamp), { dateStyle: 'medium' })}
      </p>
    </div>
  );
}
