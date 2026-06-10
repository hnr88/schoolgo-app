'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import { PasswordStrengthMeter } from '@/modules/auth/components/PasswordStrengthMeter';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import {
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PASSWORD_INPUT_CLASS,
  AUTH_PASSWORD_TOGGLE_CLASS,
} from '../constants/auth-field.constants';

interface BaseSignUpFieldsProps {
  control: Control<RegisterValues>;
  password: string;
  isSchool: boolean;
}

export function BaseSignUpFields({ control, password, isSchool }: BaseSignUpFieldsProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormField
        control={control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('nameLabel')}</FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='name'
                placeholder={t('namePlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>
              {isSchool ? t('school.workEmailLabel') : t('emailLabel')}
            </FormLabel>
            <FormControl>
              <Input
                type='email'
                autoComplete='email'
                placeholder={isSchool ? t('school.workEmailPlaceholder') : t('emailPlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('passwordLabel')}</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  placeholder={t('createPasswordPlaceholder')}
                  className={AUTH_PASSWORD_INPUT_CLASS}
                  {...field}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className={AUTH_PASSWORD_TOGGLE_CLASS}
                  aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' aria-hidden='true' />
                  ) : (
                    <Eye className='h-5 w-5' aria-hidden='true' />
                  )}
                </button>
              </div>
            </FormControl>
            <PasswordStrengthMeter password={password} />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
