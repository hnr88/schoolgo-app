import type {
  DigestFrequency,
  NotificationChannel,
  NotificationTopic,
} from '@/modules/parent-settings/types/notification-preferences.types';

export const NOTIFICATION_CHANNELS = [
  'emailEnabled',
  'smsEnabled',
  'inAppEnabled',
] as const satisfies readonly NotificationChannel[];

export const NOTIFICATION_TOPICS = [
  'applicationUpdates',
  'offers',
  'messages',
  'deadlines',
  'tours',
  'marketing',
] as const satisfies readonly NotificationTopic[];

export const DIGEST_FREQUENCIES = [
  'immediate',
  'daily',
  'weekly',
  'off',
] as const satisfies readonly DigestFrequency[];

export const NOTIFICATION_PREFERENCES_QUERY_KEY = ['parent', 'notification-preferences'] as const;
