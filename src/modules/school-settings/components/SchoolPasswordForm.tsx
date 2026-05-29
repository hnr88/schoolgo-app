'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  schoolPasswordSchema,
  type SchoolPasswordValues,
} from '@/modules/school-settings/schemas/password.schema';
import { useSchoolChangePassword } from '@/modules/school-settings/queries/use-school-change-password.mutation';

export function SchoolPasswordForm() {
  const t = useTranslations('SchoolSettings');
  const [show, setShow] = useState(false);
  const { mutateAsync, isPending } = useSchoolChangePassword();

  const form = useForm<SchoolPasswordValues>({
    resolver: zodResolver(schoolPasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = async (values: SchoolPasswordValues) => {
    try {
      await mutateAsync(values);
      form.reset();
    } catch {
      form.setError('currentPassword', {
        type: 'server',
        message: t('currentPasswordInvalid'),
      });
    }
  };

  const toggle = () => setShow((prev) => !prev);
  const inputType = show ? 'text' : 'password';
  const eyeLabel = show ? t('hidePassword') : t('showPassword');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('currentPasswordLabel')}</FormLabel>
              <FormControl>
                <Input type='password' autoComplete='current-password' {...field} />
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
              <FormLabel>{t('newPasswordLabel')}</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input type={inputType} autoComplete='new-password' className='pr-12' {...field} />
                  <button
                    type='button'
                    onClick={toggle}
                    className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-foggy transition-colors hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary'
                    aria-label={eyeLabel}
                    aria-pressed={show}
                  >
                    {show ? (
                      <EyeOff className='h-5 w-5' aria-hidden='true' />
                    ) : (
                      <Eye className='h-5 w-5' aria-hidden='true' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <Input type={inputType} autoComplete='new-password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('changePasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
