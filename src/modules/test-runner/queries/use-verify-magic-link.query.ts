'use client';

import { useQuery } from '@tanstack/react-query';
import { verifyMagicLink } from '@/modules/test-runner/lib/student-session';

export function useVerifyMagicLink(token: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['student-magic-link-verify', token],
    enabled: Boolean(token) && enabled,
    retry: false,
    staleTime: Infinity,
    gcTime: 0,
    queryFn: () => verifyMagicLink(token as string),
  });
}
