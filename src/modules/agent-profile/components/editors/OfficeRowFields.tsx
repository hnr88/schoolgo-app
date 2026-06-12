'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { SwitchField, TextField } from '@/modules/agent-profile/components/editors/EditorFields';
import type { AgentOfficeLocationItem } from '@/modules/agent-profile/types/agent-profile.types';

const TEXT_FIELDS: Array<{ key: keyof AgentOfficeLocationItem; labelKey: string; type?: 'email' }> = [
  { key: 'label', labelKey: 'officeLabelLabel' },
  { key: 'streetAddress', labelKey: 'officeStreetAddressLabel' },
  { key: 'suburb', labelKey: 'officeSuburbLabel' },
  { key: 'city', labelKey: 'officeCityLabel' },
  { key: 'state', labelKey: 'officeStateLabel' },
  { key: 'country', labelKey: 'officeCountryLabel' },
  { key: 'regionGrouping', labelKey: 'officeRegionGroupingLabel' },
  { key: 'phone', labelKey: 'officePhoneLabel' },
  { key: 'email', labelKey: 'officeEmailLabel', type: 'email' },
  { key: 'openingHours', labelKey: 'officeOpeningHoursLabel' },
  { key: 'timezone', labelKey: 'officeTimezoneLabel' },
];

interface OfficeRowFieldsProps {
  item: AgentOfficeLocationItem;
  index: number;
  setField: <K extends keyof AgentOfficeLocationItem>(
    key: K,
    value: AgentOfficeLocationItem[K],
  ) => void;
  disabled?: boolean;
}

/** Per-row fields for the OfficesEditor incl. the geo coordinates — kept out of
 * the editor shell so each component stays within the line limit. */
export function OfficeRowFields({ item, index, setField, disabled }: OfficeRowFieldsProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      {TEXT_FIELDS.map((row) => (
        <TextField
          key={row.key}
          id={`office-${index}-${row.key}`}
          label={t(row.labelKey)}
          value={item[row.key] as string}
          onChange={(value) => setField(row.key, value as AgentOfficeLocationItem[typeof row.key])}
          type={row.type}
          disabled={disabled}
        />
      ))}
      <EditorField label={t('officeLatitudeLabel')}>
        <Input
          type='number'
          inputMode='decimal'
          step='any'
          value={item.latitude}
          placeholder={t('officeLatitudePlaceholder')}
          disabled={disabled}
          onChange={(event) => setField('latitude', event.target.value)}
        />
      </EditorField>
      <EditorField label={t('officeLongitudeLabel')}>
        <Input
          type='number'
          inputMode='decimal'
          step='any'
          value={item.longitude}
          placeholder={t('officeLongitudePlaceholder')}
          disabled={disabled}
          onChange={(event) => setField('longitude', event.target.value)}
        />
      </EditorField>
      <div className='flex items-end'>
        <SwitchField
          id={`office-${index}-head`}
          label={t('officeIsHeadOfficeLabel')}
          checked={item.isHeadOffice}
          onChange={(checked) => setField('isHeadOffice', checked)}
          disabled={disabled}
        />
      </div>
      <div className='flex items-end'>
        <SwitchField
          id={`office-${index}-inperson`}
          label={t('officeInPersonLabel')}
          checked={item.inPersonConsultation}
          onChange={(checked) => setField('inPersonConsultation', checked)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
