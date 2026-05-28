'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import {
  AGENT_SETTINGS_QUERY_KEY,
  type AgentSettingsData,
} from '@/modules/agent-settings/queries/use-agent-settings.query';
import type { AgentNotificationsValues } from '@/modules/agent-settings/schemas/notifications.schema';
import type {
  AgentMessagingPreferences,
  AgentNotificationPreferences,
} from '@/modules/agent-settings/types/agent-settings.types';

export function useUpdateAgentNotifications() {
  const qc = useQueryClient();
  const t = useTranslations('AgentSettings');

  return useMutation({
    mutationFn: async (values: AgentNotificationsValues) => {
      const notificationPreferences: AgentNotificationPreferences = {
        events: values.events,
        digest: values.digest,
      };
      const messagingPreferences: Pick<
        AgentMessagingPreferences,
        'sendOnEnter' | 'appendSignature' | 'signature'
      > = {
        sendOnEnter: values.sendOnEnter,
        appendSignature: values.appendSignature,
        signature: values.signature ? values.signature : null,
      };

      const [notifications, messaging] = await Promise.all([
        privateApi.put('/api/agents/me/notification-preferences', notificationPreferences),
        privateApi.put('/api/agents/me/messaging-preferences', messagingPreferences),
      ]);

      return { notificationPreferences, messagingPreferences, notifications, messaging };
    },
    onSuccess: ({ notificationPreferences, messagingPreferences }) => {
      qc.setQueryData<AgentSettingsData>(AGENT_SETTINGS_QUERY_KEY, (prev) =>
        prev
          ? {
              ...prev,
              notifications: notificationPreferences,
              messaging: { ...prev.messaging, ...messagingPreferences },
            }
          : prev,
      );
      qc.invalidateQueries({ queryKey: AGENT_SETTINGS_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
