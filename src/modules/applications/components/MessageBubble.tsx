'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { MessageThreadItem } from '@/modules/applications/types/detail.types';

export function MessageBubble({ message }: { message: MessageThreadItem }) {
  const t = useTranslations('Applications');
  const isAgent = message.senderRole === 'agent';
  const senderLabel = isAgent ? t('senderAgent') : t('senderSchool');
  const timestamp = new Date(message.createdAt).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={cn('flex flex-col gap-1', isAgent ? 'items-end' : 'items-start')}>
      <div className='flex items-center gap-2 text-xs text-foggy'>
        <span className='font-medium text-foreground'>{senderLabel}</span>
        <span>{timestamp}</span>
      </div>
      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap',
          isAgent ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
