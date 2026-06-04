'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  schoolProfileSchema,
  type SchoolProfileValues,
} from '@/modules/school-settings/schemas/profile.schema';
import { useUpdateSchoolProfile } from '@/modules/school-settings/queries/use-update-school-profile.mutation';
import { SchoolTextField } from '@/modules/school-settings/components/SchoolTextField';
import { SchoolSettingsFormError } from '@/modules/school-settings/components/SchoolSettingsFormError';
import { getSchoolServerError } from '@/modules/school-settings/lib/server-error';
import type { SchoolUserMe } from '@/modules/school-settings/types/school-settings.types';

export function SchoolProfileForm({ me }: { me: SchoolUserMe }) {
  const t = useTranslations('SchoolSettings');
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUpdateSchoolProfile();

  const form = useForm<SchoolProfileValues>({
    resolver: zodResolver(schoolProfileSchema),
    defaultValues: {
      firstName: me.firstName ?? '',
      lastName: me.lastName ?? '',
      phone: me.phone ?? '',
    },
  });

  const handleSubmit = async (values: SchoolProfileValues) => {
    setFormError(null);
    try {
      const data = await mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
      });
      form.reset({
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        phone: data.phone ?? '',
      });
    } catch (error) {
      const { status, message } = getSchoolServerError(error);
      setFormError(status === 422 && message ? message : t('saveError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <SchoolSettingsFormError message={formError} /> : null}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <SchoolTextField
            control={form.control}
            name='firstName'
            label={t('firstNameLabel')}
            autoComplete='given-name'
          />
          <SchoolTextField
            control={form.control}
            name='lastName'
            label={t('lastNameLabel')}
            autoComplete='family-name'
          />
        </div>

        <SchoolTextField
          control={form.control}
          name='phone'
          label={t('phoneLabel')}
          autoComplete='tel'
          type='tel'
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

        <Button
          type='submit'
          disabled={isPending || !form.formState.isDirty}
          aria-busy={isPending}
          className='self-start'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
