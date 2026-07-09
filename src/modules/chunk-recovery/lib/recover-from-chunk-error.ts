import {
  CHUNK_RELOAD_COOLDOWN_MS,
  CHUNK_RELOAD_STORAGE_KEY,
} from '@/modules/chunk-recovery/constants/chunk-recovery.constants';

// Reload once to pull HTML that references the chunks the current deploy serves.
// Guarded by a timestamp so an origin that is genuinely down (a mid-deploy 502
// rather than a merely stale chunk) cannot trigger a reload loop — after the
// cooldown a single further attempt is allowed.
export function recoverFromChunkError(): boolean {
  if (typeof window === 'undefined') return false;

  let lastReloadAt = 0;
  try {
    lastReloadAt = Number(window.sessionStorage.getItem(CHUNK_RELOAD_STORAGE_KEY)) || 0;
  } catch {
    lastReloadAt = 0;
  }

  const now = Date.now();
  if (now - lastReloadAt < CHUNK_RELOAD_COOLDOWN_MS) {
    return false;
  }

  try {
    window.sessionStorage.setItem(CHUNK_RELOAD_STORAGE_KEY, String(now));
  } catch {
    // Private mode / storage disabled: proceed with the reload regardless. Worst
    // case the loop guard is skipped, which the origin recovering resolves.
  }

  window.location.reload();
  return true;
}
