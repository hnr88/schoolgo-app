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
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GENDER_OPTIONS } from '@/modules/students/constants/student.constants';
import type { StudentFormPersonalSectionProps } from '@/modules/students/types/component.types';

export function StudentFormPersonalSection({ control }: StudentFormPersonalSectionProps) {
  const t = useTranslations('Students');

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-ink-900'>{t('sectionPersonal')}</h2>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={t('selectGender')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDER_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>{t(`gender${g.charAt(0).toUpperCase()}${g.slice(1)}`)}</SelectItem>
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
    </section>
  );
}
