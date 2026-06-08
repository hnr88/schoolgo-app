'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth';
import { useMe } from '@/modules/parent-settings';

export function ParentOnboardingGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const { data: me, isLoading } = useMe();

  const needsOnboarding = Boolean(me && me.userType === 'parent' && !me.profileCompleted);

  useEffect(() => {
    if (needsOnboarding) router.replace('/parent/onboarding');
  }, [needsOnboarding, router]);

  if (isAuthenticated && (isLoading || !me || needsOnboarding)) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return <>{children}</>;
}
