'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { usePartnerships } from '@/modules/school-partnerships/queries/use-partnerships.query';
import {
  useApprovePartnership,
  useDenyPartnership,
  useRemovePartnership,
} from '@/modules/school-partnerships/queries/use-partnership-actions.mutation';
import { groupPartnerships } from '@/modules/school-partnerships/lib/partnerships';
import type { AgentPartnership } from '@/modules/school-partnerships/types/school-partnerships.types';

export function usePartnershipsPage() {
  const t = useTranslations('SchoolPartnerships');
  const query = usePartnerships();
  const approve = useApprovePartnership();
  const deny = useDenyPartnership();
  const remove = useRemovePartnership();

  const [addOpen, setAddOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<AgentPartnership | null>(null);

  const grouped = useMemo(
    () => groupPartnerships(query.data ?? []),
    [query.data],
  );

  const handleApprove = (documentId: string) =>
    approve.mutate(documentId, {
      onSuccess: () => toast.success(t('statusApproved')),
      onError: () => toast.error(t('loadError')),
    });

  const handleDeny = (documentId: string) =>
    deny.mutate(documentId, {
      onSuccess: () => toast.success(t('statusDenied')),
      onError: () => toast.error(t('loadError')),
    });

  const handleConfirmRemove = () => {
    if (!removeTarget) return;
    remove.mutate(removeTarget.documentId, {
      onSuccess: () => {
        toast.success(t('removeConfirm'));
        setRemoveTarget(null);
      },
      onError: () => toast.error(t('loadError')),
    });
  };

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    active: grouped.active,
    pending: grouped.pending,
    addOpen,
    setAddOpen,
    removeTarget,
    setRemoveTarget,
    pendingActionId:
      approve.variables ?? deny.variables ?? remove.variables ?? null,
    isRemoving: remove.isPending,
    handleApprove,
    handleDeny,
    handleConfirmRemove,
  };
}
