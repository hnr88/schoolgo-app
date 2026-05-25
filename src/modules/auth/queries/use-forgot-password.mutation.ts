'use client';

import { useMutation } from '@tanstack/react-query';
import { forgotPasswordRequest } from '@/modules/auth/lib/auth-api';

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      await forgotPasswordRequest(email);
    },
  });
}
