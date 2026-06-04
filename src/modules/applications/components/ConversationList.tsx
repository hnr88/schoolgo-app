'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/modules/core';
import { ConversationListItem } from '@/modules/applications/components/ConversationListItem';
import type { ConversationListProps } from '@/modules/applications/types/conversation.types';

export function ConversationList({
  conversations,
  isLoading,
  isError,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}: ConversationListProps) {
  const t = useTranslations('AgentMessages');

  return (
    <div className='flex h-full flex-col gap-3'>
      <div className='relative'>
        <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          type='search'
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className='pl-9'
        />
      </div>

      {isLoading ? (
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2 px-4 py-3'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-3 w-2/3' />
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className='px-4 py-3 text-sm text-foggy'>{t('loadError')}</p>
      ) : conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={search ? t('noSearchResults') : t('empty')}
          description={search ? undefined : t('emptyDescription')}
          framed
        />
      ) : (
        <ScrollArea className='-mx-1 h-full px-1'>
          <div className='flex flex-col gap-1'>
            {conversations.map((conversation) => (
              <ConversationListItem
                key={conversation.applicationDocumentId}
                conversation={conversation}
                isSelected={conversation.applicationDocumentId === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
