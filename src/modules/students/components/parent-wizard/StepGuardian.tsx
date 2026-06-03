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

export function StepGuardian({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm text-muted-foreground'>{t('descGuardian')}</p>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
      <FormField
        control={control}
        name='parentGuardianName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldParentName')}</FormLabel>
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
            <FormLabel>{t('fieldParentPhone')}</FormLabel>
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
            <FormLabel>{t('fieldParentEmail')}</FormLabel>
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
            <FormLabel>{t('fieldParentWechat')}</FormLabel>
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
            <FormLabel>{t('fieldContactChannel')}</FormLabel>
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
    </div>
  );
}
