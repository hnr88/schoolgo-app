'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useAgentSearch } from '@/modules/school-partnerships/queries/use-agent-search.query';
import { useAddPartner } from '@/modules/school-partnerships/queries/use-partnership-actions.mutation';

const DEBOUNCE_MS = 300;

export function useAgentSearchDialog(onClose: () => void) {
  const t = useTranslations('SchoolPartnerships');
  const [input, setInput] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebounced(input), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [input]);

  const search = useAgentSearch(debounced, true);
  const addPartner = useAddPartner();

  const handleInvite = (agentDocumentId: string) => {
    addPartner.mutate(
      { agentDocumentId },
      {
        onSuccess: () => {
          toast.success(t('inviteSuccess'));
          onClose();
        },
        onError: () => toast.error(t('inviteError')),
      },
    );
  };

  return {
    input,
    setInput,
    results: search.data ?? [],
    isLoading: search.isLoading,
    isInviting: addPartner.isPending,
    invitingId: addPartner.variables?.agentDocumentId ?? null,
    handleInvite,
  };
}
