'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { SettingsTextField } from '@/modules/parent-settings/components/SettingsTextField';
import { SettingsSelectField } from '@/modules/parent-settings/components/SettingsSelectField';
import { PARENT_RELATIONSHIP_OPTIONS } from '@/modules/parent-settings/constants/parent-settings.constants';
import type { ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';

export function ParentIdentityFields({ control }: { control: Control<ProfileValues> }) {
  const t = useTranslations('ParentSettings');
  const relationshipOptions = PARENT_RELATIONSHIP_OPTIONS.map((value) => ({
    value,
    label: t(`relationship_${value}`),
  }));

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <SettingsTextField
        control={control}
        name='firstName'
        label={t('firstNameLabel')}
        autoComplete='given-name'
      />
      <SettingsTextField
        control={control}
        name='lastName'
        label={t('lastNameLabel')}
        autoComplete='family-name'
      />
      <SettingsSelectField
        control={control}
        name='relationshipToStudent'
        label={t('relationshipLabel')}
        placeholder={t('relationshipPlaceholder')}
        options={relationshipOptions}
      />
      <SettingsTextField control={control} name='occupation' label={t('occupationLabel')} />
    </div>
  );
}
