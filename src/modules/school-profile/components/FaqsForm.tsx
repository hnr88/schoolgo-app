'use client';

import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFaqsEditor } from '@/modules/school-profile/hooks/useFaqsEditor';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface FaqsFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function FaqsForm({ school, disabled = false }: FaqsFormProps) {
  const t = useTranslations('SchoolProfile');
  const { form, fields, addRow, remove, handleSubmit, isPending } = useFaqsEditor(school);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
        {fields.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {fields.map((row, index) => (
              <li
                key={row.id}
                className='flex flex-col gap-4 rounded-xl border border-divider bg-card p-4 focus-within:ring-2 focus-within:ring-ring'
              >
                <div className='flex items-center justify-between gap-3'>
                  <span className='inline-flex items-center rounded-pill bg-muted px-3 py-1 text-caption font-medium text-ink-900'>
                    {t('faqsRowLabel', { index: index + 1 })}
                  </span>
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    disabled={disabled}
                    aria-label={t('faqsRemove', { index: index + 1 })}
                    className='flex h-8 w-8 items-center justify-center rounded-pill text-foggy transition-colors hover:bg-divider hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  >
                    <Trash2 className='h-4 w-4' aria-hidden='true' />
                  </button>
                </div>
                <FormField control={form.control} name={`faqs.${index}.question`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('faqsQuestionLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('faqsQuestionPlaceholder')} disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`faqs.${index}.answer`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('faqsAnswerLabel')}</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder={t('faqsAnswerPlaceholder')} disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`faqs.${index}.topicTag`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('faqsTopicTagLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('faqsTopicTagPlaceholder')} disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-caption text-foggy'>{t('faqsEmpty')}</p>
        )}

        <div className='flex flex-wrap gap-3'>
          <Button
            type='button'
            variant='secondary'
            onClick={addRow}
            disabled={disabled}
            className='self-start'
          >
            <Plus className='mr-2 h-4 w-4' aria-hidden='true' />
            {t('faqsAdd')}
          </Button>
          <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
            {t('save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
