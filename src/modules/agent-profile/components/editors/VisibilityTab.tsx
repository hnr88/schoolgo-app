'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { VisibilityPanel } from '@/modules/agent-profile/components/editors/VisibilityPanel';
import { useVisibilityDraft } from '@/modules/agent-profile/hooks/useScalarSectionDraft';
import type { AgentSectionVisibility } from '@/modules/agent-profile/types/agent-profile.types';

interface VisibilityTabProps {
  visibility: AgentSectionVisibility;
}

/**
 * Per-section visibility tab — VisibilityPanel wired to a draft + Save (persists
 * the `sectionVisibility` json the public profile reads to decide what renders).
 */
export function VisibilityTab({ visibility }: VisibilityTabProps) {
  const t = useTranslations('AgentProfileBuilder');
  const draft = useVisibilityDraft(visibility);

  return (
    <div className='flex flex-col gap-6'>
      <VisibilityPanel
        visibility={draft.visibility}
        onChange={draft.update}
        disabled={draft.isPending}
      />
      <Button
        type='button'
        onClick={draft.save}
        disabled={draft.isPending || !draft.isDirty}
        aria-busy={draft.isPending}
        className='self-start'
      >
        {draft.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
        {t('sectionSave')}
      </Button>
    </div>
  );
}
