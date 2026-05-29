'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/modules/core';
import {
  useSchoolMessages,
  useSendSchoolMessage,
} from '@/modules/school-applications/queries/use-school-messages.query';

export function SchoolMessagesTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data: messages, isLoading, isError } = useSchoolMessages(documentId);
  const sendMessage = useSendSchoolMessage(documentId);
  const [content, setContent] = useState('');

  function handleSend() {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        setContent('');
        toast.success(t('messageSent'));
      },
      onError: () => toast.error(t('messageSendError')),
    });
  }

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
          <div className='flex flex-col gap-3 pr-3'>
            {messages.map((m) => {
              const isSchool = m.senderRole === 'school_staff';
              return (
                <div
                  key={m.documentId}
                  className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${
                    isSchool ? 'ml-auto bg-babu-500 text-white' : 'bg-muted text-ink-900'
                  }`}
                >
                  <p>{m.content}</p>
                  <p className={`mt-1 text-xs ${isSchool ? 'text-white/70' : 'text-foggy'}`}>
                    {new Date(m.createdAt).toLocaleString('en-AU')}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}

      <div className='flex flex-col gap-2'>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('messageComposerPlaceholder')}
          disabled={sendMessage.isPending}
          aria-label={t('messageComposerPlaceholder')}
        />
        <div className='flex justify-end'>
          <Button type='button' onClick={handleSend} disabled={!content.trim() || sendMessage.isPending}>
            {sendMessage.isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Send className='mr-2 h-4 w-4' />
            )}
            {t('messageSend')}
          </Button>
        </div>
      </div>
    </div>
  );
}
