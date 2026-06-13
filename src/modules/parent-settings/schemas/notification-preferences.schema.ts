import { z } from 'zod';
import { DIGEST_FREQUENCIES } from '@/modules/parent-settings/constants/notification-preferences.constants';

export const notificationPreferencesSchema = z.object({
  emailEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  inAppEnabled: z.boolean(),
  applicationUpdates: z.boolean(),
  offers: z.boolean(),
  messages: z.boolean(),
  deadlines: z.boolean(),
  marketing: z.boolean(),
  digestFrequency: z.enum(DIGEST_FREQUENCIES),
});

export type NotificationPreferencesValues = z.infer<typeof notificationPreferencesSchema>;
