import { CHUNK_ERROR_PATTERNS } from '@/modules/chunk-recovery/constants/chunk-recovery.constants';

function matches(haystack: string): boolean {
  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(haystack));
}

export function isChunkLoadError(input: unknown): boolean {
  if (!input) return false;

  if (typeof input === 'string') {
    return matches(input);
  }

  if (input instanceof Error) {
    return matches(`${input.name} ${input.message}`);
  }

  if (typeof input === 'object') {
    const candidate = input as { name?: unknown; message?: unknown };
    const name = typeof candidate.name === 'string' ? candidate.name : '';
    const message = typeof candidate.message === 'string' ? candidate.message : '';
    if (!name && !message) return false;
    return matches(`${name} ${message}`);
  }

  return false;
}
