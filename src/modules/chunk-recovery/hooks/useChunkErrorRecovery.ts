'use client';

import { useEffect } from 'react';
import { isChunkLoadError } from '@/modules/chunk-recovery/lib/is-chunk-load-error';
import { recoverFromChunkError } from '@/modules/chunk-recovery/lib/recover-from-chunk-error';

// For error boundaries: when React catches a chunk-load failure (e.g. a rejected
// dynamic import during navigation) reload once to fetch HTML that matches the
// current deploy, instead of leaving the user on the generic error screen.
export function useChunkErrorRecovery(error: unknown): void {
  useEffect(() => {
    if (isChunkLoadError(error)) {
      recoverFromChunkError();
    }
  }, [error]);
}
