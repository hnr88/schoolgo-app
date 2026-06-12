'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { FaqItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): FaqItem {
  return { question: '', answer: '', topicTag: '', order: 0 };
}

/** Repeatable editor for `shared.faq` (agent-authored Q&A). */
export function FaqEditor({ items, onChange, disabled }: RepeatableEditorProps<FaqItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<FaqItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('faqAdd'),
        rowLabel: (n) => t('faqRow', { number: n }),
        removeLabel: t('faqRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('faqEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <EditorField label={t('faqQuestion')}>
            <Input
              value={item.question}
              disabled={disabled}
              onChange={(e) => setField('question', e.target.value)}
            />
          </EditorField>
          <EditorField label={t('faqAnswer')}>
            <Textarea
              rows={3}
              value={item.answer}
              disabled={disabled}
              onChange={(e) => setField('answer', e.target.value)}
            />
          </EditorField>
          <EditorField label={t('faqTopicTag')}>
            <Input
              value={item.topicTag}
              disabled={disabled}
              placeholder={t('faqTopicTagPlaceholder')}
              onChange={(e) => setField('topicTag', e.target.value)}
            />
          </EditorField>
        </div>
      )}
    />
  );
}
