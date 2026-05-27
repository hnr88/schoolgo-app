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
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <FormField
        control={control}
        name='parentGuardianName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldParentName')}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
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
            <FormControl><Input type='tel' {...field} /></FormControl>
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
            <FormControl><Input type='email' {...field} /></FormControl>
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
            <FormControl><Input {...field} /></FormControl>
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
                <SelectTrigger><SelectValue /></SelectTrigger>
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
  );
}
