'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { registerSchema, type RegisterValues } from '@/modules/auth/schemas/register.schema';
import { useRegister } from '@/modules/auth/hooks/useRegister';
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
import type { RegisterFormProps } from '@/modules/auth/types/component.types';

export function RegisterForm({ userType }: RegisterFormProps) {
  const t = useTranslations('Auth');

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { handleRegister } = useRegister({ portal: userType, setError: form.setError });
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-6">
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
          disabled={isSubmitting}
          className="mt-2 h-10 w-full rounded-pill text-sm font-semibold shadow-brand"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('signUpButton')}
        </Button>
      </form>
    </Form>
  );
}
