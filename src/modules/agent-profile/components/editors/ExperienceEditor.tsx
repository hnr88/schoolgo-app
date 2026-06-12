'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { ExperienceEntryItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): ExperienceEntryItem {
  return {
    roleTitle: '',
    organisation: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    studentCohortFocus: '',
    order: 0,
  };
}

/** Repeatable editor for `shared.experience-entry` (career-history timeline). */
export function ExperienceEditor({ items, onChange, disabled }: RepeatableEditorProps<ExperienceEntryItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<ExperienceEntryItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('experienceAdd'),
        rowLabel: (n) => t('experienceRow', { number: n }),
        removeLabel: t('experienceRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('experienceEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('experienceRoleTitle')}>
              <Input
                value={item.roleTitle}
                disabled={disabled}
                onChange={(e) => setField('roleTitle', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('experienceOrganisation')}>
              <Input
                value={item.organisation}
                disabled={disabled}
                onChange={(e) => setField('organisation', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('experienceStartDate')}>
              <Input
                type='month'
                value={item.startDate}
                disabled={disabled}
                onChange={(e) => setField('startDate', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('experienceEndDate')}>
              <Input
                type='month'
                value={item.endDate}
                disabled={disabled}
                placeholder={t('experienceEndDatePlaceholder')}
                onChange={(e) => setField('endDate', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('experienceLocation')}>
              <Input
                value={item.location}
                disabled={disabled}
                onChange={(e) => setField('location', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('experienceCohortFocus')}>
              <Input
                value={item.studentCohortFocus}
                disabled={disabled}
                placeholder={t('experienceCohortFocusPlaceholder')}
                onChange={(e) => setField('studentCohortFocus', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('experienceDescription')}>
            <Textarea
              rows={3}
              value={item.description}
              disabled={disabled}
              onChange={(e) => setField('description', e.target.value)}
            />
          </EditorField>
        </div>
      )}
    />
  );
}
