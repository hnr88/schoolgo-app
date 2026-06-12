'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import {
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import { SERVICE_CATEGORIES } from '@/modules/agent-profile/constants/repeatable-editors.constants';
import type { ServiceItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeService(): ServiceItem {
  return { serviceName: '', description: '', category: '', isFree: false, icon: '', order: 0 };
}

/**
 * Repeatable editor for `shared.service` items — the end-to-end scope the agent
 * offers. Fields: serviceName, description, category, isFree, icon (per the
 * contract). The `under18_welfare` category complements the welfare editor.
 */
export function ServicesEditor({ items, onChange, disabled }: RepeatableEditorProps<ServiceItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<ServiceItem>
      items={items}
      onChange={onChange}
      makeItem={makeService}
      disabled={disabled}
      labels={{
        addLabel: t('serviceAdd'),
        rowLabel: (index) => t('serviceRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('serviceEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <TextField
            id={`service-${index}-name`}
            label={t('serviceNameLabel')}
            value={item.serviceName}
            onChange={(value) => setField('serviceName', value)}
            placeholder={t('serviceNamePlaceholder')}
            disabled={disabled}
          />
          <SelectField
            id={`service-${index}-category`}
            label={t('serviceCategoryLabel')}
            value={item.category}
            onChange={(value) => setField('category', value as ServiceItem['category'])}
            placeholder={t('serviceCategoryPlaceholder')}
            options={SERVICE_CATEGORIES}
            optionLabel={(option) => t(`serviceCategory_${option}`)}
            disabled={disabled}
          />
          <TextField
            id={`service-${index}-icon`}
            label={t('serviceIconLabel')}
            value={item.icon}
            onChange={(value) => setField('icon', value)}
            placeholder={t('serviceIconPlaceholder')}
            disabled={disabled}
          />
          <div className='flex items-end'>
            <SwitchField
              id={`service-${index}-free`}
              label={t('serviceIsFreeLabel')}
              checked={item.isFree}
              onChange={(checked) => setField('isFree', checked)}
              disabled={disabled}
            />
          </div>
          <div className='sm:col-span-2'>
            <TextAreaField
              id={`service-${index}-description`}
              label={t('serviceDescriptionLabel')}
              value={item.description}
              onChange={(value) => setField('description', value)}
              placeholder={t('serviceDescriptionPlaceholder')}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    />
  );
}
