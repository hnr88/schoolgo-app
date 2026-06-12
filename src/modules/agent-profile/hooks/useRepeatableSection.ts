'use client';

import { useCallback } from 'react';
import type {
  UseRepeatableSectionReturn,
} from '@/modules/agent-profile/types/repeatable-section.types';

interface UseRepeatableSectionOptions<T> {
  items: T[];
  onChange: (items: T[]) => void;
  makeItem: () => T;
  maxItems?: number;
}

/**
 * Add/remove/reorder logic for a controlled repeatable list. Every mutation
 * re-stamps a 0-based `order` integer on each row (when the row shape carries
 * one) so the persisted array matches the BE replace-array + `order` model. Kept
 * out of the component per the module pattern (components stay dumb).
 */
export function useRepeatableSection<T>({
  items,
  onChange,
  makeItem,
  maxItems,
}: UseRepeatableSectionOptions<T>): UseRepeatableSectionReturn<T> {
  const reindex = useCallback((rows: T[]): T[] => {
    return rows.map((row, index) =>
      row && typeof row === 'object' && 'order' in (row as Record<string, unknown>)
        ? ({ ...(row as Record<string, unknown>), order: index } as T)
        : row,
    );
  }, []);

  const canAdd = maxItems === undefined || items.length < maxItems;

  const add = useCallback(() => {
    if (!canAdd) return;
    onChange(reindex([...items, makeItem()]));
  }, [canAdd, items, makeItem, onChange, reindex]);

  const remove = useCallback(
    (index: number) => {
      onChange(reindex(items.filter((_, i) => i !== index)));
    },
    [items, onChange, reindex],
  );

  const update = useCallback(
    (index: number, patch: Partial<T>) => {
      onChange(
        items.map((row, i) =>
          i === index ? ({ ...(row as object), ...patch } as T) : row,
        ),
      );
    },
    [items, onChange],
  );

  const move = useCallback(
    (index: number, direction: -1 | 1) => {
      const target = index + direction;
      if (target < 0 || target >= items.length) return;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      onChange(reindex(next));
    },
    [items, onChange, reindex],
  );

  return { rows: items, canAdd, add, remove, update, move };
}
