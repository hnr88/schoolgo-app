'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState, ErrorState } from '@/modules/core';
import { useApplicationMessages } from '@/modules/applications/queries/use-application-messages.query';
import { useAgentThreadView } from '@/modules/applications/hooks/useAgentThreadView';
import { MessageBubble } from '@/modules/applications/components/MessageBubble';
import { MessageComposer } from '@/modules/applications/components/MessageComposer';
import type { MessageThreadPanelProps } from '@/modules/applications/types/conversation.types';

export function MessageThreadPanel({
  applicationDocumentId,
  conversation,
  onBack,
}: MessageThreadPanelProps) {
  const t = useTranslations('AgentMessages');
  const { data: messages, isLoading, isError, refetch } =
    useApplicationMessages(applicationDocumentId);
  const { bottomRef } = useAgentThreadView(applicationDocumentId, messages);

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
          <ErrorState
            message={t('threadLoadError')}
            onRetry={() => refetch()}
            retryLabel={t('threadRetry')}
            framed
          />
        ) : !messages || messages.length === 0 ? (
          <EmptyState icon={MessageSquare} title={t('threadEmpty')} framed />
        ) : (
          <ScrollArea className='h-full'>
            <div className='flex flex-col gap-4 pr-3'>
              {messages.map((message) => (
                <MessageBubble key={message.documentId} message={message} />
              ))}
              <div ref={bottomRef} aria-hidden='true' />
            </div>
          </ScrollArea>
        )}
      </div>

      <MessageComposer applicationDocumentId={applicationDocumentId} autoFocus />
    </div>
  );
}
