'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useParentMessageComposer } from '@/modules/applications/hooks/useParentMessageComposer';
import { ParentMessageAttachmentsField } from '@/modules/applications/components/ParentMessageAttachmentsField';
import { PARENT_MESSAGE_MAX_LENGTH } from '@/modules/applications/constants/parent-message.constants';
import type { ParentMessageComposerProps } from '@/modules/applications/types/parent-message.types';

export function ParentMessageComposer({
  applicationDocumentId,
  autoFocus,
}: ParentMessageComposerProps) {
  const t = useTranslations('ParentMessages');
  const { form, content, charCount, attachments, setAttachments, isPending, submit } =
    useParentMessageComposer(applicationDocumentId, {
      onSent: () => toast.success(t('sendSuccess')),
      onError: () => toast.error(t('sendErrorRetry')),
    });

  const isOverLimit = charCount > PARENT_MESSAGE_MAX_LENGTH;
  const isEmpty = content.trim().length === 0;

  return (
    <Form {...form}>
      <form onSubmit={submit} className='flex flex-col gap-2'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  autoFocus={autoFocus}
                  maxLength={PARENT_MESSAGE_MAX_LENGTH}
                  placeholder={t('composerPlaceholder')}
                  disabled={isPending}
                  aria-label={t('composerPlaceholder')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <ParentMessageAttachmentsField
          files={attachments}
          onFilesChange={setAttachments}
          disabled={isPending}
        />
        <div className='flex items-center justify-between gap-3'>
          <span
            aria-live='polite'
            className={cn(
              'text-xs tabular-nums',
              isOverLimit ? 'font-medium text-vivid-coral-strong' : 'text-foggy',
            )}
          >
            {t('charCount', { count: charCount, max: PARENT_MESSAGE_MAX_LENGTH })}
          </span>
          <Button type='submit' disabled={isEmpty || isOverLimit || isPending}>
            {isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Send className='mr-2 h-4 w-4' />
            )}
            {t('send')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
