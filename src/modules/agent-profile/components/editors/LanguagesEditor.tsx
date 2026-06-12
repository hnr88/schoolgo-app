'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import {
  SelectField,
  SwitchField,
  TextField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import { LANGUAGE_PROFICIENCIES } from '@/modules/agent-profile/constants/repeatable-editors.constants';
import type { SpokenLanguageItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeLanguage(): SpokenLanguageItem {
  return { language: '', proficiency: '', canCounselInThisLanguage: false, order: 0 };
}

/**
 * Repeatable editor for `shared.spoken-language` items — the languages the
 * agency serves families in. Fields: language, proficiency, canCounselInThis-
 * Language (per the contract). `canCounsel` is a decisive Asian-market signal.
 */
export function LanguagesEditor({ items, onChange, disabled }: RepeatableEditorProps<SpokenLanguageItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<SpokenLanguageItem>
      items={items}
      onChange={onChange}
      makeItem={makeLanguage}
      disabled={disabled}
      labels={{
        addLabel: t('languageAdd'),
        rowLabel: (index) => t('languageRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('languageEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <TextField
            id={`language-${index}-name`}
            label={t('languageNameLabel')}
            value={item.language}
            onChange={(value) => setField('language', value)}
            placeholder={t('languageNamePlaceholder')}
            disabled={disabled}
          />
          <SelectField
            id={`language-${index}-proficiency`}
            label={t('languageProficiencyLabel')}
            value={item.proficiency}
            onChange={(value) => setField('proficiency', value as SpokenLanguageItem['proficiency'])}
            placeholder={t('languageProficiencyPlaceholder')}
            options={LANGUAGE_PROFICIENCIES}
            optionLabel={(option) => t(`languageProficiency_${option}`)}
            disabled={disabled}
          />
          <div className='flex items-end sm:col-span-2'>
            <SwitchField
              id={`language-${index}-counsel`}
              label={t('languageCanCounselLabel')}
              checked={item.canCounselInThisLanguage}
              onChange={(checked) => setField('canCounselInThisLanguage', checked)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    />
  );
}
