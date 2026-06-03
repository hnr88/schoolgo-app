'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ActiveChildState {
  activeChildId: string | null;
  setActiveChild: (id: string | null) => void;
}

export const useActiveChildStore = create<ActiveChildState>()(
  persist(
    (set) => ({
      activeChildId: null,
      setActiveChild: (id) => set({ activeChildId: id }),
    }),
    {
      name: 'schoolgo-active-child',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeChildId: state.activeChildId }),
    },
  ),
);
