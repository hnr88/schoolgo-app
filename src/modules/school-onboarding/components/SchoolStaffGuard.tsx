'use client';

import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useSchoolStaffMe } from '@/modules/school-profile/queries/use-school-staff-me.query';

export function SchoolStaffGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useSchoolStaffMe();

  const is404 = isAxiosError(error) && error.response?.status === 404;
  const hasActiveStaff = data?.status === 'active';
  const shouldRedirect = (isError && is404) || (!isLoading && !isError && !hasActiveStaff);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/onboarding');
    }
  }, [shouldRedirect, router]);

  if (isLoading) {
    return (
      <div className='flex w-full max-w-sm flex-col gap-4 p-6'>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </div>
    );
  }

  if (shouldRedirect) {
    return null;
  }

  if (isError) {
    return null;
  }

  return <>{children}</>;
}
