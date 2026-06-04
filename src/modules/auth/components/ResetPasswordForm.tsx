'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  createResetPasswordSchema,
  type ResetPasswordValues,
} from '@/modules/auth/schemas/reset-password.schema';
import { useResetPassword } from '@/modules/auth/hooks/useResetPassword';
import { PasswordStrengthMeter } from '@/modules/auth/components/PasswordStrengthMeter';
import { ResetTokenError } from '@/modules/auth/components/ResetTokenError';
import {
  isMissingResetToken,
  type ResetTokenError as ResetTokenErrorKind,
} from '@/modules/auth/lib/classify-reset-token';
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
  const [tokenError, setTokenError] = useState<ResetTokenErrorKind | null>(
    isMissingResetToken(code) ? 'missing' : null,
  );
  const schema = useMemo(() => createResetPasswordSchema(t), [t]);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code,
      password: '',
      passwordConfirmation: '',
    },
  });

  const { handleResetPassword, isPending } = useResetPassword({
    setError: form.setError,
    onTokenError: setTokenError,
  });
  const rootError = form.formState.errors.root?.message;
  const password = form.watch('password');

  if (tokenError) {
    return <ResetTokenError kind={tokenError} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className='flex flex-col gap-6'
        noValidate
      >
        {rootError && (
          <div role='alert' aria-live='assertive' className={AUTH_ERROR_SUMMARY_CLASS}>
            {rootError}
          </div>
        )}

        <input type='hidden' {...form.register('code')} />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t('newPasswordLabel')}</FormLabel>
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

        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t('confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder={t('confirmPasswordPlaceholder')}
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
              <FormMessage />
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
