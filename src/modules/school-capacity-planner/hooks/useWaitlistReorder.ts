'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useReorderWaitlist } from '@/modules/school-capacity-planner/queries/use-reorder-waitlist.mutation';
import { waitlistScopeKey } from '@/modules/school-capacity-planner/lib/format';
import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';

/**
 * Encapsulates move-up / move-down ledger reordering: it recomputes the
 * ordered documentId list within the moved entry's (intake, yearLevel) scope
 * and sends it to the reorder endpoint.
 */
export function useWaitlistReorder(entries: WaitlistEntry[]) {
  const t = useTranslations('SchoolCapacityPlanner');
  const mutation = useReorderWaitlist();

  const move = useCallback(
    (entry: WaitlistEntry, direction: 'up' | 'down') => {
      const scope = waitlistScopeKey(entry);
      const waiting = entries.filter(
        (e) => e.status === 'waiting' && waitlistScopeKey(e) === scope,
      );
      const index = waiting.findIndex((e) => e.documentId === entry.documentId);
      const target = direction === 'up' ? index - 1 : index + 1;
      if (index < 0 || target < 0 || target >= waiting.length) return;

      const reordered = [...waiting];
      const [moved] = reordered.splice(index, 1);
      reordered.splice(target, 0, moved);

      mutation.mutate(
        reordered.map((e) => e.documentId),
        { onError: () => toast.error(t('reorderError')) },
      );
    },
    [entries, mutation, t],
  );

  return { move, isReordering: mutation.isPending };
}
