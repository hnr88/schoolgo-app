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
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='register-name'
                className='text-sm font-semibold text-ink-900'
              >
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
                  className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
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
              <FormLabel
                htmlFor='register-email'
                className='text-sm font-semibold text-ink-900'
              >
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
                  className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
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
              <FormLabel
                htmlFor='register-password'
                className='text-sm font-semibold text-ink-900'
              >
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
              <FormMessage id='register-password-error' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className='h-12 w-full rounded-xl text-sm font-semibold shadow-brand transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70'
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
