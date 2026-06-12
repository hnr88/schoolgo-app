'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { ToggleField } from '@/modules/agent-profile/components/editors/ToggleField';
import { SCHOOL_LEVELS } from '@/modules/agent-profile/constants/editor-options.constants';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  DestinationItem,
  SchoolLevel,
} from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): DestinationItem {
  return {
    country: 'Australia',
    countryFlag: '',
    australianStates: '',
    schoolLevels: [],
    isPrimaryDestination: false,
    order: 0,
  };
}

function toggleLevel(levels: SchoolLevel[], level: SchoolLevel, checked: boolean): SchoolLevel[] {
  if (checked) return levels.includes(level) ? levels : [...levels, level];
  return levels.filter((l) => l !== level);
}

/** Repeatable editor for `shared.destination` (AU states/levels coverage). */
export function DestinationsEditor({ items, onChange, disabled }: RepeatableEditorProps<DestinationItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<DestinationItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('destinationAdd'),
        rowLabel: (n) => t('destinationRow', { number: n }),
        removeLabel: t('destinationRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('destinationEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('destinationCountry')}>
              <Input
                value={item.country}
                disabled={disabled}
                onChange={(e) => setField('country', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('destinationCountryFlag')}>
              <Input
                value={item.countryFlag}
                disabled={disabled}
                placeholder={t('destinationCountryFlagPlaceholder')}
                onChange={(e) => setField('countryFlag', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('destinationStates')}>
            <Input
              value={item.australianStates}
              disabled={disabled}
              placeholder={t('destinationStatesPlaceholder')}
              onChange={(e) => setField('australianStates', e.target.value)}
            />
          </EditorField>
          <EditorField label={t('destinationLevels')}>
            <div className='flex flex-wrap gap-4 pt-1'>
              {SCHOOL_LEVELS.map((level) => (
                <label key={level} className='flex items-center gap-2 text-sm text-foreground'>
                  <Checkbox
                    checked={item.schoolLevels.includes(level)}
                    disabled={disabled}
                    onCheckedChange={(checked) =>
                      setField('schoolLevels', toggleLevel(item.schoolLevels, level, checked === true))
                    }
                  />
                  {t(`destinationLevel_${level}`)}
                </label>
              ))}
            </div>
          </EditorField>
          <ToggleField
            label={t('destinationIsPrimary')}
            checked={item.isPrimaryDestination}
            disabled={disabled}
            onCheckedChange={(checked) => setField('isPrimaryDestination', checked)}
          />
        </div>
      )}
    />
  );
}
