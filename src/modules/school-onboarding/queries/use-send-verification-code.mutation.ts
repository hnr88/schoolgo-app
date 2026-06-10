'use client';

import { useMutation } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StrapiEnvelope } from '@/modules/school-profile/types/school-profile.types';
import type { SendVerificationCodeResult } from '@/modules/school-onboarding/types/school-onboarding.types';

export function useSendVerificationCode() {
  return useMutation<SendVerificationCodeResult>({
    mutationFn: async () => {
      const res = await privateApi.post<StrapiEnvelope<SendVerificationCodeResult>>(
        '/api/school-staffs/send-verification-code',
      );
      return res.data.data;
    },
  });
}
