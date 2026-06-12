'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import {
  SelectField,
  TextAreaField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import {
  WELFARE_CAPABILITIES,
  WELFARE_FRAMINGS,
} from '@/modules/agent-profile/constants/repeatable-editors.constants';
import type { WelfareCapabilityItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeWelfare(): WelfareCapabilityItem {
  return { capability: '', description: '', framing: '', order: 0 };
}

/**
 * Repeatable editor for `shared.welfare-capability` items — concrete under-18
 * services for primary/secondary parents. Fields: capability, description,
 * framing (per the contract). The `framing` enum enforces honest "coordinate
 * not own" language for the school's non-delegable CAAW duty.
 */
export function WelfareEditor({ items, onChange, disabled }: RepeatableEditorProps<WelfareCapabilityItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<WelfareCapabilityItem>
      items={items}
      onChange={onChange}
      makeItem={makeWelfare}
      disabled={disabled}
      labels={{
        addLabel: t('welfareAdd'),
        rowLabel: (index) => t('welfareRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('welfareEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <SelectField
            id={`welfare-${index}-capability`}
            label={t('welfareCapabilityLabel')}
            value={item.capability}
            onChange={(value) => setField('capability', value as WelfareCapabilityItem['capability'])}
            placeholder={t('welfareCapabilityPlaceholder')}
            options={WELFARE_CAPABILITIES}
            optionLabel={(option) => t(`welfareCapability_${option}`)}
            disabled={disabled}
          />
          <SelectField
            id={`welfare-${index}-framing`}
            label={t('welfareFramingLabel')}
            value={item.framing}
            onChange={(value) => setField('framing', value as WelfareCapabilityItem['framing'])}
            placeholder={t('welfareFramingPlaceholder')}
            options={WELFARE_FRAMINGS}
            optionLabel={(option) => t(`welfareFraming_${option}`)}
            disabled={disabled}
          />
          <div className='sm:col-span-2'>
            <TextAreaField
              id={`welfare-${index}-description`}
              label={t('welfareDescriptionLabel')}
              value={item.description}
              onChange={(value) => setField('description', value)}
              placeholder={t('welfareDescriptionPlaceholder')}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    />
  );
}
