'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/modules/auth/schemas/forgot-password.schema';
import { useForgotPassword } from '@/modules/auth/hooks/useForgotPassword';
import { ForgotPasswordSent } from '@/modules/auth/components/ForgotPasswordSent';
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
import type { Portal } from '@/lib/portal-url';
import { PORTAL_LINK_COLOR } from '../constants/portal.constants';
import {
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

interface ForgotPasswordFormProps {
  portal: Portal;
}

export function ForgotPasswordForm({ portal }: ForgotPasswordFormProps) {
  const t = useTranslations('Auth');
  const schema = useMemo(() => createForgotPasswordSchema(t), [t]);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const { handleForgotPassword, handleResend, reset, sentEmail, cooldown, isPending } =
    useForgotPassword();

  const handleUseDifferentEmail = () => {
    reset();
    form.reset({ email: '' });
  };

  if (sentEmail) {
    return (
      <ForgotPasswordSent
        email={sentEmail}
        cooldown={cooldown}
        isPending={isPending}
        onResend={handleResend}
        onUseDifferentEmail={handleUseDifferentEmail}
        linkColorClass={PORTAL_LINK_COLOR[portal]}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleForgotPassword(data.email))}
        className='flex flex-col gap-6'
        noValidate
      >
        <FormField
          control={form.control}
          name='email'
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

        <Button
          type='submit'
          disabled={isPending}
          aria-busy={isPending}
          className={AUTH_SUBMIT_CLASS}
        >
          {isPending && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          {t('forgotPasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
