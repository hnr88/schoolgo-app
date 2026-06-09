'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isAxiosError } from 'axios';
import { publicApi, privateApi } from '@/lib/axios';
import { getQueryClient } from '@/lib/query-client';
import { useOnboardingStore } from '@/modules/onboarding/stores/use-onboarding-store';
import { useActiveChildStore } from '@/modules/students/stores/use-active-child-store';
import { useRecentPagesStore } from '@/modules/command-palette/stores/use-recent-pages-store';
import { mapStrapiUser } from '@/modules/auth/lib/map-strapi-user';
import { getPortalFromRole } from '@/modules/auth/lib/get-portal-from-role';
import {
  clearLoggedInPortalCookie,
  setLoggedInPortalCookie,
} from '@/modules/auth/lib/auth-cookie';
import type { AuthState, LoginCredentials, User } from '@/modules/auth/types/auth.types';
import type { Portal } from '@/lib/portal-url';

const ME_RETRY_ATTEMPTS = 2;
const ME_RETRY_DELAY_MS = 600;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// A 401 means the stored token is genuinely invalid/expired and the session
// must be cleared. Any other failure (network error, aborted request, timeout,
// 5xx) is transient — the token is still valid and clearing it would wipe a
// healthy session out of storage on a hard reload.
function isInvalidTokenError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 401;
}

const setAuthCookie = setLoggedInPortalCookie;
const clearAuthCookie = clearLoggedInPortalCookie;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,
      userType: null,
      isLoading: true,
      isAuthenticated: false,
      isInitialized: false,
      isHydrated: false,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          // Drop any cached per-account data from a prior session so queries
          // refetch against the new identity instead of serving stale data.
          getQueryClient().clear();
          const response = await publicApi.post('/api/auth/local', credentials);
          const { jwt } = response.data;
          set({ jwt });

          const meResponse = await privateApi.get('/api/users/me');
          const user = mapStrapiUser(meResponse.data);
          // Derive the portal from the validated /me and commit it in the SAME
          // set() that flips isAuthenticated, so there is never a window where
          // the session is authenticated but userType (and the portal cookie)
          // are missing — that gap is what bounced the first login attempt.
          const resolvedType = getPortalFromRole(user.role);
          set({
            user,
            userType: resolvedType,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
          // Cookie is written from the VALIDATED session (never an unvalidated
          // JWT) — preserves the documented login<->dashboard loop fix.
          setAuthCookie(resolvedType);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        clearAuthCookie();
        // Wipe the cache so the next account never sees the previous one's
        // cached data (e.g. profileCompleted bouncing them to onboarding).
        getQueryClient().clear();
        // Reset per-account state persisted in localStorage so it never bleeds
        // into the next account signing in on the same browser.
        useOnboardingStore.getState().reset();
        useActiveChildStore.getState().setActiveChild(null);
        useRecentPagesStore.getState().clear();
        set({
          user: null,
          jwt: null,
          userType: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setJwt: (jwt: string) => {
        set({ jwt });
      },

      setUserType: (userType: Portal) => {
        set({ userType });
        if (get().isAuthenticated) setAuthCookie(userType);
      },

      initialize: async () => {
        const { jwt } = get();

        if (!jwt) {
          set({ isLoading: false, isAuthenticated: false, isInitialized: true });
          return;
        }

        set({ isLoading: true });

        for (let attempt = 0; attempt <= ME_RETRY_ATTEMPTS; attempt += 1) {
          try {
            const response = await privateApi.get('/api/users/me');
            set({
              user: mapStrapiUser(response.data),
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
            const { userType: currentType } = get();
            if (currentType) setAuthCookie(currentType);
            return;
          } catch (error) {
            if (isInvalidTokenError(error)) {
              // Real 401: token is invalid/expired — clear the persisted session.
              clearAuthCookie();
              set({
                jwt: null,
                user: null,
                userType: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
              });
              return;
            }

            // Transient failure (network/timeout/5xx): keep the token, retry.
            if (attempt < ME_RETRY_ATTEMPTS) {
              await delay(ME_RETRY_DELAY_MS);
              continue;
            }

            // Retries exhausted on a transient failure: keep the JWT and stay
            // authenticated so a hard reload never bounces a valid session.
            set({
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
            const { userType: persistedType } = get();
            if (persistedType) setAuthCookie(persistedType);
            return;
          }
        }
      },
    }),
    {
      name: 'schoolgo-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        jwt: state.jwt,
        userType: state.userType,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
          if (state.jwt) {
            state.isAuthenticated = true;
            // Do NOT set the auth cookie from an unvalidated JWT here. The proxy
            // trusts this cookie to redirect '/' -> '/dashboard'; if the JWT is
            // stale, initialize() below fails and clears it, but setting it
            // optimistically first lets the proxy bounce the user into a
            // login<->dashboard loop. initialize() sets it on success instead.
            state.initialize();
          } else {
            clearAuthCookie();
            state.isLoading = false;
            state.isInitialized = true;
          }
        }
      },
    },
  ),
);
