'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { EditorSelect } from '@/modules/agent-profile/components/editors/EditorSelect';
import { PRESS_ITEM_TYPES } from '@/modules/agent-profile/constants/editor-options.constants';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  PressItem,
  PressItemType,
} from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): PressItem {
  return {
    itemType: 'press',
    title: '',
    organisation: '',
    date: '',
    url: '',
    logo: null,
    order: 0,
  };
}

/** Repeatable editor for `shared.press-item` (press, partner logos, recognition). */
export function PressEditor({ items, onChange, disabled }: RepeatableEditorProps<PressItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<PressItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('pressAdd'),
        rowLabel: (n) => t('pressRow', { number: n }),
        removeLabel: t('pressRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('pressEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('pressItemType')}>
              <EditorSelect
                value={item.itemType}
                options={PRESS_ITEM_TYPES}
                disabled={disabled}
                optionLabel={(option) => t(`pressItemType_${option}`)}
                onValueChange={(value) => setField('itemType', value as PressItemType)}
              />
            </EditorField>
            <EditorField label={t('pressDate')}>
              <Input
                type='date'
                value={item.date}
                disabled={disabled}
                onChange={(e) => setField('date', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('pressTitle')}>
              <Input
                value={item.title}
                disabled={disabled}
                onChange={(e) => setField('title', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('pressOrganisation')}>
              <Input
                value={item.organisation}
                disabled={disabled}
                onChange={(e) => setField('organisation', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('pressUrl')}>
            <Input
              type='url'
              value={item.url}
              disabled={disabled}
              placeholder={t('pressUrlPlaceholder')}
              onChange={(e) => setField('url', e.target.value)}
            />
          </EditorField>
          <RepeatableMediaField
            label={t('pressLogo')}
            value={item.logo}
            disabled={disabled}
            onChange={(logo) => setField('logo', logo)}
          />
        </div>
      )}
    />
  );
}
