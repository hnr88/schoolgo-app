'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { loginSchema, type LoginValues } from '@/modules/auth/schemas/login.schema';
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

export function LoginForm({ userType }: LoginFormProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
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
        className='flex flex-col gap-5'
        noValidate
      >
        {/* Error summary */}
        {rootError && (
          <div
            role='alert'
            aria-live='assertive'
            className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
          >
            {rootError}
          </div>
        )}

        <FormField
          control={form.control}
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='login-email'
                className='text-sm font-semibold text-ink-900'
              >
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  id='login-email'
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  aria-required='true'
                  aria-invalid={!!form.formState.errors.identifier}
                  aria-describedby={
                    form.formState.errors.identifier ? 'login-email-error' : undefined
                  }
                  className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
                  {...field}
                />
              </FormControl>
              <FormMessage id='login-email-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='login-password'
                className='text-sm font-semibold text-ink-900'
              >
                {t('passwordLabel')}
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    id='login-password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder={t('passwordPlaceholder')}
                    aria-required='true'
                    aria-invalid={!!form.formState.errors.password}
                    aria-describedby={
                      form.formState.errors.password
                        ? 'login-password-error'
                        : undefined
                    }
                    className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 pr-12 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-foggy transition-colors hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary'
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
              <FormMessage id='login-password-error' />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <input
              id='remember-me'
              type='checkbox'
              className='h-4 w-4 rounded border-border text-primary focus:ring-primary'
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
          className='h-12 w-full rounded-xl text-sm font-semibold shadow-brand transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70'
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
