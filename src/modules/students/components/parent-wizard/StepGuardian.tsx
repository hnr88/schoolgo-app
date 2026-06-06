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
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';
import { StepCard } from '@/modules/students/components/parent-wizard/StepCard';
import { ContactChannelCards } from '@/modules/students/components/parent-wizard/fields/ContactChannelCards';

const LABEL = 'text-sm font-medium text-ink-900';

export function StepGuardian({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <StepCard title={t('stepGuardian')} description={t('descGuardian')}>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
        <FormField
          control={control}
          name='parentGuardianName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldParentName')}</FormLabel>
              <FormControl><Input className='h-12' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='parentGuardianPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldParentPhone')}</FormLabel>
              <FormControl><Input className='h-12' type='tel' placeholder={t('placeholderPhone')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='parentGuardianEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldParentEmail')}</FormLabel>
              <FormControl><Input className='h-12' type='email' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='parentGuardianWechat'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldParentWechat')}</FormLabel>
              <FormControl><Input className='h-12' placeholder={t('placeholderWechat')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='preferredContactChannel'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className={LABEL}>{t('fieldContactChannel')}</FormLabel>
              <FormControl>
                <ContactChannelCards
                  value={field.value}
                  onValueChange={field.onChange}
                  ariaLabel={t('fieldContactChannel')}
                />
              </FormControl>
              <FormDescription>{t('helpContactChannel')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepCard>
  );
}
