'use client';

import { useTranslations } from 'next-intl';
import { Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { messageSenderInitials } from '@/modules/applications/lib/message-sender';
import type { MessageThreadItem } from '@/modules/applications/types/detail.types';

export function MessageBubble({ message }: { message: MessageThreadItem }) {
  const t = useTranslations('Applications');
  const isAgent = message.senderRole === 'agent';
  const senderLabel = isAgent ? t('senderAgent') : t('senderSchool');
  const initials = messageSenderInitials(message.sender, senderLabel);
  const timestamp = new Date(message.createdAt).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const avatar = (
    <Avatar size='sm' className='mt-5 shrink-0'>
      <AvatarFallback
        className={cn(isAgent ? 'bg-rausch-50 text-primary-strong' : 'bg-babu-50 text-babu-600')}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div className={cn('flex items-start gap-2', isAgent ? 'flex-row-reverse' : 'flex-row')}>
      {avatar}
      <div className={cn('flex min-w-0 flex-col gap-1', isAgent ? 'items-end' : 'items-start')}>
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
        {isAgent && (
          <span className='flex items-center gap-1 text-xs text-foggy'>
            {message.readAt ? (
              <CheckCheck className='h-3.5 w-3.5 text-babu-600' aria-hidden='true' />
            ) : (
              <Check className='h-3.5 w-3.5' aria-hidden='true' />
            )}
            {message.readAt ? t('messageRead') : t('messageSent')}
          </span>
        )}
      </div>
    </div>
  );
}
