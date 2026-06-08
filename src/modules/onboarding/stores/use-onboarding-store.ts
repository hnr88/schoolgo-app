'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardingState {
  dismissed: boolean;
  dismiss: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true }),
      reset: () => set({ dismissed: false }),
    }),
    {
      name: 'schoolgo-onboarding',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dismissed: state.dismissed }),
    },
  ),
);
