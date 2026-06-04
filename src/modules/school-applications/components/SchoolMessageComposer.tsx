'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useSchoolMessageComposer } from '@/modules/school-applications/hooks/useSchoolMessageComposer';
import { SCHOOL_MESSAGE_MAX_LENGTH } from '@/modules/school-applications/constants/school-message.constants';

export function SchoolMessageComposer({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { form, content, charCount, isPending, submit } = useSchoolMessageComposer(documentId, {
    onSent: () => toast.success(t('messageSent')),
    onError: () => toast.error(t('messageSendError')),
  });

  const isOverLimit = charCount > SCHOOL_MESSAGE_MAX_LENGTH;
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
                  placeholder={t('messageComposerPlaceholder')}
                  disabled={isPending}
                  aria-label={t('messageComposerPlaceholder')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between gap-3'>
          <span
            aria-live='polite'
            className={cn(
              'text-xs tabular-nums',
              isOverLimit ? 'font-medium text-vivid-coral-strong' : 'text-foggy',
            )}
          >
            {t('messageCharCount', { count: charCount, max: SCHOOL_MESSAGE_MAX_LENGTH })}
          </span>
          <Button type='submit' disabled={isEmpty || isOverLimit || isPending}>
            {isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Send className='mr-2 h-4 w-4' />
            )}
            {t('messageSend')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
