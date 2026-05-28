import { AGENT_NOTIFICATION_EVENTS } from '@/modules/agent-settings/constants/agent-settings.constants';
import type { AgentNotificationsValues } from '@/modules/agent-settings/schemas/notifications.schema';
import type {
  AgentMessagingPreferences,
  AgentNotificationDigest,
  AgentNotificationEventMap,
  AgentNotificationPreferences,
} from '@/modules/agent-settings/types/agent-settings.types';

export function buildNotificationDefaults(
  notifications: AgentNotificationPreferences,
  messaging: AgentMessagingPreferences,
): AgentNotificationsValues {
  const events = AGENT_NOTIFICATION_EVENTS.reduce((acc, event) => {
    const stored = notifications.events?.[event];
    acc[event] = {
      inApp: stored?.inApp ?? true,
      email: stored?.email ?? true,
    };
    return acc;
  }, {} as AgentNotificationEventMap);

  const digest: AgentNotificationDigest = notifications.digest ?? 'instant';

  return {
    events,
    digest,
    sendOnEnter: messaging.sendOnEnter,
    appendSignature: messaging.appendSignature,
    signature: messaging.signature ?? '',
  };
}
