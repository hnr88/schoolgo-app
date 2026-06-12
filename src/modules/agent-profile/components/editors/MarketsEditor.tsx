'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { ToggleField } from '@/modules/agent-profile/components/editors/ToggleField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { MarketServedItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): MarketServedItem {
  return {
    sourceCountry: '',
    countryFlag: '',
    regions: '',
    isPrimary: false,
    order: 0,
  };
}

/** Repeatable editor for `shared.market-served` (source countries/regions). */
export function MarketsEditor({ items, onChange, disabled }: RepeatableEditorProps<MarketServedItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<MarketServedItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('marketAdd'),
        rowLabel: (n) => t('marketRow', { number: n }),
        removeLabel: t('marketRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('marketEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('marketSourceCountry')}>
              <Input
                value={item.sourceCountry}
                disabled={disabled}
                onChange={(e) => setField('sourceCountry', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('marketCountryFlag')}>
              <Input
                value={item.countryFlag}
                disabled={disabled}
                placeholder={t('marketCountryFlagPlaceholder')}
                onChange={(e) => setField('countryFlag', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('marketRegions')}>
            <Input
              value={item.regions}
              disabled={disabled}
              placeholder={t('marketRegionsPlaceholder')}
              onChange={(e) => setField('regions', e.target.value)}
            />
          </EditorField>
          <ToggleField
            label={t('marketIsPrimary')}
            checked={item.isPrimary}
            disabled={disabled}
            onCheckedChange={(checked) => setField('isPrimary', checked)}
          />
        </div>
      )}
    />
  );
}
