'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { useApplicationMessages } from '@/modules/applications/queries/use-application-messages.query';
import { MessageBubble } from '@/modules/applications/components/MessageBubble';
import { MessageComposer } from '@/modules/applications/components/MessageComposer';

export function ApplicationMessagesTab({ documentId }: { documentId: string }) {
  const t = useTranslations('Applications');
  const { data: messages, isLoading, isError } = useApplicationMessages(documentId);

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-16 w-2/3 rounded-xl' />
          <Skeleton className='ml-auto h-16 w-2/3 rounded-xl' />
        </div>
      ) : isError ? (
        <p className='text-sm text-foggy'>{t('messagesLoadError')}</p>
      ) : !messages || messages.length === 0 ? (
        <EmptyState icon={MessageSquare} title={t('messagesEmpty')} />
      ) : (
        <ScrollArea className='max-h-96'>
          <div className='flex flex-col gap-4 pr-3'>
            {messages.map((message) => (
              <MessageBubble key={message.documentId} message={message} />
            ))}
          </div>
        </ScrollArea>
      )}

      <MessageComposer applicationDocumentId={documentId} />
    </div>
  );
}
