'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ComplianceEditor } from '@/modules/agent-profile/components/editors/ComplianceEditor';
import { useComplianceDraft } from '@/modules/agent-profile/hooks/useScalarSectionDraft';
import type { AgentPublicProfilePreview } from '@/modules/agent-profile/types/agent-profile.types';

interface ComplianceTabProps {
  preview: AgentPublicProfilePreview;
}

/**
 * Fee / ethics / availability scalar tab — ComplianceEditor wired to a draft +
 * Save (saves the scalar slice via `updateMe`).
 */
export function ComplianceTab({ preview }: ComplianceTabProps) {
  const t = useTranslations('AgentProfileBuilder');
  const { values, update, save, isDirty, isPending } = useComplianceDraft(preview);

  return (
    <div className='flex flex-col gap-6'>
      <ComplianceEditor values={values} onChange={update} disabled={isPending} />
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
