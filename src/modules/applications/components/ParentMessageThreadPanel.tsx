'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/modules/core';
import { useParentThread } from '@/modules/applications/queries/use-parent-thread.query';
import { PARENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-parent-conversations.query';
import { ParentMessageBubble } from '@/modules/applications/components/ParentMessageBubble';
import { ParentMessageComposer } from '@/modules/applications/components/ParentMessageComposer';
import type { ParentMessageThreadPanelProps } from '@/modules/applications/types/parent-message.types';

export function ParentMessageThreadPanel({
  applicationDocumentId,
  conversation,
  onBack,
}: ParentMessageThreadPanelProps) {
  const t = useTranslations('ParentMessages');
  const queryClient = useQueryClient();
  const { data: messages, isLoading, isError, isSuccess } = useParentThread(applicationDocumentId);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: PARENT_CONVERSATIONS_QUERY_KEY });
    }
  }, [isSuccess, applicationDocumentId, queryClient]);

  return (
    <div className='flex h-full flex-col gap-4'>
      <header className='flex items-center gap-3 border-b border-border pb-3'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onBack}
          aria-label={t('back')}
          className='lg:hidden'
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div className='flex min-w-0 flex-col'>
          <p className='truncate text-sm font-semibold text-ink-900'>
            {conversation?.schoolName ?? t('unknownSchool')}
          </p>
          <p className='truncate text-xs text-muted-foreground'>
            {conversation?.studentName ?? t('unknownStudent')}
          </p>
        </div>
      </header>

      <div className='flex min-h-0 flex-1 flex-col'>
        {isLoading ? (
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-16 w-2/3 rounded-xl' />
            <Skeleton className='ml-auto h-16 w-2/3 rounded-xl' />
            <Skeleton className='h-16 w-1/2 rounded-xl' />
          </div>
        ) : isError ? (
          <p className='text-sm text-foggy'>{t('threadLoadError')}</p>
        ) : !messages || messages.length === 0 ? (
          <EmptyState icon={MessageSquare} title={t('threadEmpty')} />
        ) : (
          <ScrollArea className='h-full'>
            <div className='flex flex-col gap-4 pr-3'>
              {messages.map((message) => (
                <ParentMessageBubble key={message.documentId} message={message} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <ParentMessageComposer applicationDocumentId={applicationDocumentId} autoFocus />
    </div>
  );
}
