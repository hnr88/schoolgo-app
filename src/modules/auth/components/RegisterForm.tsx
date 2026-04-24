'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { registerSchema, type RegisterValues } from '@/modules/auth/schemas/register.schema';
import { useRegister } from '@/modules/auth/hooks/use-register';
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

interface RegisterFormProps {
  userType: Portal;
}

export function RegisterForm({ userType }: RegisterFormProps) {
  const t = useTranslations('Auth');
  const { handleRegister, isSubmitting } = useRegister({ portal: userType });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-hof">
                {t('nameLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t('namePlaceholder')}
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
                  placeholder={t('createPasswordPlaceholder')}
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
          {t('signUpButton')}
        </Button>
      </form>
    </Form>
  );
}
