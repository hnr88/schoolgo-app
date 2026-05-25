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
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 h-10 w-full rounded-pill text-sm font-semibold shadow-brand"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('forgotPasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
