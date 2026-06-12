'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { EditorSelect } from '@/modules/agent-profile/components/editors/EditorSelect';
import { ToggleField } from '@/modules/agent-profile/components/editors/ToggleField';
import { MultiMediaField } from '@/modules/agent-profile/components/editors/MultiMediaField';
import { CUSTOM_SECTION_TYPES } from '@/modules/agent-profile/constants/editor-options.constants';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  CustomSectionItem,
  CustomSectionType,
} from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): CustomSectionItem {
  return {
    title: '',
    sectionType: 'rich_text',
    body: '',
    media: [],
    url: '',
    fileAttachment: null,
    isVisible: true,
    order: 0,
  };
}

const BODY_TYPES: readonly CustomSectionType[] = ['rich_text', 'stat', 'list'];

/**
 * Escape-hatch editor for `shared.custom-section` — the "endless info in any
 * format" UX. Each row carries a title, a sectionType select that swaps the
 * format-appropriate input (rich-text/stat/list → body, link → url, file →
 * attachment, media → gallery), and its own isVisible switch + `order`.
 */
export function CustomSectionsEditor({
  items,
  onChange,
  disabled,
}: RepeatableEditorProps<CustomSectionItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<CustomSectionItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('customSectionAdd'),
        rowLabel: (n) => t('customSectionRow', { number: n }),
        removeLabel: t('customSectionRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('customSectionEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('customSectionTitle')}>
              <Input
                value={item.title}
                disabled={disabled}
                placeholder={t('customSectionTitlePlaceholder')}
                onChange={(e) => setField('title', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('customSectionType')}>
              <EditorSelect
                value={item.sectionType}
                options={CUSTOM_SECTION_TYPES}
                disabled={disabled}
                optionLabel={(option) => t(`customSectionType_${option}`)}
                onValueChange={(value) => setField('sectionType', value as CustomSectionType)}
              />
            </EditorField>
          </div>

          {BODY_TYPES.includes(item.sectionType) && (
            <EditorField label={t('customSectionBody')}>
              <Textarea
                rows={4}
                value={item.body}
                disabled={disabled}
                placeholder={t('customSectionBodyPlaceholder')}
                onChange={(e) => setField('body', e.target.value)}
              />
            </EditorField>
          )}

          {item.sectionType === 'link' && (
            <EditorField label={t('customSectionUrl')}>
              <Input
                type='url'
                value={item.url}
                disabled={disabled}
                placeholder={t('customSectionUrlPlaceholder')}
                onChange={(e) => setField('url', e.target.value)}
              />
            </EditorField>
          )}

          {item.sectionType === 'file' && (
            <RepeatableMediaField
              label={t('customSectionFile')}
              value={item.fileAttachment}
              disabled={disabled}
              onChange={(media) => setField('fileAttachment', media)}
            />
          )}

          {item.sectionType === 'media' && (
            <MultiMediaField
              label={t('customSectionMedia')}
              items={item.media}
              disabled={disabled}
              onChange={(media) => setField('media', media)}
            />
          )}

          <ToggleField
            label={t('customSectionVisible')}
            checked={item.isVisible}
            disabled={disabled}
            onCheckedChange={(checked) => setField('isVisible', checked)}
          />
        </div>
      )}
    />
  );
}
