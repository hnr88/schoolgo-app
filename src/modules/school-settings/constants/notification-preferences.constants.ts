import type {
  SchoolDigestFrequency,
  SchoolNotificationChannel,
  SchoolNotificationTopic,
} from '@/modules/school-settings/types/notification-preferences.types';

export const SCHOOL_NOTIFICATION_CHANNELS = [
  'emailEnabled',
  'smsEnabled',
  'inAppEnabled',
] as const satisfies readonly SchoolNotificationChannel[];

export const SCHOOL_NOTIFICATION_TOPICS = [
  'applicationUpdates',
  'offers',
  'messages',
  'deadlines',
  'tours',
  'marketing',
] as const satisfies readonly SchoolNotificationTopic[];

export const SCHOOL_DIGEST_FREQUENCIES = [
  'immediate',
  'daily',
  'weekly',
  'off',
] as const satisfies readonly SchoolDigestFrequency[];

export const SCHOOL_NOTIFICATION_PREFERENCES_QUERY_KEY = [
  'school',
  'notification-preferences',
] as const;
