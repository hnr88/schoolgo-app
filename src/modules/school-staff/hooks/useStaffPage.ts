'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSchoolStaff } from '@/modules/school-staff/queries/use-school-staff.query';
import { useSchoolStaffMe } from '@/modules/school-staff/queries/use-school-staff-me.query';
import {
  useDeactivateStaff,
  usePromoteStaff,
} from '@/modules/school-staff/queries/use-staff-actions.mutation';
import { resolveCurrentMember } from '@/modules/school-staff/lib/staff';
import type { SchoolStaffMember } from '@/modules/school-staff/types/school-staff.types';

export function useStaffPage() {
  const t = useTranslations('SchoolStaff');
  const team = useSchoolStaff();
  const me = useSchoolStaffMe();
  const promote = usePromoteStaff();
  const deactivate = useDeactivateStaff();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState<SchoolStaffMember | null>(null);

  const members = useMemo(() => team.data?.data ?? [], [team.data]);
  const currentStaffDocumentId = team.data?.meta.currentStaffDocumentId ?? null;

  const isAdmin = useMemo(() => {
    if (me.data) return me.data.permissionLevel === 'admin';
    const current = resolveCurrentMember(members, currentStaffDocumentId);
    return current?.permissionLevel === 'admin';
  }, [me.data, members, currentStaffDocumentId]);

  const schoolDocumentId = me.data?.school.documentId ?? null;

  const handlePromote = (documentId: string) =>
    promote.mutate(documentId, {
      onSuccess: () => toast.success(t('inviteSuccess')),
      onError: () => toast.error(t('inviteError')),
    });

  const handleConfirmDeactivate = () => {
    if (!deactivateTarget) return;
    deactivate.mutate(deactivateTarget.documentId, {
      onSuccess: () => {
        toast.success(t('deactivateConfirm'));
        setDeactivateTarget(null);
      },
      onError: () => toast.error(t('inviteError')),
    });
  };

  return {
    isLoading: team.isLoading,
    isError: team.isError,
    refetch: team.refetch,
    members,
    currentStaffDocumentId,
    isAdmin,
    schoolDocumentId,
    inviteOpen,
    setInviteOpen,
    deactivateTarget,
    setDeactivateTarget,
    pendingActionId: promote.variables ?? deactivate.variables ?? null,
    isDeactivating: deactivate.isPending,
    handlePromote,
    handleConfirmDeactivate,
  };
}
