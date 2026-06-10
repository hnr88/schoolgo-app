'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_STAFF_ME_QUERY_KEY } from '@/modules/school-profile/queries/use-school-staff-me.query';

interface VerifyCodeResponse {
  verified: boolean;
  status: string;
}

export function useVerifyCode() {
  const qc = useQueryClient();

  return useMutation<VerifyCodeResponse, unknown, string>({
    mutationFn: async (code) => {
      const res = await privateApi.post<{ data: VerifyCodeResponse }>(
        '/api/school-staffs/verify-code',
        { code },
      );
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_STAFF_ME_QUERY_KEY });
    },
  });
}
