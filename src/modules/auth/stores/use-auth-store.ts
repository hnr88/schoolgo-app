'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { publicApi, privateApi } from '@/lib/axios';
import { mapStrapiUser } from '@/modules/auth/lib/map-strapi-user';
import type { AuthState, LoginCredentials, User } from '@/modules/auth/types/auth.types';
import type { Portal } from '@/lib/portal-url';

function setAuthCookie(portal: Portal) {
  document.cookie = `schoolgo-logged-in=${portal}; path=/; max-age=31536000; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = 'schoolgo-logged-in=; path=/; max-age=0';
}

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
          const response = await publicApi.post('/api/auth/local', credentials);
          const { jwt } = response.data;
          set({ jwt });

          const meResponse = await privateApi.get('/api/users/me');
          set({
            user: mapStrapiUser(meResponse.data),
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
          const { userType: currentType } = get();
          if (currentType) setAuthCookie(currentType);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        clearAuthCookie();
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

        try {
          set({ isLoading: true });
          const response = await privateApi.get('/api/users/me');
          set({
            user: mapStrapiUser(response.data),
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
          const { userType: currentType } = get();
          if (currentType) setAuthCookie(currentType);
        } catch {
          clearAuthCookie();
          set({
            jwt: null,
            user: null,
            userType: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
          });
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
