'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { SEARCH_MODE_PARAM } from '@/modules/unified-search/constants/unified-search.constants';
import { resolveSearchMode } from '@/modules/unified-search/lib/resolve-search-mode';
import { useSearchModeStore } from '@/modules/unified-search/stores/use-search-mode-store';
import type { SearchMode } from '@/modules/unified-search/types/unified-search.types';

export function useSearchModeSync(defaultMode: SearchMode, enabled = true): SearchMode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramValue = searchParams.get(SEARCH_MODE_PARAM);

  const mode = useSearchModeStore((s) => s.mode);
  const setMode = useSearchModeStore((s) => s.setMode);

  const isSeeded = useRef(false);

  useEffect(() => {
    if (isSeeded.current) return;
    isSeeded.current = true;
    // Agents only ever search schools: lock the shared store to schools so every
    // reader (e.g. the unified autocomplete) stays schools-only regardless of any
    // URL mode param.
    setMode(enabled ? resolveSearchMode(paramValue, defaultMode) : 'schools');
  }, [enabled, paramValue, defaultMode, setMode]);

  useEffect(() => {
    if (!isSeeded.current) return;
    if (!enabled) {
      // Locked (agent) view: never surface ?mode=agents in the URL.
      if (paramValue && paramValue !== 'schools') {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(SEARCH_MODE_PARAM);
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname);
      }
      return;
    }
    if (paramValue === mode) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set(SEARCH_MODE_PARAM, mode);
    router.replace(`${pathname}?${params.toString()}`);
  }, [enabled, mode, paramValue, pathname, router, searchParams]);

  // When disabled (agent viewers, who only ever search schools) the mode is
  // locked to schools and the URL is never rewritten to ?mode=agents.
  return enabled ? mode : 'schools';
}
