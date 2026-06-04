'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { createLoginSchema, type LoginValues } from '@/modules/auth/schemas/login.schema';
import { useLogin } from '@/modules/auth/hooks/useLogin';
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
import type { LoginFormProps } from '@/modules/auth/types/component.types';
import { PORTAL_LINK_COLOR } from '../constants/portal.constants';
import {
  AUTH_ERROR_SUMMARY_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PASSWORD_INPUT_CLASS,
  AUTH_PASSWORD_TOGGLE_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

export function LoginForm({ userType }: LoginFormProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);
  const schema = useMemo(() => createLoginSchema(t), [t]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { handleLogin } = useLogin({ portal: userType, setError: form.setError });
  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className='flex flex-col gap-6'
        noValidate
      >
        {rootError && (
          <div role='alert' aria-live='assertive' className={AUTH_ERROR_SUMMARY_CLASS}>
            {rootError}
          </div>
        )}

        <FormField
          control={form.control}
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  className={AUTH_INPUT_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder={t('passwordPlaceholder')}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <input
              id='remember-me'
              type='checkbox'
              className='h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring/50'
            />
            <label htmlFor='remember-me' className='text-sm text-foggy'>
              {t('rememberMe')}
            </label>
          </div>
          <Link
            href='/forgot-password'
            className={`text-sm font-medium underline-offset-4 transition-colors hover:underline ${PORTAL_LINK_COLOR[userType]}`}
          >
            {t('forgotPasswordLink')}
          </Link>
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={AUTH_SUBMIT_CLASS}
        >
          {isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          {t('signInButton')}
        </Button>
      </form>
    </Form>
  );
}
