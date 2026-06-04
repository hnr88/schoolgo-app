'use client';

import { useTranslations } from 'next-intl';
import { User } from 'lucide-react';
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
import { StudentFormSectionCard } from '@/modules/students/components/StudentFormSectionCard';
import { GENDER_OPTIONS, GENDER_LABEL_KEYS } from '@/modules/students/constants/student.constants';
import type { StudentFormPersonalSectionProps } from '@/modules/students/types/component.types';

export function StudentFormPersonalSection({ control }: StudentFormPersonalSectionProps) {
  const t = useTranslations('Students');

  return (
    <StudentFormSectionCard
      icon={User}
      title={t('sectionPersonal')}
      description={t('sectionPersonalDesc')}
    >
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <FormField
          control={control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldFirstName')}</FormLabel>
              <FormControl><Input placeholder={t('fieldFirstNamePlaceholder')} {...field} /></FormControl>
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
              <FormControl><Input placeholder={t('fieldLastNamePlaceholder')} {...field} /></FormControl>
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
                    <SelectItem key={g} value={g}>{t(GENDER_LABEL_KEYS[g])}</SelectItem>
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
              <FormControl><Input placeholder={t('fieldNationalityPlaceholder')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='passportNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldPassport')}</FormLabel>
              <FormControl><Input placeholder={t('fieldPassportPlaceholder')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StudentFormSectionCard>
  );
}
