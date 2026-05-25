'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code,
      password: '',
      passwordConfirmation: '',
    },
  });

  const { handleResetPassword, isPending } = useResetPassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('codeLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('codePlaceholder')}
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('newPasswordLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t('createPasswordPlaceholder')}
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('confirmPasswordLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t('confirmPasswordPlaceholder')}
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 h-10 w-full rounded-pill text-sm font-semibold shadow-brand"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('resetPasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
