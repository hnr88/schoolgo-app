'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type { AgentPublicPreview } from '@/modules/agent-profile/types/agent-profile.types';

export const AGENT_PUBLIC_PREVIEW_QUERY_KEY = ['agent-public-preview'] as const;

interface PublicPreviewResponse {
  documentId: string;
  companyName: string;
  roleTitle: string | null;
  countryOfOperation: string | null;
  website: string | null;
  bio: string | null;
  qeacNumber: string | null;
  qeacValidationStatus: 'none' | 'pending' | 'verified';
  verified: boolean;
  profilePhoto: { url: string } | null;
}

interface AgentMeSchoolPreview {
  schoolPreview: { fullName: string };
}

export function useAgentPublicPreview() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentPublicPreview>({
    queryKey: AGENT_PUBLIC_PREVIEW_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const [previewRes, meRes] = await Promise.all([
        privateApi.get<StrapiEnvelope<PublicPreviewResponse>>('/api/agents/me/public-preview'),
        privateApi.get<StrapiEnvelope<AgentMeSchoolPreview>>('/api/agents/me'),
      ]);

      const preview = previewRes.data.data;

      return {
        documentId: preview.documentId,
        companyName: preview.companyName,
        roleTitle: preview.roleTitle,
        countryOfOperation: preview.countryOfOperation,
        website: preview.website,
        bio: preview.bio,
        qeacNumber: preview.qeacNumber,
        qeacValidationStatus: preview.qeacValidationStatus,
        verified: preview.verified,
        profilePhoto: preview.profilePhoto,
        fullName: meRes.data.data.schoolPreview.fullName,
      };
    },
  });
}
