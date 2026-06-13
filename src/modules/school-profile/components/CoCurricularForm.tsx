'use client';

import type { KeyboardEvent } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCoCurricularEditor } from '@/modules/school-profile/hooks/useCoCurricularEditor';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface CoCurricularFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function CoCurricularForm({ school, disabled = false }: CoCurricularFormProps) {
  const t = useTranslations('SchoolProfile');
  const { form, activities, draft, setDraft, addActivity, removeActivity, handleSubmit, isPending } =
    useCoCurricularEditor(school);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addActivity();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
        <FormField control={form.control} name='programTypes' render={() => (
          <FormItem>
            <FormLabel>{t('cocurricularLabel')}</FormLabel>
            <div className='flex gap-2'>
              <FormControl>
                <Input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('cocurricularPlaceholder')}
                  disabled={disabled}
                  aria-label={t('cocurricularInputLabel')}
                />
              </FormControl>
              <Button
                type='button'
                variant='secondary'
                onClick={addActivity}
                disabled={disabled || draft.trim().length === 0}
                className='shrink-0'
              >
                <Plus className='mr-2 h-4 w-4' aria-hidden='true' />
                {t('cocurricularAdd')}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {activities.length > 0 ? (
          <ul className='flex flex-wrap gap-2'>
            {activities.map((activity, index) => (
              <li key={`${activity}-${index}`}>
                <span className='inline-flex items-center gap-1.5 rounded-pill bg-muted py-1.5 pl-3 pr-2 text-caption font-medium text-ink-900'>
                  {activity}
                  <button
                    type='button'
                    onClick={() => removeActivity(index)}
                    disabled={disabled}
                    aria-label={t('cocurricularRemove', { activity })}
                    className='flex h-5 w-5 items-center justify-center rounded-pill text-foggy transition-colors hover:bg-divider hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  >
                    <X className='h-3.5 w-3.5' aria-hidden='true' />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-caption text-foggy'>{t('cocurricularEmpty')}</p>
        )}

        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
