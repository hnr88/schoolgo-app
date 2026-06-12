'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { SEARCH_MODE_PARAM } from '@/modules/unified-search/constants/unified-search.constants';
import { resolveSearchMode } from '@/modules/unified-search/lib/resolve-search-mode';
import { useSearchModeStore } from '@/modules/unified-search/stores/use-search-mode-store';
import type { SearchMode } from '@/modules/unified-search/types/unified-search.types';

export function useSearchModeSync(defaultMode: SearchMode): SearchMode {
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
    setMode(resolveSearchMode(paramValue, defaultMode));
  }, [paramValue, defaultMode, setMode]);

  useEffect(() => {
    if (!isSeeded.current || paramValue === mode) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set(SEARCH_MODE_PARAM, mode);
    router.replace(`${pathname}?${params.toString()}`);
  }, [mode, paramValue, pathname, router, searchParams]);

  return mode;
}
