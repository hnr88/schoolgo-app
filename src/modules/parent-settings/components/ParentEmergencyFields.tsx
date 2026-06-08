'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { SettingsTextField } from '@/modules/parent-settings/components/SettingsTextField';
import type { ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';

export function ParentEmergencyFields({ control }: { control: Control<ProfileValues> }) {
  const t = useTranslations('ParentSettings');

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <SettingsTextField
        control={control}
        name='emergencyContactName'
        label={t('emergencyNameLabel')}
      />
      <SettingsTextField
        control={control}
        name='emergencyContactPhone'
        label={t('emergencyPhoneLabel')}
        type='tel'
      />
      <div className='sm:col-span-2'>
        <SettingsTextField
          control={control}
          name='emergencyContactRelationship'
          label={t('emergencyRelationshipLabel')}
        />
      </div>
    </div>
  );
}
