'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { registerSchema, type RegisterValues } from '@/modules/auth/schemas/register.schema';
import { useRegister } from '@/modules/auth/hooks/useRegister';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { RegisterFormProps } from '@/modules/auth/types/component.types';
import {
  AUTH_ERROR_SUMMARY_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PASSWORD_INPUT_CLASS,
  AUTH_PASSWORD_TOGGLE_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

export function RegisterForm({ userType }: RegisterFormProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { handleRegister } = useRegister({ portal: userType, setError: form.setError });
  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className='flex flex-col gap-6'
        noValidate
      >
        {/* Error summary */}
        {rootError && (
          <div role='alert' aria-live='assertive' className={AUTH_ERROR_SUMMARY_CLASS}>
            {rootError}
          </div>
        )}

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='register-name' className={AUTH_LABEL_CLASS}>
                {t('nameLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  id='register-name'
                  type='text'
                  autoComplete='name'
                  placeholder={t('namePlaceholder')}
                  aria-required='true'
                  aria-invalid={!!form.formState.errors.username}
                  aria-describedby={
                    form.formState.errors.username ? 'register-name-error' : undefined
                  }
                  className={AUTH_INPUT_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage id='register-name-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='register-email' className={AUTH_LABEL_CLASS}>
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  id='register-email'
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  aria-required='true'
                  aria-invalid={!!form.formState.errors.email}
                  aria-describedby={
                    form.formState.errors.email ? 'register-email-error' : undefined
                  }
                  className={AUTH_INPUT_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage id='register-email-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='register-password' className={AUTH_LABEL_CLASS}>
                {t('passwordLabel')}
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    id='register-password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder={t('createPasswordPlaceholder')}
                    aria-required='true'
                    aria-invalid={!!form.formState.errors.password}
                    aria-describedby={
                      form.formState.errors.password
                        ? 'register-password-error'
                        : 'register-password-hint'
                    }
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
              <p id='register-password-hint' className='mt-1.5 text-xs text-foggy'>
                {t('passwordHint')}
              </p>
              <FormMessage id='register-password-error' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={AUTH_SUBMIT_CLASS}
        >
          {isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          {t('signUpButton')}
        </Button>
      </form>
    </Form>
  );
}
