'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
import { profileSchema, type ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';
import { useUpdateProfile } from '@/modules/parent-settings/queries/use-update-profile.mutation';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

export function ProfileForm({ me }: { me: ParentMe }) {
  const t = useTranslations('ParentSettings');
  const { mutateAsync, isPending } = useUpdateProfile();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: me.firstName ?? '',
      lastName: me.lastName ?? '',
      phone: me.phone ?? '',
    },
  });

  const handleSubmit = async (values: ProfileValues) => {
    await mutateAsync({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone || '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-5' noValidate>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstNameLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='given-name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastNameLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='family-name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phoneLabel')}</FormLabel>
              <FormControl>
                <Input type='tel' autoComplete='tel' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-2'>
          <FormItem>
            <FormLabel>{t('emailLabel')}</FormLabel>
            <FormControl>
              <Input value={me.email} readOnly disabled autoComplete='email' />
            </FormControl>
          </FormItem>
          <p className='text-xs text-muted-foreground'>{t('emailHint')}</p>
        </div>

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
