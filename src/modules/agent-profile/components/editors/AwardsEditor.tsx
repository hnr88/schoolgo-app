'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { EditorSelect } from '@/modules/agent-profile/components/editors/EditorSelect';
import { AWARD_RECIPIENT_TYPES } from '@/modules/agent-profile/constants/editor-options.constants';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  AwardItem,
  AwardRecipientType,
} from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): AwardItem {
  return {
    awardName: '',
    awardingBody: '',
    year: '',
    recipientType: 'agency',
    recipientName: '',
    url: '',
    logo: null,
    order: 0,
  };
}

/** Repeatable editor for `shared.award` (industry recognition). */
export function AwardsEditor({ items, onChange, disabled }: RepeatableEditorProps<AwardItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<AwardItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('awardAdd'),
        rowLabel: (n) => t('awardRow', { number: n }),
        removeLabel: t('awardRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('awardEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('awardName')}>
              <Input
                value={item.awardName}
                disabled={disabled}
                onChange={(e) => setField('awardName', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('awardingBody')}>
              <Input
                value={item.awardingBody}
                disabled={disabled}
                onChange={(e) => setField('awardingBody', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('awardYear')}>
              <Input
                type='number'
                inputMode='numeric'
                value={item.year}
                disabled={disabled}
                placeholder={t('awardYearPlaceholder')}
                onChange={(e) => setField('year', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('awardRecipientType')}>
              <EditorSelect
                value={item.recipientType}
                options={AWARD_RECIPIENT_TYPES}
                disabled={disabled}
                optionLabel={(option) => t(`awardRecipientType_${option}`)}
                onValueChange={(value) => setField('recipientType', value as AwardRecipientType)}
              />
            </EditorField>
            <EditorField label={t('awardRecipientName')}>
              <Input
                value={item.recipientName}
                disabled={disabled}
                onChange={(e) => setField('recipientName', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('awardUrl')}>
              <Input
                type='url'
                value={item.url}
                disabled={disabled}
                placeholder={t('awardUrlPlaceholder')}
                onChange={(e) => setField('url', e.target.value)}
              />
            </EditorField>
          </div>
          <RepeatableMediaField
            label={t('awardLogo')}
            value={item.logo}
            disabled={disabled}
            onChange={(logo) => setField('logo', logo)}
          />
        </div>
      )}
    />
  );
}
