'use client';

import { useFormatter, useNow, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { ConversationListItemProps } from '@/modules/applications/types/conversation.types';

export function ConversationListItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationListItemProps) {
  const t = useTranslations('AgentMessages');
  const format = useFormatter();
  const now = useNow();

  const { applicationDocumentId, schoolName, studentName, lastMessage, unread } = conversation;
  const title = schoolName ?? t('unknownSchool');
  const subtitle = studentName ?? t('unknownStudent');

  return (
    <button
      type='button'
      onClick={() => onSelect(applicationDocumentId)}
      aria-current={isSelected ? 'true' : undefined}
      className={cn(
        'flex w-full flex-col gap-1 rounded-lg border border-transparent px-4 py-3 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isSelected ? 'bg-muted' : 'hover:bg-muted/50',
      )}
    >
      <div className='flex items-start justify-between gap-2'>
        <p
          className={cn(
            'truncate text-sm text-ink-900',
            unread ? 'font-bold' : 'font-semibold',
          )}
        >
          {title}
        </p>
        <time dateTime={lastMessage.sentAt} className='shrink-0 text-xs text-foggy'>
          {format.relativeTime(new Date(lastMessage.sentAt), { now })}
        </time>
      </div>
      <p className='truncate text-xs text-muted-foreground'>{subtitle}</p>
      <div className='flex items-center justify-between gap-2'>
        <p
          className={cn(
            'truncate text-sm',
            unread ? 'font-medium text-foreground' : 'text-muted-foreground',
          )}
        >
          {lastMessage.preview}
        </p>
        {unread && (
          <span
            aria-label={t('unread')}
            className='h-2 w-2 shrink-0 rounded-full bg-vivid-coral'
          />
        )}
      </div>
    </button>
  );
}
