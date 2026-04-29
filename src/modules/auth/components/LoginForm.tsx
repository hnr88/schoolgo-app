'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { loginSchema, type LoginValues } from '@/modules/auth/schemas/login.schema';
import { useLogin } from '@/modules/auth/hooks/use-login';
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

export function LoginForm({ userType }: LoginFormProps) {
  const t = useTranslations('Auth');
  const { handleLogin, isSubmitting } = useLogin({ portal: userType });

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="h-auto rounded-xl px-3.5 py-3 text-sm focus-visible:border-primary focus-visible:ring-primary/18"
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
                {t('passwordLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  className="h-auto rounded-xl px-3.5 py-3 text-sm focus-visible:border-primary focus-visible:ring-primary/18"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-auto w-full rounded-xl py-3 text-sm font-semibold shadow-brand"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('signInButton')}
        </Button>
      </form>
    </Form>
  );
}
