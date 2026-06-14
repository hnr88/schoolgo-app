'use client';

import { useMutation } from '@tanstack/react-query';
import { identifyRequest } from '@/modules/auth/lib/auth-api';
import type { IdentifyResponse } from '@/modules/auth/types/auth-api.types';

export function useIdentifyMutation() {
  return useMutation<IdentifyResponse, unknown, string>({
    mutationFn: (email: string) => identifyRequest(email),
  });
}
