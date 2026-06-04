'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StudentFormSectionCard } from '@/modules/students/components/StudentFormSectionCard';
import type { StudentFormParentSectionProps } from '@/modules/students/types/component.types';

export function StudentFormParentSection({ control }: StudentFormParentSectionProps) {
  const t = useTranslations('Students');

  return (
    <StudentFormSectionCard
      icon={Users}
      title={t('sectionParent')}
      description={t('sectionParentDesc')}
    >
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <FormField
          control={control}
          name='parentGuardianName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldParentName')}</FormLabel>
              <FormControl><Input placeholder={t('fieldParentNamePlaceholder')} {...field} /></FormControl>
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
              <FormControl><Input type='email' placeholder={t('fieldParentEmailPlaceholder')} {...field} /></FormControl>
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
              <FormControl><Input placeholder={t('fieldParentPhonePlaceholder')} {...field} /></FormControl>
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
              <FormControl><Input placeholder={t('fieldParentWechatPlaceholder')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StudentFormSectionCard>
  );
}
