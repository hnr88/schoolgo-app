'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  preferencesSchema,
  type PreferencesValues,
} from '@/modules/parent-settings/schemas/preferences.schema';
import { useUpdateProfile } from '@/modules/parent-settings/queries/use-update-profile.mutation';
import { useUnsavedChangesGuard } from '@/modules/parent-settings/hooks/useUnsavedChangesGuard';
import { persistLocaleCookie } from '@/modules/parent-settings/lib/apply-settings-locale';
import { SettingsFormError } from '@/modules/parent-settings/components/SettingsFormError';
import { PreferencesNotifyRow } from '@/modules/parent-settings/components/PreferencesNotifyRow';
import { PreferencesLanguageField } from '@/modules/parent-settings/components/PreferencesLanguageField';
import { DEFAULT_SETTINGS_LOCALE } from '@/modules/parent-settings/constants/parent-settings.constants';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

function toDefaults(me: ParentMe): PreferencesValues {
  return {
    language: me.preferences?.language ?? DEFAULT_SETTINGS_LOCALE,
    notifications: {
      email: me.preferences?.notifications?.email ?? true,
      sms: me.preferences?.notifications?.sms ?? false,
    },
  };
}

export function PreferencesForm({ me }: { me: ParentMe }) {
  const t = useTranslations('ParentSettings');
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const { mutateAsync, isPending } = useUpdateProfile();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: toDefaults(me),
  });

  useUnsavedChangesGuard(form.formState.isDirty);

  const handleSubmit = async (values: PreferencesValues) => {
    setFormError(null);
    try {
      const next = await mutateAsync({ preferences: values });
      form.reset(toDefaults(next));
      if (values.language !== activeLocale) {
        persistLocaleCookie(values.language);
        router.replace(pathname, { locale: values.language });
      }
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const apiMessage = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      setFormError(status === 422 && apiMessage ? apiMessage : t('saveError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <SettingsFormError message={formError} /> : null}

        <PreferencesLanguageField control={form.control} />

        <fieldset className='flex flex-col gap-4'>
          <legend className='text-sm font-medium text-ink-900'>{t('notificationsLabel')}</legend>
          <PreferencesNotifyRow
            control={form.control}
            name='notifications.email'
            label={t('notifyEmailLabel')}
            hint={t('notifyEmailHint')}
          />
          <PreferencesNotifyRow
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
