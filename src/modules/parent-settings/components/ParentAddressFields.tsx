'use client';

import type { Control } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { SettingsTextField } from '@/modules/parent-settings/components/SettingsTextField';
import { SettingsSelectField } from '@/modules/parent-settings/components/SettingsSelectField';
import { getCountryOptions } from '@/modules/parent-settings/lib/country-name';
import type { ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';

export function ParentAddressFields({ control }: { control: Control<ProfileValues> }) {
  const t = useTranslations('ParentSettings');
  const locale = useLocale();
  const countryOptions = getCountryOptions(locale);

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <div className='sm:col-span-2'>
        <SettingsTextField
          control={control}
          name='addressLine'
          label={t('addressLineLabel')}
          autoComplete='street-address'
        />
      </div>
      <SettingsTextField
        control={control}
        name='city'
        label={t('cityLabel')}
        autoComplete='address-level2'
      />
      <SettingsTextField
        control={control}
        name='stateRegion'
        label={t('stateRegionLabel')}
        autoComplete='address-level1'
      />
      <SettingsTextField
        control={control}
        name='postalCode'
        label={t('postalCodeLabel')}
        autoComplete='postal-code'
      />
      <SettingsSelectField
        control={control}
        name='countryOfResidence'
        label={t('countryLabel')}
        placeholder={t('countryPlaceholder')}
        options={countryOptions}
      />
    </div>
  );
}
