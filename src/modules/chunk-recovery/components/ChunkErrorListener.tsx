'use client';

import { useEffect } from 'react';
import { CHUNK_ASSET_PATH } from '@/modules/chunk-recovery/constants/chunk-recovery.constants';
import { isChunkLoadError } from '@/modules/chunk-recovery/lib/is-chunk-load-error';
import { recoverFromChunkError } from '@/modules/chunk-recovery/lib/recover-from-chunk-error';

function isFailedChunkAsset(target: EventTarget | null): boolean {
  if (target instanceof HTMLScriptElement) {
    return target.src.includes(CHUNK_ASSET_PATH);
  }
  if (target instanceof HTMLLinkElement) {
    return target.href.includes(CHUNK_ASSET_PATH);
  }
  return false;
}

export function ChunkErrorListener() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        isFailedChunkAsset(event.target) ||
        isChunkLoadError(event.error) ||
        isChunkLoadError(event.message)
      ) {
        recoverFromChunkError();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        recoverFromChunkError();
      }
    };

    // Capture phase: a failed <script>/<link> resource load does not bubble, and
    // this is exactly how a chunk that 502s during a deploy surfaces in the browser.
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
