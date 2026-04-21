'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
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
import { loginSchema, type LoginValues } from '@/modules/auth/schemas/login.schema';
import { loginRequest } from '@/modules/auth/lib/auth-api';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { UserType } from '@/modules/auth/stores/use-auth-store';

interface LoginFormProps {
  userType: UserType;
}

export function LoginForm({ userType }: LoginFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    try {
      const { jwt, user } = await loginRequest(values);
      setSession({
        token: jwt,
        userType,
        user: {
          id: String(user.id),
          email: user.email,
          name: user.username,
        },
      });
      toast.success(t('loginSuccess'));
      router.push('/dashboard');
    } catch {
      toast.error(t('loginError'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <FormField
          control={form.control}
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-[13px] font-semibold text-hof'>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className='h-auto rounded-xl px-3.5 py-3 text-sm focus-visible:border-primary focus-visible:ring-primary/18'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-[13px] font-semibold text-hof'>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('passwordPlaceholder')}
                  className='h-auto rounded-xl px-3.5 py-3 text-sm focus-visible:border-primary focus-visible:ring-primary/18'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isLoading}
          className='mt-2 h-auto w-full rounded-xl py-3 text-sm font-semibold shadow-brand'
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {t('signInButton')}
        </Button>
      </form>
    </Form>
  );
}
