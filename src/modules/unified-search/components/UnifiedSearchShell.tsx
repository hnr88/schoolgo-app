'use client';

import { useMemo } from 'react';
import { resolveCapability } from '@/modules/unified-search/lib/resolve-capability';
import { useSearchModeSync } from '@/modules/unified-search/hooks/useSearchModeSync';
import { AgentsSearchPane } from '@/modules/unified-search/components/AgentsSearchPane';
import { SchoolsSearchPane } from '@/modules/unified-search/components/SchoolsSearchPane';
import { SearchFiltersToggle } from '@/modules/unified-search/components/SearchFiltersToggle';
import { SearchTypeToggle } from '@/modules/unified-search/components/SearchTypeToggle';
import { UnifiedSearchBar } from '@/modules/unified-search/components/UnifiedSearchBar';
import type { UnifiedSearchShellProps } from '@/modules/unified-search/types/unified-search.types';

export function UnifiedSearchShell({ activePortal, access, defaultMode }: UnifiedSearchShellProps) {
  const capability = useMemo(() => resolveCapability(access), [access]);
  // Agents only ever search schools — they must never see other agents, so the
  // schools/agents toggle is hidden and the mode is locked to schools for them.
  const canSearchAgents = activePortal !== 'agent';
  const mode = useSearchModeSync(canSearchAgents ? defaultMode : 'schools', canSearchAgents);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="flex shrink-0 flex-col gap-2 px-3 pt-4 pb-2 md:flex-row md:items-center md:gap-3 md:px-4">
        <SearchFiltersToggle className="shrink-0" />
        {canSearchAgents && <SearchTypeToggle className="shrink-0" />}
        <UnifiedSearchBar className="min-w-0 flex-1" />
      </div>

      {mode === 'schools' ? (
        <SchoolsSearchPane activePortal={activePortal} capability={capability} />
      ) : (
        <AgentsSearchPane activePortal={activePortal} capability={capability} />
      )}
    </div>
  );
}
