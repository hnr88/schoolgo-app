'use client';

import { useMutation } from '@tanstack/react-query';
import { resetPasswordRequest } from '@/modules/auth/lib/auth-api';
import type { ResetPasswordValues } from '@/modules/auth/schemas/reset-password.schema';

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      await resetPasswordRequest(values);
    },
  });
}
