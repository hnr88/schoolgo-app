import { z } from 'zod';
import { SCHOOL_DIGEST_FREQUENCIES } from '@/modules/school-settings/constants/notification-preferences.constants';

export const schoolNotificationPreferencesSchema = z.object({
  emailEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  inAppEnabled: z.boolean(),
  applicationUpdates: z.boolean(),
  offers: z.boolean(),
  messages: z.boolean(),
  deadlines: z.boolean(),
  tours: z.boolean(),
  marketing: z.boolean(),
  digestFrequency: z.enum(SCHOOL_DIGEST_FREQUENCIES),
});

export type SchoolNotificationPreferencesValues = z.infer<
  typeof schoolNotificationPreferencesSchema
>;
