'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { StudentFormParentSectionProps } from '@/modules/students/types/component.types';

export function StudentFormParentSection({ control }: StudentFormParentSectionProps) {
  const t = useTranslations('Students');

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-ink-900'>{t('sectionParent')}</h2>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
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
          name='parentGuardianPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldParentPhone')}</FormLabel>
              <FormControl><Input {...field} /></FormControl>
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
      </div>
    </section>
  );
}
