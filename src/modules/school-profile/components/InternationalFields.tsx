'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  numberInputToValue,
  valueToInput,
} from '@/modules/school-profile/lib/form-helpers';
import type { InternationalValues } from '@/modules/school-profile/schemas/international.schema';

interface InternationalFieldsProps {
  form: UseFormReturn<InternationalValues>;
  disabled: boolean;
}

export function InternationalFields({ form, disabled }: InternationalFieldsProps) {
  const t = useTranslations('SchoolProfile');

  const textFields = [
    { name: 'cricosAgeRange', label: t('cricosAgeRangeLabel') },
    { name: 'proposedEntryLevel', label: t('proposedEntryLevelLabel') },
    { name: 'oshcPreferredProvider', label: t('oshcPreferredProviderLabel') },
    { name: 'yearLevelsInternational', label: t('yearLevelsInternationalLabel') },
  ] as const;

  const numberFields = [
    { name: 'totalEnrolment', label: t('totalEnrolmentLabel'), step: '1' },
    { name: 'internationalStudentCapacity', label: t('intlCapacityLabel'), step: '1' },
    { name: 'internationalStudentPercentage', label: t('intlPercentageLabel'), step: '0.1' },
  ] as const;

  const switchFields = [
    { name: 'elicosEslSupport', label: t('elicosEslSupportLabel') },
    { name: 'atarAvailable', label: t('atarAvailableLabel') },
  ] as const;

  return (
    <>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {textFields.map(({ name, label }) => (
          <FormField key={name} control={form.control} name={name} render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        ))}
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
        {numberFields.map(({ name, label, step }) => (
          <FormField key={name} control={form.control} name={name} render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  inputMode='decimal'
                  step={step}
                  min={0}
                  disabled={disabled}
                  value={valueToInput(field.value)}
                  onChange={(e) => field.onChange(numberInputToValue(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        ))}
      </div>
      <FormField control={form.control} name='languagesOffered' render={({ field }) => (
        <FormItem>
          <FormLabel>{t('languagesOfferedLabel')}</FormLabel>
          <FormControl><Textarea rows={2} disabled={disabled} {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name='postSubmissionMessage' render={({ field }) => (
        <FormItem>
          <FormLabel>{t('postSubmissionMessageLabel')}</FormLabel>
          <FormControl><Textarea rows={3} disabled={disabled} {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <div className='flex flex-col gap-4'>
        {switchFields.map(({ name, label }) => (
          <FormField key={name} control={form.control} name={name} render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
              <FormLabel className='cursor-pointer'>{label}</FormLabel>
              <FormControl><Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
          )} />
        ))}
      </div>
    </>
  );
}
