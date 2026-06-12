import type { OrderedItem } from '@/modules/agent-detail/types/agent-detail.types';

/** Stable sort by the section item's `order` integer (nulls last, original order preserved). */
export function sortByOrder<T extends OrderedItem>(items: readonly T[]): T[] {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ao = a.item.order ?? Number.MAX_SAFE_INTEGER;
      const bo = b.item.order ?? Number.MAX_SAFE_INTEGER;
      return ao === bo ? a.index - b.index : ao - bo;
    })
    .map(({ item }) => item);
}
