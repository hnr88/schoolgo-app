'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/modules/auth/schemas/forgot-password.schema';
import { useForgotPassword } from '@/modules/auth/hooks/useForgotPassword';
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
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

export function ForgotPasswordForm() {
  const t = useTranslations('Auth');

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleForgotPassword, isPending } = useForgotPassword();

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
              <FormLabel htmlFor='forgot-email' className={AUTH_LABEL_CLASS}>
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  id='forgot-email'
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  aria-required='true'
                  aria-invalid={!!form.formState.errors.email}
                  aria-describedby={
                    form.formState.errors.email ? 'forgot-email-error' : undefined
                  }
                  className={AUTH_INPUT_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage id='forgot-email-error' />
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
