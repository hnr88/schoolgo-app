'use client';

import { useAgentShares } from '@/modules/students/queries/use-agent-shares.query';
import type {
  AgentRepresentationView,
  StudentAgentShare,
} from '@/modules/students/types/agent-share.types';

export function useAgentRepresentation(studentDocumentId: string): AgentRepresentationView {
  const { data, isLoading, isError } = useAgentShares(studentDocumentId);

  const shares: StudentAgentShare[] = data ?? [];
  const activeShare = shares.find((share) => share.status === 'active' && Boolean(share.agent)) ?? null;
  const pastShares = shares.filter((share) => share.status === 'revoked' && Boolean(share.agent));

  return {
    activeShare,
    pastShares,
    hasRepresentation: activeShare !== null,
    isLoading,
    isError,
  };
}
