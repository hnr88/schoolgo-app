import type { SearchMode } from '@/modules/unified-search/types/unified-search.types';

export function resolveSearchMode(value: string | null, fallback: SearchMode): SearchMode {
  return value === 'schools' || value === 'agents' ? value : fallback;
}
