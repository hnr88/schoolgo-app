'use client';

import { create } from 'zustand';
import type { ShortlistItem } from '@/modules/parent-shortlist/types/shortlist.types';

interface ShortlistItemsState {
  /** Items added during this session, keyed by shortlist documentId. */
  itemsByShortlist: Record<string, ShortlistItem[]>;
  addItem: (item: ShortlistItem) => void;
}

export const useShortlistItemsStore = create<ShortlistItemsState>((set) => ({
  itemsByShortlist: {},
  addItem: (item) =>
    set((state) => {
      const existing = state.itemsByShortlist[item.shortlistId] ?? [];
      if (existing.some((i) => i.documentId === item.documentId)) return state;
      return {
        itemsByShortlist: {
          ...state.itemsByShortlist,
          [item.shortlistId]: [...existing, item],
        },
      };
    }),
}));
