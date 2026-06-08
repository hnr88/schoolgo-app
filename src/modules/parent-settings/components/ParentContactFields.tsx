'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { SettingsTextField } from '@/modules/parent-settings/components/SettingsTextField';
import { SettingsSelectField } from '@/modules/parent-settings/components/SettingsSelectField';
import { PARENT_CONTACT_METHOD_OPTIONS } from '@/modules/parent-settings/constants/parent-settings.constants';
import type { ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';

export function ParentContactFields({ control }: { control: Control<ProfileValues> }) {
  const t = useTranslations('ParentSettings');
  const contactMethodOptions = PARENT_CONTACT_METHOD_OPTIONS.map((value) => ({
    value,
    label: t(`contactMethod_${value}`),
  }));

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <SettingsTextField
        control={control}
        name='phone'
        label={t('phoneLabel')}
        type='tel'
        autoComplete='tel'
      />
      <SettingsTextField
        control={control}
        name='secondaryPhone'
        label={t('secondaryPhoneLabel')}
        type='tel'
        autoComplete='tel'
      />
      <SettingsSelectField
        control={control}
        name='preferredContactMethod'
        label={t('contactMethodLabel')}
        placeholder={t('contactMethodPlaceholder')}
        options={contactMethodOptions}
      />
    </div>
  );
}
