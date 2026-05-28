'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSendMessage } from '@/modules/applications/queries/use-send-message.mutation';
import type { MessageComposerProps } from '@/modules/applications/types/detail.types';

export function MessageComposer({ applicationDocumentId, onSent, autoFocus }: MessageComposerProps) {
  const t = useTranslations('Applications');
  const [content, setContent] = useState('');
  const sendMessage = useSendMessage(applicationDocumentId);

  function handleSend() {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage.mutate(
      { content: trimmed },
      {
        onSuccess: () => {
          setContent('');
          toast.success(t('messageSendSuccess'));
          onSent?.();
        },
        onError: () => toast.error(t('messageSendError')),
      },
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      <Textarea
        autoFocus={autoFocus}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('messageComposerPlaceholder')}
        disabled={sendMessage.isPending}
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
  );
}
