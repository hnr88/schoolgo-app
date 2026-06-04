'use client';

import { useTranslations } from 'next-intl';
import { useFormField } from '@/components/ui/form';
import { PASSWORD_MIN_LENGTH } from '@/modules/parent-settings/constants/parent-settings.constants';

type SettingsMessageKey = Parameters<ReturnType<typeof useTranslations<'ParentSettings'>>>[0];

export function SettingsFormMessage() {
  const t = useTranslations('ParentSettings');
  const { error, formMessageId } = useFormField();

  if (!error?.message) {
    return null;
  }

  return (
    <p id={formMessageId} className='text-sm font-medium text-destructive'>
      {t(error.message as SettingsMessageKey, { min: PASSWORD_MIN_LENGTH })}
    </p>
  );
}
