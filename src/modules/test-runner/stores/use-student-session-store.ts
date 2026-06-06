'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  startSession as startSessionApi,
  toTestSessionError,
} from '@/modules/test-runner/lib/test-session-api';
import type { StudentSessionStudent } from '@/modules/test-runner/types/student-session.types';
import type {
  ResponseState,
  TestSession,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

interface StudentSessionState {
  jwt: string | null;
  student: StudentSessionStudent | null;
  isHydrated: boolean;
  session: TestSession | null;
  responses: ResponseState;
  currentItemIndex: number;
  startError: TestSessionError | null;
  startInFlight: Promise<void> | null;
  setSession: (jwt: string, student: StudentSessionStudent) => void;
  clearSession: () => void;
  startSession: (testDocumentId: string) => Promise<void>;
  setResponse: (itemId: string, value: string) => void;
  setCurrentItemIndex: (index: number) => void;
  applySession: (session: TestSession) => void;
}

export const useStudentSessionStore = create<StudentSessionState>()(
  persist(
    (set, get) => ({
      jwt: null,
      student: null,
      isHydrated: false,
      session: null,
      responses: {},
      currentItemIndex: 0,
      startError: null,
      startInFlight: null,
      setSession: (jwt, student) => set({ jwt, student }),
      clearSession: () =>
        set({
          jwt: null,
          student: null,
          session: null,
          responses: {},
          currentItemIndex: 0,
          startError: null,
          startInFlight: null,
        }),
      startSession: (testDocumentId) => {
        const state = get();
        const existing = state.session;
        if (
          existing &&
          existing.status === 'in_progress' &&
          existing.test?.documentId === testDocumentId
        ) {
          return Promise.resolve();
        }
        if (state.startInFlight) {
          return state.startInFlight;
        }
        const jwt = state.jwt;
        if (!jwt) {
          set({
            startError: {
              kind: 'unauthorized',
              message: 'A student session is required to start a test',
            },
          });
          return Promise.resolve();
        }
        const promise = startSessionApi(jwt, { testDocumentId })
          .then((session) => {
            set({
              session,
              responses: session.responseState ?? {},
              currentItemIndex: session.currentItemIndex ?? 0,
              startError: null,
              startInFlight: null,
            });
          })
          .catch((error: unknown) => {
            set({ startError: toTestSessionError(error), startInFlight: null });
          });
        set({ startInFlight: promise });
        return promise;
      },
      setResponse: (itemId, value) =>
        set((prev) => ({ responses: { ...prev.responses, [itemId]: value } })),
      setCurrentItemIndex: (index) => set({ currentItemIndex: index }),
      applySession: (session) =>
        set((prev) => ({
          session: { ...session, test: session.test ?? prev.session?.test ?? null },
        })),
    }),
    {
      name: 'schoolgo-student-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ jwt: state.jwt, student: state.student }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);
