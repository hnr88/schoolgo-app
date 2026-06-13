'use client';

import { ArrowDown, ArrowUp, Loader2, Plus, X } from 'lucide-react';
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
import { useAdmissionsStepsEditor } from '@/modules/school-profile/hooks/useAdmissionsStepsEditor';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface AdmissionsStepsFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function AdmissionsStepsForm({ school, disabled = false }: AdmissionsStepsFormProps) {
  const t = useTranslations('SchoolProfile');
  const { form, fields, addStep, remove, moveUp, moveDown, handleSubmit, isPending } =
    useAdmissionsStepsEditor(school);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
        {fields.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {fields.map((field, index) => (
              <li
                key={field.id}
                className='flex flex-col gap-4 rounded-lg border border-divider bg-card p-4'
              >
                <div className='flex items-center justify-between gap-2'>
                  <span className='inline-flex items-center rounded-pill bg-muted px-3 py-1 text-caption font-medium text-ink-900'>
                    {t('admissionsStepBadge', { step: index + 1 })}
                  </span>
                  <div className='flex items-center gap-1'>
                    <Button
                      type='button'
                      size='sm'
                      variant='ghost'
                      onClick={() => moveUp(index)}
                      disabled={disabled || index === 0}
                      aria-label={t('admissionsStepMoveUp')}
                    >
                      <ArrowUp className='h-4 w-4' aria-hidden='true' />
                    </Button>
                    <Button
                      type='button'
                      size='sm'
                      variant='ghost'
                      onClick={() => moveDown(index)}
                      disabled={disabled || index === fields.length - 1}
                      aria-label={t('admissionsStepMoveDown')}
                    >
                      <ArrowDown className='h-4 w-4' aria-hidden='true' />
                    </Button>
                    <Button
                      type='button'
                      size='sm'
                      variant='ghost'
                      onClick={() => remove(index)}
                      disabled={disabled}
                      aria-label={t('admissionsStepRemove', { step: index + 1 })}
                    >
                      <X className='h-4 w-4' aria-hidden='true' />
                    </Button>
                  </div>
                </div>
                <FormField control={form.control} name={`steps.${index}.title`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{t('admissionsStepTitleLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('admissionsStepTitlePlaceholder')} disabled={disabled} {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`steps.${index}.description`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{t('admissionsStepDescriptionLabel')}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={t('admissionsStepDescriptionPlaceholder')}
                        disabled={disabled}
                        {...f}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-caption text-foggy'>{t('admissionsStepEmpty')}</p>
        )}

        <Button
          type='button'
          variant='secondary'
          onClick={addStep}
          disabled={disabled}
          className='self-start'
        >
          <Plus className='mr-2 h-4 w-4' aria-hidden='true' />
          {t('admissionsStepAdd')}
        </Button>

        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
