'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { UserRole } from '@/modules/auth/types/auth.types';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const jwt = useAuthStore((s) => s.jwt);
  const userType = useAuthStore((s) => s.userType);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const computed = useMemo(
    () => ({
      isParent: user?.role === UserRole.PARENT,
      isAgent: user?.role === UserRole.AGENT,
      isSchoolAdmin: user?.role === UserRole.SCHOOL_ADMIN,
      isSuperAdmin: user?.role === UserRole.SUPER_ADMIN,
      isAdmin: [UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN].includes(
        user?.role || ('' as UserRole),
      ),
    }),
    [user?.role],
  );

  return {
    user,
    jwt,
    userType,
    isLoading,
    isAuthenticated,
    isInitialized,
    isHydrated,
    ...computed,
  };
}
