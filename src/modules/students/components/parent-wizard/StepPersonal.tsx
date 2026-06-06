'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DOB_MAX_DATE,
  PARENT_GENDER_OPTIONS,
} from '@/modules/students/constants/parent-wizard.constants';
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';
import { StepCard } from '@/modules/students/components/parent-wizard/StepCard';
import { NationalityCombobox } from '@/modules/students/components/parent-wizard/fields/NationalityCombobox';
import { SegmentedRadioGroup } from '@/modules/students/components/parent-wizard/fields/SegmentedRadioGroup';

const LABEL = 'text-sm font-medium text-ink-900';

export function StepPersonal({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <StepCard title={t('stepPersonal')} description={t('descPersonal')}>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
        <FormField
          control={control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldFirstName')}</FormLabel>
              <FormControl><Input className='h-12' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldLastName')}</FormLabel>
              <FormControl><Input className='h-12' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldEmail')}</FormLabel>
              <FormControl><Input className='h-12' type='email' placeholder={t('placeholderEmail')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldDob')}</FormLabel>
              <FormControl><Input className='h-12' type='date' max={DOB_MAX_DATE} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='gender'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className={LABEL}>{t('fieldGender')}</FormLabel>
              <FormControl>
                <SegmentedRadioGroup
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  ariaLabel={t('fieldGender')}
                  className='grid-cols-2 sm:grid-cols-4'
                  options={PARENT_GENDER_OPTIONS.map((g) => ({ value: g, label: t(`gender_${g}`) }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='nationality'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldNationality')}</FormLabel>
              <FormControl><NationalityCombobox value={field.value} onChange={field.onChange} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='passportNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldPassport')}</FormLabel>
              <FormControl><Input className='h-12' placeholder={t('placeholderPassport')} {...field} value={field.value ?? ''} /></FormControl>
              <FormDescription>{t('helpPassport')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepCard>
  );
}
