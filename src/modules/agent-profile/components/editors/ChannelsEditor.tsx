'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import {
  SelectField,
  SwitchField,
  TextField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import { CONTACT_CHANNEL_TYPES } from '@/modules/agent-profile/constants/repeatable-editors.constants';
import type { ContactChannelItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeChannel(): ContactChannelItem {
  return { channelType: '', handleOrUrl: '', displayLabel: '', isPrimary: false, order: 0 };
}

/**
 * Repeatable editor for `shared.contact-channel` items — the messaging channels
 * (WeChat/KakaoTalk/Zalo/LINE/WhatsApp by market) parents reach the agent on.
 * Fields: channelType, handleOrUrl, displayLabel, isPrimary (per the contract).
 */
export function ChannelsEditor({ items, onChange, disabled }: RepeatableEditorProps<ContactChannelItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<ContactChannelItem>
      items={items}
      onChange={onChange}
      makeItem={makeChannel}
      disabled={disabled}
      labels={{
        addLabel: t('channelAdd'),
        rowLabel: (index) => t('channelRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('channelEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <SelectField
            id={`channel-${index}-type`}
            label={t('channelTypeLabel')}
            value={item.channelType}
            onChange={(value) => setField('channelType', value as ContactChannelItem['channelType'])}
            placeholder={t('channelTypePlaceholder')}
            options={CONTACT_CHANNEL_TYPES}
            optionLabel={(option) => t(`channelType_${option}`)}
            disabled={disabled}
          />
          <TextField
            id={`channel-${index}-handle`}
            label={t('channelHandleLabel')}
            value={item.handleOrUrl}
            onChange={(value) => setField('handleOrUrl', value)}
            placeholder={t('channelHandlePlaceholder')}
            disabled={disabled}
          />
          <TextField
            id={`channel-${index}-label`}
            label={t('channelDisplayLabel')}
            value={item.displayLabel}
            onChange={(value) => setField('displayLabel', value)}
            placeholder={t('channelDisplayPlaceholder')}
            disabled={disabled}
          />
          <div className='flex items-end'>
            <SwitchField
              id={`channel-${index}-primary`}
              label={t('channelPrimaryLabel')}
              checked={item.isPrimary}
              onChange={(checked) => setField('isPrimary', checked)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    />
  );
}
