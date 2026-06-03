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
import {
  AUTH_ERROR_SUMMARY_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PASSWORD_INPUT_CLASS,
  AUTH_PASSWORD_TOGGLE_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

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
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='reset-code' className={AUTH_LABEL_CLASS}>
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
                  className={AUTH_INPUT_CLASS}
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
              <FormLabel htmlFor='reset-password' className={AUTH_LABEL_CLASS}>
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
              <FormMessage id='reset-password-error' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='reset-confirm-password' className={AUTH_LABEL_CLASS}>
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
                    className={AUTH_PASSWORD_INPUT_CLASS}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={AUTH_PASSWORD_TOGGLE_CLASS}
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
          className={AUTH_SUBMIT_CLASS}
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
