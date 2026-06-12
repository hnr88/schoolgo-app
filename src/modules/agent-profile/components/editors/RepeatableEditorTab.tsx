'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRepeatableSectionDraft } from '@/modules/agent-profile/hooks/useRepeatableSectionDraft';
import type { RepeatableSectionEntry } from '@/modules/agent-profile/types/builder-sections.types';

interface RepeatableEditorTabProps {
  entry: RepeatableSectionEntry;
  raw: unknown;
}

/**
 * Mounts one registry editor in its tab, wired to a per-section draft + Save.
 * The editor is fully controlled (`items`/`onChange`); saving sends only this
 * section's payload key. Disabled while saving; Save is inert when not dirty.
 */
export function RepeatableEditorTab({ entry, raw }: RepeatableEditorTabProps) {
  const t = useTranslations('AgentProfileBuilder');
  const { items, setItems, save, isDirty, isPending } = useRepeatableSectionDraft({ entry, raw });
  const Editor = entry.editor;

  return (
    <div className='flex flex-col gap-6'>
      <Editor items={items} onChange={setItems} disabled={isPending} />
      <Button
        type='button'
        onClick={save}
        disabled={isPending || !isDirty}
        aria-busy={isPending}
        className='self-start'
      >
        {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
        {t('sectionSave')}
      </Button>
    </div>
  );
}
