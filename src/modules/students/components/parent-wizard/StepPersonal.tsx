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
import { PARENT_GENDER_OPTIONS } from '@/modules/students/constants/parent-wizard.constants';
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';

export function StepPersonal({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
      <FormField
        control={control}
        name='firstName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldFirstName')}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='lastName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldLastName')}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldEmail')}</FormLabel>
            <FormControl><Input type='email' {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='dateOfBirth'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldDob')}</FormLabel>
            <FormControl><Input type='date' {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='gender'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldGender')}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value ?? ''}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder={t('selectGender')} /></SelectTrigger>
              </FormControl>
              <SelectContent>
                {PARENT_GENDER_OPTIONS.map((g) => (
                  <SelectItem key={g} value={g}>{t(`gender_${g}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='nationality'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldNationality')}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
