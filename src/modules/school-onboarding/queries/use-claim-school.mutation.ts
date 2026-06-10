'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_STAFF_ME_QUERY_KEY } from '@/modules/school-profile/queries/use-school-staff-me.query';
import type {
  ClaimedStaffRecord,
  ClaimSchoolPayload,
  ClaimSchoolResult,
  ClaimVerificationStatus,
} from '@/modules/school-onboarding/types/school-onboarding.types';

interface ClaimResponse {
  data: ClaimedStaffRecord;
  meta: { verificationStatus: ClaimVerificationStatus };
}

export function useClaimSchool() {
  const qc = useQueryClient();

  return useMutation<ClaimSchoolResult, unknown, ClaimSchoolPayload>({
    mutationFn: async ({ schoolDocumentId, roleTitle }) => {
      const res = await privateApi.post<ClaimResponse>('/api/school-staffs/claim', {
        schoolDocumentId,
        roleTitle,
      });
      return {
        staff: res.data.data,
        verificationStatus: res.data.meta.verificationStatus,
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_STAFF_ME_QUERY_KEY });
    },
  });
}
