'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParentSendMessage } from '@/modules/applications/queries/use-parent-send-message.mutation';
import type { ParentMessageComposerProps } from '@/modules/applications/types/parent-message.types';

export function ParentMessageComposer({
  applicationDocumentId,
  autoFocus,
}: ParentMessageComposerProps) {
  const t = useTranslations('ParentMessages');
  const [content, setContent] = useState('');
  const sendMessage = useParentSendMessage(applicationDocumentId);

  function handleSend() {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage.mutate(
      { content: trimmed },
      {
        onSuccess: () => {
          setContent('');
          toast.success(t('sendSuccess'));
        },
        onError: () => toast.error(t('sendError')),
      },
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      <Textarea
        autoFocus={autoFocus}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={t('composerPlaceholder')}
        disabled={sendMessage.isPending}
      />
      <div className='flex justify-end'>
        <Button
          type='button'
          onClick={handleSend}
          disabled={!content.trim() || sendMessage.isPending}
        >
          {sendMessage.isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Send className='mr-2 h-4 w-4' />
          )}
          {t('send')}
        </Button>
      </div>
    </div>
  );
}
