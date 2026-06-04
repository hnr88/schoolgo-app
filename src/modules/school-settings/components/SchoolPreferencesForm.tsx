'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  schoolPreferencesSchema,
  type SchoolPreferencesValues,
} from '@/modules/school-settings/schemas/preferences.schema';
import { useUpdateSchoolProfile } from '@/modules/school-settings/queries/use-update-school-profile.mutation';
import { SchoolLanguageField } from '@/modules/school-settings/components/SchoolLanguageField';
import { SchoolPreferencesNotifyRow } from '@/modules/school-settings/components/SchoolPreferencesNotifyRow';
import { SchoolSettingsFormError } from '@/modules/school-settings/components/SchoolSettingsFormError';
import { getSchoolServerError } from '@/modules/school-settings/lib/server-error';
import { DEFAULT_SCHOOL_SETTINGS_LOCALE } from '@/modules/school-settings/constants/school-settings.constants';
import type { SchoolUserMe } from '@/modules/school-settings/types/school-settings.types';

export function SchoolPreferencesForm({ me }: { me: SchoolUserMe }) {
  const t = useTranslations('SchoolSettings');
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUpdateSchoolProfile();

  const form = useForm<SchoolPreferencesValues>({
    resolver: zodResolver(schoolPreferencesSchema),
    defaultValues: {
      language: me.preferences?.language ?? DEFAULT_SCHOOL_SETTINGS_LOCALE,
      notifications: {
        email: me.preferences?.notifications?.email ?? true,
        sms: me.preferences?.notifications?.sms ?? false,
      },
    },
  });

  const handleSubmit = async (values: SchoolPreferencesValues) => {
    setFormError(null);
    try {
      const data = await mutateAsync({ preferences: values });
      form.reset({
        language: data.preferences?.language ?? DEFAULT_SCHOOL_SETTINGS_LOCALE,
        notifications: {
          email: data.preferences?.notifications?.email ?? true,
          sms: data.preferences?.notifications?.sms ?? false,
        },
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

        <SchoolLanguageField control={form.control} />

        <fieldset className='flex flex-col gap-4'>
          <legend className='text-sm font-medium text-ink-900'>{t('notificationsLabel')}</legend>
          <SchoolPreferencesNotifyRow
            control={form.control}
            name='notifications.email'
            label={t('notifyEmailLabel')}
            hint={t('notifyEmailHint')}
          />
          <SchoolPreferencesNotifyRow
            control={form.control}
            name='notifications.sms'
            label={t('notifySmsLabel')}
            hint={t('notifySmsHint')}
          />
        </fieldset>

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
