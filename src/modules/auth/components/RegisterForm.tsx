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
import { registerSchema, type RegisterValues } from '@/modules/auth/schemas/register.schema';
import { registerRequest } from '@/modules/auth/lib/auth-api';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { UserType } from '@/modules/auth/stores/use-auth-store';

interface RegisterFormProps {
  userType: UserType;
}

export function RegisterForm({ userType }: RegisterFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true);
    try {
      const { jwt, user } = await registerRequest({ ...values, userType });
      setSession({
        token: jwt,
        userType,
        user: {
          id: String(user.id),
          email: user.email,
          name: user.username,
        },
      });
      toast.success(t('registerSuccess'));
      router.push('/dashboard');
    } catch {
      toast.error(t('registerError'));
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass = 'h-auto rounded-xl px-3.5 py-3 text-sm focus-visible:border-primary focus-visible:ring-primary/18';
  const labelClass = 'text-[13px] font-semibold text-hof';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder={t('namePlaceholder')}
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className={inputClass}
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
              <FormLabel className={labelClass}>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('createPasswordPlaceholder')}
                  className={inputClass}
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
          {t('signUpButton')}
        </Button>
      </form>
    </Form>
  );
}
