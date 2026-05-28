'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type {
  AgentLocalePreferences,
  AgentMessagingPreferences,
  AgentNotificationPreferences,
  AgentProfileSummary,
  AgentUserMe,
} from '@/modules/agent-settings/types/agent-settings.types';

export const AGENT_SETTINGS_QUERY_KEY = ['agent-settings'] as const;

interface AgentMeResponse {
  documentId: string;
  companyName: string;
  roleTitle: string | null;
  countryOfOperation: string | null;
  verified: boolean;
  schoolPreview: {
    fullName: string;
    companyName: string;
    verified: boolean;
    qeacCertified: boolean;
    country: string | null;
  };
}

export interface AgentSettingsData {
  user: AgentUserMe;
  profile: AgentProfileSummary;
  notifications: AgentNotificationPreferences;
  messaging: AgentMessagingPreferences;
  locale: AgentLocalePreferences;
}

export function useAgentSettings() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentSettingsData>({
    queryKey: AGENT_SETTINGS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const [user, agent, notifications, messaging, locale] = await Promise.all([
        privateApi.get<AgentUserMe>('/api/users/me'),
        privateApi.get<StrapiEnvelope<AgentMeResponse>>('/api/agents/me'),
        privateApi.get<StrapiEnvelope<{ preferences: AgentNotificationPreferences }>>(
          '/api/agents/me/notification-preferences',
        ),
        privateApi.get<StrapiEnvelope<AgentMessagingPreferences>>(
          '/api/agents/me/messaging-preferences',
        ),
        privateApi.get<StrapiEnvelope<AgentLocalePreferences>>(
          '/api/agents/me/locale-preferences',
        ),
      ]);

      const agentData = agent.data.data;
      const profile: AgentProfileSummary = {
        documentId: agentData.documentId,
        companyName: agentData.schoolPreview.companyName,
        roleTitle: agentData.roleTitle,
        countryOfOperation: agentData.schoolPreview.country,
        verified: agentData.schoolPreview.verified,
        qeacCertified: agentData.schoolPreview.qeacCertified,
        fullName: agentData.schoolPreview.fullName,
      };

      return {
        user: user.data,
        profile,
        notifications: notifications.data.data.preferences ?? {},
        messaging: messaging.data.data,
        locale: locale.data.data,
      };
    },
  });
}
