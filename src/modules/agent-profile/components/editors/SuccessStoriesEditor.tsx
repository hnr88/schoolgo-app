'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { ToggleField } from '@/modules/agent-profile/components/editors/ToggleField';
import { MultiMediaField } from '@/modules/agent-profile/components/editors/MultiMediaField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { SuccessStoryItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): SuccessStoryItem {
  return {
    title: '',
    studentInitials: '',
    studentHomeCountry: '',
    schoolPlacedAt: '',
    yearLevel: '',
    narrative: '',
    outcomeHighlights: '',
    media: [],
    consentObtained: false,
    order: 0,
  };
}

/** Repeatable editor for `shared.success-story` (multi-format case studies). */
export function SuccessStoriesEditor({ items, onChange, disabled }: RepeatableEditorProps<SuccessStoryItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<SuccessStoryItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('storyAdd'),
        rowLabel: (n) => t('storyRow', { number: n }),
        removeLabel: t('storyRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('storyEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <EditorField label={t('storyTitle')}>
            <Input
              value={item.title}
              disabled={disabled}
              onChange={(e) => setField('title', e.target.value)}
            />
          </EditorField>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('storyStudentInitials')}>
              <Input
                value={item.studentInitials}
                disabled={disabled}
                placeholder={t('storyStudentInitialsPlaceholder')}
                onChange={(e) => setField('studentInitials', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('storyHomeCountry')}>
              <Input
                value={item.studentHomeCountry}
                disabled={disabled}
                onChange={(e) => setField('studentHomeCountry', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('storySchoolPlacedAt')}>
              <Input
                value={item.schoolPlacedAt}
                disabled={disabled}
                onChange={(e) => setField('schoolPlacedAt', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('storyYearLevel')}>
              <Input
                value={item.yearLevel}
                disabled={disabled}
                onChange={(e) => setField('yearLevel', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('storyNarrative')}>
            <Textarea
              rows={4}
              value={item.narrative}
              disabled={disabled}
              onChange={(e) => setField('narrative', e.target.value)}
            />
          </EditorField>
          <EditorField label={t('storyOutcomeHighlights')}>
            <Textarea
              rows={2}
              value={item.outcomeHighlights}
              disabled={disabled}
              placeholder={t('storyOutcomeHighlightsPlaceholder')}
              onChange={(e) => setField('outcomeHighlights', e.target.value)}
            />
          </EditorField>
          <MultiMediaField
            label={t('storyMedia')}
            items={item.media}
            disabled={disabled}
            onChange={(media) => setField('media', media)}
          />
          <ToggleField
            label={t('storyConsentObtained')}
            checked={item.consentObtained}
            disabled={disabled}
            onCheckedChange={(checked) => setField('consentObtained', checked)}
          />
        </div>
      )}
    />
  );
}
