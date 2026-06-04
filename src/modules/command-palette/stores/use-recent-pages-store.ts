'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { RecentPage } from '@/modules/command-palette/types/recent-pages.types';
import { PALETTE_RECENT_PAGES_MAX } from '@/modules/command-palette/constants/command-palette.constants';

interface RecentPagesState {
  pages: RecentPage[];
  recordVisit: (page: RecentPage) => void;
  clear: () => void;
}

export const useRecentPagesStore = create<RecentPagesState>()(
  persist(
    (set) => ({
      pages: [],
      recordVisit: (page) =>
        set((state) => ({
          pages: [
            page,
            ...state.pages.filter(
              (entry) => entry.href !== page.href || entry.portal !== page.portal,
            ),
          ].slice(0, PALETTE_RECENT_PAGES_MAX),
        })),
      clear: () => set({ pages: [] }),
    }),
    {
      name: 'schoolgo-command-palette-recent',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ pages: state.pages }),
    },
  ),
);
