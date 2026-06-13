'use client';

import { useTranslations } from 'next-intl';
import { Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { TranslateMessageButton } from '@/modules/messaging-translation';
import { initialsFromLabel } from '@/modules/applications/lib/message-sender';
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

  const avatar = (
    <Avatar size='sm' className='mt-5 shrink-0'>
      <AvatarFallback
        className={cn(isOwn ? 'bg-rausch-50 text-primary-strong' : 'bg-babu-50 text-babu-600')}
      >
        {initialsFromLabel(senderLabel)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div className={cn('flex items-start gap-2', isOwn ? 'flex-row-reverse' : 'flex-row')}>
      {avatar}
      <div className={cn('flex min-w-0 flex-col gap-1', isOwn ? 'items-end' : 'items-start')}>
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
        <TranslateMessageButton messageDocumentId={message.documentId} content={message.content} />
        {isOwn && (
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
