'use client';

import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from '../constants/auth-field.constants';

interface SchoolSignUpExtrasProps {
  control: Control<RegisterValues>;
}

export function SchoolSignUpExtras({ control }: SchoolSignUpExtrasProps) {
  const t = useTranslations('Auth');

  return (
    <>
      <FormField
        control={control}
        name='roleTitle'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('school.roleTitleLabel')}</FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='organization-title'
                placeholder={t('school.roleTitlePlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className='text-sm leading-relaxed text-foggy'>{t('school.onboardingHelper')}</p>
    </>
  );
}
