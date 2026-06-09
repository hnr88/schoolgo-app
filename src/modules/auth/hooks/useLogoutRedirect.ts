'use client';

import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export function useLogoutRedirect() {
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    // Hard navigation (not a soft router push) tears down the singleton
    // QueryClient and the whole runtime so the next account starts from a clean
    // slate. The proxy injects the locale + portal into `/sign-in` from the host.
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
  };

  return { handleLogout };
}
