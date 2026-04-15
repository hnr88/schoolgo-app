import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserType = 'admin' | 'student' | 'parent' | 'school';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  userType: UserType | null;
  user: AuthUser | null;
  setSession: (payload: { token: string; userType: UserType; user: AuthUser }) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userType: null,
      user: null,
      setSession: ({ token, userType, user }) => set({ token, userType, user }),
      setToken: (token) => set({ token }),
      logout: () => set({ token: null, userType: null, user: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        userType: state.userType,
        user: state.user,
      }),
    },
  ),
);
