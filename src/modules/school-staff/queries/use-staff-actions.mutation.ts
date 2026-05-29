'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_STAFF_QUERY_KEY } from '@/modules/school-staff/queries/use-school-staff.query';
import type { InviteStaffPayload } from '@/modules/school-staff/types/school-staff.types';

function useInvalidateStaff() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: SCHOOL_STAFF_QUERY_KEY });
  };
}

interface InviteStaffArgs extends InviteStaffPayload {
  schoolDocumentId: string;
}

export function useInviteStaff() {
  const invalidate = useInvalidateStaff();
  return useMutation({
    mutationFn: async ({ email, roleTitle, permissionLevel, schoolDocumentId }: InviteStaffArgs) => {
      const { data } = await privateApi.post('/api/school-staffs/invite', {
        data: { email, roleTitle, permissionLevel, schoolDocumentId },
      });
      return data;
    },
    onSuccess: invalidate,
  });
}

export function usePromoteStaff() {
  const invalidate = useInvalidateStaff();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.post(`/api/school-staffs/${documentId}/promote`);
      return data;
    },
    onSuccess: invalidate,
  });
}

export function useDeactivateStaff() {
  const invalidate = useInvalidateStaff();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await privateApi.post(`/api/school-staffs/${documentId}/deactivate`);
      return data;
    },
    onSuccess: invalidate,
  });
}
