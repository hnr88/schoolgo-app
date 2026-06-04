'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PARENT_CONTACT_CHANNEL_OPTIONS } from '@/modules/students/constants/parent-wizard.constants';
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';
import { StepCard } from '@/modules/students/components/parent-wizard/StepCard';

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
              <FormLabel className='text-sm font-medium text-ink-900'>{t('fieldParentName')}</FormLabel>
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
              <FormLabel className='text-sm font-medium text-ink-900'>{t('fieldParentPhone')}</FormLabel>
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
              <FormLabel className='text-sm font-medium text-ink-900'>{t('fieldParentEmail')}</FormLabel>
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
              <FormLabel className='text-sm font-medium text-ink-900'>{t('fieldParentWechat')}</FormLabel>
              <FormControl><Input className='h-12' placeholder={t('placeholderWechat')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='preferredContactChannel'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-ink-900'>{t('fieldContactChannel')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='h-12 w-full'><SelectValue /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PARENT_CONTACT_CHANNEL_OPTIONS.map((channel) => (
                    <SelectItem key={channel} value={channel}>{t(`channel_${channel}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepCard>
  );
}
