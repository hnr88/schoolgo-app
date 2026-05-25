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
        className='flex flex-col gap-5'
        noValidate
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor='forgot-email'
                className='text-sm font-semibold text-ink-900'
              >
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
                  className='h-12 rounded-xl border-border/60 bg-muted/30 px-4 text-base transition-all focus:bg-white focus:ring-2 focus:ring-primary/20'
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
          className='h-12 w-full rounded-xl text-sm font-semibold shadow-brand transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70'
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
