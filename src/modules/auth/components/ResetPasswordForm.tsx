'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/modules/auth/schemas/reset-password.schema';
import { useResetPassword } from '@/modules/auth/hooks/useResetPassword';
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

interface ResetPasswordFormProps {
  code: string;
}

export function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code,
      password: '',
      passwordConfirmation: '',
    },
  });

  const { handleResetPassword, isPending } = useResetPassword();
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
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
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='reset-code'
                className='text-sm font-semibold text-ink-900'
              >
                {t('codeLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  id='reset-code'
                  type='text'
                  autoComplete='one-time-code'
                  placeholder={t('codePlaceholder')}
                  aria-required='true'
                  aria-invalid={!!form.formState.errors.code}
                  aria-describedby={
                    form.formState.errors.code ? 'reset-code-error' : undefined
                  }
                  className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
                  {...field}
                />
              </FormControl>
              <FormMessage id='reset-code-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='reset-password'
                className='text-sm font-semibold text-ink-900'
              >
                {t('newPasswordLabel')}
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    id='reset-password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder={t('createPasswordPlaceholder')}
                    aria-required='true'
                    aria-invalid={!!form.formState.errors.password}
                    aria-describedby={
                      form.formState.errors.password
                        ? 'reset-password-error'
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
              <FormMessage id='reset-password-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='reset-confirm-password'
                className='text-sm font-semibold text-ink-900'
              >
                {t('confirmPasswordLabel')}
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    id='reset-confirm-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder={t('confirmPasswordPlaceholder')}
                    aria-required='true'
                    aria-invalid={!!form.formState.errors.passwordConfirmation}
                    aria-describedby={
                      form.formState.errors.passwordConfirmation
                        ? 'reset-confirm-error'
                        : undefined
                    }
                    className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 pr-12 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-foggy transition-colors hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary'
                    aria-label={
                      showConfirmPassword ? t('hidePassword') : t('showPassword')
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-5 w-5' aria-hidden='true' />
                    ) : (
                      <Eye className='h-5 w-5' aria-hidden='true' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage id='reset-confirm-error' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isPending}
          aria-busy={isPending}
          className='h-12 w-full rounded-xl text-sm font-semibold shadow-brand transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70'
        >
          {isPending && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          {t('resetPasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
