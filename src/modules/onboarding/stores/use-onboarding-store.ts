'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardingState {
  dismissed: boolean;
  dismiss: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true }),
    }),
    {
      name: 'schoolgo-onboarding',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dismissed: state.dismissed }),
    },
  ),
);
