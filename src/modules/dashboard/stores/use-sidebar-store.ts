'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SidebarState {
  /** user override; null = follow route-based default (auto-collapse on search) */
  collapsed: boolean | null;
  setCollapsed: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: null,
      setCollapsed: (value) => set({ collapsed: value }),
    }),
    {
      name: 'schoolgo-sidebar-collapsed',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ collapsed: state.collapsed }),
    },
  ),
);
