'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { TranslateMessageButton } from '@/modules/messaging-translation';
import { useSchoolMessages } from '@/modules/school-applications/queries/use-school-messages.query';
import { useSchoolThreadView } from '@/modules/school-applications/hooks/useSchoolThreadView';
import { SchoolMessageComposer } from '@/modules/school-applications/components/SchoolMessageComposer';
import type { SchoolMessageThreadItem } from '@/modules/school-applications/types/school-applications.types';

function MessageBubble({ message }: { message: SchoolMessageThreadItem }) {
  const isSchool = message.senderRole === 'school_staff';
  return (
    <div
      className={cn(
        'max-w-[75%] rounded-lg px-4 py-2 text-sm',
        isSchool ? 'ml-auto bg-arches-700 text-background' : 'bg-muted text-ink-900',
      )}
    >
      <p>{message.content}</p>
      <p className={cn('mt-1 text-xs', isSchool ? 'text-background/80' : 'text-foggy')}>
        {new Date(message.createdAt).toLocaleString('en-AU')}
      </p>
      <div className='mt-1'>
        <TranslateMessageButton messageDocumentId={message.documentId} content={message.content} />
      </div>
    </div>
  );
}

export function SchoolMessagesTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data: messages, isLoading, isError, refetch } = useSchoolMessages(documentId);
  const { bottomRef } = useSchoolThreadView(documentId, messages);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-4'>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-16 w-2/3 rounded-lg' />
          <Skeleton className='ml-auto h-16 w-2/3 rounded-lg' />
        </div>
      ) : isError ? (
        <ErrorState
          framed
          message={t('messagesLoadError')}
          onRetry={() => refetch()}
          retryLabel={t('messagesRetry')}
        />
      ) : !messages || messages.length === 0 ? (
        <EmptyState framed icon={MessageSquare} title={t('messagesEmpty')} />
      ) : (
        <ScrollArea className='max-h-96'>
          <div className='flex flex-col gap-3 pr-3'>
            {messages.map((message) => (
              <MessageBubble key={message.documentId} message={message} />
            ))}
            <div ref={bottomRef} aria-hidden='true' />
          </div>
        </ScrollArea>
      )}

      <SchoolMessageComposer documentId={documentId} />
    </SurfaceCard>
  );
}
