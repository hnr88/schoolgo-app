'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { ParentMessageThreadItem } from '@/modules/applications/types/parent-message.types';

export function ParentMessageBubble({ message }: { message: ParentMessageThreadItem }) {
  const t = useTranslations('ParentMessages');
  const isOwn = message.senderRole === 'parent';
  const senderLabel = isOwn
    ? t('senderYou')
    : message.senderRole === 'agent'
      ? t('senderAgent')
      : t('senderSchool');
  const timestamp = new Date(message.createdAt).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={cn('flex flex-col gap-1', isOwn ? 'items-end' : 'items-start')}>
      <div className='flex items-center gap-2 text-xs text-foggy'>
        <span className='font-medium text-foreground'>{senderLabel}</span>
        <span>{timestamp}</span>
      </div>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap',
          isOwn ? 'bg-primary text-on-primary shadow-1' : 'bg-muted text-foreground',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
