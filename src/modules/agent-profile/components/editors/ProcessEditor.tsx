'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { ProcessStepItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): ProcessStepItem {
  return { stepNumber: '', title: '', description: '', order: 0 };
}

/** Repeatable editor for `shared.process-step` (the "How we help" journey). */
export function ProcessEditor({ items, onChange, disabled }: RepeatableEditorProps<ProcessStepItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<ProcessStepItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('processAdd'),
        rowLabel: (n) => t('processRow', { number: n }),
        removeLabel: t('processRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('processEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-[8rem_1fr]'>
            <EditorField label={t('processStepNumber')}>
              <Input
                type='number'
                inputMode='numeric'
                value={item.stepNumber}
                disabled={disabled}
                onChange={(e) => setField('stepNumber', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('processTitle')}>
              <Input
                value={item.title}
                disabled={disabled}
                onChange={(e) => setField('title', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('processDescription')}>
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
