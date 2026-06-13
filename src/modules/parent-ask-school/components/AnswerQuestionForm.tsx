'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAnswerQuestionForm } from '@/modules/parent-ask-school/hooks/useAnswerQuestionForm';

interface AnswerQuestionFormProps {
  questionDocumentId: string;
  onClose: () => void;
}

export function AnswerQuestionForm({ questionDocumentId, onClose }: AnswerQuestionFormProps) {
  const t = useTranslations('AskSchool');
  const { form, handleSubmit, isPending } = useAnswerQuestionForm({ questionDocumentId, onClose });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('answerLabel')}</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder={t('answerPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='publish'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between gap-4 rounded-lg bg-muted p-3'>
              <div className='flex flex-col gap-1'>
                <FormLabel>{t('publishLabel')}</FormLabel>
                <FormDescription>{t('publishDescription')}</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('answerSubmit')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
